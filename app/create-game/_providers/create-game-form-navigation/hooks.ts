import { useContext } from "react";
import {
	CreateGameFormContext,
	CreateGameFormDispatchContext,
} from "./provider";

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
