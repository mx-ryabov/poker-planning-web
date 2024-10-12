import { Link } from "@/_src/shared/ui/components/link";
import { Button } from "@/_src/shared/ui/components/button";
import { Logo } from "@/_src/shared/ui/components/logo";
import Image from "next/image";
import CardsImage from "@public/playing-cards 1.webp";

export function MainPage() {
	return (
		<div className="flex flex-col items-center h-lvh">
			<header className="flex flex-row w-full px-9 py-5 justify-between">
				<Logo />
				<nav className="flex flex-row gap-6">
					<Button title="Sign In" styleType="ghost" />
					<Button title="Sign Up" styleType="outline" />
					<Link className="no-underline" href="/create-game">
						<Button title="Start the game" />
					</Link>
				</nav>
			</header>
			<div className="flex flex-row flex-grow items-center justify-between max-w-7xl w-full px-10">
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
						<Link className="no-underline" href="/create-game">
							<Button
								title="Start the game"
								size="large"
								className="mb-3"
							/>
						</Link>
						<p className="text-xs text-neutral-700">
							Already a member? <Link>Sign In</Link>
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
