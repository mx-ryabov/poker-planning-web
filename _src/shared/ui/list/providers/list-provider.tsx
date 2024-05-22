import { buildProvider } from "@/_src/shared/lib";
import useListSelectionState from "../hooks/use-list-selection-state";

type ListStateContext = {
	selectionMode?: "single" | "multiple";
	selectedItems: Set<React.Key>;
};

const [useListState, ListStateProvider] = buildProvider<ListStateContext>();

type ListEventsContext = {
	onAction?: (itemId: React.Key) => void;
	setSelectedItems: (value: React.Key) => void;
};

const [useListEvents, ListEventsProvider] = buildProvider<ListEventsContext>();

type ListProviderProps = {
	children: React.ReactElement;
	selectionMode?: "single" | "multiple";
	selectedItems?: React.Key[];
	defaultSelectedItems?: React.Key[];
	onSelectionChange?: (itemIds: Set<React.Key>) => void;
	onAction?: (itemId: React.Key) => void;
};

export function ListProvider(props: ListProviderProps) {
	const {
		children,
		selectionMode,
		selectedItems,
		defaultSelectedItems,
		onSelectionChange,
		onAction,
	} = props;
	const { selectedItems: currentSelectedItems, setSelectedItems } =
		useListSelectionState(
			selectedItems,
			defaultSelectedItems,
			selectionMode,
			onSelectionChange,
		);

	return (
		<ListEventsProvider value={{ onAction, setSelectedItems }}>
			<ListStateProvider
				value={{ selectionMode, selectedItems: currentSelectedItems }}
			>
				{children}
			</ListStateProvider>
		</ListEventsProvider>
	);
}

export { useListEvents, useListState };
