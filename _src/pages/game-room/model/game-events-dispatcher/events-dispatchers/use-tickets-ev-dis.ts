import { StoreApi, useStore } from "zustand";
import { GameStateStore } from "../../store/game-state-store.model";
import {
	EventSubscriber,
	GameEventType,
	TicketAddedEvent,
	TicketDeletedEvent,
	TicketUpdatedEvent,
} from "../../game-events-hub";
import { useEffect } from "react";

type Props = {
	eventSubscriber: EventSubscriber;
	gameStateStore: StoreApi<GameStateStore>;
};

export function useTicketsEvDis({ eventSubscriber, gameStateStore }: Props) {
	const addTicketIfAbsent = useStore(
		gameStateStore,
		(state) => state.addTicketIfAbsent,
	);
	const updateTicket = useStore(
		gameStateStore,
		(state) => state.updateTicket,
	);
	const removeticket = useStore(
		gameStateStore,
		(state) => state.removeTicket,
	);

	useEffect(() => {
		const handler = ({ payload }: TicketAddedEvent) => {
			addTicketIfAbsent(payload);
		};

		return eventSubscriber(GameEventType.TicketAdded, handler);
	}, [eventSubscriber, addTicketIfAbsent]);

	useEffect(() => {
		const handler = ({ payload }: TicketUpdatedEvent) => {
			updateTicket(payload.id, payload);
		};

		return eventSubscriber(GameEventType.TicketUpdated, handler);
	}, [eventSubscriber, updateTicket]);

	useEffect(() => {
		const handler = ({ payload: ticketId }: TicketDeletedEvent) => {
			removeticket(ticketId);
		};

		return eventSubscriber(GameEventType.TicketDeleted, handler);
	}, [eventSubscriber, removeticket]);
}
