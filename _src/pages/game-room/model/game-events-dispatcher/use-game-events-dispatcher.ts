import { StoreApi, useStore } from "zustand";
import {
	GameEventListener,
	GameEventType,
	ParticipantJoinedEvent,
	ParticipantLeftEvent,
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
}
