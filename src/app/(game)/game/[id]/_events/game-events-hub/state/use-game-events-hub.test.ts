import { vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { GameEventType, ParticipantJoinedEvent } from "../events";
import { ParticipantRole } from "@/src/domain/entities/game";
import { generateParticipant } from "@/__mocks__/game";

const gameHubManagerInstanceMock = {
	connect: vi.fn(),
	disconnect: vi.fn(),
	eventEmitter: new EventTarget(),
};
const gameHubManagerMock = {
	getInstance: vi.fn().mockReturnValue(gameHubManagerInstanceMock),
};

vi.mock("./game-connection-manager", () => ({
	GameHubManager: gameHubManagerMock,
}));

describe("useGameEventsHub", () => {
	let useGameEventsHub: typeof import("./use-game-events-hub").useGameEventsHub;

	beforeEach(async () => {
		vi.resetModules();
		vi.clearAllMocks();
		const moduleM = await import("./use-game-events-hub");
		useGameEventsHub = moduleM.useGameEventsHub;
	});

	test("should return event subscriber", () => {
		const { result } = renderHook(() =>
			useGameEventsHub({
				gameId: "123",
				accessTokenFactory: async () => "123",
			}),
		);
		expect(result.current).toBeDefined();
		expect(gameHubManagerInstanceMock.connect).toHaveBeenCalled();
		expect(gameHubManagerInstanceMock.disconnect).not.toHaveBeenCalled();
		expect(gameHubManagerInstanceMock.eventEmitter).toBeDefined();
	});

	test("should disconnect when the component unmounts", () => {
		const { unmount } = renderHook(() =>
			useGameEventsHub({
				gameId: "123",
				accessTokenFactory: async () => "123",
			}),
		);
		unmount();
		expect(gameHubManagerInstanceMock.disconnect).toHaveBeenCalled();
	});

	test("should return event subscriber", () => {
		const { result } = renderHook(() =>
			useGameEventsHub({
				gameId: "123",
				accessTokenFactory: async () => "123",
			}),
		);
		expect(result.current).toBeDefined();
	});

	test("should subscribe to events", () => {
		const { result } = renderHook(() =>
			useGameEventsHub({
				gameId: "123",
				accessTokenFactory: async () => "123",
			}),
		);
		const eventSubscriber = result.current;
		const handler = vi.fn();
		eventSubscriber(GameEventType.ParticipantJoined, handler);

		const event = new ParticipantJoinedEvent(
			generateParticipant({
				id: "123",
				role: ParticipantRole.VotingMember,
			}),
		);
		gameHubManagerInstanceMock.eventEmitter.dispatchEvent(event);
		expect(handler).toHaveBeenCalledWith(event);
	});

	test("should unsubscribe from events", () => {
		const { result } = renderHook(() =>
			useGameEventsHub({
				gameId: "123",
				accessTokenFactory: async () => "123",
			}),
		);
		const eventSubscriber = result.current;
		const handler = vi.fn();
		const unsubscribe = eventSubscriber(
			GameEventType.ParticipantJoined,
			handler,
		);
		unsubscribe();
		const event = new ParticipantJoinedEvent(
			generateParticipant({
				id: "123",
				role: ParticipantRole.VotingMember,
			}),
		);
		gameHubManagerInstanceMock.eventEmitter.dispatchEvent(event);
		expect(handler).not.toHaveBeenCalled();
	});

	test("disconnects when the component unmounts", () => {
		const { unmount } = renderHook(() =>
			useGameEventsHub({
				gameId: "123",
				accessTokenFactory: async () => "123",
			}),
		);
		unmount();
		expect(gameHubManagerInstanceMock.disconnect).toHaveBeenCalled();
	});
});
