import { NextPage } from "next";
import { getVotingSystems } from "@/_src/shared/api/voting-system-api";
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
	const votingSystemsStream = getVotingSystems();

	return <CreateGamePage votingSystems={votingSystemsStream} />;
};

export default Page;
