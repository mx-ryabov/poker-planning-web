import {
	createPermissionChecker,
	createSimplePermission,
	PermissionMap,
} from "../../../_utility/permissions";
import { ParticipantRole } from "../models/participant-role";
import { GameActions, GameActionType } from "./actions";

const GAME_PERMISSIONS: PermissionMap<GameActionType, ParticipantRole> = {
	[GameActions.KickParticipant]: [
		{
			authorizedRole: ParticipantRole.Master,
			applicableTo: new Set([
				ParticipantRole.Manager,
				ParticipantRole.VotingMember,
				ParticipantRole.Spectator,
			]),
		},
		{
			authorizedRole: ParticipantRole.Manager,
			applicableTo: new Set([
				ParticipantRole.VotingMember,
				ParticipantRole.Spectator,
			]),
		},
	],
	[GameActions.ChangeVoting]: createSimplePermission([
		ParticipantRole.Master,
	]),
	[GameActions.CreateTicket]: createSimplePermission([
		ParticipantRole.Master,
		ParticipantRole.Manager,
	]),
	[GameActions.EditTicket]: createSimplePermission([
		ParticipantRole.Master,
		ParticipantRole.Manager,
	]),
	[GameActions.DeleteTicket]: createSimplePermission([
		ParticipantRole.Master,
		ParticipantRole.Manager,
	]),
	[GameActions.ChangeGameSettings]: createSimplePermission([
		ParticipantRole.Master,
	]),

	// Onboarding
	[GameActions.FollowGameIntroOnboardingForMaster]: createSimplePermission([
		ParticipantRole.Master,
	]),
	[GameActions.FollowGameIntroOnboardingForParticipant]:
		createSimplePermission([ParticipantRole.VotingMember]),
};

/**
 * Pre-configured permission checker for game permissions.
 * Uses the GAME_PERMISSIONS map and ParticipantRole type.
 */
export const checkGamePermission = createPermissionChecker<
	ParticipantRole,
	GameActionType
>(GAME_PERMISSIONS);
