"use client";

import { VotingSystemsProvider } from "@/_src/entities/voting-system";
import { CreateGameRequest } from "@/_src/shared/api/game-api";
import { VotingSystem } from "@/_src/shared/api/voting-system-api";
import { CreateGameForm } from "./create-game-form";

interface Props {
	votingSystems: VotingSystem[];
	createGameAsGuest: (_req: CreateGameRequest) => Promise<void>;
}

export const CreateGamePage = ({ votingSystems, createGameAsGuest }: Props) => {
	return (
		<div className="h-screen flex-1">
			<VotingSystemsProvider value={votingSystems}>
				<CreateGameForm createGameAsGuest={createGameAsGuest} />
			</VotingSystemsProvider>
		</div>
	);
};
