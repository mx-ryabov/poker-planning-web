"use client";
import {
	OnboardingModel,
	OnboardingStep,
} from "@/src/shared/ui/components/onboarding";
import { ReactElement, useCallback } from "react";
import {
	GameManagementTab,
	useGameManagementState,
} from "@/src/app/(game)/game/[id]/_store";

const MODEL_ID = Symbol("GAME_INTRO_ONBOARDING_FOR_PARTICIPANT_ID");
const GAME_TABLE_STEP_ID = Symbol("GAME_TABLE_STEP_ID");
const CONTROL_PANEL_STEP_ID = Symbol("CONTROL_PANEL_STEP_ID");
const TICKETS_PANEL_STEP_ID = Symbol("TICKETS_PANEL_STEP_ID");
const PARTICIPANTS_PANEL_STEP_ID = Symbol("PARTICIPANTS_PANEL_STEP_ID");
const SETTINGS_PANEL_STEP_ID = Symbol("SETTINGS_PANEL_STEP_ID");

type Props = {
	children: ReactElement;
	className?: string;
};

function GameTableStep({ children, className }: Props) {
	return (
		<OnboardingStep
			modelId={MODEL_ID}
			stepId={GAME_TABLE_STEP_ID}
			options={{
				highlighterClassName: className,
				popupPlacement: "top",
				shouldTrackBorderRadius: false,
			}}
			data={{
				title: "Game Table",
				description:
					"Here you'll see your team members when they get into your game.",
			}}
		>
			{children}
		</OnboardingStep>
	);
}

function ControlPanelStep({ children, className }: Props) {
	const activeTab = useGameManagementState((state) => state.activeTab);
	const setActiveTab = useGameManagementState((state) => state.setActiveTab);

	const onNext = useCallback(() => {
		if (activeTab !== GameManagementTab.TaskList) {
			setActiveTab(GameManagementTab.TaskList);
		}
	}, [setActiveTab, activeTab]);

	return (
		<OnboardingStep
			modelId={MODEL_ID}
			stepId={CONTROL_PANEL_STEP_ID}
			options={{
				highlighterClassName: className,
				popupPlacement: "bottom",
			}}
			data={{
				title: "Control Panel",
				description:
					"Use it to see the Tickets, Participants or Game Settings.",
				onNext,
			}}
		>
			{children}
		</OnboardingStep>
	);
}

function TicketsPanelStep({ children, className }: Props) {
	const activeTab = useGameManagementState((state) => state.activeTab);
	const setActiveTab = useGameManagementState((state) => state.setActiveTab);

	const onNext = useCallback(() => {
		if (activeTab !== GameManagementTab.ParticipantList) {
			setActiveTab(GameManagementTab.ParticipantList);
		}
	}, [setActiveTab, activeTab]);

	return (
		<OnboardingStep
			modelId={MODEL_ID}
			stepId={TICKETS_PANEL_STEP_ID}
			options={{
				highlighterClassName: className,
				popupPlacement: "left",
			}}
			data={{
				title: "Tickets Panel",
				description:
					"Here you can see all the tickets and its details.",
				onNext,
			}}
		>
			{children}
		</OnboardingStep>
	);
}

function ParticipantsPanelStep({ children, className }: Props) {
	const activeTab = useGameManagementState((state) => state.activeTab);
	const setActiveTab = useGameManagementState((state) => state.setActiveTab);

	const onNext = useCallback(() => {
		if (activeTab !== GameManagementTab.Settings) {
			setActiveTab(GameManagementTab.Settings);
		}
	}, [setActiveTab, activeTab]);

	return (
		<OnboardingStep
			modelId={MODEL_ID}
			stepId={PARTICIPANTS_PANEL_STEP_ID}
			options={{
				highlighterClassName: className,
				popupPlacement: "left",
			}}
			data={{
				title: "Participants Panel",
				description:
					"Here you can see all your fellows, their roles and statuses.\nAlso if you want to invite somebody then just send the share link!",
				onNext,
			}}
		>
			{children}
		</OnboardingStep>
	);
}

function SettingsPanelStep({ children, className }: Props) {
	return (
		<OnboardingStep
			modelId={MODEL_ID}
			stepId={SETTINGS_PANEL_STEP_ID}
			options={{
				highlighterClassName: className,
				popupPlacement: "left",
			}}
			data={{
				title: "Settings Panel",
				description:
					"These are settings you can only look at,\nbut only if the game master doesn't make you the boss!",
			}}
		>
			{children}
		</OnboardingStep>
	);
}

export const GameIntroOnboardingForParticipant = {
	Steps: {
		ControlPanelStep,
		GameTableStep,
		TicketsPanelStep,
		ParticipantsPanelStep,
		SettingsPanelStep,
	},
	Model: {
		id: MODEL_ID,
		steps: [
			GAME_TABLE_STEP_ID,
			CONTROL_PANEL_STEP_ID,
			TICKETS_PANEL_STEP_ID,
			PARTICIPANTS_PANEL_STEP_ID,
			SETTINGS_PANEL_STEP_ID,
		],
	} satisfies OnboardingModel,
};
