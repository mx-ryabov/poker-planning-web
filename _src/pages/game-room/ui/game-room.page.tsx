"use client";

import { GetGameByIdResponse } from "@/_src/shared/api/game-api/dto/get-game-by-id-response";
import { Logo } from "@/_src/shared/ui/components/logo";
import { NextLink } from "@/_src/shared/ui/next-components/next-link";
import { GameManagementBar } from "./game-management-bar";
import { UserBar } from "./user-bar";
import { GameManagementDrawer } from "./game-management-drawer";
import { useGameEventsHub } from "../model/game-events-hub";
import { GameStateProvider } from "../model";

interface Props {
	token: string;
	gameId: string;
	game: GetGameByIdResponse;
}

export function GameRoomPage({ token, gameId, game }: Props) {
	useGameEventsHub({ token, gameId });

	return (
		<GameStateProvider initialState={game}>
			<div className="flex flex-row h-screen w-full overflow-hidden">
				<div className="flex flex-col w-full">
					<header className="w-full flex flex-row justify-between p-6 relative">
						<NextLink href="/">
							<Logo />
						</NextLink>
						<GameManagementBar className="absolute left-1/2 -translate-x-1/2" />
						<UserBar />
					</header>
					<main></main>
				</div>

				<GameManagementDrawer />
			</div>
		</GameStateProvider>
	);
}
