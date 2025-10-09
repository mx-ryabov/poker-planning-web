import { useCallback, useMemo, useState } from "react";
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
import { useValueChanged } from "@/_src/shared/lib";

export type UseAutocompleteStateProps<TItemData extends { id: string }> = {
	onSelectionChange?: (items: TItemData[]) => void;
	// Not implemented
	onQuery?: (searchValue: string) => Promise<TItemData[]>;
} & Omit<ListProps<TItemData>, "onSelectionChange" | "items">;

export function useAutocompleteState<TItemData extends { id: string }>(
	props: UseAutocompleteStateProps<TItemData>,
) {
	const { selectionMode, onSelectionChange } = props;

	const [searchValue, setSearchValue] = useState<string>("");
	const prevSearchValue = useValueChanged(searchValue);
	const isSearchValueChanged = prevSearchValue.isChanged;

	const { contains } = useFilter({ sensitivity: "base" });

	const overlayTriggerState = useOverlayTriggerState({});
	const isOpen = overlayTriggerState.isOpen;
	const prevIsOpen = useValueChanged(isOpen);
	const isJustClosed = prevIsOpen.value && !isOpen;
	const isJustOpened = !prevIsOpen.value && isOpen;

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

	const prevSelectedKeys = useValueChanged(
		listState.selectionManager.selectedKeys,
	);
	const isSelectionChanged = prevSelectedKeys.isChanged;

	const [renderedCollectionType, setRenderedCollectionType] =
		useState<RenderedCollectionType>("filtered");

	const selectedNodes: Node<TItemData>[] = getSelectedNodes(
		[...listState.selectionManager.selectedKeys],
		listState.collection,
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

	const firstEnabledItemKey = useMemo(() => {
		return Array.from(renderedCollection.getKeys()).find((key) => {
			const item = renderedCollection.getItem(key);
			return (
				item?.type === "item" &&
				!listState.selectionManager.isDisabled(key)
			);
		});
	}, [renderedCollection, listState.selectionManager.isDisabled]);
	const prevFirstEnabledItemKey = useValueChanged(firstEnabledItemKey);
	const isFirstEnabledItemKeyChanged = prevFirstEnabledItemKey.isChanged;

	const firstSelectedItemValue = selectedNodes[0]?.textValue;
	const prevFirstSelectedItemValue = useValueChanged(
		firstSelectedItemValue,
		null,
	);

	// 1. State behaviors for selectionMode = "single"
	if (selectionMode === "single") {
		const isFirstSelectedItemChanged = prevFirstSelectedItemValue.isChanged;
		// 1.1 Set textValue of a selected item to the searchValue when selectionMode=single
		if (isFirstSelectedItemChanged || isJustClosed) {
			setSearchValue(firstSelectedItemValue || "");
		}

		// 1.2 Clear selection if a user clears the input when selectionMode=single
		if (searchValue === "" && isSearchValueChanged) {
			listState.selectionManager.clearSelection();
		}

		// 1.3 Close the menu when the selection is changed
		//     (i.e. an item is selected from the list)
		//     and there is a valid selected item
		//     (i.e. not cleared by 1.2)
		if (isSelectionChanged && firstSelectedItemValue) {
			overlayTriggerState.close();
		}
	}

	// 2. State behaviors for selectionMode = "multiple"
	if (selectionMode === "multiple") {
		// 2.1 Clear input when the menu is closed
		if (isJustClosed) {
			setSearchValue("");
		}
	}

	// 3. State behaviors for both selectionMode

	// 3.1 set first available item focused whenever renderedCollection changes (i.e. filtered)
	if (firstEnabledItemKey && isFirstEnabledItemKeyChanged) {
		listState.selectionManager.setFocusedKey(firstEnabledItemKey);
	}

	// 3.2 set first available item focused when the menu is opened
	if (isJustOpened && firstEnabledItemKey) {
		listState.selectionManager.setFocused(true);
		listState.selectionManager.setFocusedKey(firstEnabledItemKey);
	}

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
	const filteredNode = [];
	for (const node of nodes) {
		if (node.type === "section" && node.hasChildNodes) {
			const filtered = filterNodes(
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
