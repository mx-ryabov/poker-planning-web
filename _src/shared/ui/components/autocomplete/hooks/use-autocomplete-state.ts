import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Key, useFilter } from "react-aria";
import {
	useListState,
	Node,
	ListProps,
	Selection,
	useMenuTriggerState,
	Collection,
	useOverlayTriggerState,
} from "react-stately";
import { getChildNodes } from "@react-stately/collections";
import { ListCollection } from "../../list/utility/list-collection";
import { useEventTargetListener } from "@/_src/shared/lib";

class OnMenuOpenChangeEvent extends Event {
	get isOpen() {
		return this._isOpen;
	}
	constructor(private _isOpen: boolean) {
		super("OnMenuOpenChange");
	}
}

class OnSelectionChangeEvent extends Event {
	get selection() {
		return this._selection;
	}
	constructor(private _selection: Selection) {
		super("OnSelectionChange");
	}
}

export type UseAutocompleteStateProps<TItemData extends { id: string }> = {
	onSelectionChange?: (item: TItemData[]) => void;
	// Not implemented
	onQuery?: (searchValue: string) => Promise<TItemData[]>;
} & Omit<ListProps<TItemData>, "onSelectionChange">;

export function useAutocompleteState<TItemData extends { id: string }>(
	props: UseAutocompleteStateProps<TItemData>,
) {
	const { selectionMode, onSelectionChange, onQuery } = props;

	const stateChangeEventTarget = useMemo(() => new EventTarget(), []);

	const [searchValue, setSearchValue] = useState<string>("");
	const { contains } = useFilter({ sensitivity: "base" });

	const overlayTriggerState = useOverlayTriggerState({
		onOpenChange: (isOpen: boolean) =>
			stateChangeEventTarget.dispatchEvent(
				new OnMenuOpenChangeEvent(isOpen),
			),
	});

	const listState = useListState({
		...props,
		onSelectionChange: (selection) => {
			stateChangeEventTarget.dispatchEvent(
				new OnSelectionChangeEvent(selection),
			);
		},
		allowDuplicateSelectionEvents: true,
	});

	let [renderedCollectionType, setRenderedCollectionType] =
		useState<RenderedCollectionType>("filtered");

	const selectedNodes: Node<TItemData>[] = useMemo(
		() =>
			getSelectedNodes(
				[...listState.selectionManager.selectedKeys],
				listState.collection,
			),
		[listState.selectionManager.selectedKeys, listState.collection],
	);

	const applySelectedItemTextForSearchValue = useCallback(() => {
		const selectedItem = selectedNodes[0]?.textValue;
		setSearchValue(selectedItem || "");
	}, [selectedNodes, setSearchValue]);

	useEffect(() => {
		if (selectionMode === "single" && !overlayTriggerState.isOpen) {
			applySelectedItemTextForSearchValue();
		}
	}, [
		overlayTriggerState.isOpen,
		applySelectedItemTextForSearchValue,
		selectionMode,
	]);

	const onMenuOpenChangeEventHandler = useCallback(
		(event: OnMenuOpenChangeEvent) => {
			if (!event.isOpen) {
				applySelectedItemTextForSearchValue();
			}
		},
		[applySelectedItemTextForSearchValue],
	);

	useEventTargetListener<OnMenuOpenChangeEvent>(
		stateChangeEventTarget,
		"OnMenuOpenChange",
		onMenuOpenChangeEventHandler,
	);

	const onSelectionChangeEventHandler = useCallback(
		(event: OnSelectionChangeEvent) => {
			const { selection } = event;
			const selectedKeys = [...selection];
			const selectedNodes = getSelectedNodes(
				selectedKeys,
				listState.collection,
			);

			if (selectionMode === "single") {
				const selectedItem = selectedNodes[0]?.textValue;
				setSearchValue(selectedItem || "");
				if (selectedItem) {
					overlayTriggerState.close();
				}
			}

			if (onSelectionChange && selectedKeys) {
				onSelectionChange(
					selectedNodes
						.map((node) => node.value as TItemData)
						.filter((item) => !!item),
				);
			}
		},
		[
			overlayTriggerState.close,
			onSelectionChange,
			listState.collection,
			setSearchValue,
		],
	);

	useEventTargetListener<OnSelectionChangeEvent>(
		stateChangeEventTarget,
		"OnSelectionChange",
		onSelectionChangeEventHandler,
	);

	// Clear selection if a user clears the input
	const prevSearchValueRef = useRef("");
	useEffect(() => {
		if (
			selectionMode === "single" &&
			searchValue === "" &&
			prevSearchValueRef.current !== searchValue
		) {
			listState.selectionManager.clearSelection();
		}
		prevSearchValueRef.current = searchValue;
	}, [
		searchValue,
		listState.selectionManager.clearSelection,
		selectionMode,
		prevSearchValueRef,
	]);

	// adapter for trigger overlay functions that consider the collection type
	const triggerStateFn = useCallback(
		<TArgs>(triggerCallback: (...args: TArgs[]) => void) => {
			return (
				renderedCollectionType: RenderedCollectionType,
				...args: Parameters<typeof triggerCallback>
			) => {
				setRenderedCollectionType(renderedCollectionType);
				triggerCallback(...args);
			};
		},
		[setRenderedCollectionType],
	);

	const renderedCollection = useMemo(() => {
		switch (renderedCollectionType) {
			case "filtered":
				return filterCollection(
					listState.collection,
					searchValue || "",
					contains,
				);
			default:
				return listState.collection;
		}
	}, [renderedCollectionType, listState.collection, searchValue, contains]);

	return {
		listState: {
			...listState,
			collection: renderedCollection,
		},
		overlayTriggerState,
		overlayTriggerFunctions: {
			toggle: triggerStateFn(overlayTriggerState.toggle),
			open: triggerStateFn(overlayTriggerState.open),
			//close: overlayTriggerState.close,
			//setOpen: triggerStateFn(overlayTriggerState.setOpen),
		},
		searchValue,
		setSearchValue,
	};
}

export type RenderedCollectionType = "full" | "filtered";

type FilterFn = (textValue: string, inputValue: string) => boolean;

function filterCollection<T extends object>(
	collection: Collection<Node<T>>,
	inputValue: string,
	filter: FilterFn,
): Collection<Node<T>> {
	return new ListCollection(
		filterNodes(collection, collection, inputValue, filter),
	);
}

function filterNodes<T>(
	collection: Collection<Node<T>>,
	nodes: Iterable<Node<T>>,
	inputValue: string,
	filter: FilterFn,
): Iterable<Node<T>> {
	let filteredNode = [];
	for (let node of nodes) {
		if (node.type === "section" && node.hasChildNodes) {
			let filtered = filterNodes(
				collection,
				getChildNodes(node, collection),
				inputValue,
				filter,
			);
			if ([...filtered].some((node) => node.type === "item")) {
				filteredNode.push({ ...node, childNodes: filtered });
			}
		} else if (node.type === "item" && filter(node.textValue, inputValue)) {
			filteredNode.push({ ...node });
		} else if (node.type !== "item") {
			filteredNode.push({ ...node });
		}
	}
	return filteredNode;
}

function getSelectedNodes<TItemData extends object>(
	selectedKeys: Key[],
	collection: Collection<Node<TItemData>>,
) {
	if (!selectedKeys) return [];
	return selectedKeys
		.map((key) => collection.getItem(String(key)) as Node<TItemData>)
		.filter((item) => !!item);
}
