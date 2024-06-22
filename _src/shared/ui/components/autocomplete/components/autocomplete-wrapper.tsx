import { RenderFnType } from "@/_src/shared/lib";
import { AutocompleteItemProps } from "./autocomplete-item";
import { useAutocomplete } from "../hooks/use-autocomplete";
import { Popover } from "../../popover";
import { List } from "../../list";
import { AutocompleteTrigger } from "./autocomplete-trigger";
import { useState } from "react";

type Props<TItem> = {
	children:
		| React.ReactElement<AutocompleteItemProps>[]
		| RenderFnType<TItem, AutocompleteItemProps>;
	items?: TItem[];
	selectionMode?: "single" | "multiple";
	placeholder?: string;
	label?: string;
	errorMessage?: string;
	disabled?: boolean;
	isInvalid?: boolean;
	selectedItems?: React.Key[];
	defaultSelectedItems?: React.Key[];
	onSelectionChange?: (ids: React.Key[]) => void;
	onInputChange?: (inputValue: string) => void;
};

/**
 * TODO:
 *
 */

export function AutocompleteWrapper<TItem>(props: Props<TItem>) {
	const {
		children,
		items,
		placeholder,
		selectionMode = "single",
		label,
		errorMessage,
		disabled,
		isInvalid,
	} = props;

	const {
		itemsWithText,
		controlledSelectedIds,
		onControlledSelectionChange,
	} = useAutocomplete(props);

	const [filterText, setFilterText] = useState<string>("");

	return (
		<Popover
			contentWidth="equal-to-trigger"
			hideContentOnTriggerClick={false}
		>
			<Popover.Trigger>
				<AutocompleteTrigger
					label={label}
					selectionMode={selectionMode}
					itemsWithText={itemsWithText}
					placeholder={placeholder}
					onChange={setFilterText}
				/>
			</Popover.Trigger>
			<Popover.Content>
				<List
					items={items}
					selectedItems={controlledSelectedIds}
					onSelectionChange={onControlledSelectionChange}
					selectionMode={selectionMode}
					filterText={filterText}
					className={`py-2 w-full bg-white rounded-lg border border-neutral-100 drop-shadow`}
				>
					{children}
				</List>
			</Popover.Content>
		</Popover>
	);
}
