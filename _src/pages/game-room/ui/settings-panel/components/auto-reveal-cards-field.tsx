import { Switch } from "@/_src/shared/ui/components/switch";
import { InlineEditableTextField } from "@/_src/shared/ui/components/inline-editable-fields";
import { QuestionIcon } from "@/_src/shared/ui/components/icon/svg/question.icon";
import { useCallback } from "react";
import {
	selectIfVotingStatusIsInProgress,
	selectVotingProcess,
	useGameState,
} from "../../../model";

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
	const isVotingStatusInProgress = useGameState(
		selectIfVotingStatusIsInProgress,
	);

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
			<span className="text-sm text-neutral-900">Auto-reveal cards</span>
			<div
				className="flex flex-row gap-2"
				data-testid="auto-reveal-cards-field"
			>
				<Switch
					isSelected={value.isAutoRevealCards}
					isDisabled={isReadonly || isVotingStatusInProgress}
					data-testid="auto-reveal-cards-switch"
					aria-label="Auto-reveal cards"
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
						id="auto-reveal-period-input"
						type="number"
						validate={autoRevealPeriodValidateInner}
						isDisabled={
							isReadonly ||
							!value.isAutoRevealCards ||
							isVotingStatusInProgress
						}
						value={String(value.autoRevealPeriod)}
						onConfirm={onAutoRevealPeriodConfirm}
					/>
					<span className="text-xs text-neutral-700">seconds</span>
				</div>
			</div>

			<div className="flex flex-row items-center gap-2 text-xs text-neutral-700">
				<QuestionIcon thikness="light" />
				<span>
					{isVotingStatusInProgress &&
						"You can change the auto-revealing setting only when voting is not in progress."}
					{!isVotingStatusInProgress &&
						"Let the system automatically reveal the cards after everyone has voted."}
				</span>
			</div>
		</div>
	);
}
