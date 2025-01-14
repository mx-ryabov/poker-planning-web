import {
	ListBoxItem,
	ListBoxItemProps,
	composeRenderProps,
} from "react-aria-components";
import { CheckIcon } from "../../icon";
import { cva } from "class-variance-authority";
import { mergeClassNames } from "@/_src/shared/lib/utils/merge-class-names";

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
				true: ["bg-neutral-100"],
			},
			isPressed: {
				true: ["bg-neutral-200"],
			},
			isDisabled: {
				true: ["text-neutral-200"],
				false: ["text-neutral-500 cursor-pointer"],
			},
			isSelected: {
				true: ["bg-primary-100 hover:bg-initial text-primary-500"],
			},
			isFocused: {
				true: ["outline-2 outline-primary-500 outline"],
				false: ["outline-none"],
			},
		},
	},
);

export function ListItem(props: ItemProps) {
	const renderCheckState = (isSelected: boolean) => (
		<div className="w-[20px] h-[20px] ml-auto scale-100">
			{isSelected && <CheckIcon size={20} />}
		</div>
	);

	return (
		<ListBoxItem
			{...props}
			className={mergeClassNames(listItemStyles, props.className)}
		>
			{composeRenderProps(
				props.children,
				(children, { isSelected, selectionMode }) => (
					<>
						{children}
						{selectionMode !== "none" &&
							renderCheckState(isSelected)}
					</>
				),
			)}
		</ListBoxItem>
	);
}
