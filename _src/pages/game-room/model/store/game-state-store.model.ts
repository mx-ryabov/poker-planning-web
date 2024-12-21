import { GameParticipant } from "@/_src/shared/api/game-api";
import { GameAsyncState } from "./game-async-state-slice/game-async-state.model";
import { GameManagementTab } from "./game-management-slice/game-managemet.model";

export type GameManagementSlice = {
	activeTab: GameManagementTab | null;
	setActiveTab: (tab: GameManagementTab | null) => void;
};

export type GameAsyncSlice = {
	state: GameAsyncState;
	joinParticipant: (participant: GameParticipant) => void;
	disconnectParticipant: (userId: string) => void;
	kickParticipant: (participantId: string) => void;
};

export type GameStateStore = GameAsyncSlice & GameManagementSlice;
