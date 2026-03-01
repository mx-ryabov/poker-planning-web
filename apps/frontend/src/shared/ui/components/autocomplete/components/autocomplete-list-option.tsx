import { useContext, useRef } from "react";
import { mergeProps, useHover, useOption } from "react-aria";
import { Node } from "react-stately";
import { listItemStyles } from "../../list/components/list-item";
import { AutocompleteListContext } from "../contexts/autocomplete-list-context";

type AutocompleteListOptionProps<TItemData extends object> = {
	item: Node<TItemData>;
};

export const AutocompleteListOption = <TItemData extends object>({
	item,
}: AutocompleteListOptionProps<TItemData>) => {
	const { rendered, key } = item;
	const ref = useRef<HTMLDivElement>(null);

	const { state, shouldFocusOnHover, shouldUseVirtualFocus } = useContext(
		AutocompleteListContext,
	);

	const { optionProps, isSelected, isDisabled, isFocused } = useOption(
		{
			"aria-label": item["aria-label"],
			key,
			isVirtualized: true,
			shouldUseVirtualFocus,
			shouldFocusOnHover,
		},
		state,
		ref,
	);

	const { hoverProps, isHovered } = useHover({
		isDisabled,
	});

	return (
		<div
			{...mergeProps(optionProps, shouldFocusOnHover ? {} : hoverProps)}
			ref={ref}
			data-focused={isFocused}
			className={listItemStyles({
				isHovered,
				isFocused: shouldUseVirtualFocus && isFocused,
				isDisabled,
				isSelected,
			})}
		>
			{rendered}
		</div>
	);
};
