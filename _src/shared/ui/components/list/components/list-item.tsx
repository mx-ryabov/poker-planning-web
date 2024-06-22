import {
	ListBoxItem,
	ListBoxItemProps,
	composeRenderProps,
} from "react-aria-components";
import { CheckIcon } from "../../icon";
import { cva } from "class-variance-authority";

type ItemProps = ListBoxItemProps;

export const listItemStyles = cva(
	[
		"flex flex-row items-center gap-2",
		"px-2 py-2 m-1",
		"rounded-md transition-colors",
		"text-sm font-normal",
	],
	{
		variants: {
			isHovered: {
				true: ["bg-neutral-100 cursor-pointer"],
			},
			isPressed: {
				true: ["bg-neutral-200"],
			},
			isDisabled: {
				true: ["text-neutral-200"],
				false: ["text-neutral-500"],
			},
			isSelected: {
				true: ["bg-primary-100 hover:bg-initial text-primary-500"],
			},
			isFocused: {
				true: ["outline-primary-400"],
			},
		},
	},
);

export function ListItem(props: ItemProps) {
	const { children, className, ...restProps } = props;

	const renderCheckState = (isSelected: boolean) => (
		<div className="w-[20px] h-[20px] ml-auto scale-100">
			{isSelected && <CheckIcon size={20} />}
		</div>
	);

	return (
		<ListBoxItem
			{...restProps}
			className={(renderProps) => listItemStyles(renderProps)}
		>
			{composeRenderProps(props.children, (children, { isSelected }) => (
				<>
					{children}
					{renderCheckState(isSelected)}
				</>
			))}
		</ListBoxItem>
	);
}
