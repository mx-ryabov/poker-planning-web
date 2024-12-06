import { test, describe, expect } from "vitest";
import { renderHook } from "@/test/utilities";
import { createGameStateStore } from "../game-state-store";
import { GameManagementTab } from "../game-management-slice/game-managemet.model";
import { GAME_MOCK, PARTICIPANT_MOCK } from "./game-state-store.mocks";
import { MASTER_PARTICIPANT } from "@/_src/shared/mocks/game/participant";

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
		test("adds participants", async () => {
			const { result } = renderHook(() =>
				createGameStateStore({
					game: GAME_MOCK,
					currentParticipant: MASTER_PARTICIPANT,
				}),
			);
			const store = result.current;

			expect(store.getState().state.game.participants).toHaveLength(1);
			store.getState().addParticipant(PARTICIPANT_MOCK);
			expect(store.getState().state.game.participants).toHaveLength(2);
			expect(store.getState().state.game.participants[1]).toBe(
				PARTICIPANT_MOCK,
			);
		});
	});
});
