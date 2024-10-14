"use client";

import {
	Dispatch,
	createContext,
	useContext,
	useReducer,
	ReactNode,
} from "react";
import { CreateGameFormActions as Actions } from "./actions";
import {
	CreateGameFormState,
	DefaultCreateGameState,
	createGameFormReducer,
} from "./reducer";

export const CreateGameFormContext = createContext<CreateGameFormState>(
	DefaultCreateGameState,
);
export const CreateGameFormDispatchContext = createContext<
	Dispatch<Actions.Actions>
>(() => {});

interface Props {
	children: ReactNode;
}

export function CreateGameFormProvider({ children }: Props) {
	const [state, dispatch] = useReducer(
		createGameFormReducer,
		DefaultCreateGameState,
	);

	return (
		<CreateGameFormContext.Provider value={state}>
			<CreateGameFormDispatchContext.Provider value={dispatch}>
				{children}
			</CreateGameFormDispatchContext.Provider>
		</CreateGameFormContext.Provider>
	);
}

export function useCreateGameFormNavigation() {
	const context = useContext(CreateGameFormContext);
	return {
		isClientInitialized: context.isClientInitialized,
		step: context.step,
		stepData: context.stepData[context.step],
	};
}

export function useCreateGameFormNavigationDispatch() {
	return useContext(CreateGameFormDispatchContext);
}
