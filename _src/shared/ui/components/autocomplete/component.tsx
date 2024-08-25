import { AriaFieldProps } from "react-aria";
import {
	useAutocomplete,
	UseAutocompleteProps,
} from "./hooks/use-autocomplete";
import { Item, Section } from "react-stately";
import { List } from "../list";
import { useClickOutside } from "@/_src/shared/lib";
import {
	OverlayTriggerStateContext,
	Provider,
	Popover,
	ListStateContext,
	ListBoxContext,
} from "react-aria-components";
import {
	AutocompleteValueContext,
	AutocompleteValueContextProps,
} from "./contexts/autocomplete-value-context";
import {
	useAutocompleteState,
	UseAutocompleteStateProps,
} from "./hooks/use-autocomplete-state";
import { AutocompleteValue } from "./components/autocomplete-value";
import { AutocompleteList } from "./components/autocomplete-list";

/**
 * TItemData extends { id: string } - the simplest solution (hack) to avoid the react-stately lib bug https://github.com/adobe/react-spectrum/issues/6103
 */
type AutocompleteProps<TItemData extends { id: string }> = {
	label: string;
	placeholder?: string;
	description?: string;
	isDisabled?: boolean;
	errorMessages?: string[];
} & UseAutocompleteProps<TItemData> &
	UseAutocompleteStateProps<TItemData>;

function Autocomplete<TItemData extends { id: string }>(
	props: AutocompleteProps<TItemData>,
) {
	const {
		label,
		description,
		errorMessages,
		placeholder = "Select something",
		selectionMode = "single",
		isDisabled,
		children,
		items,
		...restProps
	} = props;

	const {
		listState,
		overlayTriggerState,
		overlayTriggerFunctions,
		searchValue,
		setSearchValue,
	} = useAutocompleteState({
		...props,
		selectionMode,
	});

	const { listProps, triggerRef, listRef, popoverProps, popoverRef } =
		useAutocomplete(
			{
				selectionMode,
				children,
				items,
				...restProps,
			},
			listState,
		);

	useClickOutside([triggerRef, popoverRef], overlayTriggerState.close);

	const autocompleteValueProps: AutocompleteValueContextProps = {
		label,
		errorMessages,
		placeholder,
		isDisabled,
		isInvalid: !!errorMessages?.length,
		selectionMode,
		listRef,
		searchValue,
		setSearchValue,
		...overlayTriggerFunctions,
	};

	return (
		<Provider
			values={[
				[OverlayTriggerStateContext, overlayTriggerState],
				[AutocompleteValueContext, autocompleteValueProps],
				[ListBoxContext, listProps],
				[ListStateContext, listState],
			]}
		>
			<div ref={triggerRef}>
				<AutocompleteValue />
			</div>
			<Popover {...popoverProps} aria-label="Select Items">
				<AutocompleteList {...listProps} />
			</Popover>
		</Provider>
	);
}

/**
 * TODO:
 * 7. Refactoring. Render optimization +-
 * 8. Multiselection
 * 10. Tests :)
 */

const _Autocomplete = Object.assign(Autocomplete, {
	Item: Item,
	Section: Section,
	Separator: List.Separator,
});

export { _Autocomplete as Autocomplete };
