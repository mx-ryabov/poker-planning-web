import { StoreApi } from "zustand";
import { EventSubscriber } from "../game-events-hub";
import { GameStateStore } from "../store/game-state-store.model";
import { useConnectionsEvDis } from "./events-dispatchers/use-connections-ev-dis";
import { useParticipantsEvDis } from "./events-dispatchers/use-participants-ev-dis";
import { useTicketsEvDis } from "./events-dispatchers/use-tickets-ev-dis";

type Props = {
	eventSubscriber: EventSubscriber;
	gameStateStore: StoreApi<GameStateStore>;
};

export function useGameEventsDispatcher({
	eventSubscriber,
	gameStateStore,
}: Props) {
	useConnectionsEvDis({ eventSubscriber, gameStateStore });
	useParticipantsEvDis({ eventSubscriber, gameStateStore });
	useTicketsEvDis({ eventSubscriber, gameStateStore });
}
