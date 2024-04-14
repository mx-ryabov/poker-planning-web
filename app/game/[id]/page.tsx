import { NextPage } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GameRoomPage } from "@/_src/pages/game-room/ui/game-room.page";

interface Props {
	params: { id: string };
}

const Page: NextPage<Props> = ({ params }) => {
	const token = cookies().get("token");
	if (!token) {
		redirect(`/game/${params.id}/join`);
	}
	return <GameRoomPage token={token.value} gameId={params.id} />;
};

export default Page;
