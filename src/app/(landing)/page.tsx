import { Metadata } from "next";
import {
	Header,
	HeroSection,
	FeaturesSection,
	HowItWorksSection,
	ComingSoonSection,
	SubscribeSection,
	Footer,
	BottomGlassEffect,
} from "./_components";
import "./_styles/page.css";

export const metadata: Metadata = {
	title: "Poker Planning - Agile Estimation Made Easy",
};

const CONTAINER_ID = "main-container";

export default function Home() {
	return (
		<div className="scroller relative flex h-lvh w-full flex-col items-center overflow-x-hidden overflow-y-scroll scroll-smooth">
			<Header containerId={CONTAINER_ID} />
			<main className="w-full origin-top-right" id={CONTAINER_ID}>
				<HeroSection />

				<FeaturesSection />

				<HowItWorksSection />

				<ComingSoonSection />

				<SubscribeSection />

				<Footer />
			</main>
			<BottomGlassEffect />
		</div>
	);
}
