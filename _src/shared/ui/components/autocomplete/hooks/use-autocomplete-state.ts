import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Key, useFilter } from "react-aria";
import {
	useListState,
	Node,
	ListProps,
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

export type UseAutocompleteStateProps<TItemData extends { id: string }> = {
	onSelectionChange?: (items: TItemData[]) => void;
	// Not implemented
	onQuery?: (searchValue: string) => Promise<TItemData[]>;
} & Omit<ListProps<TItemData>, "onSelectionChange" | "items">;

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
			if (onSelectionChange) {
				onSelectionChange(
					getSelectedItemData([...selection], listState.collection),
				);
			}
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

	// Set textValue of a selected item to the searchValue when selectionMode=single
	useEffect(() => {
		if (selectionMode === "single" && !overlayTriggerState.isOpen) {
			const selectedItem = selectedNodes[0]?.textValue;
			setSearchValue(selectedItem || "");
		}
	}, [
		overlayTriggerState.isOpen,
		setSearchValue,
		selectedNodes,
		selectionMode,
	]);

	// Clear selection if a user clears the input when selectionMode=single
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

	const firstAvailableKey = useMemo(() => {
		return Array.from(renderedCollection.getKeys()).find((key) => {
			const item = renderedCollection.getItem(key);
			return (
				item?.type === "item" &&
				!listState.selectionManager.isDisabled(key)
			);
		});
	}, [renderedCollection, listState.selectionManager.isDisabled]);

	// set first available item focused whenever renderedCollection changes (i.e. filtered)
	useEffect(() => {
		if (firstAvailableKey) {
			listState.selectionManager.setFocusedKey(firstAvailableKey);
		}
	}, [listState.selectionManager.setFocusedKey, firstAvailableKey]);

	const onMenuOpenChangeEventHandler = useCallback(
		(event: OnMenuOpenChangeEvent) => {
			if (selectionMode === "single" && !event.isOpen) {
				const selectedItem = selectedNodes[0]?.textValue;
				setSearchValue(selectedItem || "");
			}
			if (selectionMode === "multiple" && !event.isOpen) {
				setSearchValue("");
			}

			if (event.isOpen && firstAvailableKey) {
				listState.selectionManager.setFocused(true);
				listState.selectionManager.setFocusedKey(firstAvailableKey);
			}
		},
		[
			setSearchValue,
			selectedNodes,
			listState,
			selectionMode,
			firstAvailableKey,
		],
	);

	useEventTargetListener<OnMenuOpenChangeEvent>(
		stateChangeEventTarget,
		"OnMenuOpenChange",
		onMenuOpenChangeEventHandler,
	);

	const onSelectionChangeEventHandler = useCallback(
		(selectedKeys: Set<Key>) => {
			const selectedNodes = getSelectedNodes(
				[...selectedKeys],
				listState.collection,
			);

			if (selectionMode === "single") {
				const selectedItem = selectedNodes[0]?.textValue;
				setSearchValue(selectedItem || "");
				if (selectedItem) {
					overlayTriggerState.close();
				}
			}

			if (selectionMode === "multiple") {
				setSearchValue("");
			}
		},
		[
			selectionMode,
			overlayTriggerState.close,
			listState.collection,
			setSearchValue,
		],
	);

	const prevSelectedKeysRef = useRef(listState.selectionManager.selectedKeys);
	useEffect(() => {
		const isSelectionChanged =
			prevSelectedKeysRef.current !==
			listState.selectionManager.selectedKeys;
		if (isSelectionChanged) {
			onSelectionChangeEventHandler(
				listState.selectionManager.selectedKeys,
			);
		}
		prevSelectedKeysRef.current = listState.selectionManager.selectedKeys;
	}, [
		onSelectionChangeEventHandler,
		listState.selectionManager.selectedKeys,
		prevSelectedKeysRef,
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

	const onSearchValueChange = useCallback(
		(textValue: string) => {
			overlayTriggerState.open();
			setRenderedCollectionType("filtered");
			setSearchValue(textValue);
		},
		[
			overlayTriggerState.open,
			setRenderedCollectionType,
			setSearchValue,
			renderedCollection,
			listState.selectionManager,
		],
	);

	return {
		listState: {
			...listState,
			collection: renderedCollection,
		},
		overlayTriggerState,
		overlayTriggerFunctions: {
			toggle: triggerStateFn(overlayTriggerState.toggle),
			open: triggerStateFn(overlayTriggerState.open),
		},
		selectedNodes,
		searchValue,
		setSearchValue,
		onSearchValueChange,
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

function getSelectedItemData<TItemData extends object>(
	selectedKeys: Key[],
	collection: Collection<Node<TItemData>>,
) {
	const selectedNodes = getSelectedNodes(selectedKeys, collection);

	return selectedNodes
		.map((node) => node.value as TItemData)
		.filter((item) => !!item);
}
