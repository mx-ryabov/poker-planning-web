import { NextPage } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GameRoomPage } from "@/_src/pages/game-room/ui/game-room.page";
import { getGameById } from "@/_src/shared/api/game-api";

type Params = Promise<{ id: string }>;
interface Props {
	params: Params;
}

const Page: NextPage<Props> = async ({ params }: Props) => {
	const { id } = await params;
	const cookieStore = await cookies();
	const token = cookieStore.get("token")?.value;
	if (!token) {
		redirect(`/game/${id}/join`);
	}
	const game = await getGameById(id);

	return (
		<GameRoomPage
			accessTokenFactory={async () => {
				"use server";
				return token;
			}}
			gameId={id}
			game={game}
		/>
	);
};

export default Page;
