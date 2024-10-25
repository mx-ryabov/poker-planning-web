import { Controller, useFormContext } from "react-hook-form";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useCallback, useEffect, MutableRefObject } from "react";
import {
	useCreateGameFormNavigation as useFormNavState,
	useCreateGameFormNavigationDispatch as useFormNavDispatch,
	CreateGameFormActions as Actions,
	CreateGameFormSteps,
} from "../../model";
import { CreateGameFormFormState } from "./form";
import { TextInput } from "./text-input";

gsap.registerPlugin(useGSAP);

export default function NameStep() {
	const inputRef: MutableRefObject<HTMLInputElement | null> =
		useRef<HTMLInputElement>(null);
	const { formState, control } = useFormContext<CreateGameFormFormState>();

	const formNavigation = useFormNavState();
	const formDispatch = useFormNavDispatch();

	useEffect(() => {
		const inputEl = inputRef.current;
		if (formNavigation.step !== CreateGameFormSteps.Name || !inputEl) {
			return;
		}
		inputEl.focus();
	}, [formNavigation.step, inputRef]);

	const nextStep = useCallback(() => {
		const nextStep = formNavigation.stepData.nextStep;
		if (nextStep) {
			formDispatch({ type: Actions.Type.NextStep });
		}
	}, [formDispatch, formNavigation]);

	useEffect(() => {
		const areFieldsValid =
			!!formState.dirtyFields.name && !formState.errors.name;

		formDispatch({
			type: Actions.Type.MakeNextStepEnabled,
			payload: areFieldsValid,
		});
	}, [formState.dirtyFields.name, formState.errors.name, formDispatch]);

	const container = useRef(null);
	useGSAP(
		() => {
			gsap.from(".label", { opacity: 0, y: 10, duration: 0.3 });
		},
		{ scope: container },
	);

	return (
		<div
			ref={container}
			className="w-full h-full flex flex-col shrink-0 basis-full justify-center px-[60px]"
		>
			<Controller
				control={control}
				name="name"
				rules={{
					required:
						"You have to come up with something. The name can't be empty",
					maxLength: {
						value: 50,
						message:
							"Statistically, 50 can be painful. For your brain, to perceive the information.",
					},
				}}
				render={({ field, fieldState }) => (
					<TextInput
						label="Hey!👋 What is the name of your game?"
						placeholder="Team Planning"
						lengthState={
							field.value.length > 0
								? {
										current: field.value.length,
										total: 50,
									}
								: undefined
						}
						error={fieldState.error?.message}
						onEnter={nextStep}
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
