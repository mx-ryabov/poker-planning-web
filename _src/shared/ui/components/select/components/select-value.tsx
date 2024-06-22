import { useContext, useMemo } from "react";
import { Chip, ChipGroup } from "../../chip";
import { Button as AriaButton } from "react-aria-components";
import { ArrowDownIcon, PlusIcon } from "../../icon";
import { cva } from "class-variance-authority";
import { SelectValueContext } from "../utils/contexts";

const selectContainerStyles = cva(
	[
		"flex items-center relative overflow-hidden transition-all",
		"min-h-10 w-full py-2",
		"border-2 rounded-lg box-border",
	],
	{
		variants: {
			isInvalid: {
				true: ["border-error-500"],
				false: [
					"border-neutral-100",
					"hover:border-primary-400",
					"focus:border-2 focus:border-primary-400",
					"focus-visible:border-primary-400 focus-visible:border-2",
				],
			},
			isPressed: {
				true: ["border-primary-500"],
			},
		},
	},
);

export const SelectValue = () => {
	const { selectionMode, isInvalid, overlayTriggerState, triggerRef } =
		useContext(SelectValueContext);

	const renderedContent = useMemo(() => {
		if (selectionMode === "single") {
			return <SingleSelectionValue />;
		} else if (selectionMode === "multiple") {
			return <MultipleSelectionValue />;
		}
	}, [selectionMode]);

	return (
		<div
			className={selectContainerStyles({
				isInvalid: isInvalid,
				isPressed: overlayTriggerState.isOpen,
			})}
			ref={triggerRef}
		>
			{renderedContent}
		</div>
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
				"flex flex-row w-full h-full px-3 items-center justify-between group outline-none text-sm text-neutral-500"
			}
			onPress={ctx.overlayTriggerState.open}
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
			<ChipGroup
				items={ctx.selectedItems}
				disabledKeys={ctx.isDisabled ? "all" : []}
				aria-label="Selected Items"
				onRemove={ctx.onSelectionRemove}
			>
				{(item) => <Chip key={item.key} textValue={item.textValue} />}
			</ChipGroup>
			<AriaButton
				isDisabled={ctx.isDisabled}
				onPress={ctx.overlayTriggerState.toggle}
				aria-label="Add Items"
				className="flex flex-row items-center gap-2 text-xs text-neutral-200 bg-neutral-100 py-1 px-2 max-h-[21px] rounded"
			>
				<PlusIcon size={16} />
				{ctx.placeholder}
			</AriaButton>
		</div>
	);
};
