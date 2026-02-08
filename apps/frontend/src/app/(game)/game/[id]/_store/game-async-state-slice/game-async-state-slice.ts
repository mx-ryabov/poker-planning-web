import { StateCreator } from "zustand";
import { GameAsyncState } from "./game-async-state.model";
import { GameAsyncSlice, GameStateStore } from "../game-state-store.model";
import {
	GameParticipant,
	GameTicket,
	GameVote,
	GameVotingResult,
	GameVotingStatus,
	StartVotingResult,
} from "@/src/domain/entities/game";
import { UpdateGameSettings, UpdateGameTicket } from "./game-async-state.dto";

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
		startVoting: (ticketId: string | null, data: StartVotingResult) => {
			set((state) => {
				state.state.game.votingProcess.status =
					GameVotingStatus.InProgress;
				const ticket =
					state.state.game.tickets.find((t) => t.id === ticketId) ||
					null;

				state.state.game.votingProcess.ticket = ticket;
				state.state.game.votingProcess.startTime = data.startTime;
			});
		},
		finishVoting: (result: GameVotingResult) => {
			set((state) => {
				state.state.game.votingProcess.status =
					GameVotingStatus.Inactive;
				state.state.game.votingProcess.ticket = null;
				state.state.game.votingProcess.startTime = null;
				state.state.game.votingResults.push(result);
			});
		},
		cancelVoting: () => {
			set((state) => {
				state.state.game.votingProcess.status =
					GameVotingStatus.Inactive;
				state.state.game.votingProcess.ticket = null;
				state.state.game.votingProcess.startTime = null;
			});
		},
		revealCards: () => {
			set((state) => {
				state.state.game.votingProcess.startTime = null;
				state.state.game.votingProcess.status =
					GameVotingStatus.Revealed;
			});
		},
		changeVote: (vote: GameVote | null) => {
			set((state) => {
				state.state.currentParticipant.vote = vote;
			});
		},
		changeVoteForParticipant: (
			particpantId: string,
			voteId: string | null,
		) => {
			set((state) => {
				const vote =
					state.state.game.votingSystem.votes.find(
						(v) => v.id === voteId,
					) || null;
				const votedParticipant = state.state.game.participants.find(
					(p) => p.id === particpantId,
				);
				if (votedParticipant) {
					votedParticipant.vote = vote;
				}
			});
		},
		updateSettings: (data: UpdateGameSettings) => {
			set((state) => {
				const { game } = state.state;
				game.name = data.name;
				game.settings.isAutoRevealCards = data.isAutoRevealCards;
				game.settings.autoRevealPeriod = data.autoRevealPeriod;
				data.updatedParticipants.forEach((p) => {
					let participantForUpdate = game.participants.find(
						(lp) => lp.id === p.id,
					);
					if (participantForUpdate) {
						participantForUpdate = Object.assign(
							participantForUpdate,
							p,
						);
					}
				});
			});
		},
		updateCurrentParticipant: (
			data: GameParticipant,
			onUpdate?: (
				oldData: GameParticipant,
				newData: GameParticipant,
			) => void,
		) => {
			set((state) => {
				let { currentParticipant } = state.state;
				const oldData = { ...currentParticipant };
				currentParticipant = Object.assign(currentParticipant, data);
				if (onUpdate) onUpdate(oldData, data);
			});
		},
	});
}
