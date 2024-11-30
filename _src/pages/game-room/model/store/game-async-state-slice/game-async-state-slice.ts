import { StateCreator } from "zustand";
import { GameAsyncState } from "./game-async-state.model";
import { GameAsyncSlice, GameStateStore } from "../game-state-store.model";

export function createGameAsyncStateSliceCreator(
	initialState: GameAsyncState,
): StateCreator<
	GameStateStore,
	[["zustand/immer", never]],
	[],
	GameAsyncSlice
> {
	return (set) => ({
		state: initialState,
		addParticipant: (participant) => {
			set((state) => {
				state.state.participants.push(participant);
			});
		},
	});
}
