import { test, describe, expect } from "vitest";
import { renderHook } from "@/test/utilities";
import { GetGameByIdResponse } from "@/_src/shared/api/game-api";
import { createGameStateStore } from "../game-state-store";
import { GameManagementTab } from "../game-management-slice/game-managemet.model";
import { GAME_MOCK, PARTICIPANT_MOCK } from "./game-state-store.mocks";

describe("Game State Store", () => {
	test("has a correct initial value", async () => {
		const { result } = renderHook(() => createGameStateStore(GAME_MOCK));
		const state = result.current.getState();

		expect(state.activeTab).toBe(null);
		expect(state.state).toBe(GAME_MOCK);
	});

	describe("Game Managemet Slice", () => {
		test("changes the active tab", async () => {
			const { result } = renderHook(() =>
				createGameStateStore(GAME_MOCK),
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
				createGameStateStore(GAME_MOCK),
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
				createGameStateStore(GAME_MOCK),
			);
			const store = result.current;

			expect(store.getState().state.participants).toHaveLength(1);
			store.getState().addParticipant(PARTICIPANT_MOCK);
			expect(store.getState().state.participants).toHaveLength(2);
			expect(store.getState().state.participants[1]).toBe(
				PARTICIPANT_MOCK,
			);
		});
	});
});
