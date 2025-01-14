import { test, describe, expect } from "vitest";
import { renderHook } from "@/test/utilities";
import { createGameStateStore } from "../game-state-store";
import { GameManagementTab } from "../game-management-slice/game-managemet.model";
import { GAME_MOCK } from "./game-state-store.mocks";
import { MASTER_PARTICIPANT } from "@/_src/shared/mocks/game/participant";
import {
	generateParticipant,
	generateTicket,
} from "../../../__tests__/game-state-store.test-helpers";
import { ParticipantRole, TicketType } from "@/_src/shared/api";

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
	});
});
