import { createStore, StoreApi } from "zustand";
import { createGameAsyncStateSliceCreator } from "./game-async-state-slice/game-async-state-slice";
import { immer } from "zustand/middleware/immer";
import { createGameManagementSlice } from "./game-management-slice/game-management-state-slice";
import { GameStateStore } from "./game-state-store.model";
import { GameAsyncState } from "./game-async-state-slice/game-async-state.model";
import { useRef } from "react";

export function createGameStateStore(initialAsyncState: GameAsyncState) {
	const createGameAsyncStateSlice =
		createGameAsyncStateSliceCreator(initialAsyncState);
	return createStore<GameStateStore>()(
		immer((...params) => ({
			...createGameAsyncStateSlice(...params),
			...createGameManagementSlice(...params),
		})),
	);
}

export function useGameStateStore(initialAsyncState: GameAsyncState) {
	const gameStateStore = createGameStateStore(initialAsyncState);

	const storeRef = useRef<StoreApi<GameStateStore>>(gameStateStore);
	if (!storeRef.current) {
		storeRef.current = gameStateStore;
	}

	return storeRef.current;
}
