import { createContext, ReactNode, useContext } from "react";
import { ToastState, useToastState } from "@react-stately/toast";

import { ToastContent } from "../models/toast-content";
import { ToastRegion } from "../components/toast-region";

const ToastContext = createContext<ToastState<ToastContent> | null>(null);

type ToastProviderProps = {
	children: ReactNode;
};
// TODO: Move to app folder
export function ToastProvider({ children }: ToastProviderProps) {
	const state = useToastState<ToastContent>({
		maxVisibleToasts: 3,
	});

	return (
		<ToastContext.Provider value={state}>
			{children}
			<ToastRegion state={state} />
		</ToastContext.Provider>
	);
}

export function useGlobalToast() {
	const state = useContext(ToastContext);
	if (state === undefined) {
		throw new Error("ToastContext must be within ToastProvider");
	}
	return state;
}
