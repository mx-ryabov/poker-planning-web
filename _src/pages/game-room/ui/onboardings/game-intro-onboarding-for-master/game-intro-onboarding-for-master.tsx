"use client";
import {
	OnboardingModel,
	OnboardingStep,
} from "@/_src/shared/ui/components/onboarding";
import { ReactElement, useCallback } from "react";
import { GameManagementTab, useGameManagementState } from "../../../model";

const MODEL_ID = Symbol("GAME_INTRO_ONBOARDING_MASTER_ID");
const CONTROL_PANEL_STEP_ID = Symbol("CONTROL_PANEL_STEP_ID");
const GAME_TABLE_STEP_ID = Symbol("GAME_TABLE_STEP_ID");
const CREATE_FIRST_TICKET_STEP_ID = Symbol("CONTROL_PANEL_STEP_ID");

type Props = {
	children: ReactElement;
	className?: string;
};
function ControlPanelStep({ children, className }: Props) {
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
					"Use it to see the Tickets, Participants and Game Settings.",
			}}
		>
			{children}
		</OnboardingStep>
	);
}

function GameTableStep({ children, className }: Props) {
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
				onNext,
			}}
		>
			{children}
		</OnboardingStep>
	);
}

function CreateFirstTicketStep({ children, className }: Props) {
	return (
		<OnboardingStep
			modelId={MODEL_ID}
			stepId={CREATE_FIRST_TICKET_STEP_ID}
			options={{
				highlighterClassName: className,
			}}
			data={{
				title: "Create your first ticket",
				description:
					"Make sure your game has tickets to start voting for them!",
			}}
		>
			{children}
		</OnboardingStep>
	);
}

export const GameIntroOnboardingForMaster = {
	Steps: { ControlPanelStep, GameTableStep, CreateFirstTicketStep },
	Model: {
		id: MODEL_ID,
		steps: [
			CONTROL_PANEL_STEP_ID,
			GAME_TABLE_STEP_ID,
			CREATE_FIRST_TICKET_STEP_ID,
		],
	} satisfies OnboardingModel,
};
