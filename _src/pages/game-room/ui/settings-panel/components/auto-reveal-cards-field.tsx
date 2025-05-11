import { Switch } from "@/_src/shared/ui/components/switch";
import { InlineEditableTextField } from "@/_src/shared/ui/components/inline-editable-fields";
import { QuestionIcon } from "@/_src/shared/ui/components/icon/svg/question.icon";
import { useCallback } from "react";

type AutoRevealCardsFieldValue = {
	autoRevealPeriod: number;
	isAutoRevealCards: boolean;
};

type Props = {
	isReadonly: boolean;
	value: AutoRevealCardsFieldValue;
	onChange: (value: AutoRevealCardsFieldValue) => void;
	autoRevealPeriodValidate: (v: number) => string | null;
};

export function AutoRevealCardsField({
	value,
	isReadonly,
	onChange,
	autoRevealPeriodValidate,
}: Props) {
	const onIsAutoRevealChange = useCallback(
		(isSelected: boolean) => {
			onChange({
				...value,
				isAutoRevealCards: isSelected,
			});
		},
		[value, onChange],
	);

	const onAutoRevealPeriodConfirm = useCallback(
		(period: string) => {
			onChange({
				...value,
				autoRevealPeriod: Number(period),
			});
		},
		[value, onChange],
	);

	const autoRevealPeriodValidateInner = useCallback(
		(v: string) => {
			if (!autoRevealPeriodValidate) return;
			return autoRevealPeriodValidate(Number(v));
		},
		[autoRevealPeriodValidate],
	);

	return (
		<div className="flex flex-col gap-2 px-1">
			<span className="text-sm text-neutral-500">Auto-reveal cards</span>
			<div className="flex flex-row gap-2">
				<Switch
					isSelected={value.isAutoRevealCards}
					isDisabled={isReadonly}
					onChange={onIsAutoRevealChange}
				/>
				<div className="flex flex-row items-center gap-2">
					<InlineEditableTextField
						styles={{
							readView: {
								variant: "bordered",
								textSize: "medium",
								size: "medium",
								width: "content",
							},
							editorView: {
								textSize: "medium",
							},
						}}
						type="number"
						validate={autoRevealPeriodValidateInner}
						isDisabled={isReadonly || !value.isAutoRevealCards}
						value={String(value.autoRevealPeriod)}
						onConfirm={onAutoRevealPeriodConfirm}
					/>
					<span className="text-xs text-neutral-300">seconds</span>
				</div>
			</div>

			<div className="flex flex-row items-center gap-2 text-xs text-neutral-300">
				<QuestionIcon thikness="light" />
				<span>
					Let the system automatically reveal the cards after everyone
					has voted.
				</span>
			</div>
		</div>
	);
}
