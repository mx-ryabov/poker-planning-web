import { HubConnection } from "@microsoft/signalr/dist/esm/HubConnection";
import { HubConnectionBuilder } from "@microsoft/signalr/dist/esm/HubConnectionBuilder";
import { HttpTransportType } from "@microsoft/signalr/dist/esm/ITransport";
import { useEffect, useState } from "react";

type Props = {
	gameId: string;
	accessTokenFactory: () => Promise<string>;
};

export function useGameEventsHub({ gameId, accessTokenFactory }: Props) {
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
		if (!connection) {
			return;
		}
		console.log("connected!");
		connection.on("ParticipantJoined", (data) => {
			console.log("ParticipantJoined", data);
		});
	}, [connection]);
}
