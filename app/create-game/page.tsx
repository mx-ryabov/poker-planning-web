import { NextPage } from "next";
import { getVotingSystems } from "@/_src/shared/api/voting-system-api";
import { createGameAsGuest } from "@/_src/shared/api/game-api";
import { CreateGamePage } from "@/_src/pages/create-game";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Create a New Poker Planning Game",
	description:
		"Set up a new game room for collaborative planning and estimation.",
	keywords:
		"poker planning, create game, collaborative estimation, agile planning",
};

interface Props {}

const Page: NextPage<Props> = async () => {
	const votingSystemsPromise = getVotingSystems();

	return (
		<CreateGamePage
			votingSystems={votingSystemsPromise}
			createGameAsGuest={createGameAsGuest}
		/>
	);
};

export default Page;
