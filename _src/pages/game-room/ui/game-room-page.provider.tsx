"use client";
import {
	GameParticipant,
	GetGameByIdResponse,
} from "@/_src/shared/api/game-api";
import {
	useGameStateStore,
	GameEventsProvider,
	GameStateProvider,
	useGameEventsDispatcher,
	useGameEventsHub,
} from "../model";
import { ReactNode } from "react";

interface Props {
	accessTokenFactory: () => Promise<string>;
	gameId: string;
	game: GetGameByIdResponse;
	currentParticipant: GameParticipant;
	children: ReactNode;
}

export function GameRoomPageProvider({
	accessTokenFactory,
	gameId,
	game,
	currentParticipant,
	children,
}: Props) {
	const eventListener = useGameEventsHub({ accessTokenFactory, gameId });
	const gameStateStore = useGameStateStore({ game, currentParticipant });
	useGameEventsDispatcher({ eventListener, gameStateStore });

	return (
		<GameEventsProvider value={eventListener}>
			<GameStateProvider store={gameStateStore}>
				{children}
			</GameStateProvider>
		</GameEventsProvider>
	);
}
