"use client";
import { createContext, useContext } from "react";

type ProviderProps<TValue> = { children: React.ReactNode; value: TValue };
type ProviderBuilder<TState> = [
	() => TState,
	(props: ProviderProps<TState>) => JSX.Element,
];

export function useProviderBuilder<TState>(
	defaultState: TState,
): ProviderBuilder<TState> {
	const Context = createContext<TState>(defaultState);

	const Provider = (props: ProviderProps<TState>) => {
		return (
			<Context.Provider value={props.value}>
				{props.children}
			</Context.Provider>
		);
	};

	const useProviderData = () => useContext(Context);

	return [useProviderData, Provider];
}
