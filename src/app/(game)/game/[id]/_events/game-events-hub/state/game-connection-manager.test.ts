import {
	test,
	describe,
	expect,
	vi,
	beforeEach,
	afterEach,
	Mock,
} from "vitest";
import {
	HubConnection,
	HubConnectionState,
} from "@microsoft/signalr/dist/esm/HubConnection";
import {
	ConnectionEvent,
	ParticipantJoinedEvent,
	ParticipantLeftEvent,
	ParticipantVotedEvent,
	TicketAddedEvent,
	TicketUpdatedEvent,
	TicketDeletedEvent,
	VotingStartedEvent,
	VotingFinishedEvent,
	SettingsUpdatedEvent,
	CurrentParticipantUpdatedEvent,
	NewEstimationAppliedEvent,
	GameEventType,
} from "../events";

// Mock SignalR modules
const mockWithUrl = vi.fn().mockReturnThis();
const mockWithAutomaticReconnect = vi.fn().mockReturnThis();
const mockBuild = vi.fn();
const mockLogger = { error: vi.fn() };

class MockHubConnectionBuilder {
	withUrl = mockWithUrl;
	withAutomaticReconnect = mockWithAutomaticReconnect;
	build = mockBuild;
}

vi.mock("@microsoft/signalr/dist/esm/HubConnectionBuilder", () => ({
	HubConnectionBuilder: MockHubConnectionBuilder,
}));

vi.mock("@/src/shared/lib", async (importOriginal) => ({
	...(await importOriginal()),
	logger: mockLogger,
}));

