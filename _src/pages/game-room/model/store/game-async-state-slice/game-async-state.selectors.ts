import { GameStateStore } from "../game-state-store.model";

export const selectParticipants = (state: GameStateStore) =>
	state.state.participants;

export const selectParticipantsCount = (state: GameStateStore) =>
	state.state.participants.length;

export const selectTickets = (state: GameStateStore) => state.state.tickets;

export const selectTicketsCount = (state: GameStateStore) =>
	state.state.tickets.length;
