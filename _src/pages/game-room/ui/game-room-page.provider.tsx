"use client";
import {
	GameParticipant,
	GetGameByIdResponse,
} from "@/_src/shared/api/game-api";
import {
	createGameStateStore,
	GameStateProvider,
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
	useGameEventsHub({ accessTokenFactory, gameId });
	const gameStateStore = createGameStateStore({ game, currentParticipant });

	return (
		<GameStateProvider store={gameStateStore}>{children}</GameStateProvider>
	);
}
