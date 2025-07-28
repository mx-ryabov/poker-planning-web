import {
	GameParticipant,
	GameTicket,
	GameVote,
	GameVotingResult,
	StartVotingResult,
} from "@/_src/shared/api/game-api";
import { GameAsyncState } from "./game-async-state-slice/game-async-state.model";
import {
	GameManagementTab,
	LiveStatus,
	LiveStatusUpdaterFn,
} from "./game-management-slice/game-managemet.model";
import {
	UpdateGameSettings,
	UpdateGameTicket,
} from "./game-async-state-slice/game-async-state.dto";

export type GameManagementSlice = {
	activeTab: GameManagementTab | null;
	setActiveTab: (tab: GameManagementTab | null) => void;
	liveStatus: LiveStatus;
	setLiveStatus: (status: LiveStatus | LiveStatusUpdaterFn) => void;
	openedTicketId: string | null;
	setOpenedTicketId: (ticketId: string | null) => void;
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
	startVoting: (ticketId: string | null, data: StartVotingResult) => void;
	finishVoting: (votingResult: GameVotingResult) => void;
	revealCards: () => void;
	cancelVoting: () => void;
	changeVote: (vote: GameVote | null) => void;
	changeVoteForParticipant: (
		participantId: string,
		voteId: string | null,
	) => void;
	updateSettings: (data: UpdateGameSettings) => void;
	updateCurrentParticipant: (
		data: GameParticipant,
		onUpdate?: (oldData: GameParticipant, newData: GameParticipant) => void,
	) => void;
};

export type GameStateStore = GameAsyncSlice & GameManagementSlice;
