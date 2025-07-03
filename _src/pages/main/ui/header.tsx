import { Logo } from "@/_src/shared/ui/components/logo";
import {
	NextLink,
	NextLinkButton,
} from "@/_src/shared/ui/next-components/next-link";

export function Header() {
	return (
		<header className="fixed top-0 right-0 left-0 z-10 w-full border-b-2 border-b-white/30 bg-neutral-100/20 backdrop-blur-xs">
			<div className="mx-auto flex w-full max-w-5xl flex-row justify-between py-4">
				<NextLink href="/#hero" className="flex items-center">
					<Logo />
				</NextLink>

				<nav className="flex flex-row gap-6">
					<NextLinkButton
						className="border border-transparent bg-transparent no-underline hover:border-neutral-300 hover:bg-neutral-200"
						variant="ghost"
						href="/#features"
					>
						Features
					</NextLinkButton>
					<NextLinkButton
						className="border border-transparent bg-transparent no-underline hover:border-neutral-300 hover:bg-neutral-200"
						variant="ghost"
						href="/#how-it-works"
					>
						How it works
					</NextLinkButton>
					<NextLinkButton
						className="border border-transparent bg-transparent no-underline hover:border-neutral-300 hover:bg-neutral-200"
						variant="ghost"
						href="/#coming-soon"
					>
						Coming soon
					</NextLinkButton>
				</nav>
				<div className="flex flex-row gap-2">
					<NextLinkButton
						className="no-underline"
						variant="outline"
						href="/#subscribe"
					>
						Get Updates
					</NextLinkButton>
					<NextLinkButton
						className="no-underline"
						href="/create-game"
					>
						Start a Game
					</NextLinkButton>
				</div>
			</div>
		</header>
	);
}
