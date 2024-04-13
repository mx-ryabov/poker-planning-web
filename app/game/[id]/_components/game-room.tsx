"use client";

import {
	HubConnection,
	HubConnectionBuilder,
	HttpTransportType,
} from "@microsoft/signalr";
import { useEffect, useState } from "react";

interface Props {
	token: string;
	gameId: string;
}

export default function GameRoom({ token, gameId }: Props) {
	const [connection, setConnection] = useState<HubConnection | null>(null);

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		const conn = new HubConnectionBuilder()
			.withUrl(`http://localhost:5011/hubs/game?gameId=${gameId}`, {
				transport: HttpTransportType.WebSockets,
				accessTokenFactory: () => token,
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
	}, [setConnection, gameId, token]);

	useEffect(() => {
		if (!connection) {
			return;
		}
		console.log("connected!");
		connection.on("ParticipantJoined", (data) => {
			console.log("ParticipantJoined", data);
		});
	}, [connection]);

	return <div>Game Room</div>;
}
