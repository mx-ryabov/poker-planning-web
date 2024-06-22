import { RenderFnType } from "@/_src/shared/lib";
import { Popover } from "../../popover";
import { List } from "../../list";

type DropdownMenuProps<TItem> = {
	items?: TItem[];
	onAction?: (item: React.Key) => void;
};

function DropdownMenu<TItem>({ items, onAction }: DropdownMenuProps<TItem>) {
	return (
		<Popover.Content>
			<List
				onAction={onAction}
				//items={items}
				className="py-2 w-fit max-w-[180px] bg-white rounded-lg border border-neutral-100 drop-shadow"
			></List>
		</Popover.Content>
	);
}

export default DropdownMenu;
