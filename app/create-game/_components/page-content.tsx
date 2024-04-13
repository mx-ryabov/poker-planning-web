"use client";

import VotingSystem from "@/app/_models/voting-system/voting-system";
import { CreateGameFormProvider } from "../_providers/create-game-form-navigation/provider";
import { CreateGameForm } from "./form";
import { CreateGamePageDataProvider } from "../_providers/create-game-page-data/provider";
import CreateGameRequest from "@/app/_models/game/create-game-request";

interface Props {
	votingSystems: VotingSystem[];
	createGameAsGuest: (req: CreateGameRequest) => Promise<void>;
}

const CreateGamePageContent = ({ votingSystems, createGameAsGuest }: Props) => {
	return (
		<div className="flex-1 h-screen">
			<CreateGamePageDataProvider votingSystems={votingSystems}>
				<CreateGameFormProvider>
					<CreateGameForm createGameAsGuest={createGameAsGuest} />
				</CreateGameFormProvider>
			</CreateGamePageDataProvider>
		</div>
	);
};

export default CreateGamePageContent;
