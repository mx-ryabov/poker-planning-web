import Image from "next/image";
import GameVotingResults from "@public/game-voting-results-2.webp";
import IssueManagementImg from "@public/issue-management.svg";
import PokerTableSvg from "@public/poker-table.png";
import { AnimatedText } from "@/_src/shared/ui/components/animated-text.tsx";
import { AnimatedFadeIn } from "@/_src/shared/ui/components/animated-fade-in";

export function FeaturesSection() {
	return (
		<section className="page-section" id="features">
			<div className="mb-12 text-center lg:mb-16">
				<AnimatedText animateOnScroll>
					<h2 className="mb-4">
						Everything you need for agile estimation
					</h2>
					<p className="sub-title mx-auto max-w-2xl">
						Powerful features designed to make story point
						estimation accurate and collaborative
					</p>
				</AnimatedText>
			</div>

			<AnimatedFadeIn
				animateOnScroll
				className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2"
			>
				<div className="flex flex-col gap-4 rounded-3xl bg-neutral-100 bg-[url(/features-cards-bg.webp)] bg-contain p-8">
					<h3>Real-time Voting Updates</h3>
					<span className="max-w-fit rounded-full border border-neutral-200 bg-white px-3 py-2 text-xs text-neutral-800 drop-shadow-sm">
						🚀 Collaborate faster
					</span>
					<span className="font-light text-neutral-800 lg:font-normal">
						Communicate and collaborate effortlessly with Poker
						Planning&apos;s real-time.
					</span>
					<div className="relative flex h-[300px] w-full overflow-hidden rounded-2xl">
						<Image
							className="h-full w-full rounded-2xl object-contain"
							loading="lazy"
							src={PokerTableSvg}
							alt="Real-Time Voting Updates"
						/>
					</div>
				</div>
				<div className="flex flex-col gap-4 rounded-3xl bg-neutral-100 bg-[url(/features-cards-bg.webp)] bg-contain p-8">
					<h3>Easy Issue Management</h3>
					<span className="max-w-fit rounded-full border border-neutral-200 bg-white px-3 py-2 text-xs text-neutral-800 drop-shadow-sm">
						✨ Communicate easy
					</span>
					<span className="font-light text-neutral-800 lg:font-normal">
						Create and manage stories, tasks, and bugs with titles,
						descriptions, and types for organized estimation.
					</span>
					<div className="relative flex h-[300px] w-full overflow-hidden rounded-2xl">
						<Image
							className="h-full w-full rounded-2xl contain-content"
							src={IssueManagementImg}
							loading="lazy"
							alt="Real-Time Voting Updates"
						/>
					</div>
				</div>
			</AnimatedFadeIn>

			<AnimatedFadeIn
				animateOnScroll
				className="grid grid-cols-1 gap-8 rounded-3xl bg-neutral-100 bg-[url(/features-cards-bg.webp)] bg-contain p-8 lg:grid-cols-2"
			>
				<div className="flex flex-col gap-4">
					<h3>Performance Overview</h3>
					<span className="max-w-fit rounded-full border border-neutral-200 bg-white px-3 py-2 text-xs text-neutral-800 drop-shadow-sm">
						🧠 Improve wisely
					</span>
					<span className="font-light text-neutral-800 lg:font-normal">
						Quickly visualize how your team is estimating with
						intuitive charts. See vote distributions, identify
						outliers, and spot alignment trends — all in real time,
						right after each round.
					</span>
				</div>

				<div className="flex items-center justify-center rounded-2xl bg-white">
					<Image
						src={GameVotingResults}
						height={300}
						loading="lazy"
						width={600}
						className="rounded-2xl object-contain"
						alt="Game Voting Results"
					/>
				</div>
			</AnimatedFadeIn>
		</section>
	);
}
