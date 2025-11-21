import { test, describe, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@/test/utilities";
import { useParticipantsEvDis } from "./use-participants-ev-dis";
import {
	ParticipantJoinedEvent,
	ParticipantLeftEvent,
	ParticipantVotedEvent,
	CurrentParticipantUpdatedEvent,
	GameEventType,
	EventSubscriber,
} from "../../game-events-hub";
import { createGameStateStore } from "../../store";
import {
	generateGame,
	generateParticipant,
	generateVote,
	generateVotingSystem,
} from "../../../__tests__/game-state-store.test-helpers";
import { GameRoomFakeProviderWrapper } from "../../../__mocks__";
import { StoreApi } from "zustand";
import { GameStateStore } from "../../store/game-state-store.model";
import { ParticipantRole } from "@/_src/shared/api";

// Mock useGlobalToast
const mockAddToast = vi.fn();
vi.mock("@/_src/shared/ui/components/toast", async (importOriginal) => {
	const actual =
		await importOriginal<
			typeof import("@/_src/shared/ui/components/toast")
		>();
	return {
		...actual,
		useGlobalToast: vi.fn(() => ({
			add: mockAddToast,
		})),
	};
});

describe("useParticipantsEvDis", () => {
	let eventSubscriber: EventSubscriber;
	let gameStateStore: StoreApi<GameStateStore>;
	let unsubscribeFns: Map<GameEventType, () => void>;
	let eventHandlers: Map<
		GameEventType,
		(
			event:
				| ParticipantJoinedEvent
				| ParticipantLeftEvent
				| ParticipantVotedEvent
				| CurrentParticipantUpdatedEvent,
		) => void
	>;

	beforeEach(() => {
		vi.clearAllMocks();
		mockAddToast.mockClear();
		eventHandlers = new Map();
		unsubscribeFns = new Map();

		// Create a mock event subscriber
		eventSubscriber = vi.fn(
			(
				eventType: GameEventType,
				handler: (
					event:
						| ParticipantJoinedEvent
						| ParticipantLeftEvent
						| ParticipantVotedEvent
						| CurrentParticipantUpdatedEvent,
				) => void,
			) => {
				eventHandlers.set(eventType, handler);
				const unsubscribeFn = vi.fn(() => {
					eventHandlers.delete(eventType);
					unsubscribeFns.delete(eventType);
				});
				unsubscribeFns.set(eventType, unsubscribeFn);
				return unsubscribeFn;
			},
		) as EventSubscriber;

		// Create a real store instance
		gameStateStore = createGameStateStore({
			game: generateGame({}),
			currentParticipant: generateParticipant({}),
		});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	test("renders successfully", () => {
		const { unmount } = renderHookWithMocks();
		expect(() => unmount()).not.toThrow();
	});

	describe("when ParticipantJoined event is received", () => {
		test("subscribes to ParticipantJoined event on mount", () => {
			renderHookWithMocks();

			expect(eventSubscriber).toHaveBeenCalledWith(
				GameEventType.ParticipantJoined,
				expect.any(Function),
			);
			expect(eventHandlers.has(GameEventType.ParticipantJoined)).toBe(
				true,
			);
		});

		test("calls joinParticipant when ParticipantJoined event is received", () => {
			renderHookWithMocks();

			const handler = eventHandlers.get(GameEventType.ParticipantJoined);
			expect(handler).toBeDefined();

			const participant = generateParticipant({
				id: "participant-1",
				displayName: "Test User",
				role: ParticipantRole.VotingMember,
			});

			const event = new ParticipantJoinedEvent(participant);
			handler!(event);

			const state = gameStateStore.getState();
			const joinedParticipant = state.state.game.participants.find(
				(p) => p.id === participant.id,
			);
			expect(joinedParticipant).toBeDefined();
			expect(joinedParticipant?.id).toBe(participant.id);
			expect(joinedParticipant?.displayName).toBe(
				participant.displayName,
			);
			expect(joinedParticipant?.online).toBe(true);
		});

		test("updates existing participant online status when participant already exists", () => {
			const existingParticipant = generateParticipant({
				id: "participant-1",
				displayName: "Existing User",
				online: false,
			});

			gameStateStore = createGameStateStore({
				game: generateGame({
					participants: [existingParticipant],
				}),
				currentParticipant: generateParticipant({}),
			});

			renderHookWithMocks();

			const handler = eventHandlers.get(GameEventType.ParticipantJoined);
			const event = new ParticipantJoinedEvent(existingParticipant);
			handler!(event);

			const state = gameStateStore.getState();
			const updatedParticipant = state.state.game.participants.find(
				(p) => p.id === existingParticipant.id,
			);
			expect(updatedParticipant?.online).toBe(true);
		});

		test("unsubscribes from ParticipantJoined event on unmount", () => {
			const { unmount } = renderHookWithMocks();

			expect(eventHandlers.has(GameEventType.ParticipantJoined)).toBe(
				true,
			);

			const unsubscribeFn = unsubscribeFns.get(
				GameEventType.ParticipantJoined,
			);
			expect(unsubscribeFn).toBeDefined();

			unmount();

			expect(unsubscribeFn).toHaveBeenCalled();
			expect(eventHandlers.has(GameEventType.ParticipantJoined)).toBe(
				false,
			);
		});
	});

	describe("when ParticipantLeft event is received", () => {
		test("subscribes to ParticipantLeft event on mount", () => {
			renderHookWithMocks();

			expect(eventSubscriber).toHaveBeenCalledWith(
				GameEventType.ParticipantLeft,
				expect.any(Function),
			);
			expect(eventHandlers.has(GameEventType.ParticipantLeft)).toBe(true);
		});

		test("calls disconnectParticipant when ParticipantLeft event is received", () => {
			const participant = generateParticipant({
				id: "participant-1",
				userId: "user-1",
				online: true,
			});

			gameStateStore = createGameStateStore({
				game: generateGame({
					participants: [participant],
				}),
				currentParticipant: generateParticipant({}),
			});

			renderHookWithMocks();

			const handler = eventHandlers.get(GameEventType.ParticipantLeft);
			expect(handler).toBeDefined();

			const event = new ParticipantLeftEvent({
				userId: participant.userId,
			});
			handler!(event);

			const state = gameStateStore.getState();
			const disconnectedParticipant = state.state.game.participants.find(
				(p) => p.userId === participant.userId,
			);
			expect(disconnectedParticipant?.online).toBe(false);
		});

		test("handles ParticipantLeft event for non-existent participant gracefully", () => {
			// Create a store with no participants
			gameStateStore = createGameStateStore({
				game: generateGame({
					participants: [],
				}),
				currentParticipant: generateParticipant({}),
			});

			renderHookWithMocks();

			const handler = eventHandlers.get(GameEventType.ParticipantLeft);
			const event = new ParticipantLeftEvent({
				userId: "non-existent-user",
			});

			expect(() => handler!(event)).not.toThrow();

			const state = gameStateStore.getState();
			expect(state.state.game.participants.length).toBe(0);
		});

		test("unsubscribes from ParticipantLeft event on unmount", () => {
			const { unmount } = renderHookWithMocks();

			expect(eventHandlers.has(GameEventType.ParticipantLeft)).toBe(true);

			const unsubscribeFn = unsubscribeFns.get(
				GameEventType.ParticipantLeft,
			);
			expect(unsubscribeFn).toBeDefined();

			unmount();

			expect(unsubscribeFn).toHaveBeenCalled();
			expect(eventHandlers.has(GameEventType.ParticipantLeft)).toBe(
				false,
			);
		});
	});

	describe("when ParticipantVoted event is received", () => {
		test("subscribes to ParticipantVoted event on mount", () => {
			renderHookWithMocks();

			expect(eventSubscriber).toHaveBeenCalledWith(
				GameEventType.ParticipantVoted,
				expect.any(Function),
			);
			expect(eventHandlers.has(GameEventType.ParticipantVoted)).toBe(
				true,
			);
		});

		test("calls changeVoteForParticipant when ParticipantVoted event is received", () => {
			const participant = generateParticipant({
				id: "participant-1",
				vote: null,
			});

			const votingSystemId = "voting-system-1";
			gameStateStore = createGameStateStore({
				game: generateGame({
					participants: [participant],
					votingSystem: generateVotingSystem({
						id: votingSystemId,
						votes: [
							generateVote({
								id: "vote-1",
								value: "5",
								order: 1,
								suit: "⚡",
								votingSystemId,
							}),
						],
					}),
				}),
				currentParticipant: generateParticipant({}),
			});

			renderHookWithMocks();

			const handler = eventHandlers.get(GameEventType.ParticipantVoted);
			expect(handler).toBeDefined();

			const event = new ParticipantVotedEvent({
				participantId: participant.id,
				voteId: "vote-1",
			});
			handler!(event);

			const state = gameStateStore.getState();
			const votedParticipant = state.state.game.participants.find(
				(p) => p.id === participant.id,
			);
			expect(votedParticipant?.vote).toEqual(
				expect.objectContaining({
					id: "vote-1",
					value: "5",
					order: 1,
					suit: "⚡",
				}),
			);
		});

		test("sets vote to null when voteId is null", () => {
			const votingSystemId = "voting-system-1";
			const participant = generateParticipant({
				id: "participant-1",
				vote: { id: "vote-1", value: "5", order: 1, suit: "⚡" },
			});

			gameStateStore = createGameStateStore({
				game: generateGame({
					participants: [participant],
					votingSystem: generateVotingSystem({
						id: votingSystemId,
						votes: [
							generateVote({
								id: "vote-1",
								value: "5",
								order: 1,
								suit: "⚡",
								votingSystemId,
							}),
						],
					}),
				}),
				currentParticipant: generateParticipant({}),
			});

			renderHookWithMocks();

			const handler = eventHandlers.get(GameEventType.ParticipantVoted);
			const event = new ParticipantVotedEvent({
				participantId: participant.id,
				voteId: null,
			});
			handler!(event);

			const state = gameStateStore.getState();
			const votedParticipant = state.state.game.participants.find(
				(p) => p.id === participant.id,
			);
			expect(votedParticipant?.vote).toBeNull();
		});

		test("handles ParticipantVoted event for non-existent participant gracefully", () => {
			renderHookWithMocks();

			const handler = eventHandlers.get(GameEventType.ParticipantVoted);
			const event = new ParticipantVotedEvent({
				participantId: "non-existent-participant",
				voteId: "vote-1",
			});

			expect(() => handler!(event)).not.toThrow();
		});

		test("unsubscribes from ParticipantVoted event on unmount", () => {
			const { unmount } = renderHookWithMocks();

			expect(eventHandlers.has(GameEventType.ParticipantVoted)).toBe(
				true,
			);

			const unsubscribeFn = unsubscribeFns.get(
				GameEventType.ParticipantVoted,
			);
			expect(unsubscribeFn).toBeDefined();

			unmount();

			expect(unsubscribeFn).toHaveBeenCalled();
			expect(eventHandlers.has(GameEventType.ParticipantVoted)).toBe(
				false,
			);
		});
	});

	describe("when CurrentParticipantUpdated event is received", () => {
		test("subscribes to CurrentParticipantUpdated event on mount", () => {
			renderHookWithMocks();

			expect(eventSubscriber).toHaveBeenCalledWith(
				GameEventType.CurrentParticipantUpdated,
				expect.any(Function),
			);
			expect(
				eventHandlers.has(GameEventType.CurrentParticipantUpdated),
			).toBe(true);
		});

		test("calls updateCurrentParticipant when CurrentParticipantUpdated event is received", () => {
			const currentParticipant = generateParticipant({
				id: "current-participant-1",
				displayName: "Current User",
				role: ParticipantRole.VotingMember,
			});

			gameStateStore = createGameStateStore({
				game: generateGame({}),
				currentParticipant,
			});

			renderHookWithMocks();

			const handler = eventHandlers.get(
				GameEventType.CurrentParticipantUpdated,
			);
			expect(handler).toBeDefined();

			const updatedParticipant = generateParticipant({
				...currentParticipant,
				displayName: "Updated User",
			});

			const event = new CurrentParticipantUpdatedEvent(
				updatedParticipant,
			);
			handler!(event);

			const state = gameStateStore.getState();
			expect(state.state.currentParticipant.displayName).toBe(
				"Updated User",
			);
		});

		test("shows toast notification when role changes", () => {
			const currentParticipant = generateParticipant({
				id: "current-participant-1",
				role: ParticipantRole.VotingMember,
			});

			gameStateStore = createGameStateStore({
				game: generateGame({}),
				currentParticipant,
			});

			renderHookWithMocks();

			const handler = eventHandlers.get(
				GameEventType.CurrentParticipantUpdated,
			);

			const updatedParticipant = generateParticipant({
				...currentParticipant,
				role: ParticipantRole.Manager,
			});

			const event = new CurrentParticipantUpdatedEvent(
				updatedParticipant,
			);
			handler!(event);

			expect(mockAddToast).toHaveBeenCalledTimes(1);
			expect(mockAddToast).toHaveBeenCalledWith({
				title: "Your role has been updated!",
				variant: "info",
				description: "Your new role is Game Manager",
			});
		});

		test("does not show toast notification when role does not change", () => {
			const currentParticipant = generateParticipant({
				id: "current-participant-1",
				role: ParticipantRole.VotingMember,
			});

			gameStateStore = createGameStateStore({
				game: generateGame({}),
				currentParticipant,
			});

			renderHookWithMocks();

			const handler = eventHandlers.get(
				GameEventType.CurrentParticipantUpdated,
			);

			const updatedParticipant = generateParticipant({
				...currentParticipant,
				displayName: "Updated Name",
				role: ParticipantRole.VotingMember, // Same role
			});

			const event = new CurrentParticipantUpdatedEvent(
				updatedParticipant,
			);
			handler!(event);

			expect(mockAddToast).not.toHaveBeenCalled();
		});

		test.each([
			{
				initialRole: ParticipantRole.VotingMember,
				newRole: ParticipantRole.Master,
				expectedName: "Game Master",
			},
			{
				initialRole: ParticipantRole.Master,
				newRole: ParticipantRole.Manager,
				expectedName: "Game Manager",
			},
			{
				initialRole: ParticipantRole.Manager,
				newRole: ParticipantRole.VotingMember,
				expectedName: "Voting Memeber",
			},
			{
				initialRole: ParticipantRole.VotingMember,
				newRole: ParticipantRole.Spectator,
				expectedName: "Spectator",
			},
		])(
			"shows toast with correct role name when role changes from $initialRole to $newRole",
			({ initialRole, newRole, expectedName }) => {
				const currentParticipant = generateParticipant({
					id: "current-participant-1",
					role: initialRole,
				});

				gameStateStore = createGameStateStore({
					game: generateGame({}),
					currentParticipant,
				});

				const { unmount } = renderHookWithMocks();

				const handler = eventHandlers.get(
					GameEventType.CurrentParticipantUpdated,
				);

				const updatedParticipant = generateParticipant({
					...currentParticipant,
					role: newRole,
				});

				const event = new CurrentParticipantUpdatedEvent(
					updatedParticipant,
				);
				handler!(event);

				expect(mockAddToast).toHaveBeenCalledWith({
					title: "Your role has been updated!",
					variant: "info",
					description: `Your new role is ${expectedName}`,
				});

				unmount();
			},
		);

		test("unsubscribes from CurrentParticipantUpdated event on unmount", () => {
			const { unmount } = renderHookWithMocks();

			expect(
				eventHandlers.has(GameEventType.CurrentParticipantUpdated),
			).toBe(true);

			const unsubscribeFn = unsubscribeFns.get(
				GameEventType.CurrentParticipantUpdated,
			);
			expect(unsubscribeFn).toBeDefined();

			unmount();

			expect(unsubscribeFn).toHaveBeenCalled();
			expect(
				eventHandlers.has(GameEventType.CurrentParticipantUpdated),
			).toBe(false);
		});
	});

	describe("edge cases", () => {
		test("handles multiple events correctly", () => {
			const participant1 = generateParticipant({
				id: "participant-1",
				userId: "user-1",
			});
			const participant2 = generateParticipant({
				id: "participant-2",
				userId: "user-2",
			});

			gameStateStore = createGameStateStore({
				game: generateGame({
					participants: [participant1],
				}),
				currentParticipant: generateParticipant({}),
			});

			renderHookWithMocks();

			// Join participant 2
			const joinHandler = eventHandlers.get(
				GameEventType.ParticipantJoined,
			);
			joinHandler!(new ParticipantJoinedEvent(participant2));

			// Participant 1 leaves
			const leaveHandler = eventHandlers.get(
				GameEventType.ParticipantLeft,
			);
			leaveHandler!(
				new ParticipantLeftEvent({ userId: participant1.userId }),
			);

			const state = gameStateStore.getState();
			expect(state.state.game.participants).toHaveLength(2);
			expect(
				state.state.game.participants.find(
					(p) => p.id === participant1.id,
				)?.online,
			).toBe(false);
			expect(
				state.state.game.participants.find(
					(p) => p.id === participant2.id,
				)?.online,
			).toBe(true);
		});

		test("handles rapid event sequences", () => {
			const participant = generateParticipant({
				id: "participant-1",
				userId: "user-1",
			});

			const votingSystemId = "voting-system-1";
			gameStateStore = createGameStateStore({
				game: generateGame({
					participants: [participant],
					votingSystem: generateVotingSystem({
						id: votingSystemId,
						votes: [
							generateVote({
								id: "vote-1",
								value: "5",
								order: 1,
								suit: "⚡",
								votingSystemId,
							}),
							generateVote({
								id: "vote-2",
								value: "8",
								order: 2,
								suit: "🚀",
								votingSystemId,
							}),
						],
					}),
				}),
				currentParticipant: generateParticipant({}),
			});

			renderHookWithMocks();

			const voteHandler = eventHandlers.get(
				GameEventType.ParticipantVoted,
			);

			// Rapid vote changes
			voteHandler!(
				new ParticipantVotedEvent({
					participantId: participant.id,
					voteId: "vote-1",
				}),
			);
			voteHandler!(
				new ParticipantVotedEvent({
					participantId: participant.id,
					voteId: "vote-2",
				}),
			);
			voteHandler!(
				new ParticipantVotedEvent({
					participantId: participant.id,
					voteId: null,
				}),
			);

			const state = gameStateStore.getState();
			const votedParticipant = state.state.game.participants.find(
				(p) => p.id === participant.id,
			);
			expect(votedParticipant?.vote).toBeNull();
		});
	});

	function renderHookWithMocks() {
		return renderHook(
			() =>
				useParticipantsEvDis({
					eventSubscriber,
					gameStateStore,
				}),
			{
				wrapper: GameRoomFakeProviderWrapper({
					gameStateStore,
				}),
			},
		);
	}
});
