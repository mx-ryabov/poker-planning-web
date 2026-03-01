import { test, describe, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@/test/utilities";
import { useTicketsEvDis } from "./use-tickets-ev-dis";
import {
	TicketAddedEvent,
	TicketUpdatedEvent,
	TicketDeletedEvent,
	NewEstimationAppliedEvent,
	GameEventType,
	EventSubscriber,
} from "../../game-events-hub";
import { createGameStateStore } from "../../../_store";
import {
	generateGame,
	generateParticipant,
	generateTicket,
} from "@/__mocks__/game";
import { GameRoomFakeProviderWrapper } from "../../../__mocks__";
import { StoreApi } from "zustand";
import { GameStateStore } from "../../../_store/game-state-store.model";
import { TicketType } from "@/src/domain/entities/game";

// Mock useGlobalToast
const mockAddToast = vi.fn();
vi.mock("@/src/shared/ui/components/toast", async (importOriginal) => {
	const actual =
		await importOriginal<
			typeof import("@/src/shared/ui/components/toast")
		>();
	return {
		...actual,
		useGlobalToast: vi.fn(() => ({
			add: mockAddToast,
		})),
	};
});

describe("useTicketsEvDis", () => {
	let eventSubscriber: EventSubscriber;
	let gameStateStore: StoreApi<GameStateStore>;
	let unsubscribeFns: Map<GameEventType, () => void>;
	let eventHandlers: Map<
		GameEventType,
		(
			event:
				| TicketAddedEvent
				| TicketUpdatedEvent
				| TicketDeletedEvent
				| NewEstimationAppliedEvent,
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
						| TicketAddedEvent
						| TicketUpdatedEvent
						| TicketDeletedEvent
						| NewEstimationAppliedEvent,
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

	describe("when TicketAdded event is received", () => {
		test("subscribes to TicketAdded event on mount", () => {
			renderHookWithMocks();

			expect(eventSubscriber).toHaveBeenCalledWith(
				GameEventType.TicketAdded,
				expect.any(Function),
			);
			expect(eventHandlers.has(GameEventType.TicketAdded)).toBe(true);
		});

		test("calls addTicketIfAbsent when TicketAdded event is received", () => {
			renderHookWithMocks();

			const handler = eventHandlers.get(GameEventType.TicketAdded);
			expect(handler).toBeDefined();

			const ticket = generateTicket({
				id: "ticket-1",
				title: "Test Ticket",
				identifier: "TEST-1",
				type: TicketType.Story,
			});

			const event = new TicketAddedEvent(ticket);
			handler!(event);

			const state = gameStateStore.getState();
			const addedTicket = state.state.game.tickets.find(
				(t) => t.id === ticket.id,
			);
			expect(addedTicket).toBeDefined();
			expect(addedTicket?.id).toBe(ticket.id);
			expect(addedTicket?.title).toBe(ticket.title);
			expect(addedTicket?.identifier).toBe(ticket.identifier);
		});

		test("does not add duplicate ticket if ticket already exists", () => {
			const existingTicket = generateTicket({
				id: "ticket-1",
				title: "Existing Ticket",
				identifier: "EXIST-1",
			});

			gameStateStore = createGameStateStore({
				game: generateGame({
					tickets: [existingTicket],
				}),
				currentParticipant: generateParticipant({}),
			});

			renderHookWithMocks();

			const handler = eventHandlers.get(GameEventType.TicketAdded);
			const event = new TicketAddedEvent(existingTicket);
			handler!(event);

			const state = gameStateStore.getState();
			expect(state.state.game.tickets).toHaveLength(1);
			expect(state.state.game.tickets[0]).toStrictEqual(existingTicket);
		});

		test("unsubscribes from TicketAdded event on unmount", () => {
			const { unmount } = renderHookWithMocks();

			expect(eventHandlers.has(GameEventType.TicketAdded)).toBe(true);

			const unsubscribeFn = unsubscribeFns.get(GameEventType.TicketAdded);
			expect(unsubscribeFn).toBeDefined();

			unmount();

			expect(unsubscribeFn).toHaveBeenCalled();
			expect(eventHandlers.has(GameEventType.TicketAdded)).toBe(false);
		});
	});

	describe("when TicketUpdated event is received", () => {
		test("subscribes to TicketUpdated event on mount", () => {
			renderHookWithMocks();

			expect(eventSubscriber).toHaveBeenCalledWith(
				GameEventType.TicketUpdated,
				expect.any(Function),
			);
			expect(eventHandlers.has(GameEventType.TicketUpdated)).toBe(true);
		});

		test("calls updateTicket when TicketUpdated event is received", () => {
			const existingTicket = generateTicket({
				id: "ticket-1",
				title: "Original Title",
				identifier: "TICKET-1",
				type: TicketType.Story,
			});

			gameStateStore = createGameStateStore({
				game: generateGame({
					tickets: [existingTicket],
				}),
				currentParticipant: generateParticipant({}),
			});

			renderHookWithMocks();

			const handler = eventHandlers.get(GameEventType.TicketUpdated);
			expect(handler).toBeDefined();

			const updatedTicket = generateTicket({
				id: "ticket-1",
				title: "Updated Title",
				identifier: "TICKET-1",
				type: TicketType.Bug,
				description: "Updated description",
			});

			const event = new TicketUpdatedEvent(updatedTicket);
			handler!(event);

			const state = gameStateStore.getState();
			const ticket = state.state.game.tickets.find(
				(t) => t.id === existingTicket.id,
			);
			expect(ticket).toBeDefined();
			expect(ticket?.title).toBe("Updated Title");
			expect(ticket?.type).toBe(TicketType.Bug);
			expect(ticket?.description).toBe("Updated description");
		});

		test("handles TicketUpdated event for non-existent ticket gracefully", () => {
			renderHookWithMocks();

			const handler = eventHandlers.get(GameEventType.TicketUpdated);
			const nonExistentTicket = generateTicket({
				id: "non-existent-ticket",
				title: "Non-existent",
			});
			const event = new TicketUpdatedEvent(nonExistentTicket);

			expect(() => handler!(event)).not.toThrow();

			const state = gameStateStore.getState();
			expect(
				state.state.game.tickets.find(
					(t) => t.id === nonExistentTicket.id,
				),
			).toBeUndefined();
		});

		test("unsubscribes from TicketUpdated event on unmount", () => {
			const { unmount } = renderHookWithMocks();

			expect(eventHandlers.has(GameEventType.TicketUpdated)).toBe(true);

			const unsubscribeFn = unsubscribeFns.get(
				GameEventType.TicketUpdated,
			);
			expect(unsubscribeFn).toBeDefined();

			unmount();

			expect(unsubscribeFn).toHaveBeenCalled();
			expect(eventHandlers.has(GameEventType.TicketUpdated)).toBe(false);
		});
	});

	describe("when NewEstimationApplied event is received", () => {
		test("subscribes to NewEstimationApplied event on mount", () => {
			renderHookWithMocks();

			expect(eventSubscriber).toHaveBeenCalledWith(
				GameEventType.NewEstimationApplied,
				expect.any(Function),
			);
			expect(eventHandlers.has(GameEventType.NewEstimationApplied)).toBe(
				true,
			);
		});

		test("shows toast notification when NewEstimationApplied event is received", () => {
			renderHookWithMocks();

			const handler = eventHandlers.get(
				GameEventType.NewEstimationApplied,
			);
			expect(handler).toBeDefined();

			const event = new NewEstimationAppliedEvent({
				ticketIdentifier: "TICKET-123",
				estimation: "5",
				ticketId: "ticket-id-123",
			});
			handler!(event);

			expect(mockAddToast).toHaveBeenCalledTimes(1);
			expect(mockAddToast).toHaveBeenCalledWith(
				{
					title: "New estimation applied!",
					description:
						"Ticket TICKET-123 has been updated with new estimation: 5",
					variant: "success",
				},
				{ timeout: expect.any(Number) as number },
			);
		});

		test("shows toast with correct ticket identifier and estimation", () => {
			renderHookWithMocks();

			const handler = eventHandlers.get(
				GameEventType.NewEstimationApplied,
			);

			const event = new NewEstimationAppliedEvent({
				ticketIdentifier: "PROJ-456",
				estimation: "13",
				ticketId: "ticket-id-456",
			});
			handler!(event);

			expect(mockAddToast).toHaveBeenCalledWith(
				{
					title: "New estimation applied!",
					description:
						"Ticket PROJ-456 has been updated with new estimation: 13",
					variant: "success",
				},
				{ timeout: expect.any(Number) as number },
			);
		});

		test("unsubscribes from NewEstimationApplied event on unmount", () => {
			const { unmount } = renderHookWithMocks();

			expect(eventHandlers.has(GameEventType.NewEstimationApplied)).toBe(
				true,
			);

			const unsubscribeFn = unsubscribeFns.get(
				GameEventType.NewEstimationApplied,
			);
			expect(unsubscribeFn).toBeDefined();

			unmount();

			expect(unsubscribeFn).toHaveBeenCalled();
			expect(eventHandlers.has(GameEventType.NewEstimationApplied)).toBe(
				false,
			);
		});
	});

	describe("when TicketDeleted event is received", () => {
		test("subscribes to TicketDeleted event on mount", () => {
			renderHookWithMocks();

			expect(eventSubscriber).toHaveBeenCalledWith(
				GameEventType.TicketDeleted,
				expect.any(Function),
			);
			expect(eventHandlers.has(GameEventType.TicketDeleted)).toBe(true);
		});

		test("calls removeTicket when TicketDeleted event is received", () => {
			const ticket1 = generateTicket({
				id: "ticket-1",
				title: "Ticket 1",
			});
			const ticket2 = generateTicket({
				id: "ticket-2",
				title: "Ticket 2",
			});

			gameStateStore = createGameStateStore({
				game: generateGame({
					tickets: [ticket1, ticket2],
				}),
				currentParticipant: generateParticipant({}),
			});

			renderHookWithMocks();

			const handler = eventHandlers.get(GameEventType.TicketDeleted);
			expect(handler).toBeDefined();

			const event = new TicketDeletedEvent(ticket1.id);
			handler!(event);

			const state = gameStateStore.getState();
			expect(state.state.game.tickets).toHaveLength(1);
			expect(state.state.game.tickets[0].id).toBe(ticket2.id);
			expect(
				state.state.game.tickets.find((t) => t.id === ticket1.id),
			).toBeUndefined();
		});

		test("handles TicketDeleted event for non-existent ticket gracefully", () => {
			renderHookWithMocks();

			const handler = eventHandlers.get(GameEventType.TicketDeleted);
			const event = new TicketDeletedEvent("non-existent-ticket-id");

			expect(() => handler!(event)).not.toThrow();

			const state = gameStateStore.getState();
			expect(state.state.game.tickets.length).toBe(0);
		});

		test("unsubscribes from TicketDeleted event on unmount", () => {
			const { unmount } = renderHookWithMocks();

			expect(eventHandlers.has(GameEventType.TicketDeleted)).toBe(true);

			const unsubscribeFn = unsubscribeFns.get(
				GameEventType.TicketDeleted,
			);
			expect(unsubscribeFn).toBeDefined();

			unmount();

			expect(unsubscribeFn).toHaveBeenCalled();
			expect(eventHandlers.has(GameEventType.TicketDeleted)).toBe(false);
		});
	});

	describe("edge cases", () => {
		test("handles multiple events correctly", () => {
			const ticket1 = generateTicket({
				id: "ticket-1",
				title: "Ticket 1",
			});
			const ticket2 = generateTicket({
				id: "ticket-2",
				title: "Ticket 2",
			});

			gameStateStore = createGameStateStore({
				game: generateGame({
					tickets: [],
				}),
				currentParticipant: generateParticipant({}),
			});

			renderHookWithMocks();

			// Add ticket 1
			const addHandler = eventHandlers.get(GameEventType.TicketAdded);
			addHandler!(new TicketAddedEvent(ticket1));

			// Add ticket 2
			addHandler!(new TicketAddedEvent(ticket2));

			// Update ticket 1
			const updateHandler = eventHandlers.get(
				GameEventType.TicketUpdated,
			);
			const updatedTicket1 = generateTicket({
				...ticket1,
				title: "Updated Ticket 1",
			});
			updateHandler!(new TicketUpdatedEvent(updatedTicket1));

			// Delete ticket 2
			const deleteHandler = eventHandlers.get(
				GameEventType.TicketDeleted,
			);
			deleteHandler!(new TicketDeletedEvent(ticket2.id));

			const state = gameStateStore.getState();
			expect(state.state.game.tickets).toHaveLength(1);
			expect(state.state.game.tickets[0].id).toBe(ticket1.id);
			expect(state.state.game.tickets[0].title).toBe("Updated Ticket 1");
		});

		test("handles rapid event sequences", () => {
			const ticket1 = generateTicket({
				id: "ticket-1",
				title: "Ticket 1",
			});
			const ticket2 = generateTicket({
				id: "ticket-2",
				title: "Ticket 2",
			});
			const ticket3 = generateTicket({
				id: "ticket-3",
				title: "Ticket 3",
			});

			gameStateStore = createGameStateStore({
				game: generateGame({
					tickets: [],
				}),
				currentParticipant: generateParticipant({}),
			});

			renderHookWithMocks();

			const addHandler = eventHandlers.get(GameEventType.TicketAdded);
			const deleteHandler = eventHandlers.get(
				GameEventType.TicketDeleted,
			);

			// Rapid add/delete sequence
			addHandler!(new TicketAddedEvent(ticket1));
			addHandler!(new TicketAddedEvent(ticket2));
			addHandler!(new TicketAddedEvent(ticket3));
			deleteHandler!(new TicketDeletedEvent(ticket2.id));
			deleteHandler!(new TicketDeletedEvent(ticket1.id));

			const state = gameStateStore.getState();
			expect(state.state.game.tickets).toHaveLength(1);
			expect(state.state.game.tickets[0].id).toBe(ticket3.id);
		});

		test("handles multiple NewEstimationApplied events", () => {
			renderHookWithMocks();

			const handler = eventHandlers.get(
				GameEventType.NewEstimationApplied,
			);

			handler!(
				new NewEstimationAppliedEvent({
					ticketIdentifier: "TICKET-1",
					estimation: "3",
					ticketId: "ticket-1",
				}),
			);

			handler!(
				new NewEstimationAppliedEvent({
					ticketIdentifier: "TICKET-2",
					estimation: "5",
					ticketId: "ticket-2",
				}),
			);

			expect(mockAddToast).toHaveBeenCalledTimes(2);
			expect(mockAddToast).toHaveBeenNthCalledWith(
				1,
				{
					title: "New estimation applied!",
					description:
						"Ticket TICKET-1 has been updated with new estimation: 3",
					variant: "success",
				},
				{ timeout: expect.any(Number) as number },
			);
			expect(mockAddToast).toHaveBeenNthCalledWith(
				2,
				{
					title: "New estimation applied!",
					description:
						"Ticket TICKET-2 has been updated with new estimation: 5",
					variant: "success",
				},
				{ timeout: expect.any(Number) as number },
			);
		});
	});

	function renderHookWithMocks() {
		return renderHook(
			() =>
				useTicketsEvDis({
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
