import {
	HubConnection,
	HubConnectionState,
} from "@microsoft/signalr/dist/esm/HubConnection";
import { HubConnectionBuilder } from "@microsoft/signalr/dist/esm/HubConnectionBuilder";
import { HttpTransportType } from "@microsoft/signalr/dist/esm/ITransport";
import { useEffect, useMemo, useState } from "react";
import {
	ParticipantJoinedEvent,
	ParticipantLeftEvent,
} from "../events/game-events";
import { GameEventType, GameEventTypeMap } from "../events";
import { GameEventListener } from "./use-game-events-hub.types";

type Props = {
	gameId: string;
	accessTokenFactory: () => Promise<string>;
};

export function useGameEventsHub({
	gameId,
	accessTokenFactory,
}: Props): GameEventListener {
	const gameEventTarget = useMemo(() => new EventTarget(), []);
	const [connection, setConnection] = useState<HubConnection | null>(null);

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		const conn = new HubConnectionBuilder()
			.withUrl(`http://localhost:5011/hubs/game?gameId=${gameId}`, {
				transport: HttpTransportType.WebSockets,
				accessTokenFactory,
			})
			.build();
		conn.start()
			.then(() => {
				console.log("started");
				setConnection(conn);
			})
			.catch((e) => {
				console.log(`connection error ${conn.connectionId}: `, e);
			});

		return () => {
			conn.stop();
			setConnection(null);
		};
	}, [setConnection, gameId, accessTokenFactory]);

	useEffect(() => {
		if (!connection || connection.state !== HubConnectionState.Connected) {
			return;
		}
		connection.on(GameEventType.ParticipantJoined, (data) => {
			gameEventTarget.dispatchEvent(new ParticipantJoinedEvent(data));
		});
		connection.on(GameEventType.ParticipantLeft, (data) => {
			gameEventTarget.dispatchEvent(new ParticipantLeftEvent(data));
		});
	}, [connection, gameEventTarget]);

	return {
		add: gameEventTarget.addEventListener.bind(
			gameEventTarget,
		) as GameEventListener["add"],
		remove: gameEventTarget.removeEventListener.bind(
			gameEventTarget,
		) as GameEventListener["remove"],
	};
}
