"use client";
import NameStep from "./name-step";
import VotingSystemStep from "./voting-system-step";
import AdvancedSettingsStep from "./advanced-settings-step";
import { FormProvider, useForm } from "react-hook-form";
import CreateGameFooter from "./footer";
import CreatorNameStep from "./creator-name-step";
import CreateGameHeader from "./header";
import { useCallback } from "react";
import { CreateGameRequest } from "@/_src/shared/api/game-api";
import {
	CreateGameFormSteps,
	useCreateGameFormNavigation,
} from "../../model/create-game-form-navigation";

export type CreateGameFormFormState = CreateGameRequest;

interface Props {
	createGameAsGuest: (_req: CreateGameRequest) => Promise<void>;
}

export function CreateGameForm({ createGameAsGuest }: Props) {
	const methods = useForm<CreateGameFormFormState>();
	const formNavigation = useCreateGameFormNavigation();

	const onSubmit = useCallback(
		async (formState: CreateGameFormFormState) => {
			console.log(formState);

			await createGameAsGuest(formState);
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
					{STEPS[formNavigation.step]()}
				</div>
				<CreateGameFooter className="fixed bottom-0" />
			</form>
		</FormProvider>
	);
}

const STEPS = {
	[CreateGameFormSteps.Name]: () => <NameStep />,
	[CreateGameFormSteps.VotingSystem]: () => <VotingSystemStep />,
	[CreateGameFormSteps.CreatorName]: () => <CreatorNameStep />,
	[CreateGameFormSteps.AdvancedSettings]: () => <AdvancedSettingsStep />,
};
