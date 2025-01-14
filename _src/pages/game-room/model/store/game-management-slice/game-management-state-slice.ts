"use client";
import { StateCreator } from "zustand";
import { GameManagementTab, LiveStatus } from "./game-managemet.model";
import { GameManagementSlice, GameStateStore } from "../game-state-store.model";

export const createGameManagementSlice: StateCreator<
	GameStateStore,
	[["zustand/immer", never]],
	[],
	GameManagementSlice
> = (set) => ({
	activeTab: null,
	liveStatus: {
		state: "connected",
	},
	setActiveTab: (tab: GameManagementTab | null) =>
		set((state) => {
			state.activeTab = tab;
		}),
	setLiveStatus: (status: LiveStatus) => {
		set((state) => {
			state.liveStatus = status;
		});
	},
});
