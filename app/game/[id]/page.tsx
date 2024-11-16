import { NextPage } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GameRoomPage } from "@/_src/pages/game-room/ui/game-room.page";

type Params = Promise<{ id: string }>;
interface Props {
	params: Params;
}

const Page: NextPage<Props> = async ({ params }: Props) => {
	const { id } = await params;
	const cookieStore = await cookies();
	const token = cookieStore.get("token");
	if (!token) {
		redirect(`/game/${id}/join`);
	}
	return <GameRoomPage token={token.value} gameId={id} />;
};

export default Page;
