import { joinAsGuest } from "@/_src/shared/api";
import { Logo } from "@/_src/shared/ui/components/logo";
import { NextLink } from "@/_src/shared/ui/next-components/next-link";
import { NextPage } from "next";
import { GameJoinForm } from "./game-join-form";

interface Props {
	params: Promise<{ id: string }>;
}

export const GameJoinPage: NextPage<Props> = async ({ params }: Props) => {
	const { id: gameId } = await params;

	return (
		<div className="w-full h-screen flex flex-col">
			<header
				className="flex flex-row w-full px-9 py-5 justify-between items-center fixed top-0"
				role="header"
			>
				<NextLink href="/">
					<Logo />
				</NextLink>
			</header>
			<GameJoinForm gameId={gameId} onSubmit={joinAsGuest} />
		</div>
	);
};
