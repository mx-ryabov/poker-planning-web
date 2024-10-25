"use client";
import NameStep from "./name-step";
import VotingSystemStep from "./voting-system-step";
import AdvancedSettingsStep from "./advanced-settings-step";
import { FormProvider, useForm } from "react-hook-form";
import CreateGameFooter from "./footer";
import CreatorNameStep from "./creator-name-step";
import CreateGameHeader from "./header";
import { useCallback, useEffect } from "react";
import { CreateGameRequest } from "@/_src/shared/api/game-api";
import {
	CreateGameFormSteps,
	useCreateGameFormNavigation,
	useCreateGameFormNavigationDispatch,
	CreateGameFormActions as Actions,
} from "../../model/create-game-form-navigation";

export type CreateGameFormFormState = CreateGameRequest;

interface Props {
	createGameAsGuest: (_req: CreateGameRequest) => Promise<void>;
}

export function CreateGameForm({ createGameAsGuest }: Props) {
	const methods = useForm<CreateGameFormFormState>({
		mode: "onChange",
		defaultValues: {
			name: "",
			votingSystemId: "",
			creatorName: "",
			isAutoRevealCards: false,
		},
	});

	const formNavigation = useCreateGameFormNavigation();
	const formDispatch = useCreateGameFormNavigationDispatch();

	useEffect(() => {
		formDispatch({
			type: Actions.Type.MakeStartGameEnabled,
			payload: methods.formState.isValid,
		});
	}, [methods.formState.isValid, formDispatch]);

	const onSubmit = useCallback(
		async (formState: CreateGameFormFormState) => {
			console.log("Submitted form state: ", formState);

			if (formState.name === "abra cadabra") {
				await createGameAsGuest(formState);
			}
		},
		[createGameAsGuest],
	);

	return (
		<FormProvider {...methods}>
			<form
				className="w-full h-full flex"
				onSubmit={methods.handleSubmit(onSubmit)}
			>
				<CreateGameHeader className="fixed top-0" />
				<div className="w-full h-full flex flex-row">
					<div
						style={{
							display:
								formNavigation.step === CreateGameFormSteps.Name
									? "block"
									: "none",
						}}
					>
						<NameStep />
					</div>
					<div
						style={{
							display:
								formNavigation.step ===
								CreateGameFormSteps.VotingSystem
									? "block"
									: "none",
						}}
					>
						<VotingSystemStep />
					</div>
					<div
						style={{
							display:
								formNavigation.step ===
								CreateGameFormSteps.CreatorName
									? "block"
									: "none",
						}}
					>
						<CreatorNameStep />
					</div>
					<div
						style={{
							display:
								formNavigation.step ===
								CreateGameFormSteps.AdvancedSettings
									? "block"
									: "none",
						}}
					>
						<AdvancedSettingsStep />
					</div>
				</div>
				<CreateGameFooter className="fixed bottom-0" />
			</form>
		</FormProvider>
	);
}
