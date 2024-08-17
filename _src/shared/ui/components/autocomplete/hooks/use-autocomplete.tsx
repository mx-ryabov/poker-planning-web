import { ForwardedRef, RefAttributes, useCallback, useRef } from "react";
import { AriaListBoxProps } from "react-aria";
import { PopoverProps, SelectionMode } from "react-aria-components";
import { ListState } from "react-stately";
import { SadManIcon } from "../../icon";
import { AutocompleteListProps } from "../components/autocomplete-list";

export type UseAutocompleteProps<TItemData extends object> = {
	items?: Iterable<TItemData>;
	selectionMode?: Exclude<SelectionMode, "none">;
	children:
		| React.ReactElement
		| React.ReactElement[]
		| ((item: TItemData) => React.ReactElement);
} & Omit<AriaListBoxProps<TItemData>, "children" | "onSelectionChange">;

export function useAutocomplete<TItemData extends object>(
	props: UseAutocompleteProps<TItemData>,
	listState: ListState<TItemData>,
) {
	const { selectionMode = "single", children, items, ...restProps } = props;
	const popoverRef = useRef(null);
	const listRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLDivElement>(null);

	const renderEmptyState = useCallback(
		() => (
			<div className="flex flex-row items-center gap-2 px-2 py-1 text-sm text-neutral-500">
				<SadManIcon size={16} />
				The list is empty.
			</div>
		),
		[],
	);

	const listProps: AutocompleteListProps<TItemData> & {
		ref?: ForwardedRef<HTMLDivElement>;
	} = {
		...restProps,
		"aria-labelledby": "autocomplete-list",
		state: listState,
		ref: listRef,
		items,
		selectionMode,
		shouldUseVirtualFocus: true,
		shouldSelectOnPressUp: true,
		shouldFocusOnHover: true,
		autoFocus: false,
		renderEmptyState,
	};

	const getPopoverWidth = useCallback(() => {
		const trggerElement = triggerRef?.current;
		if (!trggerElement) {
			return "auto";
		}
		return `${trggerElement.getBoundingClientRect().width}px`;
	}, [triggerRef]);

	const popoverProps: PopoverProps & RefAttributes<HTMLElement> = {
		triggerRef,
		ref: popoverRef,
		placement: "bottom left",
		style: () => ({
			width: getPopoverWidth(),
		}),
		className:
			"p-1 data-[entering]:animate-popup data-[exiting]:animate-popup-reverse outline-none bg-white border border-neutral-100 rounded-lg drop-shadow-lg max-h-[inherit] overflow-hidden",
		maxHeight: 300,
		isNonModal: true,
	};

	return {
		listProps,
		triggerRef,
		listRef,
		popoverProps,
		popoverRef,
	};
}
