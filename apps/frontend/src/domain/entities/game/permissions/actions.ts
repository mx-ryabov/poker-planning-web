export const GameActions = {
	KickParticipant: "game:kick-participant",
	ChangeVoting: "game:change-voting",
	EditTicket: "game:edit-ticket",
	DeleteTicket: "game:delete-ticket",
	CreateTicket: "game:create-ticket",
	ChangeGameSettings: "game:change-game-settings",

	// Onboarding
	FollowGameIntroOnboardingForMaster: "game:follow-intro-onboarding-master",
	FollowGameIntroOnboardingForParticipant:
		"game:follow-intro-onboarding-participant",
} as const;

export type GameActionType = (typeof GameActions)[keyof typeof GameActions];