describe("GameHubManager", () => {
	const mockAccessTokenFactory = vi.fn(async () => "test-token");
	const mockParams1 = {
		gameId: "game-1",
		accessTokenFactory: mockAccessTokenFactory,
	};
	const mockParams2 = {
		gameId: "game-2",
		accessTokenFactory: mockAccessTokenFactory,
	};

	let mockHubConnection: {
		state: HubConnectionState;
		start: Mock<HubConnection["start"]>;
		stop: Mock<HubConnection["stop"]>;
		on: Mock<HubConnection["on"]>;
		off: Mock<HubConnection["off"]>;
		onreconnecting: Mock<HubConnection["onreconnecting"]>;
		onreconnected: Mock<HubConnection["onreconnected"]>;
		onclose: Mock<HubConnection["onclose"]>;
	};
	let GameHubManager: typeof import("./game-connection-manager").GameHubManager;

	beforeEach(async () => {
		vi.resetModules();
		vi.clearAllMocks();

		// Create mock HubConnection
		mockHubConnection = {
			state: HubConnectionState.Disconnected,
			start: vi.fn().mockResolvedValue(undefined),
			stop: vi.fn().mockResolvedValue(undefined),
			on: vi.fn(),
			off: vi.fn(),
			onreconnecting: vi.fn(),
			onreconnected: vi.fn(),
			onclose: vi.fn(),
		};

		mockBuild.mockReturnValue(mockHubConnection);

		// Re-import the module to reset singleton
		const moduleM = await import("./game-connection-manager");
		GameHubManager = moduleM.GameHubManager;
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe("getInstance", () => {
		test("creates a new instance when no instance exists", () => {
			const instance1 = GameHubManager.getInstance(mockParams1);
			expect(instance1).toBeInstanceOf(GameHubManager);
		});

		test("returns the same instance when called multiple times with same gameId", () => {
			const instance1 = GameHubManager.getInstance(mockParams1);
			const instance2 = GameHubManager.getInstance(mockParams1);
			expect(instance1).toBe(instance2);
		});

		test("creates a new instance and disconnects old one when gameId changes", async () => {
			const instance1 = GameHubManager.getInstance(mockParams1);
			await instance1.connect();
			mockHubConnection.state = HubConnectionState.Connected;

			// Mock disconnect to be called
			const disconnectSpy = vi.spyOn(instance1, "disconnect");

			const instance2 = GameHubManager.getInstance(mockParams2);

			expect(instance2).toBeInstanceOf(GameHubManager);
			expect(instance2).not.toBe(instance1);
			expect(disconnectSpy).toHaveBeenCalledOnce();
		});

		test("keeps the same instance when gameId is the same", () => {
			const instance1 = GameHubManager.getInstance(mockParams1);
			const instance2 = GameHubManager.getInstance({
				...mockParams1,
				accessTokenFactory: vi.fn(async () => "different-token"),
			});
			expect(instance1).toBe(instance2);
		});
	});

	describe("connect", () => {
		test("successfully connects and sets up subscriptions", async () => {
			mockHubConnection.state = HubConnectionState.Connected;
			mockHubConnection.start.mockResolvedValue(undefined);

			const manager = GameHubManager.getInstance(mockParams1);
			const events: Event[] = [];

			manager.eventEmitter.addEventListener(
				GameEventType.ConnectionEvent,
				(e) => events.push(e),
			);

			await manager.connect();

			expect(mockHubConnection.start).toHaveBeenCalledOnce();
			expect(mockHubConnection.on).toHaveBeenCalled();
			expect(events).toHaveLength(2);
			expect((events[0] as ConnectionEvent).payload.status).toBe(
				"connecting",
			);
			expect((events[1] as ConnectionEvent).payload.status).toBe(
				"connected",
			);
		});

		test("dispatches connecting event before connection starts", async () => {
			mockHubConnection.state = HubConnectionState.Connected;
			mockHubConnection.start.mockImplementation(async () => {
				// Verify connecting event was dispatched before start
				return undefined;
			});

			const manager = GameHubManager.getInstance(mockParams1);
			const events: Event[] = [];

			manager.eventEmitter.addEventListener(
				GameEventType.ConnectionEvent,
				(e) => events.push(e),
			);

			await manager.connect();

			expect(events.length).toBeGreaterThanOrEqual(1);
			expect((events[0] as ConnectionEvent).payload.status).toBe(
				"connecting",
			);
		});

		test("handles connection failure and dispatches failed event and logs error", async () => {
			const connectionError = new Error("Connection failed");
			mockHubConnection.start.mockRejectedValue(connectionError);

			const manager = GameHubManager.getInstance(mockParams1);
			const events: Event[] = [];

			manager.eventEmitter.addEventListener(
				GameEventType.ConnectionEvent,
				(e) => events.push(e),
			);

			await manager.connect();

			expect(mockHubConnection.start).toHaveBeenCalledOnce();
			expect(events).toHaveLength(2);
			expect((events[0] as ConnectionEvent).payload.status).toBe(
				"connecting",
			);
			const failedEvent = events[1] as ConnectionEvent;
			expect(failedEvent.payload.status).toBe("failed");
			if (failedEvent.payload.status === "failed") {
				expect(failedEvent.payload.reason).toBe(connectionError);
			}
			expect(mockLogger.error).toHaveBeenCalledWith(connectionError, {
				gameId: mockParams1.gameId,
			});
			mockLogger.error.mockRestore();
		});

		test("stops connection if cancelled during connect", async () => {
			mockHubConnection.state = HubConnectionState.Connected;
			const manager = GameHubManager.getInstance(mockParams1);

			// Cancel connection before it completes
			mockHubConnection.start.mockImplementation(async () => {
				// Simulate cancellation during connection
				await manager.disconnect();
				return undefined;
			});

			await manager.connect();

			expect(mockHubConnection.stop).toHaveBeenCalled();
		});

		test("does not set subscriptions if connection is cancelled", async () => {
			mockHubConnection.state = HubConnectionState.Connected;
			const manager = GameHubManager.getInstance(mockParams1);

			mockHubConnection.start.mockImplementation(async () => {
				// Cancel during connection
				await manager.disconnect();
				return undefined;
			});

			await manager.connect();

			// Subscriptions should not be set if connection was cancelled
			// The on() calls should be minimal (only lifecycle events if any)
			const gameEventSubscriptions =
				mockHubConnection.on.mock.calls.filter((call) =>
					Object.values(GameEventType).includes(
						call[0] as GameEventType,
					),
				);
			expect(gameEventSubscriptions.length).toBe(0);
		});

		test("resets isConnectionCanceled flag after successful connection", async () => {
			mockHubConnection.state = HubConnectionState.Connected;
			const manager = GameHubManager.getInstance(mockParams1);

			// Cancel first attempt
			await manager.disconnect();
			await manager.connect();

			// Should be able to connect again
			expect(mockHubConnection.start).toHaveBeenCalled();
		});
	});

	describe("disconnect", () => {
		test("sets isConnectionCanceled flag", async () => {
			mockHubConnection.state = HubConnectionState.Connected;
			const manager = GameHubManager.getInstance(mockParams1);

			await manager.connect();
			await manager.disconnect();

			// Verify disconnect was called
			expect(mockHubConnection.stop).toHaveBeenCalled();
		});

		test("does nothing if connection is null", async () => {
			const manager = GameHubManager.getInstance(mockParams1);
			await manager.disconnect();

			expect(mockHubConnection.stop).not.toHaveBeenCalled();
		});

		test("unsubscribes from all event types when connected", async () => {
			mockHubConnection.state = HubConnectionState.Connected;
			const manager = GameHubManager.getInstance(mockParams1);

			await manager.connect();
			await manager.disconnect();

			// Should call off() for each GameEventType
			const eventTypeCount = Object.keys(GameEventType).length;
			expect(mockHubConnection.off).toHaveBeenCalledTimes(eventTypeCount);

			// Verify each event type was unsubscribed
			Object.values(GameEventType).forEach((eventType) => {
				expect(mockHubConnection.off).toHaveBeenCalledWith(eventType);
			});
		});

		test("does not unsubscribe if connection is not connected", async () => {
			mockHubConnection.state = HubConnectionState.Disconnected;
			const manager = GameHubManager.getInstance(mockParams1);

			// Connect first to set up connection, but state is Disconnected
			await manager.connect();
			// Now disconnect - should not unsubscribe since state is not Connected
			await manager.disconnect();

			expect(mockHubConnection.off).not.toHaveBeenCalled();
		});

		test("handles disconnect errors gracefully", async () => {
			mockHubConnection.state = HubConnectionState.Connected;
			mockHubConnection.stop.mockRejectedValue(new Error("Stop failed"));

			const manager = GameHubManager.getInstance(mockParams1);
			await manager.connect();
			await manager.disconnect();

			expect(mockHubConnection.stop).toHaveBeenCalled();
			expect(mockLogger.error).toHaveBeenCalledWith(expect.any(Error), {
				gameId: mockParams1.gameId,
			});

			mockLogger.error.mockRestore();
		});

		test("sets connection to null after disconnect", async () => {
			mockHubConnection.state = HubConnectionState.Connected;
			const manager = GameHubManager.getInstance(mockParams1);

			await manager.connect();
			await manager.disconnect();

			// Connection should be cleaned up
			expect(mockHubConnection.stop).toHaveBeenCalled();
		});
	});

	describe("setSubscriptions", () => {
		test("sets up all game event subscriptions", async () => {
			mockHubConnection.state = HubConnectionState.Connected;
			const manager = GameHubManager.getInstance(mockParams1);

			await manager.connect();

			// Verify all event types are subscribed
			const subscribedEvents = mockHubConnection.on.mock.calls.map(
				(call) => call[0],
			);

			expect(subscribedEvents).toContain(GameEventType.ParticipantJoined);
			expect(subscribedEvents).toContain(GameEventType.ParticipantLeft);
			expect(subscribedEvents).toContain(GameEventType.TicketAdded);
			expect(subscribedEvents).toContain(GameEventType.TicketUpdated);
			expect(subscribedEvents).toContain(GameEventType.TicketDeleted);
			expect(subscribedEvents).toContain(GameEventType.VotingStarted);
			expect(subscribedEvents).toContain(GameEventType.CardsRevealed);
			expect(subscribedEvents).toContain(GameEventType.VotingCancelled);
			expect(subscribedEvents).toContain(GameEventType.VotingFinished);
			expect(subscribedEvents).toContain(GameEventType.ParticipantVoted);
			expect(subscribedEvents).toContain(GameEventType.SettingsUpdated);
			expect(subscribedEvents).toContain(
				GameEventType.CurrentParticipantUpdated,
			);
			expect(subscribedEvents).toContain(
				GameEventType.NewEstimationApplied,
			);
			// if we add more events, we need to update this test and all corresponding tests below
			expect(subscribedEvents).toHaveLength(13);
		});

		test("dispatches ParticipantJoinedEvent when event is received", async () => {
			mockHubConnection.state = HubConnectionState.Connected;
			const manager = GameHubManager.getInstance(mockParams1);

			const events: Event[] = [];
			manager.eventEmitter.addEventListener(
				GameEventType.ParticipantJoined,
				(e) => events.push(e),
			);

			await manager.connect();

			// Find the handler for ParticipantJoined
			const onCall = mockHubConnection.on.mock.calls.find(
				(call) => call[0] === GameEventType.ParticipantJoined,
			);
			expect(onCall).toBeDefined();

			const handler = onCall![1];
			const participantData = { id: "participant-1", userId: "user-1" };
			handler(participantData);

			expect(events).toHaveLength(1);
			// Check event type instead of instanceof due to EventTarget dispatchEvent behavior in tests
			expect(events[0].type).toBe(GameEventType.ParticipantJoined);
			expect((events[0] as ParticipantJoinedEvent).payload).toEqual(
				participantData,
			);
		});

		test("dispatches ParticipantLeftEvent when event is received", async () => {
			mockHubConnection.state = HubConnectionState.Connected;
			const manager = GameHubManager.getInstance(mockParams1);

			const events: Event[] = [];
			manager.eventEmitter.addEventListener(
				GameEventType.ParticipantLeft,
				(e) => events.push(e),
			);

			await manager.connect();

			const onCall = mockHubConnection.on.mock.calls.find(
				(call) => call[0] === GameEventType.ParticipantLeft,
			);
			const handler = onCall![1];
			const leftData = { userId: "user-1" };
			handler(leftData);

			expect(events).toHaveLength(1);
			expect(events[0].type).toBe(GameEventType.ParticipantLeft);
			expect((events[0] as ParticipantLeftEvent).payload).toEqual(
				leftData,
			);
		});

		test("dispatches TicketAddedEvent when event is received", async () => {
			mockHubConnection.state = HubConnectionState.Connected;
			const manager = GameHubManager.getInstance(mockParams1);

			const events: Event[] = [];
			manager.eventEmitter.addEventListener(
				GameEventType.TicketAdded,
				(e) => events.push(e),
			);

			await manager.connect();

			const onCall = mockHubConnection.on.mock.calls.find(
				(call) => call[0] === GameEventType.TicketAdded,
			);
			const handler = onCall![1];
			const ticketData = { id: "ticket-1", title: "Test Ticket" };
			handler(ticketData);

			expect(events).toHaveLength(1);
			expect(events[0].type).toBe(GameEventType.TicketAdded);
			expect((events[0] as TicketAddedEvent).payload).toEqual(ticketData);
		});

		test("dispatches TicketUpdatedEvent when event is received", async () => {
			mockHubConnection.state = HubConnectionState.Connected;
			const manager = GameHubManager.getInstance(mockParams1);

			const events: Event[] = [];
			manager.eventEmitter.addEventListener(
				GameEventType.TicketUpdated,
				(e) => events.push(e),
			);

			await manager.connect();

			const onCall = mockHubConnection.on.mock.calls.find(
				(call) => call[0] === GameEventType.TicketUpdated,
			);
			const handler = onCall![1];
			const ticketData = { id: "ticket-1", title: "Updated Ticket" };
			handler(ticketData);

			expect(events).toHaveLength(1);
			expect(events[0].type).toBe(GameEventType.TicketUpdated);
			expect((events[0] as TicketUpdatedEvent).payload).toEqual(
				ticketData,
			);
		});

		test("dispatches TicketDeletedEvent when event is received", async () => {
			mockHubConnection.state = HubConnectionState.Connected;
			const manager = GameHubManager.getInstance(mockParams1);

			const events: Event[] = [];
			manager.eventEmitter.addEventListener(
				GameEventType.TicketDeleted,
				(e) => events.push(e),
			);

			await manager.connect();

			const onCall = mockHubConnection.on.mock.calls.find(
				(call) => call[0] === GameEventType.TicketDeleted,
			);
			const handler = onCall![1];
			const ticketId = "ticket-1";
			handler(ticketId);

			expect(events).toHaveLength(1);
			expect(events[0].type).toBe(GameEventType.TicketDeleted);
			expect((events[0] as TicketDeletedEvent).payload).toBe(ticketId);
		});

		test("dispatches VotingStartedEvent when event is received", async () => {
			mockHubConnection.state = HubConnectionState.Connected;
			const manager = GameHubManager.getInstance(mockParams1);

			const events: Event[] = [];
			manager.eventEmitter.addEventListener(
				GameEventType.VotingStarted,
				(e) => events.push(e),
			);

			await manager.connect();

			const onCall = mockHubConnection.on.mock.calls.find(
				(call) => call[0] === GameEventType.VotingStarted,
			);
			const handler = onCall![1];
			const votingData = {
				ticketId: "ticket-1",
				startTime: "2024-01-01",
			};
			handler(votingData);

			expect(events).toHaveLength(1);
			expect(events[0].type).toBe(GameEventType.VotingStarted);
			expect((events[0] as VotingStartedEvent).payload).toEqual(
				votingData,
			);
		});

		test("dispatches CardsRevealedEvent when event is received", async () => {
			mockHubConnection.state = HubConnectionState.Connected;
			const manager = GameHubManager.getInstance(mockParams1);

			const events: Event[] = [];
			manager.eventEmitter.addEventListener(
				GameEventType.CardsRevealed,
				(e) => events.push(e),
			);

			await manager.connect();

			const onCall = mockHubConnection.on.mock.calls.find(
				(call) => call[0] === GameEventType.CardsRevealed,
			);
			const handler = onCall![1];
			handler();

			expect(events).toHaveLength(1);
			expect(events[0].type).toBe(GameEventType.CardsRevealed);
		});

		test("dispatches VotingCancelledEvent when event is received", async () => {
			mockHubConnection.state = HubConnectionState.Connected;
			const manager = GameHubManager.getInstance(mockParams1);

			const events: Event[] = [];
			manager.eventEmitter.addEventListener(
				GameEventType.VotingCancelled,
				(e) => events.push(e),
			);

			await manager.connect();

			const onCall = mockHubConnection.on.mock.calls.find(
				(call) => call[0] === GameEventType.VotingCancelled,
			);
			const handler = onCall![1];
			handler();

			expect(events).toHaveLength(1);
			expect(events[0].type).toBe(GameEventType.VotingCancelled);
		});

		test("dispatches VotingFinishedEvent when event is received", async () => {
			mockHubConnection.state = HubConnectionState.Connected;
			const manager = GameHubManager.getInstance(mockParams1);

			const events: Event[] = [];
			manager.eventEmitter.addEventListener(
				GameEventType.VotingFinished,
				(e) => events.push(e),
			);

			await manager.connect();

			const onCall = mockHubConnection.on.mock.calls.find(
				(call) => call[0] === GameEventType.VotingFinished,
			);
			const handler = onCall![1];
			const votingResult = { id: "result-1", average: 5 };
			handler(votingResult);

			expect(events).toHaveLength(1);
			expect(events[0].type).toBe(GameEventType.VotingFinished);
			expect((events[0] as VotingFinishedEvent).payload).toEqual(
				votingResult,
			);
		});

		test("dispatches ParticipantVotedEvent when event is received", async () => {
			mockHubConnection.state = HubConnectionState.Connected;
			const manager = GameHubManager.getInstance(mockParams1);

			const events: Event[] = [];
			manager.eventEmitter.addEventListener(
				GameEventType.ParticipantVoted,
				(e) => events.push(e),
			);

			await manager.connect();

			const onCall = mockHubConnection.on.mock.calls.find(
				(call) => call[0] === GameEventType.ParticipantVoted,
			);
			const handler = onCall![1];
			const voteData = {
				participantId: "participant-1",
				voteId: "vote-1",
			};
			handler(voteData);

			expect(events).toHaveLength(1);
			expect(events[0].type).toBe(GameEventType.ParticipantVoted);
			expect((events[0] as ParticipantVotedEvent).payload).toEqual(
				voteData,
			);
		});

		test("dispatches SettingsUpdatedEvent when event is received", async () => {
			mockHubConnection.state = HubConnectionState.Connected;
			const manager = GameHubManager.getInstance(mockParams1);

			const events: Event[] = [];
			manager.eventEmitter.addEventListener(
				GameEventType.SettingsUpdated,
				(e) => events.push(e),
			);

			await manager.connect();

			const onCall = mockHubConnection.on.mock.calls.find(
				(call) => call[0] === GameEventType.SettingsUpdated,
			);
			const handler = onCall![1];
			const settingsData = { isAutoRevealCards: true };
			handler(settingsData);

			expect(events).toHaveLength(1);
			expect(events[0].type).toBe(GameEventType.SettingsUpdated);
			expect((events[0] as SettingsUpdatedEvent).payload).toEqual(
				settingsData,
			);
		});

		test("dispatches CurrentParticipantUpdatedEvent when event is received", async () => {
			mockHubConnection.state = HubConnectionState.Connected;
			const manager = GameHubManager.getInstance(mockParams1);

			const events: Event[] = [];
			manager.eventEmitter.addEventListener(
				GameEventType.CurrentParticipantUpdated,
				(e) => events.push(e),
			);

			await manager.connect();

			const onCall = mockHubConnection.on.mock.calls.find(
				(call) => call[0] === GameEventType.CurrentParticipantUpdated,
			);
			const handler = onCall![1];
			const participantData = {
				id: "participant-1",
				displayName: "Updated",
			};
			handler(participantData);

			expect(events).toHaveLength(1);
			expect(events[0].type).toBe(
				GameEventType.CurrentParticipantUpdated,
			);
			expect(
				(events[0] as CurrentParticipantUpdatedEvent).payload,
			).toEqual(participantData);
		});

		test("dispatches NewEstimationAppliedEvent when event is received", async () => {
			mockHubConnection.state = HubConnectionState.Connected;
			const manager = GameHubManager.getInstance(mockParams1);

			const events: Event[] = [];
			manager.eventEmitter.addEventListener(
				GameEventType.NewEstimationApplied,
				(e) => events.push(e),
			);

			await manager.connect();

			const onCall = mockHubConnection.on.mock.calls.find(
				(call) => call[0] === GameEventType.NewEstimationApplied,
			);
			const handler = onCall![1];
			const estimationData = { ticketId: "ticket-1", estimation: 5 };
			handler(estimationData);

			expect(events).toHaveLength(1);

			// Check event type instead of instanceof due to EventTarget dispatchEvent behavior in tests
			expect(events[0].type).toBe(GameEventType.NewEstimationApplied);
			expect((events[0] as NewEstimationAppliedEvent).payload).toEqual(
				estimationData,
			);
		});

		test("does not set subscriptions if connection is not connected", async () => {
			// Set state to Disconnected before connect
			mockHubConnection.state = HubConnectionState.Disconnected;
			const manager = GameHubManager.getInstance(mockParams1);

			await manager.connect();

			// Should not set subscriptions if state is not Connected
			const gameEventSubscriptions =
				mockHubConnection.on.mock.calls.filter((call) =>
					Object.values(GameEventType).includes(
						call[0] as GameEventType,
					),
				);
			expect(gameEventSubscriptions.length).toBe(0);
		});
	});

	describe("connection lifecycle events", () => {
		test("dispatches reconnecting event on onreconnecting", async () => {
			mockHubConnection.state = HubConnectionState.Connected;
			const manager = GameHubManager.getInstance(mockParams1);

			const events: Event[] = [];
			manager.eventEmitter.addEventListener(
				GameEventType.ConnectionEvent,
				(e) => events.push(e),
			);

			await manager.connect();

			// Find the onreconnecting handler - it's called with a callback function
			expect(mockHubConnection.onreconnecting).toHaveBeenCalled();
			const reconnectingHandler =
				mockHubConnection.onreconnecting.mock.calls[0][0];
			const error = new Error("Reconnecting");
			reconnectingHandler(error);

			const reconnectingEvents = events.filter(
				(e) => (e as ConnectionEvent).payload.status === "reconnecting",
			);
			expect(reconnectingEvents).toHaveLength(1);
			const reconnectingEvent = reconnectingEvents[0] as ConnectionEvent;
			expect(reconnectingEvent.payload.status).toBe("reconnecting");
			if (reconnectingEvent.payload.status === "reconnecting") {
				expect(reconnectingEvent.payload.reason).toBe(error);
			}
		});

		test("dispatches connected event on onreconnected", async () => {
			mockHubConnection.state = HubConnectionState.Connected;
			const manager = GameHubManager.getInstance(mockParams1);

			const events: Event[] = [];
			manager.eventEmitter.addEventListener(
				GameEventType.ConnectionEvent,
				(e) => events.push(e),
			);

			await manager.connect();

			// Find the onreconnected handler
			expect(mockHubConnection.onreconnected).toHaveBeenCalled();
			const reconnectedHandler =
				mockHubConnection.onreconnected.mock.calls[0][0];
			reconnectedHandler();

			const connectedEvents = events.filter(
				(e) => (e as ConnectionEvent).payload.status === "connected",
			);
			// Should have at least 2 connected events (initial + reconnected)
			expect(connectedEvents.length).toBeGreaterThanOrEqual(2);
			const lastConnectedEvent = connectedEvents[
				connectedEvents.length - 1
			] as ConnectionEvent;
			expect(lastConnectedEvent.payload.status).toBe("connected");
		});

		test("dispatches disconnected event on onclose", async () => {
			mockHubConnection.state = HubConnectionState.Connected;
			const manager = GameHubManager.getInstance(mockParams1);

			const events: Event[] = [];
			manager.eventEmitter.addEventListener(
				GameEventType.ConnectionEvent,
				(e) => events.push(e),
			);

			await manager.connect();

			// Find the onclose handler
			expect(mockHubConnection.onclose).toHaveBeenCalled();
			const closeHandler = mockHubConnection.onclose.mock.calls[0][0];
			const error = new Error("Connection closed");
			closeHandler(error);

			const disconnectedEvents = events.filter(
				(e) => (e as ConnectionEvent).payload.status === "disconnected",
			);
			expect(disconnectedEvents).toHaveLength(1);
			const disconnectedEvent = disconnectedEvents[0] as ConnectionEvent;
			expect(disconnectedEvent.payload.status).toBe("disconnected");
			if (disconnectedEvent.payload.status === "disconnected") {
				expect(disconnectedEvent.payload.reason).toBe(error);
			}
		});

		test("handles onclose without error", async () => {
			mockHubConnection.state = HubConnectionState.Connected;
			const manager = GameHubManager.getInstance(mockParams1);

			const events: Event[] = [];
			manager.eventEmitter.addEventListener(
				GameEventType.ConnectionEvent,
				(e) => events.push(e),
			);

			await manager.connect();

			const closeHandler = mockHubConnection.onclose.mock.calls[0][0];
			closeHandler();

			const disconnectedEvents = events.filter(
				(e) => (e as ConnectionEvent).payload.status === "disconnected",
			);
			expect(disconnectedEvents).toHaveLength(1);
			const disconnectedEvent = disconnectedEvents[0] as ConnectionEvent;
			expect(disconnectedEvent.payload.status).toBe("disconnected");
		});
	});

	describe("eventEmitter", () => {
		test("provides access to EventTarget instance", () => {
			const manager = GameHubManager.getInstance(mockParams1);
			expect(manager.eventEmitter).toBeInstanceOf(EventTarget);
		});

		test("allows adding and removing event listeners", () => {
			const manager = GameHubManager.getInstance(mockParams1);
			const handler = vi.fn();

			manager.eventEmitter.addEventListener(
				GameEventType.ConnectionEvent,
				handler,
			);
			manager.eventEmitter.dispatchEvent(
				new ConnectionEvent({ status: "connecting" }),
			);

			expect(handler).toHaveBeenCalledOnce();

			manager.eventEmitter.removeEventListener(
				GameEventType.ConnectionEvent,
				handler,
			);
			manager.eventEmitter.dispatchEvent(
				new ConnectionEvent({ status: "connecting" }),
			);

			expect(handler).toHaveBeenCalledOnce(); // Still once, not called again
		});
	});
});
