import {
	useCallback,
	MouseEvent as ReactMouseEvent,
	MouseEventHandler,
	HTMLAttributeAnchorTarget,
} from "react";
import { useListEvents, useListState } from "../providers/list-provider";
import { CheckIcon } from "../../icon";

export type ListItemProps = {
	children: React.ReactNode;
	className?: string;
	id: React.Key;
	key: React.Key;
	textValue?: string;
	href?: string;
	target?: HTMLAttributeAnchorTarget;
	disabled?: boolean;
	onClick?: MouseEventHandler<HTMLDivElement | HTMLAnchorElement>;
};

export default function ListItem(props: ListItemProps) {
	const {
		children,
		className,
		id,
		textValue,
		disabled,
		onClick,
		...itemElementProps
	} = props;

	const { onAction, setSelectedItems } = useListEvents();
	const { selectedItems, selectionMode } = useListState();

	const ElementType: React.ElementType = itemElementProps.href ? "a" : "div";

	const onClickHandler = useCallback(
		(e: ItemMouseEvent) => {
			if (disabled) return;

			onClick && onClick(e);
			onAction && onAction(id);

			setSelectedItems(id);
		},
		[onAction, onClick, id, disabled, setSelectedItems, selectionMode],
	);

	const renderCheckState = () => (
		<div className="w-[20px] h-[20px] ml-auto scale-100">
			<span
				style={{
					display: selectedItems.has(id) ? "block" : "none",
				}}
			>
				<CheckIcon size={20} />
			</span>
		</div>
	);

	return (
		<ElementType
			className={"flex flex-row scale-100 " + className}
			onClick={onClickHandler}
			aria-disabled={disabled}
			{...itemElementProps}
		>
			{children}
			{renderCheckState()}
		</ElementType>
	);
}

type ItemMouseEvent = ReactMouseEvent<
	HTMLDivElement | HTMLAnchorElement,
	MouseEvent
>;
