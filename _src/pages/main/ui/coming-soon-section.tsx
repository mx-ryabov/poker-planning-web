"use client";

import { Button } from "@/_src/shared/ui/components/button";
import JiraIntegration from "@public/jira-integration.png";
import AsyncEstimation from "@public/async-estimation.png";
import AIAssistant from "@public/ai-assistant.png";
import Image, { StaticImageData } from "next/image";
import { ClockIcon } from "@/_src/shared/ui/components/icon/svg/clock.icon";
import { LinkIcon } from "@/_src/shared/ui/components/icon/svg/link.icon";
import { MagicPenIcon } from "@/_src/shared/ui/components/icon/svg/magic-pen.icon";
import { SlidingSelector } from "@/_src/shared/ui/components/sliding-selector";
import { NextLinkButton } from "@/_src/shared/ui/next-components/next-link";
import React, { useState } from "react";
import { AnimatedText } from "@/_src/shared/ui/components/animated-text.tsx";

export function ComingSoonSection() {
	const [activeTabInd, setActiveTabInd] = useState(0);

	const tabContent = TAB_CONTENTS[activeTabInd];

	return (
		<section className="page-section max-w-4xl" id="coming-soon">
			<div className="mb-12 text-center lg:mb-16">
				<AnimatedText animateOnScroll>
					<h2 className="mb-4">Coming Soon</h2>
					<p className="sub-title mx-auto max-w-2xl">
						Exciting new features in development to make your
						estimation process even better
					</p>
				</AnimatedText>
			</div>

			<div className="flex flex-col gap-8">
				<SlidingSelector
					activeIndex={activeTabInd}
					containerClassName="flex flex-row sm:gap-4 rounded-2xl md:rounded-full bg-neutral-100 border border-neutral-300 p-2 items-center justify-between *:z-15"
					selectorClassName="bg-white rounded-xl md:rounded-full z-10! drop-shadow-sm border-neutral-200 duration-400"
				>
					<Button
						contentLeft={<LinkIcon size={16} thikness="bold" />}
						title="Jira Integration"
						variant="ghost"
						className="flex h-fit flex-col rounded-xl bg-transparent py-1 md:h-10 md:flex-row lg:rounded-full"
						onPress={() => setActiveTabInd(0)}
					/>
					<Button
						contentLeft={<ClockIcon size={16} thikness="bold" />}
						title="Asynchronous Estimation"
						variant="ghost"
						className="flex h-fit flex-col rounded-xl bg-transparent py-1 md:h-10 md:flex-row lg:rounded-full"
						onPress={() => setActiveTabInd(1)}
					/>
					<Button
						contentLeft={<MagicPenIcon size={16} thikness="bold" />}
						title="AI Assistant"
						variant="ghost"
						className="flex h-fit flex-col rounded-xl bg-transparent py-1 md:h-10 md:flex-row lg:rounded-full"
						onPress={() => setActiveTabInd(2)}
					/>
				</SlidingSelector>
				{tabContent && (
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:h-[310px]">
						<div className="flex flex-col md:mt-10">
							<span className="mb-2 flex flex-row gap-1 text-xs font-semibold">
								{tabContent.subtitle}
							</span>
							<h3 className="mb-4 text-lg font-semibold text-neutral-900">
								{tabContent.title}
							</h3>
							<Image
								src={tabContent.imgSrc}
								alt={tabContent.imgAlt}
								width={500}
								className="mb-4 rounded-xl md:hidden"
							/>
							<p className="mb-6 text-center text-neutral-800 md:text-start">
								{tabContent.description}
							</p>
							<NextLinkButton
								className="no-underline"
								variant="outline"
								href="#subscribe"
							>
								Subscribe on Updates
							</NextLinkButton>
						</div>
						<Image
							src={tabContent.imgSrc}
							alt={tabContent.imgAlt}
							width={500}
							className="hidden rounded-xl md:block object-contain"
						/>
					</div>
				)}
			</div>
		</section>
	);
}

type TabContent = {
	title: string;
	subtitle: React.ReactElement;
	description: string;
	imgSrc: StaticImageData;
	imgAlt: string;
};
const TAB_CONTENTS: TabContent[] = [
	{
		title: "No process changes. Just integrate.",
		subtitle: (
			<span className="text-info-600 flex flex-row gap-1">
				<LinkIcon size={12} thikness="bold" />
				Jira Integration
			</span>
		),
		description:
			"Seamlessly sync your stories and tasks directly from JIRA. Import tickets, update estimations, and keep everything in sync.",
		imgSrc: JiraIntegration,
		imgAlt: "Jira Integration",
	},
	{
		title: "Do it whenever you want.",
		subtitle: (
			<span className="text-success-600 flex flex-row gap-1">
				<ClockIcon size={12} thikness="bold" />
				Asynchronous Estimation
			</span>
		),
		description:
			"Allow team members to estimate at their own pace. Perfect for distributed teams across different time zones.",
		imgSrc: AsyncEstimation,
		imgAlt: "Asynchronous Estimation",
	},
	{
		title: "Do it x10 faster",
		subtitle: (
			<span className="text-warning-600 flex flex-row gap-1">
				<MagicPenIcon size={12} thikness="bold" />
				AI Estimation Assistant
			</span>
		),
		description:
			"Smart AI agent that analyzes your estimation patterns and provides insights to improve accuracy over time.",
		imgSrc: AIAssistant,
		imgAlt: "AI Estimation Assistant",
	},
];
