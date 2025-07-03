import Image from "next/image";
import GamePreview from "@public/game-preview.webp";
import { NextLinkButton } from "@/_src/shared/ui/next-components/next-link";
import { cva } from "class-variance-authority";
import { AnimatedText } from "@/_src/shared/ui/components/animated-text.tsx";
import { AnimatedFadeIn } from "@/_src/shared/ui/components/animated-fade-in";

export function HeroSection() {
	return (
		<section className="relative flex w-full flex-col" id="hero">
			<div className="position absolute inset-0 bg-[linear-gradient(180deg,_#F4F0FA_0%,_#FAF7FD_50%,_#FFFFFF_100%)]"></div>
			<div className="mx-auto w-full max-w-5xl pt-40 text-center">
				{/* Main Headline */}
				<div className="relative perspective-distant">
					<AnimatedText>
						<h1 className="mb-6 overflow-hidden text-5xl leading-tight font-bold text-neutral-900 md:text-6xl">
							Agile estimation made
							<br />
							simple and collaborative
						</h1>
					</AnimatedText>

					{/* Decorative Elements */}
					<div className="absolute top-0 -left-20 hidden lg:block">
						<FlyingCard
							value="1"
							suit="⚡"
							animationDelay={0}
							size={CardSize.Big}
						/>
					</div>

					<div className="absolute top-20 -right-20 hidden lg:block">
						<FlyingCard
							value="8"
							suit="🤡"
							animationDelay={1}
							size={CardSize.Medium}
						/>
					</div>

					<div className="absolute top-50 left-10 hidden lg:block">
						<FlyingCard
							value="13"
							suit="☠️"
							animationDelay={2}
							size={CardSize.Small}
						/>
					</div>
				</div>

				{/* Subtitle */}
				<AnimatedText>
					<p className="relative mx-auto mb-8 max-w-2xl text-xl font-light text-neutral-800">
						Create planning poker games in seconds. No registration
						required. Real-time collaboration for accurate story
						point estimation with your agile team.
					</p>
				</AnimatedText>

				{/* CTA Buttons */}
				<div className="relative mb-16 flex flex-col justify-center gap-4 sm:flex-row">
					<NextLinkButton
						className="no-underline"
						href="/create-game"
						size="large"
					>
						Start Estimating Now
					</NextLinkButton>
					<NextLinkButton
						size="large"
						className="px-8 no-underline"
						variant="outline"
						href="#subscribe"
					>
						Get Updates
					</NextLinkButton>
				</div>
			</div>

			{/* Dashboard Preview */}
			<div className="relative mx-auto max-w-5xl">
				{/* Annotation Arrows */}
				<div className="absolute top-20 -left-32 hidden xl:block">
					<div className="mb-4 -rotate-12 transform text-left text-sm text-neutral-900">
						Clean and
						<br />
						Minimal Layout
					</div>
					<svg
						width="82"
						height="37"
						viewBox="0 0 82 37"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="ml-6"
					>
						<path
							d="M32.6233 20L33.0341 19.0883L32.6233 20ZM82 33L71.1639 36.989L73.1274 25.6102L82 33ZM0.999992 1C1.63539 0.227819 1.63532 0.227757 1.63529 0.227735C1.63535 0.227781 1.63537 0.227799 1.63548 0.227891C1.63571 0.228074 1.63612 0.228417 1.63673 0.228919C1.63796 0.229922 1.63995 0.231559 1.64272 0.233825C1.64826 0.238356 1.65688 0.245401 1.66856 0.254911C1.69192 0.273931 1.72752 0.302813 1.77515 0.341176C1.87042 0.417903 2.01382 0.532549 2.20373 0.682066C2.58355 0.981109 3.14936 1.4196 3.88815 1.97316C5.36584 3.08037 7.53495 4.64748 10.2916 6.47968C15.8063 10.1451 23.664 14.866 33.0341 19.0883L32.6233 20L32.2125 20.9117C22.7195 16.634 14.7656 11.8549 9.18446 8.14532C6.39312 6.29002 4.19322 4.70088 2.68889 3.57371C1.93667 3.01009 1.35821 2.56186 0.966529 2.25348C0.770681 2.09929 0.621514 1.98005 0.520653 1.89881C0.470221 1.8582 0.431865 1.82708 0.405788 1.80585C0.392749 1.79523 0.382779 1.78709 0.375905 1.78146C0.372467 1.77865 0.369804 1.77646 0.367917 1.77491C0.366974 1.77414 0.366224 1.77352 0.36567 1.77307C0.365393 1.77284 0.365123 1.77262 0.364984 1.77251C0.364763 1.77232 0.36459 1.77218 0.999992 1ZM32.6233 20L33.0341 19.0883C45.388 24.6552 62.8497 28.5095 73.3169 30.4871L73.1313 31.4697L72.9456 32.4523C62.4709 30.4734 44.8023 26.5849 32.2125 20.9117L32.6233 20Z"
							fill="#333740"
						/>
					</svg>
				</div>

				<div className="absolute top-10 -right-32 hidden xl:block">
					<div className="mb-4 rotate-12 transform text-right text-sm text-neutral-900">
						Everything for
						<br />
						Your Productivity
					</div>
					<svg
						width="74"
						height="37"
						viewBox="0 0 74 37"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M0 33L10.9142 36.77L8.72205 25.433L0 33ZM73 1C72.3257 0.261515 72.3258 0.261445 72.3258 0.261415C72.3258 0.261459 72.3258 0.261469 72.3257 0.261555C72.3255 0.261728 72.3251 0.262061 72.3246 0.262552C72.3235 0.263534 72.3217 0.26515 72.3193 0.267394C72.3143 0.271883 72.3066 0.278884 72.2961 0.288351C72.2752 0.307284 72.2432 0.336078 72.2004 0.37435C72.1147 0.450896 71.9857 0.565352 71.8148 0.714673C71.4729 1.01332 70.9635 1.45138 70.2982 2.00448C68.9675 3.11078 67.0141 4.67677 64.5315 6.5077C59.5644 10.1709 52.4887 14.8876 44.0528 19.1056L44.5 20L44.9472 20.8944C53.5113 16.6124 60.6856 11.8291 65.7185 8.1173C68.2359 6.26073 70.22 4.67047 71.5768 3.54239C72.2553 2.97831 72.7771 2.52965 73.1306 2.22087C73.3073 2.06648 73.4419 1.94705 73.533 1.86564C73.5786 1.82493 73.6133 1.79373 73.6369 1.77241C73.6487 1.76175 73.6577 1.75356 73.6639 1.74789C73.6671 1.74506 73.6695 1.74285 73.6712 1.74128C73.6721 1.7405 73.6728 1.73987 73.6733 1.7394C73.6735 1.73917 73.6738 1.73894 73.6739 1.73882C73.6741 1.73864 73.6743 1.73849 73 1ZM44.5 20L44.0528 19.1056C33.2643 24.4998 18.1361 28.287 8.62841 30.3132L8.83685 31.2913L9.04528 32.2693C18.5671 30.24 33.913 26.4116 44.9472 20.8944L44.5 20Z"
							fill="#333740"
						/>
					</svg>
				</div>

				{/* Dashboard Card */}
				<AnimatedFadeIn>
					<Image
						className="rounded-2xl"
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
