import { useMemo } from "react";
import { useGamePermissions } from "@/src/app/(game)/game/[id]/_permissions";
import { GameActions } from "@/src/domain/entities/game";
import { GameIntroOnboardingForMaster } from "./game-intro-onboarding-for-master";
import {
	OnboardingModel,
	useOnboardingActions,
} from "@/src/shared/ui/components/onboarding";
import { GameIntroOnboardingForParticipant } from "./game-intro-onboarding-for-participant";

export type OnboardingOption = {
	type: OnboardingType;
	emoji: string;
	title: string;
	subTitle: string;
	start: () => void;
};

export function useOnboardingOptions(): OnboardingOption[] {
	const { startOnboarding } = useOnboardingActions();
	const isGameIntroMasterAllowed = useGamePermissions(
		GameActions.FollowGameIntroOnboardingForMaster,
	);
	const isGameIntroParticipantAllowed = useGamePermissions(
		GameActions.FollowGameIntroOnboardingForParticipant,
	);

	return useMemo(() => {
		const availableOnboardings: Partial<Record<OnboardingType, boolean>> =
			{};

		availableOnboardings[OnboardingType.GameIntroForMaster] =
			isGameIntroMasterAllowed;
		availableOnboardings[OnboardingType.GameIntroForParticipant] =
			isGameIntroParticipantAllowed;

		return Object.entries(availableOnboardings)
			.map(([modelType, isAvailable]) => {
				if (!isAvailable) return null;

				const onboardingItem =
					ONBOARDING_MAP[modelType as OnboardingType];
				return {
					...onboardingItem,
					type: modelType as OnboardingType,
					start: () => startOnboarding(onboardingItem.model),
				};
			})
			.filter((option) => !!option);
	}, [
		isGameIntroMasterAllowed,
		isGameIntroParticipantAllowed,
		startOnboarding,
	]);
}

type OnboardingItem = {
	emoji: string;
	title: string;
	subTitle: string;
	model: OnboardingModel;
};
export enum OnboardingType {
	GameIntroForMaster = "GameIntroForMaster",
	GameIntroForParticipant = "GameIntroForParticipant",
}
const ONBOARDING_MAP: Record<OnboardingType, OnboardingItem> = {
	[OnboardingType.GameIntroForMaster]: {
		title: "How to Start the Game?",
		subTitle: `${Object.keys(GameIntroOnboardingForMaster.Steps).length} steps`,
		emoji: "✨",
		model: GameIntroOnboardingForMaster.Model,
	},
	[OnboardingType.GameIntroForParticipant]: {
		title: "What's going on?",
		subTitle: `${Object.keys(GameIntroOnboardingForParticipant.Steps).length} steps`,
		emoji: "✨",
		model: GameIntroOnboardingForParticipant.Model,
	},
};
