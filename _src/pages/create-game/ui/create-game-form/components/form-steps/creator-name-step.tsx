import { useEffect, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CreateGameFormFormState } from "../../../../model";
import { StepProps } from "./types";
import { FullSizeFormTextInput } from "@/_src/shared/ui/components/full-size-form-text-field";

export function CreatorNameStep({
	isActive,
	onValidate,
	onNextStep,
}: StepProps) {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const { control, formState } = useFormContext<CreateGameFormFormState>();

	useEffect(() => {
		const inputEl = inputRef.current;
		if (isActive && inputEl) {
			inputEl.focus();
		}
	}, [isActive, inputRef]);

	useEffect(() => {
		const isStepValid =
			!!formState.dirtyFields.creatorName &&
			!formState.errors.creatorName;
		onValidate(isStepValid);
	}, [
		formState.dirtyFields.creatorName,
		formState.errors.creatorName,
		onValidate,
	]);

	return (
		<div className="w-full h-full flex flex-col shrink-0 basis-full justify-center px-10">
			<Controller
				control={control}
				name="creatorName"
				rules={{
					required: "Don't be shy!",
					maxLength: {
						value: 50,
						message: "Maybe you have a short name?",
					},
				}}
				render={({ field, fieldState }) => (
					<FullSizeFormTextInput
						label="Let's get acquainted👇"
						placeholder="Type your name"
						maxLength={50}
						error={fieldState.error?.message}
						onEnter={onNextStep}
						{...field}
						ref={(el) => {
							field.ref(el);
							inputRef.current = el;
						}}
					/>
				)}
			/>
		</div>
	);
}
