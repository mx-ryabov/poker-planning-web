import { CreateGameFormActions as Actions } from "./actions";
import { CreateGameFormSteps } from "./types";

export type CreateGameFormState = {
	isClientInitialized: boolean;
	isStartGameEnabled: boolean;
	step: CreateGameFormSteps;
	stepData: StepOptions;
	stepsLength: number;
};

type StepOption = {
	number: number;
	nextStep: CreateGameFormSteps | null;
	prevStep: CreateGameFormSteps | null;
	isNextStepEnabled: boolean;
	showContinueBtn: boolean;
	showAdvancedSettingsBtn: boolean;
	showStartGameBtn: boolean;
};

type StepOptions = {
	// eslint-disable-next-line no-unused-vars
	[key in CreateGameFormSteps]: StepOption;
};

const DEFAULT_STEP_OPTIONS: StepOptions = {
	[CreateGameFormSteps.Name]: {
		number: 1,
		nextStep: CreateGameFormSteps.VotingSystem,
		prevStep: null,
		isNextStepEnabled: false,
		showContinueBtn: true,
		showStartGameBtn: false,
		showAdvancedSettingsBtn: false,
	},
	[CreateGameFormSteps.VotingSystem]: {
		number: 2,
		nextStep: CreateGameFormSteps.CreatorName,
		prevStep: CreateGameFormSteps.Name,
		isNextStepEnabled: false,
		showContinueBtn: true,
		showStartGameBtn: false,
		showAdvancedSettingsBtn: false,
	},
	[CreateGameFormSteps.CreatorName]: {
		number: 3,
		nextStep: CreateGameFormSteps.AdvancedSettings,
		prevStep: CreateGameFormSteps.VotingSystem,
		showContinueBtn: false,
		isNextStepEnabled: false,
		showStartGameBtn: true,
		showAdvancedSettingsBtn: true,
	},
	[CreateGameFormSteps.AdvancedSettings]: {
		number: 3,
		nextStep: null,
		prevStep: CreateGameFormSteps.CreatorName,
		isNextStepEnabled: false,
		showContinueBtn: false,
		showStartGameBtn: true,
		showAdvancedSettingsBtn: false,
	},
};

export const DefaultCreateGameState: CreateGameFormState = {
	isClientInitialized: false,
	isStartGameEnabled: false,
	stepData: DEFAULT_STEP_OPTIONS,
	step: CreateGameFormSteps.Name,
	stepsLength: 3,
};

export function createGameFormReducer(
	formState: CreateGameFormState,
	action?: Actions.Actions,
): CreateGameFormState {
	if (!action) return formState;

	const currentStepData = formState.stepData[formState.step];
	switch (action.type) {
		case Actions.Type.NextStep:
			return {
				...formState,
				step:
					currentStepData.nextStep !== null &&
					currentStepData.isNextStepEnabled
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

		case Actions.Type.MakeNextStepEnabled:
			return {
				...formState,
				stepData: {
					...formState.stepData,
					[formState.step]: {
						...formState.stepData[formState.step],
						isNextStepEnabled: action.payload,
					},
				},
			};

		case Actions.Type.MakeStartGameEnabled:
			return {
				...formState,
				isStartGameEnabled: action.payload,
			};

		default:
			return formState;
	}
}
