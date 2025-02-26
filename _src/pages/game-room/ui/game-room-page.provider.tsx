"use client";
import {
	GameParticipant,
	GetGameByIdResponse,
} from "@/_src/shared/api/game-api";
import {
	GameEventsProvider,
	GameStateProvider,
	useGameEventsDispatcher,
	useGameEvents,
	useGameStore,
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
	return (
		<GameStateProvider initialAsyncState={{ game, currentParticipant }}>
			<GameEventsProvider
				accessTokenFactory={accessTokenFactory}
				gameId={gameId}
			>
				<GameEventDispatcher />
				{children}
			</GameEventsProvider>
		</GameStateProvider>
	);
}

function GameEventDispatcher() {
	const eventSubscriber = useGameEvents();
	const gameStateStore = useGameStore();
	useGameEventsDispatcher({ eventSubscriber, gameStateStore });
	return null;
}
