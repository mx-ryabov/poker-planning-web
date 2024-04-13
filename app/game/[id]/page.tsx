import { NextPage } from "next";
import { cookies } from "next/headers";
import GameRoom from "./_components/game-room";
import { redirect } from "next/navigation";

interface Props {
	params: { id: string };
}

const GamePage: NextPage<Props> = ({ params }) => {
	const token = cookies().get("token");
	if (!token) {
		redirect(`/game/${params.id}/join`);
	}
	return <GameRoom token={token.value} gameId={params.id} />;
};

export default GamePage;
