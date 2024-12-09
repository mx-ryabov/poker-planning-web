import { createContext, ReactNode, useContext, useRef } from "react";
import { StoreApi, useStore } from "zustand";
import { GameManagementSlice, GameStateStore } from "./game-state-store.model";

type GameStateContextProps = StoreApi<GameStateStore>;

const GameStateCotnext = createContext<GameStateContextProps | null>(null);

type GameStateProviderProps = {
	children: ReactNode;
	store: StoreApi<GameStateStore>;
};

export function GameStateProvider({ store, children }: GameStateProviderProps) {
	const storeRef = useRef<StoreApi<GameStateStore> | null>(null);
	if (!storeRef.current) {
		storeRef.current = store;
	}
	return (
		<GameStateCotnext.Provider value={storeRef.current}>
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
	return useStore(store, selector);
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
