import {
	HubConnection,
	HubConnectionState,
} from "@microsoft/signalr/dist/esm/HubConnection";
import { HubConnectionBuilder } from "@microsoft/signalr/dist/esm/HubConnectionBuilder";
import { HttpTransportType } from "@microsoft/signalr/dist/esm/ITransport";
import { useEffect, useMemo, useState } from "react";
import {
	DisconnectedEvent,
	ParticipantJoinedEvent,
	ParticipantLeftEvent,
	ReconnectedEvent,
	ReconnectingEvent,
	TicketAddedEvent,
} from "../events/game-events";
import { GameEventType } from "../events";
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

		let isCanceled = false;

		const hubConnectionSetup = new HubConnectionBuilder().withUrl(
			`http://localhost:5011/hubs/game?gameId=${gameId}`,
			{
				transport: HttpTransportType.WebSockets,
				accessTokenFactory,
			},
		);

		hubConnectionSetup.withAutomaticReconnect();

		const conn = hubConnectionSetup.build();

		conn.start()
			.then(() => {
				if (isCanceled) {
					return conn.stop();
				}
				gameEventTarget.dispatchEvent(new ReconnectedEvent());

				setConnection(conn);
			})
			.catch((e) => {
				console.log(`connection error ${conn.connectionId}: `, e);
			});

		return () => {
			isCanceled = true;

			if (conn.state === HubConnectionState.Connected) {
				conn.stop();
			}
			setConnection(null);
		};
	}, [setConnection, gameId, accessTokenFactory, gameEventTarget]);

	useEffect(() => {
		if (!connection || connection.state !== HubConnectionState.Connected)
			return;

		connection.onreconnecting((error) => {
			gameEventTarget.dispatchEvent(new ReconnectingEvent(error));
		});
		connection.onreconnected(() => {
			gameEventTarget.dispatchEvent(new ReconnectedEvent());
		});
		connection.onclose((error) => {
			gameEventTarget.dispatchEvent(new DisconnectedEvent(error));
		});
	}, [gameEventTarget, connection]);

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
		connection.on(GameEventType.TicketAdded, (data) => {
			gameEventTarget.dispatchEvent(new TicketAddedEvent(data));
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
