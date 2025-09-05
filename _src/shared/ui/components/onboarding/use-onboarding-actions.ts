import { useCallback, useContext } from "react";
import {
	OnboardingActionsContext,
	OnboardingModel,
} from "./onboarding-provider";

export function useOnboardingActions() {
	const context = useContext(OnboardingActionsContext);

	if (context === null) {
		throw new Error(
			"useOnboardingActions should be used within OnboardingProvider",
		);
	}

	const { setState } = context;

	const startOnboarding = useCallback((model: OnboardingModel) => {
		setState({ model, step: 0 });
	}, []);

	const nextStep = () => {
		setState((currentState) => {
			if (currentState === null) {
				return null;
			}
			let newStep = currentState.step;
			newStep++;
			if (newStep > currentState.model.steps.length - 1) return null;

			return { ...currentState, step: newStep };
		});
	};

	const prevStep = () => {
		setState((currentState) => {
			if (currentState === null) {
				return null;
			}
			let newStep = currentState.step;

			if (newStep > 0) newStep--;

			return { ...currentState, step: newStep };
		});
	};

	const setStep = (step: number) => {
		setState((currentState) => {
			if (currentState === null) {
				return null;
			}
			let newStep = currentState.step;
			if (step < 0) {
				newStep = 0;
			} else if (step > currentState.model.steps.length - 1) {
				return null;
			} else {
				newStep = step;
			}

			return { ...currentState, step: newStep };
		});
	};

	const finishOnboarding = () => {
		setState(null);
	};

	return {
		startOnboarding,
		nextStep,
		prevStep,
		setStep,
		finishOnboarding,
	};
}
