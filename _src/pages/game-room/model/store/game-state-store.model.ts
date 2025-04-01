import {
	GameParticipant,
	GameTicket,
	GameVote,
} from "@/_src/shared/api/game-api";
import { GameAsyncState } from "./game-async-state-slice/game-async-state.model";
import {
	GameManagementTab,
	LiveStatus,
	LiveStatusUpdaterFn,
} from "./game-management-slice/game-managemet.model";
import { UpdateGameTicket } from "./game-async-state-slice/game-async-state.dto";

export type GameManagementSlice = {
	activeTab: GameManagementTab | null;
	setActiveTab: (tab: GameManagementTab | null) => void;
	liveStatus: LiveStatus;
	setLiveStatus: (status: LiveStatus | LiveStatusUpdaterFn) => void;
};

export type GameAsyncSlice = {
	state: GameAsyncState;
	joinParticipant: (participant: GameParticipant) => void;
	disconnectParticipant: (userId: string) => void;
	kickParticipant: (participantId: string) => void;
	addTicketIfAbsent: (ticket: GameTicket) => void;
	updateTicket: (ticketId: string, data: Partial<UpdateGameTicket>) => void;
	removeTicket: (ticketId: string) => void;
	revalidateAsyncState: (updatedState: GameAsyncState) => void;
	startVoting: (ticketId?: string) => void;
	finishVoting: () => void;
	changeVote: (vote: GameVote | null) => void;
};

export type GameStateStore = GameAsyncSlice & GameManagementSlice;
