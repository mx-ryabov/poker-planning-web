import { ParticipantRole } from "@/_src/shared/api/game-api";
import { createSimplePermission } from "./utility";
import { GamePermissions } from "./types";
import { RestrictedGameActions } from "./restricted-game-actions";

export const GAME_PERMISSIONS: GamePermissions = {
	[RestrictedGameActions.KickParticipant]: [
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
	[RestrictedGameActions.ChangeVoting]: createSimplePermission([
		ParticipantRole.Master,
	]),
	[RestrictedGameActions.CreateTicket]: createSimplePermission([
		ParticipantRole.Master,
		ParticipantRole.Manager,
	]),
	[RestrictedGameActions.EditTicket]: createSimplePermission([
		ParticipantRole.Master,
		ParticipantRole.Manager,
	]),
	[RestrictedGameActions.DeleteTicket]: createSimplePermission([
		ParticipantRole.Master,
		ParticipantRole.Manager,
	]),
	[RestrictedGameActions.ChangeGameSettings]: createSimplePermission([
		ParticipantRole.Master,
	]),
};
