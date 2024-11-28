"use client";
import { create } from "zustand";
import { GameManagementTab } from "../game-managemet.model";

type UseGameManagementState = {
	activeTab: GameManagementTab | null;
};

type UseGameManagementActions = {
	setActiveTab: (tab: GameManagementTab | null) => void;
};

export const useGameManagementState = create<
	UseGameManagementState & UseGameManagementActions
>((set) => ({
	activeTab: null,
	setActiveTab: (tab: GameManagementTab | null) =>
		set((state) => ({
			...state,
			activeTab: tab,
		})),
}));
