import { GameParticipant, GameTicket } from "@/_src/shared/api/game-api";
import { GameAsyncState } from "./game-async-state-slice/game-async-state.model";
import {
	GameManagementTab,
	LiveStatus,
} from "./game-management-slice/game-managemet.model";

export type GameManagementSlice = {
	activeTab: GameManagementTab | null;
	setActiveTab: (tab: GameManagementTab | null) => void;
	liveStatus: LiveStatus;
	setLiveStatus: (status: LiveStatus) => void;
};

export type GameAsyncSlice = {
	state: GameAsyncState;
	joinParticipant: (participant: GameParticipant) => void;
	disconnectParticipant: (userId: string) => void;
	kickParticipant: (participantId: string) => void;
	addTicketIfAbsent: (ticket: GameTicket) => void;
};

export type GameStateStore = GameAsyncSlice & GameManagementSlice;
