"use client";
import "./header.css";
import { RefObject, useRef, useState } from "react";
import {
	NextLink,
	NextLinkButton,
} from "@/_src/shared/ui/next-components/next-link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ButtonSquare, NewButton } from "@/_src/shared/ui/components/button";
import { MenuIcon } from "@/_src/shared/ui/components/icon/svg/menu.icon";
import { CloseIcon } from "@/_src/shared/ui/components/icon";
import { Modal, ModalOverlay } from "react-aria-components";
import { AnimatedText } from "@/_src/shared/ui/components/animated-text.tsx";
import { AnimatedFadeIn } from "@/_src/shared/ui/components/animated-fade-in";
import Image from "next/image";
import LogoSvg from "@public/logo.svg";
import { useRouter } from "next/navigation";
import { Link } from "@/_src/shared/ui/components/link";

gsap.registerPlugin(ScrollTrigger);

type HeaderProps = {
	containerRef: RefObject<HTMLDivElement | null>;
};

export function Header({ containerRef }: HeaderProps) {
	const router = useRouter();
	const headerRef = useRef<HTMLElement | null>(null);
	const menuContainerRef = useRef<HTMLDivElement | null>(null);
	const modalRef = useRef<HTMLDivElement | null>(null);

	const [isMenuOpen, setMenuOpen] = useState(false);

	useBgBlurAnimation(headerRef);

	const { animateMenuClosing } = useMenuOpenCloseAnimation(
		containerRef,
		headerRef,
		modalRef,
		menuContainerRef,
		isMenuOpen,
	);

	const onNavLinkPress = (hash: string) => {
		if (isMenuOpen) {
			animateMenuClosing(() => {
				setMenuOpen(false);
				router.push(hash);
			});
		} else {
			router.push(hash);
		}
	};

	const renderMenuItems = ({
		animationDelay,
	}: {
		animationDelay: number;
	}) => {
		return (
			<AnimatedText delay={animationDelay}>
				<Link
					className="link relative my-2 flex h-10 items-center justify-center overflow-hidden border border-transparent bg-transparent text-lg font-light no-underline! hover:text-neutral-900! xl:text-base"
					onPress={() => onNavLinkPress("/#features")}
				>
					Features
				</Link>
				<Link
					className="link relative my-2 flex h-10 items-center justify-center overflow-hidden border border-transparent bg-transparent text-lg font-light no-underline! hover:text-neutral-900! xl:text-base"
					onPress={() => onNavLinkPress("/#how-it-works")}
				>
					How it works
				</Link>
				<Link
					className="link relative my-2 flex h-10 items-center justify-center overflow-hidden border border-transparent bg-transparent text-lg font-light no-underline! hover:text-neutral-900! xl:text-base"
					onPress={() => onNavLinkPress("/#coming-soon")}
				>
					Coming soon
				</Link>
			</AnimatedText>
		);
	};

	const renderCTAs = () => {
		return (
			<>
				<NewButton
					className="min-w-fit no-underline"
					variant="outline"
					onPress={() => onNavLinkPress("/#subscribe")}
				>
					Get Updates
				</NewButton>
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
		animateMenuClosing(() => {
			setMenuOpen(false);
		});
	};

	return (
		<header
			ref={headerRef}
			className="fixed top-0 right-0 left-0 z-50 max-h-[72px] w-full"
		>
			<div className="mx-auto flex h-full w-full flex-row justify-between px-6 py-4 md:max-w-2xl lg:max-w-4xl xl:max-w-5xl xl:gap-6">
				<AnimatedFadeIn>
					<Link
						onPress={() => onNavLinkPress("/#hero")}
						className="z-20 flex items-center"
					>
						<Image
							src={LogoSvg}
							alt="Logo"
							height={24}
							width={175}
							priority
						/>
					</Link>
				</AnimatedFadeIn>

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
					className="fixed inset-0 h-dvh w-screen bg-white will-change-transform"
				>
					<Modal className="h-full w-full">
						<nav
							className="animate-menu-content relative flex h-full w-full flex-col"
							ref={menuContainerRef}
						>
							<div className="flex h-full items-center justify-center *:flex *:w-full *:flex-col *:items-center *:justify-center">
								{renderMenuItems({ animationDelay: 0.75 })}
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
					{renderMenuItems({ animationDelay: 0 })}
				</div>
				<AnimatedFadeIn>
					<div className="hidden flex-row gap-2 xl:flex">
						{renderCTAs()}
					</div>
				</AnimatedFadeIn>
			</div>
		</header>
	);
}

function useMenuOpenCloseAnimation(
	containerRef: RefObject<HTMLDivElement | null>,
	headerRef: RefObject<HTMLElement | null>,
	modalRef: RefObject<HTMLDivElement | null>,
	menuContainerRef: RefObject<HTMLDivElement | null>,
	isMenuOpen: boolean,
) {
	// Opening animation for the menu
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

			gsap.fromTo(
				modal,
				{
					clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
				},
				{
					clipPath: "polygon(0 0, 100% 0, 100% 175%, 0 100%)",
					duration: 1.25,
					ease: "power4.inOut",
				},
			);
		},
		{
			dependencies: [
				isMenuOpen,
				containerRef,
				menuContainerRef,
				modalRef,
			],
			revertOnUpdate: true,
		},
	);

	const { contextSafe } = useGSAP({ scope: headerRef });
	const animateMenuClosing = contextSafe(
		(onAnimationComplete?: () => void) => {
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
				onComplete: onAnimationComplete,
			});
		},
	);

	return { animateMenuClosing };
}

function useBgBlurAnimation(headerRef: RefObject<HTMLElement | null>) {
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
		{ dependencies: [headerRef], scope: headerRef, revertOnUpdate: true },
	);
}
