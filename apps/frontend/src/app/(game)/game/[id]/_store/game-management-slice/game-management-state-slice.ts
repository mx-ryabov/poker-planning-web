"use client";
import { StateCreator } from "zustand";
import {
	GameManagementTab,
	LiveStatus,
	LiveStatusUpdaterFn,
} from "./game-managemet.model";
import { GameManagementSlice, GameStateStore } from "../game-state-store.model";

export const createGameManagementSlice: StateCreator<
	GameStateStore,
	[["zustand/immer", never]],
	[],
	GameManagementSlice
> = (set) => ({
	activeTab: null,
	liveStatus: {
		status: "notStarted",
	},
	openedTicketId: null,
	setActiveTab: (tab: GameManagementTab | null) =>
		set((state) => {
			state.activeTab = tab;
		}),
	setLiveStatus: (status: LiveStatus | LiveStatusUpdaterFn) => {
		set((state) => {
			if (typeof status === "function") {
				state.liveStatus = status(state.liveStatus);
			} else {
				state.liveStatus = status;
			}
		});
	},
	setOpenedTicketId: (ticketId: string | null) => {
		set((state) => {
			state.openedTicketId = ticketId;
		});
	},
});
