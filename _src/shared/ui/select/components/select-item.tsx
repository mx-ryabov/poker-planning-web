import { useCallback, MouseEvent as ReactMouseEvent } from "react";
import { List, useList } from "../../list";
import { ListItemProps } from "../../list/components/list-item";
import { usePopover } from "../../popover";

export type SelectItemProps = ListItemProps;

export default function SelectItem(props: SelectItemProps) {
	const { children, onClick, ...restProps } = props;
	const { close } = usePopover();
	const { selectionMode } = useList();

	const onClickHandler = useCallback(
		(
			event: ReactMouseEvent<
				HTMLDivElement | HTMLAnchorElement,
				MouseEvent
			>,
		) => {
			onClick && onClick(event);
			if (selectionMode === "single") close();
		},
		[onClick, close, selectionMode],
	);

	return (
		<List.Item
			{...restProps}
			onClick={onClickHandler}
			className="flex flex-row pl-3 pr-5 py-2 items-center cursor-pointer transition-colors gap-2
					text-neutral-500 text-sm font-normal
					hover:bg-neutral-100
					active:bg-neutral-200
					aria-disabled:text-neutral-200 aria-disabled:hover:bg-white aria-disabled:cursor-default"
		>
			<span className="scale-100">{children}</span>
		</List.Item>
	);
}
