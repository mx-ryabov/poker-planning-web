import { NextPage } from "next";
import CreateGamePageContent from "./_components/page-content";
import getVotingSystems from "../_actions/voting-system/get-voting-systems";
import { createGameAsGuest } from "../_actions/game/create-game-as-guest";

interface Props {}

const CreateGamePage: NextPage<Props> = async ({}) => {
	const votingSystems = await getVotingSystems();

	return (
		<CreateGamePageContent
			votingSystems={votingSystems}
			createGameAsGuest={createGameAsGuest}
		/>
	);
};

export default CreateGamePage;
