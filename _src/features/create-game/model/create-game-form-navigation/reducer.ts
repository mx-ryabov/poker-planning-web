import { CreateGameFormActions as Actions } from "./actions";
import { CreateGameFormSteps } from "./types";

export type CreateGameFormState = {
	isClientInitialized: boolean;
	step: CreateGameFormSteps;
	stepData: StepOptions;
};

type StepOption = {
	number: number;
	nextStep: CreateGameFormSteps | null;
	prevStep: CreateGameFormSteps | null;
	isNextStepAvailable: boolean;
	showContinueBtn: boolean;
	showAdvancedSettingsBtn: boolean;
	showStartGameBtn: boolean;
};

type StepOptions = {
	[key in CreateGameFormSteps]: StepOption;
};

const DEFAULT_STEP_OPTIONS: StepOptions = {
	[CreateGameFormSteps.Name]: {
		number: 1,
		nextStep: CreateGameFormSteps.VotingSystem,
		prevStep: null,
		isNextStepAvailable: false,
		showContinueBtn: true,
		showStartGameBtn: false,
		showAdvancedSettingsBtn: false,
	},
	[CreateGameFormSteps.VotingSystem]: {
		number: 2,
		nextStep: CreateGameFormSteps.CreatorName,
		prevStep: CreateGameFormSteps.Name,
		isNextStepAvailable: false,
		showContinueBtn: true,
		showStartGameBtn: false,
		showAdvancedSettingsBtn: false,
	},
	[CreateGameFormSteps.CreatorName]: {
		number: 3,
		nextStep: CreateGameFormSteps.AdvancedSettings,
		prevStep: CreateGameFormSteps.VotingSystem,
		isNextStepAvailable: false,
		showContinueBtn: false,
		showStartGameBtn: true,
		showAdvancedSettingsBtn: true,
	},
	[CreateGameFormSteps.AdvancedSettings]: {
		number: 3,
		nextStep: null,
		prevStep: CreateGameFormSteps.CreatorName,
		isNextStepAvailable: false,
		showContinueBtn: false,
		showStartGameBtn: true,
		showAdvancedSettingsBtn: false,
	},
};

export const DefaultCreateGameState: CreateGameFormState = {
	isClientInitialized: false,
	stepData: DEFAULT_STEP_OPTIONS,
	step: CreateGameFormSteps.Name,
};

export function createGameFormReducer(
	formState: CreateGameFormState,
	action: Actions.Actions,
): CreateGameFormState {
	const currentStepData = formState.stepData[formState.step];
	switch (action.type) {
		case Actions.Type.NextStep:
			return {
				...formState,
				step:
					currentStepData.nextStep !== null
						? currentStepData.nextStep
						: formState.step,
			};

		case Actions.Type.PrevStep:
			return {
				...formState,
				step:
					currentStepData.prevStep !== null
						? currentStepData.prevStep
						: formState.step,
			};

		case Actions.Type.MakeNextStepAvailable:
			return {
				...formState,
				stepData: {
					...formState.stepData,
					[formState.step]: {
						...formState.stepData[formState.step],
						isNextStepAvailable: action.payload,
					},
				},
			};

		default:
			return formState;
	}
}
