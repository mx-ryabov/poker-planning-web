import { test, describe, expect, vi, beforeEach } from "vitest";
import { act, renderHook } from "@/test/utilities";
import {
	useSettingsUpdate,
	UseSettingsUpdateProps,
} from "./use-settings-update";
import { GameRoomFakeProviderWrapper } from "../../__mocks__";
import { createGameStateStore } from "../../_store";
import { generateGame, generateParticipant } from "@/__mocks__/game";
import { GameParticipant, ParticipantRole } from "@/src/domain/entities/game";
import { generateUnknownErrorRes } from "@/__mocks__/common/error-responses";

describe("UseSettingsUpdate hook", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("renders correctly", async () => {
		const { unmount, result } = renderSettingsUpdateHook({});

		expect(result.current).toBeDefined();
		expect(result.current.mutate).toBeDefined();
		expect(result.current.isPending).toBe(false);
		expect(result.current.error).toBeNull();
		expect(() => unmount()).not.toThrow();
	});

	test("invokes api.game.updateSettings when mutate fn was called if no scheme was provided", async () => {
		const { result } = renderSettingsUpdateHook({});

		await act(() =>
			result.current.mutate({
				name: "test",
				autoRevealPeriod: 10,
				isAutoRevealCards: true,
				gameMasterId: "test-game-master-id",
			}),
		);

		expect(updateSettingsAction).toHaveBeenCalledWith("test-game-id", {
			name: "test",
			autoRevealPeriod: 10,
			isAutoRevealCards: true,
			gameMasterId: "test-game-master-id",
		});
	});

	test("updates settigns, name and edited participants in the store if api.game.updateSettings was successful", async () => {
		updateSettingsAction.mockResolvedValue({
			name: "test",
			autoRevealPeriod: 10,
			isAutoRevealCards: true,
			updatedParticipants: [
				generateParticipant({
					id: "test-participant-id-1",
					role: ParticipantRole.VotingMember,
					displayName: "updated voting memeber 1",
				}),
				generateParticipant({
					id: "test-participant-id-2",
					role: ParticipantRole.Master,
					displayName: "updated voting memeber 2",
				}),
			],
		});

		const { result, gameStateStore } = renderSettingsUpdateHook({});

		await act(() =>
			result.current.mutate({
				name: "test",
				autoRevealPeriod: 10,
				isAutoRevealCards: true,
				gameMasterId: "test-participant-id-2",
			}),
		);

		expect(gameStateStore.getState().state.game.settings).toEqual(
			expect.objectContaining({
				autoRevealPeriod: 10,
				isAutoRevealCards: true,
			}),
		);
		expect(gameStateStore.getState().state.game.name).toBe("test");
		expect(gameStateStore.getState().state.game.participants).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					id: "test-participant-id-1",
					role: ParticipantRole.VotingMember,
					displayName: "updated voting memeber 1",
				}),
				expect.objectContaining({
					id: "test-participant-id-2",
					role: ParticipantRole.Master,
					displayName: "updated voting memeber 2",
				}),
			]),
		);
	});

	test("doesn't update settigns, name and edited participants in the store if api.game.updateSettings has failed", async () => {
		updateSettingsAction.mockRejectedValue(new Error("test error"));

		const { result, gameStateStore } = renderSettingsUpdateHook({});

		const settingsBeforeUpdate = {
			...gameStateStore.getState().state.game.settings,
		};
		const nameBeforeUpdate = gameStateStore.getState().state.game.name;
		const participantsBeforeUpdate = [
			...gameStateStore.getState().state.game.participants,
		];

		await act(() =>
			result.current.mutate({
				name: "test",
				autoRevealPeriod: 10,
				isAutoRevealCards: true,
				gameMasterId: "test-participant-id-2",
			}),
		);

		expect(gameStateStore.getState().state.game.settings).toEqual(
			settingsBeforeUpdate,
		);
		expect(gameStateStore.getState().state.game.name).toBe(
			nameBeforeUpdate,
		);
		expect(gameStateStore.getState().state.game.participants).toEqual(
			expect.arrayContaining(
				participantsBeforeUpdate.map((p) => expect.objectContaining(p)),
			),
		);
	});

	test("updates the current participant in the store if api.game.updateSettings was successful", async () => {
		updateSettingsAction.mockResolvedValue({
			name: "test",
			autoRevealPeriod: 10,
			isAutoRevealCards: true,
			updatedParticipants: [
				generateParticipant({
					id: "test-participant-id-1",
					role: ParticipantRole.VotingMember,
					displayName: "updated voting memeber 1",
				}),
				generateParticipant({
					id: "test-participant-id-2",
					role: ParticipantRole.Master,
					displayName: "updated voting memeber 2",
				}),
			],
		});

		const { result, gameStateStore } = renderSettingsUpdateHook({
			curentParticipant: generateParticipant({
				id: "test-participant-id-1",
				role: ParticipantRole.Master,
			}),
			participants: [
				generateParticipant({
					id: "test-participant-id-1",
					role: ParticipantRole.Master,
					displayName: "active voting memeber 1",
				}),
				generateParticipant({
					id: "test-participant-id-2",
					role: ParticipantRole.VotingMember,
					displayName: "active voting memeber 2",
				}),
			],
		});

		await act(() =>
			result.current.mutate({
				name: "test",
				autoRevealPeriod: 10,
				isAutoRevealCards: true,
				gameMasterId: "test-participant-id-2",
			}),
		);

		expect(gameStateStore.getState().state.currentParticipant).toEqual(
			expect.objectContaining({
				id: "test-participant-id-1",
				role: ParticipantRole.VotingMember,
			}),
		);
	});

	test("doesn't update the current participant in the store if api.game.updateSettings has failed", async () => {
		updateSettingsAction.mockResolvedValue(generateUnknownErrorRes("test"));

		const { result, gameStateStore } = renderSettingsUpdateHook({
			curentParticipant: generateParticipant({
				id: "test-participant-id-1",
				role: ParticipantRole.Master,
			}),
		});

		const oldCurrentParticipant = {
			...gameStateStore.getState().state.currentParticipant,
		};

		await act(() =>
			result.current.mutate({
				name: "test",
				autoRevealPeriod: 10,
				isAutoRevealCards: true,
				gameMasterId: "test-participant-id-2",
			}),
		);

		expect(gameStateStore.getState().state.currentParticipant).toEqual(
			expect.objectContaining(oldCurrentParticipant),
		);
	});

	test("calls onMutate callback if provided", async () => {
		const onMutate = vi.fn();

		const { result } = renderSettingsUpdateHook({
			onMutate,
		});

		await act(() =>
			result.current.mutate({
				name: "test",
				autoRevealPeriod: 10,
				isAutoRevealCards: true,
				gameMasterId: "test-participant-id-2",
			}),
		);

		expect(onMutate).toHaveBeenCalled();
		expect(onMutate).toHaveBeenCalledWith({
			name: "test",
			autoRevealPeriod: 10,
			isAutoRevealCards: true,
			gameMasterId: "test-participant-id-2",
		});
	});
});

const updateSettingsAction = vi.fn();

type Props = {
	participants?: GameParticipant[];
	curentParticipant?: GameParticipant;
} & UseSettingsUpdateProps;

function renderSettingsUpdateHook({
	participants,
	curentParticipant,
	...hookProps
}: Props) {
	const gameStateStore = createGameStateStore({
		game: generateGame({
			id: "test-game-id",
			participants: participants || [
				generateParticipant({
					id: "test-participant-id-1",
					role: ParticipantRole.Master,
					displayName: "active voting memeber 1",
				}),
				generateParticipant({
					id: "test-participant-id-2",
					role: ParticipantRole.VotingMember,
					displayName: "active voting memeber 2",
				}),
			],
		}),
		currentParticipant:
			curentParticipant ||
			generateParticipant({
				id: "test-participant-id-1",
				role: ParticipantRole.Master,
			}),
	});
	const hookResult = renderHook(() => useSettingsUpdate(hookProps), {
		wrapper: GameRoomFakeProviderWrapper({
			apiProps: {
				game: {
					updateSettings: updateSettingsAction,
				},
			},
			gameStateStore: gameStateStore,
		}),
	});

	return { ...hookResult, gameStateStore };
}
