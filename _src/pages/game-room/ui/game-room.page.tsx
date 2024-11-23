"use client";

import { GameManagementTab } from "@/_src/entities/game-room/game-management/model";
import { GameManagementBar } from "@/_src/features/game-room/game-management-bar";
import { UserBar } from "@/_src/features/game-room/user-bar";
import { Drawer } from "@/_src/shared/ui/components/drawer";
import { Logo } from "@/_src/shared/ui/components/logo";
import { NextLink } from "@/_src/shared/ui/next-components/next-link";
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

export function GameRoomPage({ token, gameId }: Props) {
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

	const [activeTab, setActiveTab] = useState<GameManagementTab | null>(null);

	return (
		<div className="flex flex-row h-screen w-full overflow-hidden">
			<div className="flex flex-col w-full">
				<header className="w-full flex flex-row justify-between p-6 relative">
					<NextLink href="/">
						<Logo />
					</NextLink>
					<GameManagementBar
						className="absolute left-1/2 -translate-x-1/2"
						activeTab={activeTab}
						onSelect={(tab) =>
							setActiveTab((prev) => (prev === tab ? null : tab))
						}
					/>
					<UserBar />
				</header>
				<main></main>
			</div>

			<Drawer.Modal
				type="inline"
				position="end"
				portal="in-same-place"
				isOpen={activeTab !== null}
				onOpenChange={() => setActiveTab(null)}
				withSeparator
				stateKey="game-manager-drawer"
				className="min-w-[300px] max-w-[500px]"
			>
				<section className="flex flex-col w-full h-full">
					<Drawer.Heading>Header</Drawer.Heading>
					{activeTab}
				</section>
			</Drawer.Modal>
		</div>
	);
}
