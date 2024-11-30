"use client";
import { StateCreator } from "zustand";
import { GameManagementTab } from "./game-managemet.model";
import { GameManagementSlice, GameStateStore } from "../game-state-store.model";

export const createGameManagementSlice: StateCreator<
	GameStateStore,
	[["zustand/immer", never]],
	[],
	GameManagementSlice
> = (set) => ({
	activeTab: null,
	setActiveTab: (tab: GameManagementTab | null) =>
		set((state) => {
			state.activeTab = tab;
		}),
});
