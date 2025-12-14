"use client";
import "./page.css";
import { ComingSoonSection } from "./coming-soon-section";
import { HeroSection } from "./hero-section";
import { FeaturesSection } from "./features-section";
import { HowItWorksSection } from "./how-it-works-section";
import { SubscribeSection } from "./subscribe-section";
import { Header } from "./header";
import { Footer } from "./footer";
import { BottomGlassEffect } from "./bottom-glass-effect";
import { useRef } from "react";

export function MainPage() {
	const containerRef = useRef(null);
	return (
		<div className="scroller relative flex h-lvh w-full flex-col items-center overflow-x-hidden overflow-y-scroll scroll-smooth">
			<Header containerRef={containerRef} />
			<main
				className="w-full origin-top-right"
				id="main-container"
				ref={containerRef}
			>
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
