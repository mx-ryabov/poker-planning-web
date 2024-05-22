import { Popover } from "../../popover";
import { List } from "../../list";
import { SelectTrigger } from "./select-trigger";
import { RenderFnType, useControlledState } from "@/_src/shared/lib";
import { useCallback } from "react";
import { SelectItemProps } from "./select-item";
import { useSelect } from "../hooks/use-select";

type Props<TItem> = {
	children:
		| React.ReactElement<SelectItemProps>[]
		| RenderFnType<TItem, SelectItemProps>;
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
};

/**
 * TODO:
 * 1. Add tags(chips) functionality to the trigger +
 * 2. Make the list the same width as the trigger +
 * 3. Refactor all TODOs +
 * 4. Animate check icons
 * 5. Disabled state +
 * 6. Error state +
 * 7. Controllable from outside +
 * 8. "Unselect all" button in the trigger +
 * 9. List should has a max height and be scrollable +
 */

export default function SelectWrapper<TItem>(props: Props<TItem>) {
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
	} = useSelect(props);

	return (
		<div className="w-full">
			<Popover
				contentWidth="equal-to-trigger"
				hideContentOnTriggerClick={false}
			>
				<Popover.Trigger>
					<SelectTrigger
						placeholder={placeholder}
						selectionMode={selectionMode}
						label={label}
						errorMessage={errorMessage}
						disabled={disabled}
						isInvalid={isInvalid}
						value={itemsWithText}
						onUnselect={(id) =>
							onControlledSelectionChange((prev) =>
								prev.filter((item) => item !== id),
							)
						}
						onClearSelection={() => onControlledSelectionChange([])}
					/>
				</Popover.Trigger>
				<Popover.Content>
					<List
						items={items}
						selectedItems={controlledSelectedIds}
						onSelectionChange={onControlledSelectionChange}
						selectionMode={selectionMode}
						className={`py-2 w-full bg-white rounded-lg border border-neutral-100 drop-shadow`}
					>
						{children}
					</List>
				</Popover.Content>
			</Popover>
		</div>
	);
}
