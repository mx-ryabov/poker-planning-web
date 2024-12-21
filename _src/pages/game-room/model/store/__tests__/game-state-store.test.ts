import { test, describe, expect } from "vitest";
import { renderHook } from "@/test/utilities";
import { createGameStateStore } from "../game-state-store";
import { GameManagementTab } from "../game-management-slice/game-managemet.model";
import { GAME_MOCK } from "./game-state-store.mocks";
import { MASTER_PARTICIPANT } from "@/_src/shared/mocks/game/participant";
import { generateParticipant } from "../../../__tests__/game-state-store.test-helpers";
import { ParticipantRole } from "@/_src/shared/api";

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
	});
});
