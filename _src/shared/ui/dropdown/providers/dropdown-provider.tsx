import { buildProvider } from "@/_src/shared/lib";

type DropdownActionContext = {
	onSelected?: (itemId: string | number) => void;
};

const [useDropdownMenuAction, DropdownMenuActionProvider] =
	buildProvider<DropdownActionContext>();

type DropdownProviderProps<TItem> = {
	children: React.ReactElement;
	onSelected?: (itemId: string | number) => void;
};

export function DropdownMenuProvider<TItem>({
	children,
	onSelected,
}: DropdownProviderProps<TItem>) {
	return (
		<DropdownMenuActionProvider value={{ onSelected }}>
			{children}
		</DropdownMenuActionProvider>
	);
}

export { useDropdownMenuAction };
