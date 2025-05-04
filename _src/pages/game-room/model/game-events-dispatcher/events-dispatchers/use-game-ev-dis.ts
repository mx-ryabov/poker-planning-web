import { StoreApi, useStore } from "zustand";
import {
	EventSubscriber,
	GameEventType,
	VotingFinishedEvent,
	VotingStartedEvent,
} from "../../game-events-hub";
import { GameStateStore } from "../../store/game-state-store.model";
import { useEffect } from "react";
import { useApi } from "@/_src/app";

type Props = {
	eventSubscriber: EventSubscriber;
	gameStateStore: StoreApi<GameStateStore>;
};

export function useGameEvDis({ eventSubscriber, gameStateStore }: Props) {
	const api = useApi();
	const startVoting = useStore(gameStateStore, (state) => state.startVoting);
	const revealCards = useStore(gameStateStore, (state) => state.revealCards);
	const finishVoting = useStore(
		gameStateStore,
		(state) => state.finishVoting,
	);

	useEffect(() => {
		const handler = ({ payload }: VotingStartedEvent) => {
			startVoting(payload.ticketId);
		};

		return eventSubscriber(GameEventType.VotingStarted, handler);
	}, [eventSubscriber, startVoting]);

	useEffect(() => {
		const handler = () => {
			revealCards();
		};

		return eventSubscriber(GameEventType.CardsRevealed, handler);
	}, [eventSubscriber, revealCards]);

	useEffect(() => {
		const handler = ({ payload }: VotingFinishedEvent) => {
			finishVoting(payload);
			api.game.revalidateGame();
		};

		return eventSubscriber(GameEventType.VotingFinished, handler);
	}, [eventSubscriber, finishVoting, api]);
}
