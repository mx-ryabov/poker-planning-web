import { useContext } from "react";
import { OnboardingStateContext } from "./onboarding-provider";

export type OnboardingState = {
	activeOnboardingId: symbol;
	currentStepId: symbol;
	currentStepInd: number;
	totalStepsCount: number;
};

export function useOnboardingState(): OnboardingState | null {
	const context = useContext(OnboardingStateContext);

	if (context === undefined) {
		throw new Error(
			"useOnboardingState should be used within OnboardingProvider",
		);
	}

	if (context === null) return null;

	const { model, step } = context;

	return {
		activeOnboardingId: model.id,
		currentStepId: model.steps[step],
		currentStepInd: step,
		totalStepsCount: model.steps.length,
	};
}
