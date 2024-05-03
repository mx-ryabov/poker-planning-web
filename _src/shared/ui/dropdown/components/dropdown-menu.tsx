import { RenderFnType } from "@/_src/shared/lib";
import { Popover } from "../../popover";
import { DropdownMenuProvider } from "../providers/dropdown-provider";

type DropdownMenuProps<TItem> = {
	children: React.ReactNode | RenderFnType<TItem>;
	items?: TItem[];
	onAction?: (item: string | number) => void;
};

function DropdownMenu<TItem>({
	children,
	items,
	onAction,
}: DropdownMenuProps<TItem>) {
	const renderContent = () => {
		if (typeof children === "function") {
			if (!items) return null;

			return items.map((item) => children(item));
		} else {
			return children;
		}
	};

	return (
		<Popover.Content>
			<DropdownMenuProvider onSelected={onAction}>
				<div className="flex flex-col py-2 w-fit max-w-[180px] bg-white rounded-lg border border-neutral-100 drop-shadow">
					{renderContent()}
				</div>
			</DropdownMenuProvider>
		</Popover.Content>
	);
}
DropdownMenu.displayName = Popover.Content.displayName;

export default DropdownMenu;
