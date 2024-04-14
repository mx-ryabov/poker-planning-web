import { NextPage } from "next";
import { getVotingSystems } from "@/_src/shared/api/voting-system-api";
import { createGameAsGuest } from "@/_src/shared/api/game-api";
import { CreateGamePage } from "@/_src/pages/create-game";

interface Props {}

const Page: NextPage<Props> = async ({}) => {
	const votingSystems = await getVotingSystems();

	return (
		<CreateGamePage
			votingSystems={votingSystems}
			createGameAsGuest={createGameAsGuest}
		/>
	);
};

export default Page;
