import { MobileBlockerScreen } from "@/src/shared/ui/components/mobile-blocker-screen";
import { NextLink } from "@/src/shared/ui/next-components/next-link";
import { Metadata, NextPage } from "next";
import Image from "next/image";
import LogoSvg from "@public/logo.svg";
import { GameJoinForm } from "./_components";

export const metadata: Metadata = {
	title: "Poker Planning | Room for Joining",
	description:
		"Join a real-time agile estimation room to collaborate and vote on story points.",
	keywords:
		"poker planning, agile estimation, join room, real-time collaboration, story points, scrum poker",
};

interface Props {
	params: Promise<{ id: string }>;
}

const GameJoinPage: NextPage<Props> = async ({ params }: Props) => {
	const { id: gameId } = await params;

	return (
		<MobileBlockerScreen>
			<div className="flex h-screen w-full flex-col">
				<header
					className="fixed top-0 flex w-full flex-row items-center justify-between px-9 py-5"
					role="header"
				>
					<NextLink href="/">
						<Image
							src={LogoSvg}
							alt="Logo"
							height={24}
							width={175}
							priority
						/>
					</NextLink>
				</header>
				<GameJoinForm gameId={gameId} />
			</div>
		</MobileBlockerScreen>
	);
};

export default GameJoinPage;
