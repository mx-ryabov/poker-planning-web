import { ComingSoonSection } from "./coming-soon-section";
import { HeroSection } from "./hero-section";
import { FeaturesSection } from "./features-section";
import { HowItWorksSection } from "./how-it-works-section";
import { SubscribeSection } from "./subscribe-section";
import { Header } from "./header";
import { Footer } from "./footer";
import { BottomGlassEffect } from "./bottom-glass-effect";

export function MainPage() {
	return (
		<div className="scroller relative flex h-lvh flex-col items-center overflow-y-scroll scroll-smooth">
			<Header />
			<main className="w-full pb-20">
				<HeroSection />

				<FeaturesSection />

				<HowItWorksSection />

				<ComingSoonSection />

				<SubscribeSection />
			</main>
			<Footer />
			<BottomGlassEffect />
		</div>
	);
}
