import { scan } from "react-scan";

import { Metadata, NextPage } from "next";
import {
	getCurrentParticipant,
	getGameById,
	getToken,
	logout,
} from "@/src/domain/entities/game";
import { redirect } from "next/navigation";
import { MobileBlockerScreen } from "@/src/shared/ui/components/mobile-blocker-screen";
import { ScrollbarGutterStablePreventer } from "@/src/shared/ui/components/scrollbar-gutter-stable-preventer";
import { NextLink } from "@/src/shared/ui/next-components/next-link";
import Image from "next/image";
import LogoSvg from "@public/logo.svg";
import {
	BadConnectionStatus,
	GameManagementBar,
	GameManagementDrawer,
	OnboardingHelper,
	PokerField,
	UserBar,
} from "./_components";
import { GameRoomPageProvider } from "./page.provider";

export const metadata: Metadata = {
	title: "Poker Planning | Real-Time Agile Estimation Room",
	description: "Collaborate and vote on story points live.",
	keywords:
		"poker planning, agile estimation, real-time collaboration, story points, scrum poker",
};

if (typeof window !== "undefined") {
	scan({
		enabled: true,
		log: true, // logs render info to console (default: false)
	});
}

type Params = Promise<{ id: string }>;
interface PageProps {
	params: Params;
}

export const GameRoomPage: NextPage<PageProps> = async ({
	params,
}: PageProps) => {
	const { id: gameId } = await params;
	const token = await getToken();
	if (!token) {
		redirect(`/game/${gameId}/join-room`);
	}

	// TODO: consider Streaming for better performance, but need to come up with a managing it with zustand
	const [gameRes, currentParticipantRes] = await Promise.all([
		getGameById(gameId),
		getCurrentParticipant(gameId),
	]);

	if (!gameRes.ok) {
		throw gameRes.error;
	}
	if (!currentParticipantRes.ok) {
		throw currentParticipantRes.error;
	}

	const accessTokenFactory = async function () {
		"use server";
		return token;
	};

	return (
		<MobileBlockerScreen>
			<ScrollbarGutterStablePreventer />
			<GameRoomPageProvider
				accessTokenFactory={accessTokenFactory}
				gameId={gameId}
				currentParticipant={currentParticipantRes.data}
				game={gameRes.data}
			>
				<BadConnectionStatus />
				<div className="flex h-screen w-full flex-row overflow-hidden">
					<div className="flex w-full flex-col relative">
						<header className="relative flex w-full flex-row justify-between p-6">
							<NextLink href="/">
								<Image
									src={LogoSvg}
									alt="Logo"
									height={24}
									width={175}
									priority
								/>
							</NextLink>
							<GameManagementBar className="absolute left-1/2 -translate-x-1/2" />
							<UserBar onLogout={logout} />
						</header>
						<main className="h-full w-full">
							<PokerField />
						</main>
						<OnboardingHelper className="absolute right-6 bottom-6" />
					</div>

					<GameManagementDrawer />
				</div>
			</GameRoomPageProvider>
		</MobileBlockerScreen>
	);
};

export default GameRoomPage;
