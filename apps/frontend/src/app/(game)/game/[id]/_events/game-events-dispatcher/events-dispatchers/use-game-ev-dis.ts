import { StoreApi, useStore } from "zustand";
import {
	EventSubscriber,
	GameEventType,
	SettingsUpdatedEvent,
	VotingFinishedEvent,
	VotingStartedEvent,
} from "../../game-events-hub";
import { GameStateStore } from "../../../_store/game-state-store.model";
import { useEffect } from "react";
import { useDomainApi } from "@/src/domain/providers";
import { useGlobalToast } from "@/src/shared/ui/components/toast";

type Props = {
	eventSubscriber: EventSubscriber;
	gameStateStore: StoreApi<GameStateStore>;
};

export function useGameEvDis({ eventSubscriber, gameStateStore }: Props) {
	const api = useDomainApi();
	const toast = useGlobalToast();
	const startVoting = useStore(gameStateStore, (state) => state.startVoting);
	const revealCards = useStore(gameStateStore, (state) => state.revealCards);
	const finishVoting = useStore(
		gameStateStore,
		(state) => state.finishVoting,
	);
	const cancelVoting = useStore(
		gameStateStore,
		(state) => state.cancelVoting,
	);
	const updateSettings = useStore(
		gameStateStore,
		(state) => state.updateSettings,
	);

	useEffect(() => {
		const handler = ({ payload }: VotingStartedEvent) => {
			startVoting(payload.ticketId, payload);
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
		const handler = () => {
			cancelVoting();
			toast?.add(
				{
					title: "Voting has been cancelled.",
					variant: "info",
				},
				{ timeout: 10000 },
			);
		};

		return eventSubscriber(GameEventType.VotingCancelled, handler);
	}, [eventSubscriber, cancelVoting, toast]);

	useEffect(() => {
		const handler = ({ payload }: VotingFinishedEvent) => {
			finishVoting(payload);
			api.game.revalidateGame();
		};

		return eventSubscriber(GameEventType.VotingFinished, handler);
	}, [eventSubscriber, finishVoting, api]);

	useEffect(() => {
		const handler = ({ payload }: SettingsUpdatedEvent) => {
			updateSettings(payload);
		};

		return eventSubscriber(GameEventType.SettingsUpdated, handler);
	}, [eventSubscriber, updateSettings]);
}
