import { Controller, useFormContext } from "react-hook-form";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useEffect, MutableRefObject } from "react";
import { CreateGameFormFormState } from "../../../../model";
import { TextInput } from "./text-input/text-input";
import { StepProps } from "./types";

gsap.registerPlugin(useGSAP);

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
	useGSAP(
		() => {
			gsap.from(".field", { opacity: 0, y: 10, duration: 0.3 });
		},
		{ scope: container },
	);

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
						<TextInput
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
