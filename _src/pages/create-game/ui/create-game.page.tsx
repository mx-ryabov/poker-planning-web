"use client";

import { VotingSystemsProvider } from "@/_src/entities";
import { CreateGameForm } from "@/_src/features";
import { CreateGameFormProvider } from "@/_src/features/create-game/model";
import { CreateGameRequest } from "@/_src/shared/api/game-api";
import { VotingSystem } from "@/_src/shared/api/voting-system-api";

interface Props {
	votingSystems: VotingSystem[];
	createGameAsGuest: (req: CreateGameRequest) => Promise<void>;
}

export const CreateGamePage = ({ votingSystems, createGameAsGuest }: Props) => {
	return (
		<div className="flex-1 h-screen">
			<VotingSystemsProvider value={votingSystems}>
				<CreateGameFormProvider>
					<CreateGameForm createGameAsGuest={createGameAsGuest} />
				</CreateGameFormProvider>
			</VotingSystemsProvider>
		</div>
	);
};
