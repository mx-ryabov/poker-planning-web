import { Controller, useFormContext } from "react-hook-form";
import { useRef, useEffect, MutableRefObject } from "react";
import { CreateGameFormFormState } from "../../../../model";
import { StepProps } from "./types";
import { FullSizeFormTextInput } from "@/_src/shared/ui/components/full-size-form-text-field";

export const NameStep = ({ isActive, onValidate, onNextStep }: StepProps) => {
	const inputRef: MutableRefObject<HTMLInputElement | null> =
		useRef<HTMLInputElement>(null);
	const { formState, control } = useFormContext<CreateGameFormFormState>();

	useEffect(() => {
		const inputEl = inputRef.current;
		if (isActive && inputEl) {
			inputEl.focus();
		}
	}, [isActive, inputRef]);

	useEffect(() => {
		const areFieldsValid =
			!!formState.dirtyFields.name && !formState.errors.name;

		onValidate(areFieldsValid);
	}, [formState.dirtyFields.name, formState.errors.name, onValidate]);

	const container = useRef(null);

	return (
		<div
			ref={container}
			className="w-full h-full flex flex-col shrink-0 basis-full justify-center px-10"
		>
			<div className="field">
				<Controller
					control={control}
					name="name"
					render={({ field, fieldState }) => (
						<FullSizeFormTextInput
							label="Hey!👋 What is the name of your game?"
							placeholder="Team Planning"
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
		</div>
	);
};
