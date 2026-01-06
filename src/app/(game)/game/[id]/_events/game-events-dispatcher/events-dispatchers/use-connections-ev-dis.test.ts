import { test, describe, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@/test/utilities";
import { useConnectionsEvDis } from "./use-connections-ev-dis";
import {
	ConnectionEvent,
	GameEventType,
	EventSubscriber,
} from "../../game-events-hub";
import { createGameStateStore } from "../../../_store";
import { generateGame, generateParticipant } from "@/__mocks__/game";
import { GameRoomFakeProviderWrapper } from "../../../__mocks__";
import { StoreApi } from "zustand";
import { GameStateStore } from "../../../_store/game-state-store.model";

// Mock next/navigation
const mockRefresh = vi.fn();
vi.mock("next/navigation", () => ({
	useRouter: () => ({
		refresh: mockRefresh,
	}),
}));

describe("useConnectionsEvDis", () => {
	let eventSubscriber: EventSubscriber;
	let gameStateStore: StoreApi<GameStateStore>;
	let unsubscribeFn: () => void;
	let eventHandlers: Map<GameEventType, (event: ConnectionEvent) => void>;

	beforeEach(() => {
		vi.clearAllMocks();
		mockRefresh.mockClear();
		eventHandlers = new Map();

		// Create a mock event subscriber
		eventSubscriber = vi.fn(
			(
				eventType: GameEventType,
				handler: (event: ConnectionEvent) => void,
			) => {
				eventHandlers.set(eventType, handler);
				unsubscribeFn = vi.fn(() => {
					eventHandlers.delete(eventType);
				});
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

	test("subscribes to ConnectionEvent on mount", () => {
		renderHookWithMocks();

		expect(eventSubscriber).toHaveBeenCalledWith(
			GameEventType.ConnectionEvent,
			expect.any(Function),
		);
		expect(eventHandlers.has(GameEventType.ConnectionEvent)).toBe(true);
	});

	test("updates liveStatus when ConnectionEvent is received", () => {
		renderHookWithMocks();

		const handler = eventHandlers.get(GameEventType.ConnectionEvent);
		expect(handler).toBeDefined();

		const event = new ConnectionEvent({ status: "connecting" });
		handler!(event);

		const state = gameStateStore.getState();
		expect(state.liveStatus).toEqual(
			expect.objectContaining({
				status: "connecting",
			}),
		);
	});

	test("calls router.refresh() when connection status is 'connected'", () => {
		renderHookWithMocks();

		const handler = eventHandlers.get(GameEventType.ConnectionEvent);
		expect(handler).toBeDefined();

		const event = new ConnectionEvent({ status: "connected" });
		handler!(event);

		expect(mockRefresh).toHaveBeenCalledTimes(1);
		const state = gameStateStore.getState();
		expect(state.liveStatus).toEqual(
			expect.objectContaining({
				status: "connected",
			}),
		);
	});

	test("does not call router.refresh() when connection status is not 'connected'", () => {
		renderHookWithMocks();

		const handler = eventHandlers.get(GameEventType.ConnectionEvent);
		expect(handler).toBeDefined();

		const connectingEvent = new ConnectionEvent({ status: "connecting" });
		handler!(connectingEvent);
		expect(mockRefresh).not.toHaveBeenCalled();

		const failedEvent = new ConnectionEvent({
			status: "failed",
			reason: new Error("Connection failed"),
		});
		handler!(failedEvent);
		expect(mockRefresh).not.toHaveBeenCalled();

		const reconnectingEvent = new ConnectionEvent({
			status: "reconnecting",
			reason: new Error("Reconnecting"),
		});
		handler!(reconnectingEvent);
		expect(mockRefresh).not.toHaveBeenCalled();

		const disconnectedEvent = new ConnectionEvent({
			status: "disconnected",
		});
		handler!(disconnectedEvent);
		expect(mockRefresh).not.toHaveBeenCalled();
	});

	test("handles all connection status types correctly", () => {
		renderHookWithMocks();

		const handler = eventHandlers.get(GameEventType.ConnectionEvent);
		expect(handler).toBeDefined();

		const statuses = [
			{ status: "connecting" as const },
			{ status: "connected" as const },
			{ status: "failed" as const, reason: new Error("Failed") },
			{
				status: "reconnecting" as const,
				reason: new Error("Reconnecting"),
			},
			{ status: "disconnected" as const },
		];

		statuses.forEach((payload) => {
			const event = new ConnectionEvent(payload);
			handler!(event);
			const state = gameStateStore.getState();
			expect(state.liveStatus).toEqual(expect.objectContaining(payload));
		});
	});

	test("unsubscribes from ConnectionEvent on unmount", () => {
		const { unmount } = renderHookWithMocks();

		expect(eventHandlers.has(GameEventType.ConnectionEvent)).toBe(true);

		unmount();

		expect(unsubscribeFn).toHaveBeenCalled();
		expect(eventHandlers.has(GameEventType.ConnectionEvent)).toBe(false);
	});

	test("sets up window 'online' event listener on mount", () => {
		const addEventListenerSpy = vi.spyOn(window, "addEventListener");
		renderHookWithMocks();

		expect(addEventListenerSpy).toHaveBeenCalledWith(
			"online",
			expect.any(Function),
			expect.objectContaining({
				signal: expect.any(AbortSignal),
			}),
		);

		addEventListenerSpy.mockRestore();
	});

	test("calls router.refresh() when window 'online' event fires", () => {
		const addEventListenerSpy = vi.spyOn(window, "addEventListener");
		renderHookWithMocks();

		// Get the handler that was registered
		const onlineHandlerCall = addEventListenerSpy.mock.calls.find(
			(call) => call[0] === "online",
		);
		expect(onlineHandlerCall).toBeDefined();
		const onlineHandler = onlineHandlerCall![1] as () => void;

		// Simulate online event
		onlineHandler();

		expect(mockRefresh).toHaveBeenCalledTimes(1);

		addEventListenerSpy.mockRestore();
	});

	test("removes window 'online' event listener on unmount", () => {
		const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
		const addEventListenerSpy = vi.spyOn(window, "addEventListener");

		const { unmount } = renderHookWithMocks();

		// Get the abort controller signal
		const onlineHandlerCall = addEventListenerSpy.mock.calls.find(
			(call) => call[0] === "online",
		);
		const abortSignal = (onlineHandlerCall![2] as { signal: AbortSignal })
			.signal;

		unmount();

		// Verify the abort signal was aborted (which removes the listener)
		expect(abortSignal.aborted).toBe(true);

		addEventListenerSpy.mockRestore();
		removeEventListenerSpy.mockRestore();
	});

	test("handles multiple connection events correctly", () => {
		renderHookWithMocks();

		const handler = eventHandlers.get(GameEventType.ConnectionEvent);
		expect(handler).toBeDefined();

		// Simulate connection lifecycle
		handler!(new ConnectionEvent({ status: "connecting" }));
		expect(gameStateStore.getState().liveStatus.status).toBe("connecting");

		handler!(new ConnectionEvent({ status: "connected" }));
		expect(gameStateStore.getState().liveStatus.status).toBe("connected");
		expect(mockRefresh).toHaveBeenCalledTimes(1);

		handler!(new ConnectionEvent({ status: "disconnected" }));
		expect(gameStateStore.getState().liveStatus.status).toBe(
			"disconnected",
		);
		expect(mockRefresh).toHaveBeenCalledTimes(1); // Still only called once
	});

	function renderHookWithMocks() {
		return renderHook(
			() =>
				useConnectionsEvDis({
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
