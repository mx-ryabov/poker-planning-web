import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useState,
} from "react";

export type OnboardingModel = {
	id: symbol;
	steps: symbol[];
};
type OnboardingInnerState = {
	model: OnboardingModel;
	step: number;
};
export const OnboardingStateContext =
	createContext<OnboardingInnerState | null>(undefined!);

type OnboardingActions = {
	setState: Dispatch<SetStateAction<OnboardingInnerState | null>>;
};
export const OnboardingActionsContext = createContext<OnboardingActions>(null!);

type OnboardingProviderProps = {
	children: ReactNode;
};
export function OnboardingProvider({ children }: OnboardingProviderProps) {
	const [state, setState] = useState<OnboardingInnerState | null>(null);

	return (
		<OnboardingActionsContext.Provider value={{ setState }}>
			<OnboardingStateContext.Provider value={state}>
				{children}
			</OnboardingStateContext.Provider>
		</OnboardingActionsContext.Provider>
	);
}
