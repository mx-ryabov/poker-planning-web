import { MutableRefObject, useEffect, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
	useCreateGameFormNavigationDispatch as useFormNavDispatch,
	CreateGameFormActions as Actions,
	useCreateGameFormNavigation as useFormNavState,
	CreateGameFormSteps,
} from "../../model/create-game-form-navigation";
import { TextInput } from "./text-input";
import { CreateGameFormFormState } from "./form";

export default function CreatorNameStep() {
	const inputRef: MutableRefObject<HTMLInputElement | null> =
		useRef<HTMLInputElement>(null);
	const { control, formState } = useFormContext<CreateGameFormFormState>();

	const formNavigation = useFormNavState();
	const formDispatch = useFormNavDispatch();

	useEffect(() => {
		const inputEl = inputRef.current;
		if (
			formNavigation.step !== CreateGameFormSteps.CreatorName ||
			!inputEl
		) {
			return;
		}
		inputEl.focus();
	}, [formNavigation.step, inputRef]);

	useEffect(() => {
		formDispatch({
			type: Actions.Type.MakeNextStepEnabled,
			payload:
				!!formState.dirtyFields.creatorName &&
				!formState.errors.creatorName,
		});
	}, [
		formState.dirtyFields.creatorName,
		formState.errors.creatorName,
		formDispatch,
	]);

	const startGame = () => {};

	return (
		<div className="w-full h-full flex flex-col shrink-0 basis-full justify-center px-[60px]">
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
					<TextInput
						label="Let's get acquainted👇"
						placeholder="Type your name"
						lengthState={
							field.value.length > 0
								? {
										current: field.value.length,
										total: 50,
									}
								: undefined
						}
						error={fieldState.error?.message}
						onEnter={startGame}
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
