import { StoreApi, useStore } from "zustand";
import {
	DisconnectedEvent,
	GameEventListener,
	GameEventType,
	ParticipantJoinedEvent,
	ParticipantLeftEvent,
	ReconnectingEvent,
	TicketAddedEvent,
} from "../game-events-hub";
import { GameStateStore } from "../store/game-state-store.model";
import { useEffect } from "react";

type Props = {
	eventListener: GameEventListener;
	gameStateStore: StoreApi<GameStateStore>;
};

export function useGameEventsDispatcher({
	eventListener,
	gameStateStore,
}: Props) {
	const joinParticipant = useStore(
		gameStateStore,
		(state) => state.joinParticipant,
	);
	const disconnectParticipant = useStore(
		gameStateStore,
		(state) => state.disconnectParticipant,
	);
	const addTicketIfAbsent = useStore(
		gameStateStore,
		(state) => state.addTicketIfAbsent,
	);
	const setLiveStatus = useStore(
		gameStateStore,
		(state) => state.setLiveStatus,
	);

	useEffect(() => {
		const handler = ({ payload }: ParticipantJoinedEvent) => {
			joinParticipant(payload);
		};
		eventListener.add(GameEventType.ParticipantJoined, handler);

		return () => {
			eventListener.remove(GameEventType.ParticipantJoined, handler);
		};
	}, [eventListener, joinParticipant]);

	useEffect(() => {
		const handler = ({ payload }: ParticipantLeftEvent) => {
			console.log("left", payload.userId);
			disconnectParticipant(payload.userId);
		};

		eventListener.add(GameEventType.ParticipantLeft, handler);

		return () => {
			eventListener.remove(GameEventType.ParticipantLeft, handler);
		};
	}, [eventListener, disconnectParticipant]);

	useEffect(() => {
		const handler = ({ payload }: TicketAddedEvent) => {
			console.log("new ticket", payload);
			addTicketIfAbsent(payload);
		};

		eventListener.add(GameEventType.TicketAdded, handler);

		return () => {
			eventListener.remove(GameEventType.TicketAdded, handler);
		};
	}, [eventListener, addTicketIfAbsent]);

	useEffect(() => {
		const handler = ({ payload }: ReconnectingEvent) => {
			setLiveStatus({ state: "reconnecting", reason: payload });
		};

		eventListener.add(GameEventType.Reconnecting, handler);

		return () => {
			eventListener.remove(GameEventType.Reconnecting, handler);
		};
	}, [eventListener, setLiveStatus]);

	useEffect(() => {
		const handler = () => {
			setLiveStatus({ state: "connected" });
		};

		eventListener.add(GameEventType.Reconnected, handler);

		return () => {
			eventListener.remove(GameEventType.Reconnected, handler);
		};
	}, [eventListener, setLiveStatus]);

	useEffect(() => {
		const handler = ({ payload }: DisconnectedEvent) => {
			setLiveStatus({ state: "disconnected", reason: payload });
		};

		eventListener.add(GameEventType.Disconnected, handler);

		return () => {
			eventListener.remove(GameEventType.Disconnected, handler);
		};
	}, [eventListener, setLiveStatus]);
}
