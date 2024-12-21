import { createContext, ReactNode, useContext } from "react";
import { StoreApi, useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { GameManagementSlice, GameStateStore } from "./game-state-store.model";

type GameStateContextProps = StoreApi<GameStateStore>;

const GameStateCotnext = createContext<GameStateContextProps | null>(null);

type GameStateProviderProps = {
	children: ReactNode;
	store: StoreApi<GameStateStore>;
};

export function GameStateProvider({ store, children }: GameStateProviderProps) {
	return (
		<GameStateCotnext.Provider value={store}>
			{children}
		</GameStateCotnext.Provider>
	);
}

export function useGameState<TReturn>(
	selector: (state: GameStateStore) => TReturn,
): TReturn {
	const store = useContext(GameStateCotnext);
	if (store === null) {
		throw new Error("useGameState must be used inside GameStateProvider");
	}
	return useStore(store, useShallow(selector));
}

export function useGameManagementState<TReturn>(
	selector: (state: GameManagementSlice) => TReturn,
): TReturn {
	const store = useContext(GameStateCotnext);
	if (store === null) {
		throw new Error(
			"useGameManagementState must be used inside GameStateProvider",
		);
	}
	return useStore(store, selector);
}
