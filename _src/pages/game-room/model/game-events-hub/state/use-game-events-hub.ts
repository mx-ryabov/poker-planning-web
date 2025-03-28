import {
	HubConnection,
	HubConnectionState,
} from "@microsoft/signalr/dist/esm/HubConnection";
import { HubConnectionBuilder } from "@microsoft/signalr/dist/esm/HubConnectionBuilder";
import { HttpTransportType } from "@microsoft/signalr/dist/esm/ITransport";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
	DisconnectedEvent,
	ParticipantJoinedEvent,
	ParticipantLeftEvent,
	ReconnectedEvent,
	ReconnectingEvent,
	TicketAddedEvent,
	TicketDeletedEvent,
	TicketUpdatedEvent,
} from "../events/game-events";
import { GameEventType, GameEventTypeMap } from "../events";
import {
	GameEventListener,
	GameEventListenerCallback,
} from "./use-game-events-hub.types";

type Props = {
	gameId: string;
	accessTokenFactory: () => Promise<string>;
};

export function useGameEventsHub({ gameId, accessTokenFactory }: Props) {
	const gameEventTarget = useMemo(() => new EventTarget(), []);

	const [connection, setConnection] = useState<HubConnection | null>(null);

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		let isCanceled = false;

		const hubConnectionSetup = new HubConnectionBuilder().withUrl(
			`${process.env.NEXT_PUBLIC_HOST}/hubs/game?gameId=${gameId}`,
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
		connection.on(GameEventType.TicketUpdated, (data) => {
			gameEventTarget.dispatchEvent(new TicketUpdatedEvent(data));
		});
		connection.on(GameEventType.TicketDeleted, (data) => {
			gameEventTarget.dispatchEvent(new TicketDeletedEvent(data));
		});
	}, [connection, gameEventTarget]);

	const eventSubscriber = useCallback(
		<TType extends GameEventType>(
			eventType: TType,
			handler: GameEventListenerCallback<GameEventTypeMap[TType]>,
			// eslint-disable-next-line no-undef
			options?: AddEventListenerOptions | boolean,
		) => {
			(gameEventTarget.addEventListener as GameEventListener["add"])(
				eventType,
				handler,
				options,
			);

			return () => {
				(
					gameEventTarget.removeEventListener as GameEventListener["remove"]
				)(eventType, handler, options);
			};
		},
		[gameEventTarget],
	);

	return eventSubscriber;
}
