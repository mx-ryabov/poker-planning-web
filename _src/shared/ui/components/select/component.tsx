import {
	DialogContext,
	OverlayTriggerStateContext,
	Provider,
} from "react-aria-components";
import { List } from "../list";
import { Popover } from "../popover";
import { Item, Section, useListState } from "react-stately";
import { AriaFieldProps, FocusScope } from "react-aria";
import { SelectValue } from "./components/select-value";
import { UseSelectProps, useSelect } from "./hooks/use-select";
import { WarningIcon } from "../icon";
import { useMemo, useRef } from "react";
import { useClickOutside } from "@/_src/shared/lib";
import { SelectValueContext, SelectValueContextProps } from "./utils/contexts";
import { Separator } from "../separator";

type SelectProps<TItemData extends object> = {
	label?: string;
	placeholder?: string;
	description?: string;
	isDisabled?: boolean;
	errorMessages?: string[];
} & UseSelectProps<TItemData> &
	AriaFieldProps;

function Select<TItemData extends object>(props: SelectProps<TItemData>) {
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
	const popoverRef = useRef(null);

	const listState = useListState({ ...props, selectionMode });

	const {
		listProps,
		childRenderer,
		labelProps,
		errorMessageProps,
		overlayProps,
		triggerRef,
		overlayTriggerState,
	} = useSelect(
		{
			selectionMode,
			children,
			items,
			...restProps,
		},
		listState,
	);

	useClickOutside([triggerRef, popoverRef], overlayTriggerState.close);

	const selectValueProps: SelectValueContextProps = useMemo(
		() => ({
			label,
			labelProps,
			overlayTriggerState,
			triggerRef,
			placeholder,
			isDisabled,
			isInvalid: !!errorMessages?.length,
			selectionMode,
			selectedItems: Array.from(
				listState.selectionManager.selectedKeys,
			).map((key) => {
				const item = listState.collection.getItem(key);
				return {
					key,
					textValue: item?.textValue || key.toString(),
				};
			}),
			onSelectionRemove: (keys) => {
				keys.forEach((key) => {
					listState.selectionManager.toggleSelection(key);
				});
			},
		}),
		[
			overlayTriggerState,
			placeholder,
			isDisabled,
			errorMessages,
			listState,
			triggerRef,
			selectionMode,
		],
	);

	return (
		<Provider
			values={[
				[OverlayTriggerStateContext, overlayTriggerState],
				[DialogContext, overlayProps],
				[SelectValueContext, selectValueProps],
			]}
		>
			<SelectValue />
			{errorMessages?.length && (
				<span
					{...errorMessageProps}
					role="alert"
					className="w-full text-xs font-medium p-1 text-error-600 flex flex-row items-center gap-1"
				>
					<WarningIcon size={12} thikness="bold" />
					{errorMessages[0]}
				</span>
			)}
			<Popover.Content
				className="p-1"
				triggerRef={triggerRef}
				ref={popoverRef}
				widthType="equalToTrigger"
				placement="bottom left"
				aria-label="Select Items"
				maxHeight={300}
				shouldCloseOnInteractOutside={() => false}
				isNonModal
			>
				<FocusScope contain restoreFocus autoFocus>
					<List
						{...listProps}
						className="max-h-[inherit] overflow-auto outline-hidden"
					>
						{childRenderer}
					</List>
				</FocusScope>
			</Popover.Content>
		</Provider>
	);
}

const _Select = Object.assign(Select, {
	Item: Item as typeof List.Item,
	Section: Section as typeof List.Section,
	Separator: Separator,
});

export { _Select as Select };
