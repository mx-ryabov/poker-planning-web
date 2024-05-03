import { buildProvider } from "@/_src/shared/lib";

type ListEventsContext = {
	onAction?: (itemId: string | number) => void;
};

const [useListEvents, ListEventsProvider] = buildProvider<ListEventsContext>();

type ListProviderProps = {
	children: React.ReactElement;
	onAction?: (itemId: string | number) => void;
};

export function ListProvider({ children, onAction }: ListProviderProps) {
	return (
		<ListEventsProvider value={{ onAction }}>{children}</ListEventsProvider>
	);
}

export { useListEvents };
