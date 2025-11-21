import {
	ConnectionEvent,
	EventSubscriber,
	GameEventType,
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
		const handler = ({ payload }: ConnectionEvent) => {
			if (payload.status === "connected") {
				router.refresh();
			}
			setLiveStatus(payload);
		};

		return eventSubscriber(GameEventType.ConnectionEvent, handler);
	}, [eventSubscriber, setLiveStatus, router]);

	useEffect(() => {
		const abortController = new AbortController();
		window.addEventListener(
			"online",
			() => {
				router.refresh();
			},
			{ signal: abortController.signal },
		);

		return () => {
			abortController.abort();
		};
	}, [router]);
}
