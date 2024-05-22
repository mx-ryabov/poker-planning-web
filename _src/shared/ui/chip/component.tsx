import { cva } from "class-variance-authority";
import { CloseIcon } from "../icon";
import { MouseEventHandler } from "react";

type Props = {
	text: string;
	outlined?: boolean;
	disabled?: boolean;
	onClick?: MouseEventHandler<HTMLSpanElement> | undefined;
	onClose?: () => void;
};

const chip = cva(
	[
		"h-[21px] bg-neutral-100 rounded flex flex-row min-w-fit gap-1 px-2 text-neutral-500 text-xs items-center transition-all select-none",
	],
	{
		variants: {
			outlined: {
				true: [
					"border",
					"hover:border-primary-500",
					"active:border-primary-600",
				],
				false: [],
			},
			disabled: {
				true: ["text-neutral-300"],
				false: [
					"cursor-pointer",
					"hover:bg-primary-100 hover:text-primary-500",
					"active:bg-primary-200 active:text-primary-600",
				],
			},
		},
		compoundVariants: [
			{
				outlined: true,
				disabled: true,
				className: "border-neutral-300",
			},
			{
				outlined: true,
				disabled: false,
				className: "border-neutral-500",
			},
		],
	},
);

export function Chip({
	text,
	outlined = false,
	disabled = false,
	onClick,
	onClose,
}: Props) {
	const onCloseHandler = (
		event: React.MouseEvent<HTMLElement, MouseEvent>,
	) => {
		event.stopPropagation();
		onClose && onClose();
	};
	return (
		<span className={chip({ outlined, disabled })} onClick={onClick}>
			{text}{" "}
			{!disabled && onClose && (
				<CloseIcon size={16} onClick={onCloseHandler} />
			)}
		</span>
	);
}
