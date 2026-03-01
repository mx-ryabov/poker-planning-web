"use client";

import { OnboardingProvider } from "@/src/shared/ui/components/onboarding";
import { ToastProvider } from "@/src/shared/ui/components/toast";
import { ReactNode } from "react";
import { GameStateProvider } from "./_store";
import { GamePageEventsProvider } from "./_events";
import { VotingAsyncStateProvider } from "./_state";
import {
	GameParticipant,
	GetGameByIdResponse,
} from "@/src/domain/entities/game";

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
		<OnboardingProvider>
			<ToastProvider>
				<GameStateProvider
					initialAsyncState={{ game, currentParticipant }}
				>
					<VotingAsyncStateProvider>
						<GamePageEventsProvider
							accessTokenFactory={accessTokenFactory}
							gameId={gameId}
						>
							{children}
						</GamePageEventsProvider>
					</VotingAsyncStateProvider>
				</GameStateProvider>
			</ToastProvider>
		</OnboardingProvider>
	);
}
