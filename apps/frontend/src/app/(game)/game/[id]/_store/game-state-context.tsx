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

/* eslint-disable react-hooks/refs */
// The reason of suppression: we use/change the ref during render because this is how zustand recommends to initialize the store. See: https://zustand.docs.pmnd.rs/guides/nextjs#providing-the-store
export function GameStateProvider({
	initialAsyncState,
	children,
}: GameStateProviderProps) {
	const storeRef = useRef<StoreApi<GameStateStore> | null>(null);
	if (storeRef.current == null) {
		storeRef.current = createGameStateStore(initialAsyncState);
	}

	useEffect(() => {
		const sotreState = storeRef.current?.getState();
		if (sotreState) {
			sotreState.revalidateAsyncState(initialAsyncState);
		}
	}, [storeRef, initialAsyncState]);

	const store = storeRef.current;

	return (
		<GameStateCotnext.Provider value={store}>
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
