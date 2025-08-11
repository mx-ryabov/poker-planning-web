import { cva } from "class-variance-authority";
import {
	cloneElement,
	createContext,
	Dispatch,
	ReactElement,
	ReactNode,
	SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from "react";
import { mergeProps } from "react-aria";
import { Dialog, Popover } from "react-aria-components";

type OnboardingStepProps = {
	children: ReactElement<any>;
	id: Symbol;
	stepNumber: number;
};

export function OnboardingStep({
	children,
	id,
	stepNumber,
}: OnboardingStepProps) {
	const triggerId = useId();
	const state = useOnboardingState();

	const isActive = useMemo(
		() => state?.activeId === id && state?.currentStepInd === stepNumber,
		[state, id, stepNumber],
	);

	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const showcaseEl = container.firstElementChild;
		if (!showcaseEl) {
			console.error("Provided children should be a single HTMLElement");
			return;
		}

		showcaseEl.setAttribute("data-trigger", triggerId);
	}, [containerRef, triggerId]);

	return (
		<div ref={containerRef}>
			{children}
			{/* {createPortal(
				<div className={stepStyles({ isActive })}></div>,
				document.body,
				id.toString(),
			)} */}
			<Popover isOpen={isActive} trigger={triggerId}>
				<Dialog className="border-2 border-primary-500 rounded-xl p-2">
					<div className="flex flex-col gap-4">
						<h1>{state?.currentStep.title}</h1>
						<p>{state?.currentStep.description}</p>
					</div>
				</Dialog>
			</Popover>
		</div>
	);
}

const stepStyles = cva("", {
	variants: {
		isActive: {
			true: "border-2 border-primary-500",
			false: "",
		},
	},
});

type OnboardingState = {
	model: OnboardingModel;
	step: number;
};
const OnboardingStateContext = createContext<OnboardingState | null>(
	undefined!,
);

type OnboardingActions = {
	setState: Dispatch<SetStateAction<OnboardingState | null>>;
};
const OnboardingActionsContext = createContext<OnboardingActions>(null!);

type OnboardingProviderProps = {
	children: ReactNode;
};
export function OnboardingProvider({ children }: OnboardingProviderProps) {
	const [state, setState] = useState<OnboardingState | null>(null);

	return (
		<OnboardingActionsContext.Provider value={{ setState }}>
			<OnboardingStateContext.Provider value={state}>
				{children}
			</OnboardingStateContext.Provider>
		</OnboardingActionsContext.Provider>
	);
}

export function useOnboardingState() {
	const context = useContext(OnboardingStateContext);

	if (context === undefined) {
		throw new Error(
			"useOnboardingState should be used within OnboardingProvider",
		);
	}

	if (context === null) return null;

	const { model, step } = context;

	return {
		activeId: model.id,
		currentStep: model.steps[step],
		currentStepInd: step,
	};
}

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

	const nextStep = useCallback(() => {
		setState((currentState) => {
			if (currentState === null) {
				return null;
			}
			let newStep = currentState.step;
			newStep++;
			if (newStep > currentState.model.steps.length - 1) return null;

			return { ...currentState, step: newStep };
		});
	}, [setState]);

	const prevStep = useCallback(() => {
		setState((currentState) => {
			if (currentState === null) {
				return null;
			}
			let newStep = currentState.step;

			if (newStep > 0) newStep--;

			return { ...currentState, step: newStep };
		});
	}, [setState]);

	const setStep = useCallback((step: number) => {
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
	}, []);

	const finishOnboarding = useCallback(() => {
		setState(null);
	}, []);

	return {
		startOnboarding,
		nextStep,
		prevStep,
		setStep,
		finishOnboarding,
	};
}

export type OnboardingStepData = {
	title: string;
	description: string;
};
export type OnboardingModel = {
	id: Symbol;
	steps: OnboardingStepData[];
};
