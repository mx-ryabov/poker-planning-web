import { test, describe, expect } from "vitest";
import { renderHook } from "@/test/utilities";
import { createGameStateStore } from "../game-state-store";
import { GameManagementTab } from "../game-management-slice/game-managemet.model";
import { GAME_MOCK } from "./game-state-store.mocks";
import { MASTER_PARTICIPANT } from "@/_src/shared/mocks/game/participant";
import {
	generateParticipant,
	generateTicket,
	generateVotingResult,
} from "../../../__tests__/game-state-store.test-helpers";
import {
	GameVotingStatus,
	ParticipantRole,
	TicketType,
} from "@/_src/shared/api";

describe("Game State Store", () => {
	test("has a correct initial value", async () => {
		const { result } = renderHook(() =>
			createGameStateStore({
				game: GAME_MOCK,
				currentParticipant: MASTER_PARTICIPANT,
			}),
		);
		const state = result.current.getState();

		expect(state.activeTab).toBe(null);
		expect(state.liveStatus).toEqual(
			expect.objectContaining({
				state: "connected",
			}),
		);
		expect(state.state).toStrictEqual({
			game: GAME_MOCK,
			currentParticipant: MASTER_PARTICIPANT,
		});
	});

	describe("Game Managemet Slice", () => {
		test("changes the active tab", async () => {
			const { result } = renderHook(() =>
				createGameStateStore({
					game: GAME_MOCK,
					currentParticipant: MASTER_PARTICIPANT,
				}),
			);
			const store = result.current;

			store.getState().setActiveTab(GameManagementTab.ParticipantList);
			expect(store.getState().activeTab).toBe(
				GameManagementTab.ParticipantList,
			);
			store.getState().setActiveTab(GameManagementTab.Settings);
			expect(store.getState().activeTab).toBe(GameManagementTab.Settings);
			store.getState().setActiveTab(GameManagementTab.TaskList);
			expect(store.getState().activeTab).toBe(GameManagementTab.TaskList);
		});

		test("resets the active tab", async () => {
			const { result } = renderHook(() =>
				createGameStateStore({
					game: GAME_MOCK,
					currentParticipant: MASTER_PARTICIPANT,
				}),
			);
			const store = result.current;

			store.getState().setActiveTab(GameManagementTab.ParticipantList);
			expect(store.getState().activeTab).toBe(
				GameManagementTab.ParticipantList,
			);
			store.getState().setActiveTab(null);
			expect(store.getState().activeTab).toBe(null);
		});

		test("changes liveStatus", async () => {
			const { result } = renderHook(() =>
				createGameStateStore({
					game: GAME_MOCK,
					currentParticipant: MASTER_PARTICIPANT,
				}),
			);
			const store = result.current;

			expect(store.getState().liveStatus).toEqual(
				expect.objectContaining({ state: "connected" }),
			);

			const reasonError = new Error("Error text");
			store
				.getState()
				.setLiveStatus({ state: "reconnecting", reason: reasonError });
			expect(store.getState().liveStatus).toEqual({
				state: "reconnecting",
				reason: reasonError,
			});
		});

		test("changes openedTicketId", async () => {
			const { result } = renderHook(() =>
				createGameStateStore({
					game: GAME_MOCK,
					currentParticipant: MASTER_PARTICIPANT,
				}),
			);
			const store = result.current;

			expect(store.getState().openedTicketId).toBeNull();

			store.getState().setOpenedTicketId("ticketId");
			expect(store.getState().openedTicketId).toEqual("ticketId");
			store.getState().setOpenedTicketId(null);
			expect(store.getState().openedTicketId).toEqual(null);
		});
	});

	describe("Game Async State Slice", () => {
		test("joinParticipant - adds a new participant (making it online) if it doesn't exist in the participant list", async () => {
			const { result } = renderHook(() =>
				createGameStateStore({
					game: GAME_MOCK,
					currentParticipant: MASTER_PARTICIPANT,
				}),
			);
			const store = result.current;

			expect(store.getState().state.game.participants).toHaveLength(1);
			const newparticipant = generateParticipant({
				role: ParticipantRole.VotingMember,
			});
			store.getState().joinParticipant(newparticipant);
			expect(store.getState().state.game.participants).toHaveLength(2);
			expect(store.getState().state.game.participants[1]).toStrictEqual({
				...newparticipant,
				online: true,
			});
		});

		test("joinParticipant - makes a participant online if it exists in the participant list", async () => {
			const existingParticipant = generateParticipant({
				role: ParticipantRole.VotingMember,
			});
			const { result } = renderHook(() =>
				createGameStateStore({
					game: {
						...GAME_MOCK,
						participants: [
							...GAME_MOCK.participants,
							existingParticipant,
						],
					},
					currentParticipant: MASTER_PARTICIPANT,
				}),
			);
			const store = result.current;

			expect(store.getState().state.game.participants).toHaveLength(2);
			expect(store.getState().state.game.participants[1]).toStrictEqual({
				...existingParticipant,
				online: false,
			});
			store.getState().joinParticipant(existingParticipant);
			expect(store.getState().state.game.participants).toHaveLength(2);
			expect(store.getState().state.game.participants[1]).toStrictEqual({
				...existingParticipant,
				online: true,
			});
		});

		test("disconnectParticipant - makes a participant offline if it exists in the participant list", async () => {
			const existingParticipant = generateParticipant({
				role: ParticipantRole.VotingMember,
				online: true,
			});
			const { result } = renderHook(() =>
				createGameStateStore({
					game: {
						...GAME_MOCK,
						participants: [
							...GAME_MOCK.participants,
							existingParticipant,
						],
					},
					currentParticipant: MASTER_PARTICIPANT,
				}),
			);
			const store = result.current;

			expect(store.getState().state.game.participants[1]).toStrictEqual({
				...existingParticipant,
				online: true,
			});
			store.getState().disconnectParticipant(existingParticipant.userId);
			expect(store.getState().state.game.participants[1]).toStrictEqual({
				...existingParticipant,
				online: false,
			});
		});

		test("kickParticipant - removes a paricipant from the participant list", async () => {
			const existingParticipant = generateParticipant({
				role: ParticipantRole.VotingMember,
			});
			const { result } = renderHook(() =>
				createGameStateStore({
					game: {
						...GAME_MOCK,
						participants: [
							...GAME_MOCK.participants,
							existingParticipant,
						],
					},
					currentParticipant: MASTER_PARTICIPANT,
				}),
			);
			const store = result.current;

			expect(store.getState().state.game.participants).toHaveLength(2);
			store.getState().kickParticipant(existingParticipant.id);
			expect(store.getState().state.game.participants).toHaveLength(1);
			expect(store.getState().state.game.participants).not.toBe(
				expect.arrayContaining([
					expect.objectContaining({
						id: existingParticipant.id,
					}),
				]),
			);
		});

		test("addTicketIfAbsent - adds a new ticket if it doesn't exists in the tickets", async () => {
			const { result } = renderHook(() =>
				createGameStateStore({
					game: GAME_MOCK,
					currentParticipant: MASTER_PARTICIPANT,
				}),
			);
			const store = result.current;

			expect(store.getState().state.game.tickets).toHaveLength(0);
			const newTicket = generateTicket({
				title: "New Ticket 1",
				identifier: "NT-1",
				type: TicketType.Story,
			});
			store.getState().addTicketIfAbsent(newTicket);
			expect(store.getState().state.game.tickets).toHaveLength(1);
			expect(store.getState().state.game.tickets[0]).toStrictEqual(
				newTicket,
			);
		});

		test("addTicketIfAbsent - doesn't add a ticket if the ticket with such a number already exists in the tickets", async () => {
			const existingTicket = generateTicket({
				id: "123",
			});
			const { result } = renderHook(() =>
				createGameStateStore({
					game: { ...GAME_MOCK, tickets: [existingTicket] },
					currentParticipant: MASTER_PARTICIPANT,
				}),
			);
			const store = result.current;

			expect(store.getState().state.game.tickets).toHaveLength(1);
			const newTicket = generateTicket({
				id: "123",
				title: "New Ticket 1",
				identifier: "NT-1",
				type: TicketType.Story,
			});
			store.getState().addTicketIfAbsent(newTicket);
			expect(store.getState().state.game.tickets).toHaveLength(1);
			expect(store.getState().state.game.tickets[0]).toStrictEqual(
				existingTicket,
			);
		});

		test("updateTicket - updates the ticket with the provided id", async () => {
			const existingTicket = generateTicket({
				id: "123",
			});
			const { result } = renderHook(() =>
				createGameStateStore({
					game: { ...GAME_MOCK, tickets: [existingTicket] },
					currentParticipant: MASTER_PARTICIPANT,
				}),
			);
			const store = result.current;

			expect(store.getState().state.game.tickets).toHaveLength(1);
			const updatedTicket = {
				title: "Updated Ticket 1",
				type: TicketType.Bug,
				description: "Updated description",
			};
			store.getState().updateTicket("123", updatedTicket);
			expect(store.getState().state.game.tickets).toHaveLength(1);
			expect(store.getState().state.game.tickets[0]).toEqual(
				expect.objectContaining(updatedTicket),
			);
		});

		test("removeTicket - removes the ticket with the provided id", async () => {
			const existingTicket = generateTicket({
				id: "123",
			});
			const { result } = renderHook(() =>
				createGameStateStore({
					game: { ...GAME_MOCK, tickets: [existingTicket] },
					currentParticipant: MASTER_PARTICIPANT,
				}),
			);
			const store = result.current;

			expect(store.getState().state.game.tickets).toHaveLength(1);
			store.getState().removeTicket("123");
			expect(store.getState().state.game.tickets).toHaveLength(0);
		});

		test("startVoting - changes voting process status to InProgress and assign null to the voting process ticket if null was provided", async () => {
			const { result } = renderHook(() =>
				createGameStateStore({
					game: { ...GAME_MOCK, tickets: [] },
					currentParticipant: MASTER_PARTICIPANT,
				}),
			);
			const store = result.current;

			expect(store.getState().state.game.votingProcess.status).toBe(
				GameVotingStatus.Inactive,
			);
			store.getState().startVoting(null);
			expect(store.getState().state.game.votingProcess.status).toBe(
				GameVotingStatus.InProgress,
			);
			expect(store.getState().state.game.votingProcess.ticket).toBeNull();
		});

		test("startVoting - changes voting process status to InProgress and assign an according ticket to the voting process if ticketId was provided", async () => {
			const { result } = renderHook(() =>
				createGameStateStore({
					game: {
						...GAME_MOCK,
						tickets: [generateTicket({ id: "ticket-id" })],
					},
					currentParticipant: MASTER_PARTICIPANT,
				}),
			);
			const store = result.current;

			expect(store.getState().state.game.votingProcess.status).toBe(
				GameVotingStatus.Inactive,
			);
			store.getState().startVoting("ticket-id");
			expect(store.getState().state.game.votingProcess.status).toBe(
				GameVotingStatus.InProgress,
			);
			expect(store.getState().state.game.votingProcess.ticket).toEqual(
				expect.objectContaining({ id: "ticket-id" }),
			);
		});

		test("revealCards - changes voting process status to Revealed", async () => {
			const { result } = renderHook(() =>
				createGameStateStore({
					game: {
						...GAME_MOCK,
						tickets: [generateTicket({ id: "ticket-id" })],
					},
					currentParticipant: MASTER_PARTICIPANT,
				}),
			);
			const store = result.current;

			expect(store.getState().state.game.votingProcess.status).toBe(
				GameVotingStatus.Inactive,
			);
			store.getState().revealCards();
			expect(store.getState().state.game.votingProcess.status).toBe(
				GameVotingStatus.Revealed,
			);
		});

		test("finishVoting - changes voting process status to Inactive, reset the voting process ticket and saves the provided voting results", async () => {
			const ticketForVote = generateTicket({ id: "ticket-id" });
			const { result } = renderHook(() =>
				createGameStateStore({
					game: {
						...GAME_MOCK,
						votingProcess: {
							status: GameVotingStatus.InProgress,
							ticket: ticketForVote,
						},
						tickets: [ticketForVote],
					},
					currentParticipant: MASTER_PARTICIPANT,
				}),
			);
			const store = result.current;

			expect(store.getState().state.game.votingProcess.status).toBe(
				GameVotingStatus.InProgress,
			);
			expect(store.getState().state.game.votingResults).toHaveLength(0);

			store.getState().finishVoting(
				generateVotingResult({
					id: "voting-result-id",
				}),
			);
			expect(store.getState().state.game.votingProcess.status).toBe(
				GameVotingStatus.Inactive,
			);
			expect(store.getState().state.game.votingResults).toHaveLength(1);
			expect(store.getState().state.game.votingResults[0]).toEqual(
				expect.objectContaining({ id: "voting-result-id" }),
			);
		});

		test("changeVote - changes selected vote for the current participant", async () => {
			const { result } = renderHook(() =>
				createGameStateStore({
					game: {
						...GAME_MOCK,
						tickets: [generateTicket({ id: "ticket-id" })],
					},
					currentParticipant: MASTER_PARTICIPANT,
				}),
			);
			const store = result.current;

			expect(store.getState().state.currentParticipant.vote).toBeNull();

			const vote = GAME_MOCK.votingSystem.votes[0];
			store.getState().changeVote(vote);

			expect(store.getState().state.currentParticipant.vote).toBe(vote);
		});

		test("changeVote - resets selected vote for the current participant", async () => {
			const vote = GAME_MOCK.votingSystem.votes[0];

			const { result } = renderHook(() =>
				createGameStateStore({
					game: {
						...GAME_MOCK,
						tickets: [generateTicket({ id: "ticket-id" })],
					},
					currentParticipant: { ...MASTER_PARTICIPANT, vote },
				}),
			);
			const store = result.current;

			expect(store.getState().state.currentParticipant.vote).toBe(vote);

			store.getState().changeVote(null);

			expect(store.getState().state.currentParticipant.vote).toBeNull();
		});

		test("changeVoteForParticipant - changes a participant's vote", async () => {
			const selectedVote = GAME_MOCK.votingSystem.votes[0];
			const { result } = renderHook(() =>
				createGameStateStore({
					game: {
						...GAME_MOCK,
						participants: [
							generateParticipant({ id: "test-participant-id" }),
						],
						tickets: [generateTicket({ id: "ticket-id" })],
					},
					currentParticipant: MASTER_PARTICIPANT,
				}),
			);
			const store = result.current;

			expect(store.getState().state.game.participants[0].vote).toBeNull();

			store
				.getState()
				.changeVoteForParticipant(
					"test-participant-id",
					selectedVote.id,
				);

			expect(store.getState().state.game.participants[0].vote).toBe(
				selectedVote,
			);
		});

		test("changeVoteForParticipant - resets a participant's vote", async () => {
			const selectedVote = GAME_MOCK.votingSystem.votes[0];
			const { result } = renderHook(() =>
				createGameStateStore({
					game: {
						...GAME_MOCK,
						participants: [
							generateParticipant({
								id: "test-participant-id",
								vote: selectedVote,
							}),
						],
						tickets: [generateTicket({ id: "ticket-id" })],
					},
					currentParticipant: MASTER_PARTICIPANT,
				}),
			);
			const store = result.current;
			expect(store.getState().state.game.participants[0].vote).toBe(
				selectedVote,
			);

			store
				.getState()
				.changeVoteForParticipant("test-participant-id", null);

			expect(store.getState().state.game.participants[0].vote).toBeNull();
		});

		test("updateSettings - updates game settings, name, and participants", async () => {
			const participant1 = generateParticipant({
				id: "test-participant-id-1",
				displayName: "Old name 1",
				role: ParticipantRole.Master,
			});
			const participant2 = generateParticipant({
				id: "test-participant-id-2",
				displayName: "Old name 2",
				role: ParticipantRole.VotingMember,
			});
			const { result } = renderHook(() =>
				createGameStateStore({
					game: {
						...GAME_MOCK,
						name: "Old name",
						settings: {
							...GAME_MOCK.settings,
							isAutoRevealCards: false,
							autoRevealPeriod: 0,
						},
						participants: [participant1, participant2],
					},
					currentParticipant: MASTER_PARTICIPANT,
				}),
			);
			const store = result.current;
			store.getState().updateSettings({
				name: "New name",
				isAutoRevealCards: true,
				autoRevealPeriod: 10,
				updatedParticipants: [
					{
						...participant1,
						displayName: "New name 1",
						role: ParticipantRole.VotingMember,
					},
					{
						...participant2,
						displayName: "New name 1",
						role: ParticipantRole.Master,
					},
				],
			});
			expect(store.getState().state.game.name).toBe("New name");
			expect(store.getState().state.game.settings).toEqual(
				expect.objectContaining({
					isAutoRevealCards: true,
					autoRevealPeriod: 10,
				}),
			);
			expect(store.getState().state.game.participants).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						id: "test-participant-id-1",
						displayName: "New name 1",
						role: ParticipantRole.VotingMember,
					}),
					expect.objectContaining({
						id: "test-participant-id-2",
						displayName: "New name 1",
						role: ParticipantRole.Master,
					}),
				]),
			);
		});

		test("updateCurrentParticipant - updates currentParticipant", async () => {
			const { result } = renderHook(() =>
				createGameStateStore({
					game: {
						...GAME_MOCK,
					},
					currentParticipant: MASTER_PARTICIPANT,
				}),
			);
			const store = result.current;

			expect(store.getState().state.currentParticipant).toEqual(
				MASTER_PARTICIPANT,
			);
			const updatedParticipant = {
				...MASTER_PARTICIPANT,
				displayName: "Updated name",
				role: ParticipantRole.VotingMember,
			};
			store.getState().updateCurrentParticipant(updatedParticipant);
			expect(store.getState().state.currentParticipant).toEqual(
				expect.objectContaining({
					displayName: "Updated name",
					role: ParticipantRole.VotingMember,
				}),
			);
		});
	});
});
