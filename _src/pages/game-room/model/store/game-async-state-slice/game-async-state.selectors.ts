import { GameVotingStatus } from "@/_src/shared/api";
import { RoleLevels } from "../../constants";
import { GameStateStore } from "../game-state-store.model";

export const selectParticipants = (state: GameStateStore) =>
	state.state.game.participants;

export const selectSortedParticipants = (state: GameStateStore) => {
	const currentParticipantId = state.state.currentParticipant.id;

	return [...state.state.game.participants].sort((a, b) => {
		if (a.id === currentParticipantId) {
			return -1;
		}
		if (b.id === currentParticipantId) {
			return 1;
		}

		return RoleLevels[b.role] - RoleLevels[a.role];
	});
};

export const selectParticipantsCount = (state: GameStateStore) =>
	state.state.game.participants.length;

export const selectParticipantsOnlineCount = (state: GameStateStore) =>
	state.state.game.participants.filter((p) => p.online).length;

export const selectTickets = (state: GameStateStore) =>
	state.state.game.tickets;

export const selectTicketsCount = (state: GameStateStore) =>
	state.state.game.tickets.length;

export const selectCurrentParticipant = (state: GameStateStore) =>
	state.state.currentParticipant;

export const selectCurrentParticipantId = (state: GameStateStore) =>
	state.state.currentParticipant.id;

export const selectCurrentVote = (state: GameStateStore) =>
	state.state.currentParticipant.vote;

export const selectCurrentRole = (state: GameStateStore) =>
	state.state.currentParticipant.role;

export const selectCurrentGameId = (state: GameStateStore) =>
	state.state.game.id;

export const selectCurrentVotingSystem = (state: GameStateStore) =>
	state.state.game.votingSystem;

export const selectVotingSystemVotes = (state: GameStateStore) =>
	state.state.game.votingSystem.votes.toSorted((a, b) => a.order - b.order);

export const selectVotingProcess = (state: GameStateStore) =>
	state.state.game.votingProcess;

export const selectIfVotingStatusIsInProgress = (state: GameStateStore) =>
	state.state.game.votingProcess.status === GameVotingStatus.InProgress;

export const selectLastVotingResult = (state: GameStateStore) =>
	state.state.game.votingResults.at(-1);

export const selectPreliminaryVotingResults = (state: GameStateStore) =>
	state.state.game.participants.map((p) => p.vote);

export const selectGameSettings = (state: GameStateStore) =>
	state.state.game.settings;
