import {
	useCallback,
	MouseEvent as ReactMouseEvent,
	MouseEventHandler,
	HTMLAttributeAnchorTarget,
} from "react";
import { useListEvents } from "../providers/list-provider";

export type ListItemProps = {
	children: React.ReactNode;
	className?: string;
	id: string | number;
	key: React.Key;
	href?: string;
	target?: HTMLAttributeAnchorTarget;
	disabled?: boolean;
	onClick?: MouseEventHandler<HTMLDivElement | HTMLAnchorElement>;
};

export default function ListItem({
	children,
	className,
	id,
	disabled,
	onClick,
	...itemElementProps
}: ListItemProps) {
	const { onAction } = useListEvents();

	const ElementType: React.ElementType = itemElementProps.href ? "a" : "div";

	const onClickHandler = useCallback(
		(e: ItemMouseEvent) => {
			if (disabled) return;
			onClick && onClick(e);
			onAction && onAction(id);
		},
		[onAction, onClick, id, disabled],
	);

	return (
		<ElementType
			className={className}
			onClick={onClickHandler}
			aria-disabled={disabled}
			{...itemElementProps}
		>
			{children}
		</ElementType>
	);
}

type ItemMouseEvent = ReactMouseEvent<
	HTMLDivElement | HTMLAnchorElement,
	MouseEvent
>;
