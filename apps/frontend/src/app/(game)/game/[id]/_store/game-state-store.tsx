import { createStore } from "zustand";
import { createGameAsyncStateSliceCreator } from "./game-async-state-slice/game-async-state-slice";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { createGameManagementSlice } from "./game-management-slice/game-management-state-slice";
import { GameStateStore } from "./game-state-store.model";
import { GameAsyncState } from "./game-async-state-slice/game-async-state.model";

export function createGameStateStore(initialAsyncState: GameAsyncState) {
	const createGameAsyncStateSlice =
		createGameAsyncStateSliceCreator(initialAsyncState);
	return createStore<GameStateStore>()(
		persist(
			immer((...params) => ({
				...createGameAsyncStateSlice(...params),
				...createGameManagementSlice(...params),
			})),
			{
				name: "game-management-state",
				partialize: (state) => ({
					activeTab: state.activeTab,
					openedTicketId: state.openedTicketId,
				}),
			},
		),
	);
}
