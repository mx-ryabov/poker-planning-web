"use client";

import {
	GetGameByIdResponse,
	GameParticipant,
} from "@/_src/shared/api/game-api/dto";
import { Logo } from "@/_src/shared/ui/components/logo";
import { NextLink } from "@/_src/shared/ui/next-components/next-link";
import { GameManagementBar } from "./game-management-bar";
import { UserBar } from "./user-bar";
import { GameManagementDrawer } from "./game-management-drawer";
import { useGameEventsHub } from "../model/game-events-hub";
import { GameStateProvider } from "../model";
import { createGameStateStore } from "../model";
import { logout } from "@/_src/shared/api/game-api";

interface Props {
	accessTokenFactory: () => Promise<string>;
	gameId: string;
	game: GetGameByIdResponse;
	currentParticipant: GameParticipant;
}

export function GameRoomPage({
	accessTokenFactory,
	gameId,
	game,
	currentParticipant,
}: Props) {
	useGameEventsHub({ accessTokenFactory, gameId });
	const gameStateStore = createGameStateStore({ game, currentParticipant });

	return (
		<GameStateProvider store={gameStateStore}>
			<div className="flex flex-row h-screen w-full overflow-hidden">
				<div className="flex flex-col w-full">
					<header className="w-full flex flex-row justify-between p-6 relative">
						<NextLink href="/">
							<Logo />
						</NextLink>
						<GameManagementBar className="absolute left-1/2 -translate-x-1/2" />
						<UserBar onLogout={logout} />
					</header>
					<main></main>
				</div>

				<GameManagementDrawer />
			</div>
		</GameStateProvider>
	);
}
