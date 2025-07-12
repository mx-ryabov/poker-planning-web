"use client";
import "./header.css";
import { RefObject, useRef, useState } from "react";
import { Logo } from "@/_src/shared/ui/components/logo";
import {
	NextLink,
	NextLinkButton,
} from "@/_src/shared/ui/next-components/next-link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ButtonSquare } from "@/_src/shared/ui/components/button";
import { MenuIcon } from "@/_src/shared/ui/components/icon/svg/menu.icon";
import { cva } from "class-variance-authority";
import { CloseIcon } from "@/_src/shared/ui/components/icon";
import { Modal, ModalOverlay } from "react-aria-components";
import { AnimatedText } from "@/_src/shared/ui/components/animated-text.tsx";
import { AnimatedFadeIn } from "@/_src/shared/ui/components/animated-fade-in";

gsap.registerPlugin(ScrollTrigger);

type HeaderProps = {
	containerRef: RefObject<HTMLDivElement | null>;
};

export function Header({ containerRef }: HeaderProps) {
	const headerRef = useRef<HTMLElement | null>(null);
	const menuContainerRef = useRef<HTMLDivElement | null>(null);
	const modalRef = useRef<HTMLDivElement | null>(null);

	const [isMenuOpen, setMenuOpen] = useState(false);

	useGSAP(
		() => {
			const headerEl = headerRef.current;
			if (!headerEl) return;
			const navTween = gsap.timeline({
				scrollTrigger: {
					trigger: headerEl,
					start: "0% top",
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

	useGSAP(
		() => {
			const container = containerRef.current;
			const headerEl = headerRef.current;
			const modal = modalRef.current;
			const menuContainer = menuContainerRef.current;

			if (
				!container ||
				!menuContainer ||
				!modal ||
				!headerEl ||
				!isMenuOpen
			)
				return;

			gsap.to(headerEl, {
				borderBottomWidth: 0,
				backgroundColor: "transparent",
				backdropFilter: "none",
				duration: 1,
				ease: "power4.inOut",
			});

			gsap.to(container, {
				rotation: 10,
				x: 300,
				y: 450,
				scale: 1.5,
				duration: 1.25,
				ease: "power4.inOut",
			});

			gsap.to(menuContainer, {
				rotation: 0,
				x: 0,
				y: 0,
				scale: 1,
				opacity: 1,
				duration: 1.25,
				ease: "power4.inOut",
			});

			gsap.to(".link", {
				y: "0%",
				opacity: 1,
				duration: 1,
				delay: 0.75,
				stagger: 0.1,
				ease: "power3.out",
			});

			gsap.to(modal, {
				clipPath: "polygon(0% 0%, 100% 0%, 100% 175%, 0% 100%)",
				duration: 1.25,
				ease: "power4.inOut",
			});
		},
		{
			dependencies: [
				isMenuOpen,
				containerRef,
				menuContainerRef,
				modalRef,
			],
		},
	);

	const renderMenuItems = () => {
		return (
			<AnimatedText delay={0.75}>
				<NextLink
					className="link relative my-2 flex h-10 items-center justify-center overflow-hidden border border-transparent bg-transparent text-lg font-light no-underline! hover:text-neutral-900! xl:text-base"
					href="/#features"
					onPress={closeMenu}
				>
					Features
				</NextLink>
				<NextLink
					className="link relative my-2 flex h-10 items-center justify-center overflow-hidden border border-transparent bg-transparent text-lg font-light no-underline! hover:text-neutral-900! xl:text-base"
					href="/#how-it-works"
					onPress={closeMenu}
				>
					How it works
				</NextLink>
				<NextLink
					className="link relative my-2 flex h-10 items-center justify-center overflow-hidden border border-transparent bg-transparent text-lg font-light no-underline! hover:text-neutral-900! xl:text-base"
					href="/#coming-soon"
					onPress={closeMenu}
				>
					Coming soon
				</NextLink>
			</AnimatedText>
		);
	};

	const renderCTAs = () => {
		return (
			<>
				<NextLinkButton
					className="min-w-fit no-underline"
					variant="outline"
					href="/#subscribe"
					onPress={closeMenu}
				>
					Get Updates
				</NextLinkButton>
				<NextLinkButton
					className="min-w-fit no-underline"
					href="/create-game"
				>
					Start a Game
				</NextLinkButton>
			</>
		);
	};

	const openMenu = () => {
		setMenuOpen(true);
	};

	const closeMenu = () => {
		const container = containerRef.current;
		const modal = modalRef.current;
		const headerEl = headerRef.current;
		const menuContainer = menuContainerRef.current;

		if (!container || !menuContainer || !headerEl || !modal) return;

		gsap.to(headerEl, {
			borderBottom:
				"2px color-mix(in oklab, var(--color-white) 30%, transparent)",
			backgroundColor:
				"color-mix(in oklab, var(--color-neutral-100) 20%, transparent)",
			backdropFilter: "blur(4px)",
			duration: 1,
			ease: "power1.inOut",
		});

		gsap.to(container, {
			rotation: 0,
			x: 0,
			y: 0,
			scale: 1,
			duration: 1.25,
			ease: "power4.inOut",
		});

		gsap.to(menuContainer, {
			rotation: -15,
			x: -100,
			y: -100,
			scale: 1.5,
			opacity: 0.25,
			duration: 1.25,
			ease: "power4.inOut",
		});

		gsap.to(modal, {
			clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
			duration: 1.25,
			ease: "power4.inOut",
			onComplete: () => {
				setMenuOpen(false);
			},
		});
	};

	return (
		<header
			ref={headerRef}
			className="sticky top-0 right-0 left-0 z-10 max-h-[72px] w-full"
		>
			<div className="mx-auto flex h-full w-full flex-row justify-between px-6 py-4 md:max-w-2xl lg:max-w-4xl xl:max-w-5xl xl:gap-6">
				<NextLink href="/#hero" className="z-20 flex items-center">
					<Logo />
				</NextLink>

				<ButtonSquare
					icon={isMenuOpen ? CloseIcon : MenuIcon}
					variant="ghost"
					size="large"
					className="z-20 bg-transparent xl:hidden"
					onPress={isMenuOpen ? closeMenu : openMenu}
				/>
				<ModalOverlay
					ref={modalRef}
					isOpen={isMenuOpen}
					className={overlayStyles}
				>
					<Modal className="h-full w-full">
						<nav
							className="animate-menu-content relative flex h-full w-full flex-col"
							ref={menuContainerRef}
						>
							<div className="flex h-full items-center justify-center *:flex *:w-full *:flex-col *:items-center *:justify-center">
								{renderMenuItems()}
							</div>
							<AnimatedFadeIn delay={1}>
								<div className="fixed right-0 bottom-0 left-0 flex h-[100px] w-full flex-row items-start justify-center gap-2">
									{renderCTAs()}
								</div>
							</AnimatedFadeIn>
						</nav>
					</Modal>
				</ModalOverlay>

				<div className="hidden h-full w-full items-center justify-center *:flex *:w-full *:flex-row *:items-center *:justify-center *:gap-6 xl:flex">
					{renderMenuItems()}
				</div>
				<div className="hidden flex-row gap-2 xl:flex">
					{renderCTAs()}
				</div>
			</div>
		</header>
	);
}

const overlayStyles = cva(
	"fixed inset-0 h-screen w-screen bg-white [clip-path:polygon(0_0,100%_0,100%_0,0_0)]",
	{
		variants: {
			isEntering: {
				true: "animate-fade-in duration-300 ease-out",
				false: "",
			},
			isExiting: {
				true: "animate-fade-out duration-300 ease-in",
				false: "",
			},
		},
	},
);
