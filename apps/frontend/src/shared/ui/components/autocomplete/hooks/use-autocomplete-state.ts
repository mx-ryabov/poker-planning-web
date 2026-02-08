import { useCallback, useMemo, useState } from "react";
import { Key, useFilter } from "react-aria";
import {
	useListState,
	Node,
	ListProps,
	Collection,
	useOverlayTriggerState,
	ListState,
} from "react-stately";
import { getChildNodes } from "@react-stately/collections";
import { ListCollection } from "../../list/utility/list-collection";
import { usePrevValueState } from "@/src/shared/lib";

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

	const overlayState = useOverlayState();

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

	const {
		renderedCollection,
		selectedNodes,
		firstEnabledItemKey,
		firstSelectedItem,
		setRenderedCollectionType,
	} = useRenderedCollectionState({
		listState,
		searchValue,
	});

	// Apply selection mode-specific behaviors
	// Note: Always call hooks, but conditionally execute logic inside them
	useSingleSelectionBehaviors({
		enabled: selectionMode === "single",
		searchValue,
		setSearchValue,
		isJustClosed: overlayState.isJustClosed,
		firstSelectedItemValue: firstSelectedItem?.textValue,
		listState,
		overlayState,
	});

	useMultipleSelectionBehaviors({
		enabled: selectionMode === "multiple",
		isJustClosed: overlayState.isJustClosed,
		setSearchValue,
	});

	// Apply shared focus behaviors
	useFocusBehaviors({
		isJustOpened: overlayState.isJustOpened,
		firstEnabledItemKey,
		listState,
	});

	const onSearchValueChange = useCallback(
		(textValue: string) => {
			overlayState.open();
			setRenderedCollectionType("filtered");
			setSearchValue(textValue);
		},
		[overlayState, setRenderedCollectionType, setSearchValue],
	);

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

	return {
		listState: {
			...listState,
			collection: renderedCollection,
		},
		overlayTriggerState: overlayState._state,
		overlayTriggerFunctions: {
			toggle: triggerStateFn(overlayState.toggle),
			open: triggerStateFn(overlayState.open),
		},
		selectedNodes,
		searchValue,
		setSearchValue,
		onSearchValueChange,
	};
}

function useRenderedCollectionState<TItemData extends { id: string }>(params: {
	listState: ListState<TItemData>;
	searchValue: string;
}) {
	const { listState, searchValue } = params;

	const { contains } = useFilter({ sensitivity: "base" });

	const [renderedCollectionType, setRenderedCollectionType] =
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

	const firstEnabledItemKey = useMemo(() => {
		return Array.from(renderedCollection.getKeys()).find((key) => {
			const item = renderedCollection.getItem(key);
			return (
				item?.type === "item" &&
				!listState.selectionManager.isDisabled(key)
			);
		});
	}, [renderedCollection, listState.selectionManager]);

	const firstSelectedItem = selectedNodes[0];

	return {
		renderedCollection,
		selectedNodes,
		firstEnabledItemKey,
		firstSelectedItem,
		setRenderedCollectionType,
	};
}

// Custom hook to manage overlay state with change detection
function useOverlayState() {
	const overlayTriggerState = useOverlayTriggerState({});
	const isOpen = overlayTriggerState.isOpen;
	const prevIsOpen = usePrevValueState(isOpen);

	return {
		isOpen,
		isJustClosed: prevIsOpen.value && !isOpen,
		isJustOpened: !prevIsOpen.value && isOpen,
		open: () => overlayTriggerState.open(),
		close: () => overlayTriggerState.close(),
		toggle: () => overlayTriggerState.toggle(),
		// Keep the original state for advanced usage
		_state: overlayTriggerState,
	};
}

type OverlayState = ReturnType<typeof useOverlayState>;

