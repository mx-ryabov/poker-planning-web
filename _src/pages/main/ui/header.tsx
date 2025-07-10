"use client";
import { useRef } from "react";
import { Logo } from "@/_src/shared/ui/components/logo";
import {
	NextLink,
	NextLinkButton,
} from "@/_src/shared/ui/next-components/next-link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function Header() {
	const headerRef = useRef<HTMLElement | null>(null);
	useGSAP(
		() => {
			const headerEl = headerRef.current;
			if (!headerEl) return;

			const navTween = gsap.timeline({
				scrollTrigger: {
					trigger: headerEl,
					start: "top top",
					scrub: true,
					scroller: document.getElementsByClassName("scroller")[0],
				},
			});

			navTween.fromTo(
				headerEl,
				{
					borderBottomWidth: 0,
					backgroundColor: "transparent",
					backdropFilter: "none",
				},
				{
					borderBottom:
						"2px color-mix(in oklab, var(--color-white) 30%, transparent)",
					backgroundColor:
						"color-mix(in oklab, var(--color-neutral-100) 20%, transparent)",
					backdropFilter: "blur(4px)",
					duration: 1,
					ease: "power1.inOut",
				},
			);
		},
		{ dependencies: [headerRef], scope: headerRef },
	);

	return (
		<header
			ref={headerRef}
			className="fixed top-0 right-0 left-0 z-10 w-full"
		>
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
