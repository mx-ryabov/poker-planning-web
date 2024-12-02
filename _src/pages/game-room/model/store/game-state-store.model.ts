import { GameParticipant } from "@/_src/shared/api/game-api";
import { GameAsyncState } from "./game-async-state-slice/game-async-state.model";
import { GameManagementTab } from "./game-management-slice/game-managemet.model";

export type GameManagementSlice = {
	activeTab: GameManagementTab | null;
	setActiveTab: (tab: GameManagementTab | null) => void;
};

export type GameAsyncSlice = {
	state: GameAsyncState;
	addParticipant: (participant: GameParticipant) => void;
};

export type GameStateStore = GameAsyncSlice & GameManagementSlice;