type SingleSelectionBehaviorsParams<TItemData extends { id: string }> = {
	enabled: boolean;
	searchValue: string;
	setSearchValue: (value: string) => void;
	isJustClosed: boolean;
	firstSelectedItemValue: string | undefined;
	listState: ReturnType<typeof useListState<TItemData>>;
	overlayState: OverlayState;
};
// Hook to handle single selection mode behaviors
function useSingleSelectionBehaviors<TItemData extends { id: string }>(
	params: SingleSelectionBehaviorsParams<TItemData>,
) {
	const {
		enabled,
		searchValue,
		setSearchValue,
		isJustClosed,
		firstSelectedItemValue,
		listState,
		overlayState,
	} = params;

	const prevSearchValue = usePrevValueState(searchValue);

	const prevSelectedKeys = usePrevValueState(
		listState.selectionManager.selectedKeys,
	);

	const prevFirstSelectedItemValue = usePrevValueState(
		firstSelectedItemValue,
		null,
	);

	// Only execute behaviors if enabled (single mode)
	if (!enabled) return;

	// 1.1 Set textValue of a selected item to the searchValue when selectionMode=single
	if (prevFirstSelectedItemValue.isChanged || isJustClosed) {
		setSearchValue(firstSelectedItemValue || "");
	}

	// 1.2 Clear selection if a user clears the input when selectionMode=single
	if (searchValue === "" && prevSearchValue.isChanged) {
		listState.selectionManager.clearSelection();
	}

	// 1.3 Close the menu when the selection is changed
	//     (i.e. an item is selected from the list)
	//     and there is a valid selected item
	//     (i.e. not cleared by 1.2)
	if (prevSelectedKeys.isChanged && firstSelectedItemValue) {
		overlayState.close();
	}
}

// Hook to handle multiple selection mode behaviors
function useMultipleSelectionBehaviors(params: {
	enabled: boolean;
	isJustClosed: boolean;
	setSearchValue: (value: string) => void;
}) {
	const { enabled, isJustClosed, setSearchValue } = params;

	// Only execute behaviors if enabled (multiple mode)
	if (!enabled) return;

	// 2.1 Clear input when the menu is closed
	if (isJustClosed) {
		setSearchValue("");
	}
}

// Hook to handle focus management (shared between modes)
function useFocusBehaviors<TItemData extends { id: string }>(params: {
	isJustOpened: boolean;
	firstEnabledItemKey: Key | undefined;
	listState: ReturnType<typeof useListState<TItemData>>;
}) {
	const { isJustOpened, firstEnabledItemKey, listState } = params;

	const prevFirstEnabledItemKey = usePrevValueState(firstEnabledItemKey);
	const isFirstEnabledItemKeyChanged = prevFirstEnabledItemKey.isChanged;

	// 3.1 set first available item focused whenever renderedCollection changes (i.e. filtered)
	if (firstEnabledItemKey && isFirstEnabledItemKeyChanged) {
		listState.selectionManager.setFocusedKey(firstEnabledItemKey);
	}

	// 3.2 set first available item focused when the menu is opened
	if (isJustOpened && firstEnabledItemKey) {
		listState.selectionManager.setFocused(true);
		listState.selectionManager.setFocusedKey(firstEnabledItemKey);
	}
}

export type RenderedCollectionType = "full" | "filtered";

type FilterFn = (textValue: string, inputValue: string) => boolean;

type FilterNodesOptions<T> = {
	collection: Collection<Node<T>>;
	nodes: Iterable<Node<T>>;
	inputValue: string;
	filter: FilterFn;
};

function filterCollection<T extends object>(
	collection: Collection<Node<T>>,
	inputValue: string,
	filter: FilterFn,
): Collection<Node<T>> {
	return new ListCollection(
		filterNodes({ collection, nodes: collection, inputValue, filter }),
	);
}

function filterNodes<T>(options: FilterNodesOptions<T>): Iterable<Node<T>> {
	const { collection, nodes, inputValue, filter } = options;
	const filteredNode = [];
	for (const node of nodes) {
		if (node.type === "section" && node.hasChildNodes) {
			const filtered = filterNodes({
				collection,
				nodes: getChildNodes(node, collection),
				inputValue,
				filter,
			});
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
