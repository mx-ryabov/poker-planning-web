import { useContext, useMemo } from "react";
import { Chip, ChipGroup } from "../../chip";
import {
	Button as AriaButton,
	Group,
	Label as AriaLabel,
} from "react-aria-components";
import { ArrowDownIcon, PlusIcon } from "../../icon";
import { cva } from "class-variance-authority";
import { SelectValueContext } from "../utils/contexts";

const selectContainerStyles = cva(
	[
		"flex items-center relative overflow-hidden transition-all",
		"min-h-10 w-full py-2",
		"border-2 border-neutral-100 rounded-lg box-border",
	],
	{
		variants: {
			isHovered: {
				true: ["border-primary-500"],
			},
			isInvalid: {
				true: ["!border-error-500"],
			},
			isPressed: {
				true: ["border-primary-500"],
			},
			isFocused: {
				true: ["border-primary-500"],
			},
			isDisabled: {
				true: ["!border-neutral-100 bg-neutral-100"],
			},
		},
	},
);

const labelStyles = cva(["block text-neutral-500 text-xs font-medium p-1"], {
	variants: {
		isDisabled: {
			true: ["!text-neutral-400"],
		},
	},
});

// TODO: Change border color on focus
export const SelectValue = () => {
	const {
		selectionMode,
		isInvalid,
		isDisabled,
		overlayTriggerState,
		triggerRef,
		label,
		labelProps,
	} = useContext(SelectValueContext);

	const labelComponent = useMemo(
		() =>
			label && (
				<AriaLabel
					{...labelProps}
					className={labelStyles({ isDisabled })}
				>
					{label}
				</AriaLabel>
			),
		[label, labelProps, isDisabled],
	);

	const renderedContent = useMemo(() => {
		if (selectionMode === "single") {
			return <SingleSelectionValue />;
		} else if (selectionMode === "multiple") {
			return <MultipleSelectionValue />;
		}
	}, [selectionMode]);

	return (
		<Group>
			{({ isFocusWithin, isHovered }) => (
				<>
					{labelComponent}
					<div
						className={selectContainerStyles({
							isInvalid: isInvalid,
							isPressed: overlayTriggerState.isOpen,
							isHovered: isHovered,
							isFocused: isFocusWithin,
							isDisabled,
						})}
						data-testid="select-value-container"
						data-focused={isFocusWithin}
						ref={triggerRef}
					>
						{renderedContent}
					</div>
				</>
			)}
		</Group>
	);
};

const SingleSelectionValue = () => {
	const ctx = useContext(SelectValueContext);

	return (
		<AriaButton
			isDisabled={ctx.isDisabled}
			data-trigger="toggle-button"
			aria-pressed={ctx.overlayTriggerState.isOpen ? "true" : "false"}
			className={
				"flex flex-row w-full h-full px-3 items-center justify-between group outline-none text-sm text-neutral-500 disabled:text-neutral-200"
			}
			onPress={ctx.overlayTriggerState.toggle}
		>
			{ctx.selectedItems[0]?.textValue || ctx.placeholder}
			<ArrowDownIcon
				size={16}
				className="transition-transform group-aria-[pressed=true]:rotate-180"
			/>
		</AriaButton>
	);
};

const MultipleSelectionValue = () => {
	const ctx = useContext(SelectValueContext);

	return (
		<div className="flex flex-row flex-wrap gap-2 px-2">
			{ctx.selectedItems.length > 0 && (
				<ChipGroup
					items={ctx.selectedItems}
					outlined={ctx.isDisabled}
					disabledKeys={ctx.isDisabled ? "all" : ctx.disabledKeys}
					aria-label="Selected Items"
					onRemove={ctx.onSelectionRemove}
				>
					{(item) => (
						<Chip
							key={item.key}
							isDisabled={ctx.isDisabled}
							textValue={item.textValue}
						/>
					)}
				</ChipGroup>
			)}
			<AriaButton
				isDisabled={ctx.isDisabled}
				onPress={ctx.overlayTriggerState.toggle}
				aria-label="Add Items"
				className="flex flex-row items-center gap-2 text-xs text-neutral-500 bg-neutral-100 py-1 px-2 max-h-[21px] rounded"
			>
				<PlusIcon size={16} />
				{ctx.placeholder}
			</AriaButton>
		</div>
	);
};
