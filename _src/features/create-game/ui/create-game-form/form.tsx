"use client";
import { FormProvider } from "react-hook-form";
import { CreateGameFooter as Footer } from "./components/footer/footer";
import { CreateGameHeader as Header } from "./components/header";
import { useCallback, useEffect } from "react";
import { CreateGameRequest } from "@/_src/shared/api/game-api";
import {
	useCreateGameFormNavigationDispatch as useFormNavDispatch,
	useCreateGameFormNavigation as useFormNavState,
	CreateGameFormActions as Actions,
	CreateGameFormSteps,
	CreateGameFormProvider,
} from "../../model/create-game-form-navigation";
import { FormSteps } from "./components/form-steps";
import { useCreateGameFormState } from "../../model";

interface Props {
	createGameAsGuest: (_req: CreateGameRequest) => Promise<void>;
}

export const CreateGameForm = ({ createGameAsGuest }: Props) => {
	return (
		<CreateGameFormProvider>
			<CreateGameFormBase createGameAsGuest={createGameAsGuest} />
		</CreateGameFormProvider>
	);
};

function CreateGameFormBase({ createGameAsGuest }: Props) {
	const { onSubmit, methods } = useCreateGameFormState({
		onSubmitAction: createGameAsGuest,
	});

	const formDispatch = useFormNavDispatch();
	const { step } = useFormNavState();

	useEffect(() => {
		formDispatch({
			type: Actions.Type.MakeStartGameEnabled,
			payload: methods.formState.isValid,
		});
	}, [methods.formState.isValid, formDispatch]);

	const onNextStep = useCallback(
		(currentStep: CreateGameFormSteps) => {
			if (currentStep === CreateGameFormSteps.CreatorName) {
				if (methods.formState.isValid) {
					onSubmit(methods.getValues());
				}
				return;
			}
			formDispatch({ type: Actions.Type.NextStep });
		},
		[formDispatch, onSubmit, methods.getValues, methods.formState.isValid],
	);

	const onStepValidate = useCallback(
		(isValid: boolean) => {
			formDispatch({
				type: Actions.Type.MakeNextStepEnabled,
				payload: isValid,
			});
		},
		[formDispatch],
	);

	return (
		<FormProvider {...methods}>
			<form
				className="w-full h-full flex"
				onSubmit={methods.handleSubmit(onSubmit)}
			>
				<Header className="fixed top-0" />
				<FormSteps
					currentStep={step}
					onNextStep={onNextStep}
					onStepValidate={onStepValidate}
				/>
				<Footer className="fixed bottom-0" />
			</form>
		</FormProvider>
	);
}
