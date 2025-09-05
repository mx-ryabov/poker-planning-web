import {
	ForwardedRef,
	ReactElement,
	RefAttributes,
	useCallback,
	useRef,
} from "react";
import { AriaListBoxProps } from "react-aria";
import { PopoverProps, SelectionMode } from "react-aria-components";
import { ListState } from "react-stately";
import { SadManIcon } from "../../icon";
import { AutocompleteListProps } from "../components/autocomplete-list";
import { usePopoverForcePositionUpdate } from "@/_src/shared/lib";

export type UseAutocompleteProps<TItemData extends object> = {
	/** Usage:
	 * 1. If you have no sections in the list then use it together with children: (item: TItemData) => React.ReactElement
	 * 2. If you have sections then do NOT use it.
	 * 	  Instead, render sections as children with map() and provide your TItemData directly in JSX
	 *    like this \<Autocomplete\<ItemT\> {...yourPropsWithoutItems}\>{children}\</Autocomplete\>.
	 * 	  See an example in AutocompleteMultipleWithSections story
	 */
	items?: Iterable<TItemData>;
	selectionMode?: Exclude<SelectionMode, "none">;
	children:
		| ReactElement
		| ReactElement[]
		| ((item: TItemData) => ReactElement);
} & Omit<
	AriaListBoxProps<TItemData>,
	"children" | "onSelectionChange" | "items"
>;

export function useAutocomplete<TItemData extends object>(
	props: UseAutocompleteProps<TItemData>,
	listState: ListState<TItemData>,
) {
	const { selectionMode = "single", children, items, ...restProps } = props;
	const popoverRef = useRef<HTMLDivElement | null>(null);
	const listRef = useRef<HTMLDivElement | null>(null);
	const triggerRef = useRef<HTMLDivElement | null>(null);

	const renderEmptyState = useCallback(
		() => (
			<div className="flex flex-row items-center gap-2 px-2 py-1 text-sm text-neutral-900">
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
			"p-1 data-entering:animate-popup data-exiting:animate-popup-reverse outline-hidden bg-white border border-neutral-100 rounded-lg drop-shadow-lg max-h-[inherit] overflow-hidden",
		maxHeight: 300,
		isNonModal: true,
	};

	return {
		state: listState,
		listProps,
		triggerRef,
		listRef,
		popoverProps,
		popoverRef,
	};
}
