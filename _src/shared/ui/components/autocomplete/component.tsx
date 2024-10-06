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
	FieldErrorContext,
	ValidationResult,
	Separator,
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
import { useMemo } from "react";
import { VALID_VALIDITY_STATE } from "@/_src/shared/lib/utils/validation";

/**
 * TODO: consider implementing a facade for single and multiple selection autocompletes
 * TItemData extends { id: string } - the simplest solution (hack) to avoid the react-stately lib bug https://github.com/adobe/react-spectrum/issues/6103
 */
export type AutocompleteProps<TItemData extends { id: string }> = {
	label: string;
	placeholder?: string;
	description?: string;
	isDisabled?: boolean;
	errorMessages?: string[];
} & UseAutocompleteProps<TItemData> &
	UseAutocompleteStateProps<TItemData>;

function Autocomplete<TItemData extends { id: string }>(
	props: AutocompleteProps<TItemData>,
): React.ReactNode {
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
		selectedNodes,
		setSearchValue,
		onSearchValueChange,
	} = useAutocompleteState<TItemData>({
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

	const autocompleteValueProps: AutocompleteValueContextProps<TItemData> = {
		listState,
		label,
		errorMessages,
		placeholder,
		isDisabled,
		isInvalid: !!errorMessages?.length,
		selectionMode,
		listRef,
		searchValue,
		selectedNodes,
		setSearchValue,
		onSearchValueChange,
		...overlayTriggerFunctions,
	};

	// TODO: re-implement with ValidationResult type because it works in a more native way
	const validationProps: ValidationResult = useMemo(
		() => ({
			isInvalid: !!errorMessages,
			validationErrors: errorMessages || [],
			validationDetails: VALID_VALIDITY_STATE,
		}),
		[errorMessages],
	);

	return (
		<Provider
			values={[
				[OverlayTriggerStateContext, overlayTriggerState],
				[AutocompleteValueContext, autocompleteValueProps],
				[FieldErrorContext, validationProps],
			]}
		>
			<div ref={triggerRef}>
				<AutocompleteValue selectionMode={selectionMode} />
			</div>
			<Popover
				{...popoverProps}
				aria-label="Select Items"
				data-testid="popover"
			>
				{/* I itentipnally don't provide ListStateContext to the AutocompleteValue->useAutocompleteValue 
					because AutocompleteMultipleValue has ChipGroup->TagGroup that uses this context and crashes the component...
					More info: https://github.com/adobe/react-spectrum/issues/6814 */}
				<Provider values={[[ListStateContext, listState]]}>
					<AutocompleteList {...listProps} />
				</Provider>
			</Popover>
		</Provider>
	);
}

const _Autocomplete = Object.assign(Autocomplete, {
	Item: Item,
	/**
	 * Usage:
	 *  - Do NOT use an entity id as the key for Section because if ids of Sections and Items match then the dropdown list renders incorectly due to several items in the collection with the same key
	 */
	Section: Section,
	Separator,
});

export { _Autocomplete as Autocomplete };
