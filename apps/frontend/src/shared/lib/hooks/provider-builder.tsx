"use client";
import { createContext, useContext, ReactNode, JSX } from "react";

type ProviderProps<TValue> = { children: ReactNode; value: TValue };
type ProviderBuilder<TState> = [
	() => TState,
	(_props: ProviderProps<TState>) => JSX.Element,
];

export function buildProvider<TState>(): ProviderBuilder<TState> {
	const Context = createContext<TState | undefined>(undefined);

	const Provider = (props: ProviderProps<TState>) => {
		return (
			<Context.Provider value={props.value}>
				{props.children}
			</Context.Provider>
		);
	};

	const useProviderData = () => {
		const context = useContext(Context);
		if (context === undefined) {
			throw new Error("this context must be within provider");
		}
		return context;
	};

	return [useProviderData, Provider];
}
