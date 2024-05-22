import { RenderFnType } from "@/_src/shared/lib";
import { Popover } from "../../popover";
import { List } from "../../list";
import { ListItemProps } from "../../list/components/list-item";

type DropdownMenuProps<TItem> = {
	children:
		| React.ReactElement<ListItemProps>[]
		| RenderFnType<TItem, ListItemProps>;
	items?: TItem[];
	onAction?: (item: React.Key) => void;
};

function DropdownMenu<TItem>({
	children,
	items,
	onAction,
}: DropdownMenuProps<TItem>) {
	return (
		<Popover.Content>
			<List
				onAction={onAction}
				items={items}
				className="py-2 w-fit max-w-[180px] bg-white rounded-lg border border-neutral-100 drop-shadow"
			>
				{children}
			</List>
		</Popover.Content>
	);
}
DropdownMenu.displayName = Popover.Content.displayName;

export default DropdownMenu;
