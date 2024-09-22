import { ListState } from "react-stately";
import {
	AriaLabelingProps,
	DOMProps,
	StyleProps,
	FocusStrategy,
} from "@react-types/shared";
import {
	ForwardedRef,
	forwardRef,
	HTMLAttributes,
	MutableRefObject,
	ReactNode,
	useMemo,
	useRef,
} from "react";
import { AriaListBoxOptions, FocusScope, useListBox } from "react-aria";
import { AutocompleteListContext } from "../contexts/autocomplete-list-context";
import { AutocompleteListOption } from "./autocomplete-list-option";
import { AutocompleteListSection } from "./autocomplete-list-section";
import { setRefs } from "@/_src/shared/lib";

export type AutocompleteListProps<TItemData extends object> = {
	state: ListState<TItemData>;
	autoFocus?: boolean | FocusStrategy;
	shouldFocusWrap?: boolean;
	shouldSelectOnPressUp?: boolean;
	focusOnPointerEnter?: boolean;
	domProps?: HTMLAttributes<HTMLElement>;
	disallowEmptySelection?: boolean;
	shouldUseVirtualFocus?: boolean;
	isLoading?: boolean;
	showLoadingSpinner?: boolean;
	onLoadMore?: () => void;
	renderEmptyState?: () => ReactNode;
	onScroll?: () => void;
} & AriaListBoxOptions<TItemData> &
	DOMProps &
	AriaLabelingProps &
	StyleProps;

export const AutocompleteList = forwardRef(
	(props: AutocompleteListProps<any>, ref: ForwardedRef<HTMLDivElement>) => {
		const {
			state,
			renderEmptyState,
			shouldFocusOnHover = false,
			shouldUseVirtualFocus = false,
		} = props;

		const listRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
		const { listBoxProps } = useListBox({ ...props }, state, listRef);

		const renderedItems = useMemo(
			() => [...state.collection],
			[state.collection],
		);

		return (
			<AutocompleteListContext.Provider
				value={{
					state,
					shouldFocusOnHover,
					shouldUseVirtualFocus,
				}}
			>
				<div
					{...listBoxProps}
					ref={setRefs(listRef, ref)}
					className="max-h-[inherit] overflow-auto outline-none flex flex-col gap-2"
				>
					{renderedItems.length === 0 && renderEmptyState
						? renderEmptyState()
						: null}
					{renderedItems.map((item) => {
						if (item.type === "section") {
							return (
								<AutocompleteListSection
									item={item}
									key={item.key}
								/>
							);
						}
						if (item.type === "item") {
							return (
								<AutocompleteListOption
									item={item}
									key={item.key}
								/>
							);
						}
						if (item.type === "separator") {
							return <div key={item.key} />;
						}
						return null;
					})}
				</div>
			</AutocompleteListContext.Provider>
		);
	},
);
