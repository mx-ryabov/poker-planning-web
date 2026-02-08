import { NextPage } from "next";
import { getVotingSystems } from "@/src/domain/entities/voting-system/actions/server-actions";
import { Metadata } from "next";
import { CreateGamePageProvider } from "./page.provider";
import { CreateGameForm } from "./_components";

export const metadata: Metadata = {
	title: "Create a New Poker Planning Game",
	description:
		"Set up a new game room for collaborative planning and estimation.",
	keywords:
		"poker planning, create game, collaborative estimation, agile planning",
};

const Page: NextPage = async () => {
	const votingSystemsStream = getVotingSystems();

	return (
		<CreateGamePageProvider votingSystems={votingSystemsStream}>
			<div className="h-screen flex-1">
				<CreateGameForm />
			</div>
		</CreateGamePageProvider>
	);
};

export default Page;
