import { joinAsGuest } from "@/_src/shared/api";
import { NextLink } from "@/_src/shared/ui/next-components/next-link";
import { NextPage } from "next";
import { GameJoinForm } from "./game-join-form";
import Image from "next/image";
import LogoSvg from "@public/logo.svg";

interface Props {
	params: Promise<{ id: string }>;
}

export const GameJoinPage: NextPage<Props> = async ({ params }: Props) => {
	const { id: gameId } = await params;

	return (
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
			<GameJoinForm gameId={gameId} onSubmit={joinAsGuest} />
		</div>
	);
};
