import {
	DisconnectedEvent,
	EventSubscriber,
	GameEventType,
	ReconnectingEvent,
} from "../../game-events-hub";
import { StoreApi, useStore } from "zustand";
import { GameStateStore } from "../../store/game-state-store.model";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
	eventSubscriber: EventSubscriber;
	gameStateStore: StoreApi<GameStateStore>;
};

export function useConnectionsEvDis({
	eventSubscriber,
	gameStateStore,
}: Props) {
	const router = useRouter();
	const setLiveStatus = useStore(
		gameStateStore,
		(state) => state.setLiveStatus,
	);

	useEffect(() => {
		const handler = ({ payload }: ReconnectingEvent) => {
			setLiveStatus({
				state: "reconnecting",
				reason: payload,
			});
		};

		return eventSubscriber(GameEventType.Reconnecting, handler);
	}, [eventSubscriber, setLiveStatus]);

	useEffect(() => {
		const handler = ({ payload }: DisconnectedEvent) => {
			setLiveStatus({
				state: "disconnected",
				reason: payload,
			});
		};

		return eventSubscriber(GameEventType.Disconnected, handler);
	}, [eventSubscriber, setLiveStatus]);

	useEffect(() => {
		const abortController = new AbortController();
		window.addEventListener(
			"online",
			() => {
				console.log("online again!");

				router.refresh();
			},
			{ signal: abortController.signal },
		);

		return () => {
			abortController.abort();
		};
	}, [router]);

	useEffect(() => {
		const handler = () => {
			setLiveStatus({ state: "connected" });
		};

		return eventSubscriber(GameEventType.Reconnected, handler);
	}, [eventSubscriber, setLiveStatus]);
}
