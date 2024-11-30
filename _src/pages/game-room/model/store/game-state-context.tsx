import { GetGameByIdResponse } from "@/_src/shared/api";
import { createContext, ReactNode, useContext, useRef } from "react";
import { createGameStateStore } from "./game-state-store";
import { StoreApi, useStore } from "zustand";
import { GameManagementSlice, GameStateStore } from "./game-state-store.model";

type GameStateContextProps = StoreApi<GameStateStore>;

const GameStateCotnext = createContext<GameStateContextProps | null>(null);

type GameStateProviderProps = {
	children: ReactNode;
	initialState: GetGameByIdResponse;
};

export function GameStateProvider({
	initialState,
	children,
}: GameStateProviderProps) {
	const storeRef = useRef<StoreApi<GameStateStore>>();
	if (!storeRef.current) {
		storeRef.current = createGameStateStore(initialState);
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
