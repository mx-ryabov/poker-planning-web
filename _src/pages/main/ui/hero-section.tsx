"use client";
import Image from "next/image";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import GamePreview from "@public/game-preview.webp";
import { NextLinkButton } from "@/_src/shared/ui/next-components/next-link";
import { cva } from "class-variance-authority";
import { AnimatedText } from "@/_src/shared/ui/components/animated-text.tsx";
import { AnimatedFadeIn } from "@/_src/shared/ui/components/animated-fade-in";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

if (typeof window !== "undefined") {
	gsap.registerPlugin(DrawSVGPlugin);
	gsap.registerPlugin(useGSAP);
}

function getScaleFactorByScreenWidth(width: number) {
	/**768, 1024, 1280 */
	if (width >= 768 && width < 1024) {
		return 0.8;
	}
	if (width >= 1024 && width < 1280) {
		return 0.9;
	}
	return 1;
}

export function HeroSection() {
	const heroContainerRef = useRef<HTMLDivElement | null>(null);
	const cardsContainerRef = useRef<HTMLDivElement | null>(null);

	useGSAP(
		() => {
			const screenWidth = document.body.getBoundingClientRect().width;
			const cards = document.getElementsByClassName("flying-card");

			gsap.utils
				.toArray<HTMLDivElement>(".flying-card-target")
				.forEach((target, ind) => {
					const targetRect = target.getBoundingClientRect();
					const cardRect = cards[ind].getBoundingClientRect();

					gsap.to(cards[ind], {
						x: targetRect.left - cardRect.left + cardRect.width / 2,
						y: targetRect.top - cardRect.top + cardRect.height / 2,
						duration: 1,
						ease: "power2.inOut",
					});

					gsap.to(cards[ind].childNodes, {
						duration: 1,
						scale:
							1 * getScaleFactorByScreenWidth(screenWidth) -
							ind * 0.15,
						rotate: 0,
						ease: "power2.inOut",
					});
				});
		},
		{
			scope: heroContainerRef,
			dependencies: [],
		},
	);

	const leftArrowRef = useRef<SVGPathElement | null>(null);
	const rightArrowRef = useRef<SVGPathElement | null>(null);
	useGSAP(
		() => {
			const leftArrow = leftArrowRef.current;
			const rightArrow = rightArrowRef.current;
			if (!leftArrow || !rightArrow) return;

			leftArrow.classList.remove("hidden");
			rightArrow.classList.remove("hidden");

			gsap.from(leftArrow, {
				drawSVG: 0,
				duration: 1,
				ease: "power1.inOut",
				delay: 1,
			});
			gsap.from(rightArrow, {
				drawSVG: 0,
				duration: 1,
				ease: "power1.inOut",
				delay: 1,
			});
		},
		{
			scope: heroContainerRef,
			dependencies: [leftArrowRef, rightArrowRef],
		},
	);

	return (
		<section
			className="relative flex w-full flex-col pb-20"
			id="hero"
			ref={heroContainerRef}
		>
			<div className="position absolute inset-0 bg-[linear-gradient(180deg,_#F4F0FA_0%,_#FAF7FD_50%,_#FFFFFF_100%)]">
				<div className="absolute inset-0 size-full bg-[url(/noise.png)] opacity-70" />
				<div className="bg-secondary-300 absolute top-[15px] -left-[20px] h-[400px] w-[400px] rounded-full opacity-50 blur-3xl"></div>
				<div className="bg-warning-300 absolute top-[300px] left-[40%] h-[500px] w-[500px] rounded-full opacity-50 blur-3xl"></div>
				<div className="bg-primary-300 absolute top-[100px] right-0 h-[600px] w-[600px] rounded-full opacity-50 blur-3xl"></div>
			</div>
			<div className="mx-auto w-full max-w-sm px-4 pt-30 text-center sm:max-w-xl lg:max-w-3xl lg:pt-40">
				{/* Main Headline */}
				<div
					ref={cardsContainerRef}
					className="relative z-10 perspective-distant"
				>
					<AnimatedText>
						<h1 className="mb-6 overflow-hidden text-4xl leading-tight font-bold text-neutral-900 md:text-5xl lg:text-6xl">
							Agile estimation made simple and collaborative
						</h1>
					</AnimatedText>

					{/** Cards Targets */}
					<div className="flying-card-target absolute top-0 -left-30 hidden scale-75 md:block lg:-top-10 lg:scale-90 xl:-left-46"></div>
					<div className="flying-card-target absolute top-20 right-10 hidden scale-75 md:block lg:right-0 lg:scale-90 xl:-right-20"></div>
					<div className="flying-card-target absolute top-[310px] -left-18 hidden scale-75 md:block lg:top-[280px] lg:scale-90"></div>
					{/** Cards */}
					<div className="flying-card absolute top-1/2 left-1/2 z-20 hidden -translate-x-1/2 translate-y-1/2 md:block">
						<div className="scale-[400%] rotate-12">
							<FlyingCard
								value="1"
								suit="⚡"
								animationDelay={0}
								size={CardSize.Big}
							/>
						</div>
					</div>

					<div className="flying-card absolute top-1/2 left-1/2 z-20 hidden -translate-x-1/2 translate-y-1/2 md:block">
						<div className="scale-[400%]">
							<FlyingCard
								value="8"
								suit="🤡"
								animationDelay={1}
								size={CardSize.Big}
							/>
						</div>
					</div>

					<div className="flying-card absolute top-1/2 left-1/2 z-20 hidden -translate-x-1/2 translate-y-1/2 md:block">
						<div className="scale-[400%] -rotate-12">
							<FlyingCard
								value="13"
								suit="☠️"
								animationDelay={2}
								size={CardSize.Big}
							/>
						</div>
					</div>
				</div>

				{/* Subtitle */}
				<AnimatedText>
					<p className="relative mx-auto mb-8 max-w-2xl text-base font-light text-neutral-800 md:text-xl">
						Create planning poker games in seconds. No registration
						required. Real-time collaboration for accurate story
						point estimation with your agile team.
					</p>
				</AnimatedText>

				{/* CTA Buttons */}
				<AnimatedFadeIn
					delay={0.5}
					className="relative mb-16 flex flex-row justify-center gap-4 sm:flex-row"
				>
					<div>
						<NextLinkButton
							className="no-underline"
							href="/create-game"
							size="large"
						>
							Start Estimating Now
						</NextLinkButton>
					</div>

					<div>
						<NextLinkButton
							size="large"
							className="px-8 no-underline"
							variant="outline"
							href="#subscribe"
						>
							Get Updates
						</NextLinkButton>
					</div>
				</AnimatedFadeIn>
			</div>

			{/* Dashboard Preview */}
			<div className="relative mx-auto max-w-5xl px-4">
				{/* Annotation Arrows */}
				<div className="absolute top-20 -left-32 hidden xl:block">
					<AnimatedText delay={1}>
						<div className="mb-4 -rotate-12 transform text-left text-sm text-neutral-900">
							Clean and
							<br />
							Minimal Layout
						</div>
					</AnimatedText>
					<div className="h-[60px] w-[100px] pl-6">
						<svg
							width="100%"
							height="100%"
							viewBox="0 0 519 220"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								ref={leftArrowRef}
								d="M3.49997 0.5C-2.00003 33.8333 17.6 106.7 140 131.5C293 162.5 332 103 342.5 85C353 67 350.5 -10.5 221.5 17.5C92.5 45.5 112.685 195 335 195C432.5 195 487.5 171 510.5 154M510.5 154C473.3 156.4 446.333 148.333 437.5 144M510.5 154C499.667 160.167 481.5 190 489.5 219"
								stroke="#171717"
								strokeWidth="9"
								className="hidden"
							/>
						</svg>
					</div>
				</div>

				<div className="absolute top-10 -right-32 hidden xl:block">
					<AnimatedText delay={1}>
						<div className="mb-4 rotate-12 transform pl-6 text-right text-sm text-neutral-900">
							Everything for
							<br />
							Your Productivity
						</div>
					</AnimatedText>
					<div className="h-[60px] w-[100px]">
						<svg
							width="100%"
							height="100%"
							viewBox="0 0 520 221"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								ref={rightArrowRef}
								d="M516 1C521.5 34.3333 501.9 107.2 379.5 132C226.5 163 187.5 103.5 177 85.5C166.5 67.5 169 -10 298 18C427 46 406.815 195.5 184.5 195.5C86.9999 195.5 31.9999 171.5 8.99994 154.5M8.99994 154.5C46.1999 156.9 73.1666 148.833 81.9999 144.5M8.99994 154.5C19.8333 160.667 37.9999 190.5 29.9999 219.5"
								stroke="#171717"
								strokeWidth="9"
								className="hidden"
							/>
						</svg>
					</div>
				</div>

				{/* Dashboard Card */}
				<AnimatedFadeIn delay={1}>
					<Image
						className="rounded-2xl"
						priority
						src={GamePreview}
						alt="Game Preview"
					/>
				</AnimatedFadeIn>
			</div>
		</section>
	);
}

enum CardSize {
	Small = "small",
	Medium = "medium",
	Big = "big",
}
type FlyingCardProps = {
	suit: string;
	value: string;
	animationDelay: number;
	size: CardSize;
};
function FlyingCard({
	suit,
	value,
	animationDelay,
	size = CardSize.Big,
}: FlyingCardProps) {
	return (
		<div
			className={cardStyles({ size })}
			style={{
				animationDelay: `${animationDelay}s`,
			}}
		>
			<span className="absolute top-2 left-3 text-lg font-medium text-neutral-900">
				{value}
			</span>

			<span className="text-3xl">{suit}</span>
			<span className="absolute right-3 bottom-2 text-lg font-medium text-neutral-900">
				{value}
			</span>
		</div>
	);
}

const cardStyles = cva(
	"animate-float3D h-[120px] w-[85px] pointer-events-none relative flex items-center justify-center rounded-xl border border-neutral-300 bg-white drop-shadow-xs transform-3d",
	{
		variants: {
			size: {
				small: "scale-80",
				medium: "scale-90",
				big: "scale-100",
			},
		},
	},
);
