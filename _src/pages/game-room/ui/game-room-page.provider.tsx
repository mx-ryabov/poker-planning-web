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
	VotingAsyncStateProvider,
} from "../model";
import { ReactNode } from "react";
import { ToastProvider } from "@/_src/shared/ui/components/toast";

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
		<ToastProvider>
			<GameStateProvider initialAsyncState={{ game, currentParticipant }}>
				<GameEventsProvider
					accessTokenFactory={accessTokenFactory}
					gameId={gameId}
				>
					<VotingAsyncStateProvider>
						<GameEventDispatcher />
						{children}
					</VotingAsyncStateProvider>
				</GameEventsProvider>
			</GameStateProvider>
		</ToastProvider>
	);
}

function GameEventDispatcher() {
	const eventSubscriber = useGameEvents();
	const gameStateStore = useGameStore();
	useGameEventsDispatcher({ eventSubscriber, gameStateStore });
	return null;
}
