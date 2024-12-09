"use server";
import {
	getCurrentParticipant,
	getGameById,
	logout,
} from "@/_src/shared/api/game-api";
import { NextPage } from "next/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GameRoomPageProvider } from "./game-room-page.provider";
import { NextLink } from "@/_src/shared/ui/next-components/next-link";
import { Logo } from "@/_src/shared/ui/components/logo";
import { GameManagementBar } from "./game-management-bar";
import { UserBar } from "./user-bar";
import { GameManagementDrawer } from "./game-management-drawer";

type Params = Promise<{ id: string }>;
interface PageProps {
	params: Params;
}

export const GameRoomPage: NextPage<PageProps> = async ({
	params,
}: PageProps) => {
	const { id: gameId } = await params;
	const cookieStore = await cookies();
	const token = cookieStore.get("token")?.value;
	if (!token) {
		redirect(`/game/${gameId}/join-room`);
	}

	const [game, currentParticipant] = await Promise.all([
		getGameById(gameId),
		getCurrentParticipant(gameId),
	]);

	const accessTokenFactory = async function () {
		"use server";
		return token;
	};

	return (
		<GameRoomPageProvider
			accessTokenFactory={accessTokenFactory}
			gameId={gameId}
			currentParticipant={currentParticipant}
			game={game}
		>
			<div className="flex flex-row h-screen w-full overflow-hidden">
				<div className="flex flex-col w-full">
					<header className="w-full flex flex-row justify-between p-6 relative">
						<NextLink href="/">
							<Logo />
						</NextLink>
						<GameManagementBar className="absolute left-1/2 -translate-x-1/2" />
						<UserBar onLogout={logout} />
					</header>
					<main></main>
				</div>

				<GameManagementDrawer />
			</div>
		</GameRoomPageProvider>
	);
};
