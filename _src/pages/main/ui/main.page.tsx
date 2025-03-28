import { Button } from "@/_src/shared/ui/components/button";
import { Logo } from "@/_src/shared/ui/components/logo";
import Image from "next/image";
import CardsImage from "@public/playing-cards 1.webp";
import {
	NextLinkButton,
	NextLink,
} from "@/_src/shared/ui/next-components/next-link";

export function MainPage() {
	return (
		<div className="flex flex-col items-center h-lvh">
			<header className="flex flex-row w-full px-9 py-5 justify-between">
				<Logo />
				<nav className="flex flex-row gap-6">
					<Button title="Sign In" variant="ghost" />
					<Button title="Sign Up" variant="outline" />
					<NextLinkButton
						className="no-underline"
						href="/create-game"
					>
						Start the game
					</NextLinkButton>
				</nav>
			</header>
			<div className="flex flex-row grow items-center justify-between max-w-7xl w-full px-10">
				<section>
					<header className="mb-6">
						<h1 className="text-6xl leading-normal font-bold text-neutral-700">
							Poker Planning
						</h1>
						<h3 className="text-lg text-neutral-700">
							Make your team efficient again 🚀
						</h3>
					</header>
					<nav>
						<NextLinkButton
							className="no-underline mb-3"
							size="large"
							href="/create-game"
						>
							Start the game
						</NextLinkButton>
						<p className="text-xs text-neutral-700">
							Already a member?{" "}
							<NextLink href="/sign-in">Sign In</NextLink>
						</p>
					</nav>
				</section>
				<section>
					<Image src={CardsImage} alt="Cards" />
				</section>
			</div>
		</div>
	);
}
