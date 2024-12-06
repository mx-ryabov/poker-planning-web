import { GameStateStore } from "../game-state-store.model";

export const selectParticipants = (state: GameStateStore) =>
	state.state.game.participants;

export const selectParticipantsCount = (state: GameStateStore) =>
	state.state.game.participants.length;

export const selectTickets = (state: GameStateStore) =>
	state.state.game.tickets;

export const selectTicketsCount = (state: GameStateStore) =>
	state.state.game.tickets.length;

export const selectCurrentParticipant = (state: GameStateStore) =>
	state.state.currentParticipant;
