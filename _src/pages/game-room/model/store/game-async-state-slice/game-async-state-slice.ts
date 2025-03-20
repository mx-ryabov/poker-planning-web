import { StateCreator } from "zustand";
import { GameAsyncState } from "./game-async-state.model";
import { GameAsyncSlice, GameStateStore } from "../game-state-store.model";
import { GameTicket } from "@/_src/shared/api/game-api";
import { UpdateGameTicket } from "./game-async-state.dto";

export function createGameAsyncStateSliceCreator(
	initialState: GameAsyncState,
): StateCreator<
	GameStateStore,
	[["zustand/immer", never]],
	[],
	GameAsyncSlice
> {
	return (set) => ({
		state: initialState,
		joinParticipant: (participant) => {
			set((state) => {
				const participantFromList = state.state.game.participants.find(
					(p) => p.id === participant.id,
				);
				if (participantFromList) {
					participantFromList.online = true;
				} else {
					state.state.game.participants.push({
						...participant,
						online: true,
					});
				}
			});
		},
		disconnectParticipant: (userId) => {
			set((state) => {
				const participantFromList = state.state.game.participants.find(
					(p) => p.userId === userId,
				);
				if (participantFromList) {
					participantFromList.online = false;
				}
			});
		},
		kickParticipant: (participantId) => {
			set((state) => {
				const ind = state.state.game.participants.findIndex(
					(p) => p.id === participantId,
				);
				if (ind >= 0) {
					state.state.game.participants.splice(ind, 1);
				}
			});
		},
		addTicketIfAbsent: (ticket: GameTicket) => {
			set((state) => {
				const isInList = state.state.game.tickets.some(
					(t) => t.id === ticket.id,
				);
				if (!isInList) {
					state.state.game.tickets.push(ticket);
				}
			});
		},
		updateTicket: (ticketId: string, data: Partial<UpdateGameTicket>) => {
			set((state) => {
				const ticketInd = state.state.game.tickets.findIndex(
					(t) => t.id === ticketId,
				);
				if (ticketInd !== -1) {
					Object.assign(state.state.game.tickets[ticketInd], {
						...data,
					});
				}
			});
		},
		removeTicket: (ticketId: string) => {
			set((state) => {
				state.state.game.tickets = state.state.game.tickets.filter(
					(t) => t.id !== ticketId,
				);
			});
		},
		revalidateAsyncState: (updatedState: GameAsyncState) => {
			set((state) => {
				state.state = updatedState;
			});
		},
	});
}
