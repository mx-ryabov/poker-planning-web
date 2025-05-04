import { createContext, ReactNode, useContext, useEffect, useRef } from "react";
import { StoreApi, useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { GameManagementSlice, GameStateStore } from "./game-state-store.model";
import { createGameStateStore } from "./game-state-store";
import { GameAsyncState } from "./game-async-state-slice/game-async-state.model";

export type GameStateContextProps = StoreApi<GameStateStore>;

export const GameStateCotnext = createContext<GameStateContextProps | null>(
	null,
);

type GameStateProviderProps = {
	children: ReactNode;
	initialAsyncState: GameAsyncState;
};

export function GameStateProvider({
	initialAsyncState,
	children,
}: GameStateProviderProps) {
	const storeRef = useRef<StoreApi<GameStateStore> | null>(null);
	if (!storeRef.current) {
		storeRef.current = createGameStateStore(initialAsyncState);
	}

	useEffect(() => {
		const sotreState = storeRef.current?.getState();
		if (sotreState) {
			sotreState.revalidateAsyncState(initialAsyncState);
		}
	}, [storeRef, initialAsyncState]);

	return (
		<GameStateCotnext.Provider value={storeRef.current}>
			{children}
		</GameStateCotnext.Provider>
	);
}

export function useGameStore() {
	const store = useContext(GameStateCotnext);
	if (store === null) {
		throw new Error("useGameStore must be used inside GameStateProvider");
	}

	return store;
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
