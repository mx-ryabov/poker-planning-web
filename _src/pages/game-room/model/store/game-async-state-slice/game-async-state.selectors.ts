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

export const selectTickets = (state: GameStateStore) =>
	state.state.game.tickets;

export const selectTicketsCount = (state: GameStateStore) =>
	state.state.game.tickets.length;

export const selectCurrentParticipant = (state: GameStateStore) =>
	state.state.currentParticipant;
