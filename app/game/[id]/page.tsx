import { NextPage } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GameRoomPage } from "@/_src/pages/game-room/ui/game-room.page";
import { getCurrentParticipant, getGameById } from "@/_src/shared/api/game-api";

type Params = Promise<{ id: string }>;
interface Props {
	params: Params;
}

const Page: NextPage<Props> = async ({ params }: Props) => {
	const { id: gameId } = await params;
	const cookieStore = await cookies();
	const token = cookieStore.get("token")?.value;
	if (!token) {
		redirect(`/game/${gameId}/join`);
	}
	const game = await getGameById(gameId);
	const currentParticipant = await getCurrentParticipant(gameId);

	return (
		<GameRoomPage
			accessTokenFactory={async () => {
				"use server";
				return token;
			}}
			gameId={gameId}
			currentParticipant={currentParticipant}
			game={game}
		/>
	);
};

export default Page;
