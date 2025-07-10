import { AnimatedFadeIn } from "@/_src/shared/ui/components/animated-fade-in";
import { AnimatedText } from "@/_src/shared/ui/components/animated-text.tsx";

export function HowItWorksSection() {
	return (
		<section
			className="mx-auto max-w-7xl rounded-3xl bg-white px-4 py-20 sm:px-6 lg:px-8"
			id="how-it-works"
		>
			<div className="mb-16 text-center">
				<AnimatedText>
					<h2 className="mb-4 text-4xl font-bold text-neutral-900">
						How Planning Poker Works
					</h2>
					<p className="mx-auto max-w-2xl text-xl font-light text-neutral-800">
						Get your team estimating in minutes with our simple
						process
					</p>
				</AnimatedText>
			</div>

			<AnimatedFadeIn
				animateOnScroll
				className="grid grid-cols-1 gap-8 md:grid-cols-3"
			>
				<div className="text-center">
					<div className="bg-primary-100 mb-6 flex h-48 items-center justify-center rounded-lg">
						<div className="text-center">
							<div className="text-primary-600 mb-2 text-4xl font-bold">
								1
							</div>
							<div className="text-primary-600 font-medium">
								Create Game
							</div>
						</div>
					</div>
					<h3 className="mb-2 text-xl font-semibold text-neutral-900">
						Setup Your Game
					</h3>
					<p className="text-neutral-800">
						Enter game name, choose estimation system
						(Fibonacci/T-Shirts), add your name and share the link
					</p>
				</div>

				<div className="text-center">
					<div className="bg-info-100 mb-6 flex h-48 items-center justify-center rounded-lg">
						<div className="text-center">
							<div className="text-info-600 mb-2 text-4xl font-bold">
								2
							</div>
							<div className="text-info-600 font-medium">
								Add Issues & Vote
							</div>
						</div>
					</div>
					<h3 className="mb-2 text-xl font-semibold text-neutral-900">
						Estimate Stories
					</h3>
					<p className="text-neutral-800">
						Create issues with descriptions, start voting sessions,
						and let team members choose their estimation cards
					</p>
				</div>

				<div className="text-center">
					<div className="bg-success-100 mb-6 flex h-48 items-center justify-center rounded-lg">
						<div className="text-center">
							<div className="text-success-600 mb-2 text-4xl font-bold">
								3
							</div>
							<div className="text-success-600 font-medium">
								Reveal & Apply
							</div>
						</div>
					</div>
					<h3 className="mb-2 text-xl font-semibold text-neutral-900">
						See Results
					</h3>
					<p className="text-neutral-800">
						Reveal cards manually or automatically, view voting
						charts, and apply final estimations to your issues
					</p>
				</div>
			</AnimatedFadeIn>
		</section>
	);
}
