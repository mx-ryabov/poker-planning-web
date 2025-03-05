import { ParticipantRole } from "@/_src/shared/api";

export class GameRoleManager {}

type RolePermission = {
	authorizedRole: ParticipantRole;
	applicableTo?: Set<ParticipantRole>;
};

export type RestrictedGameActions =
	| "kickParticipant"
	| "startVoting"
	| "editTicket";

type Rights = Record<RestrictedGameActions, RolePermission[]>;

const RIGHTS: Rights = {
	kickParticipant: [
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
	startVoting: [
		{
			authorizedRole: ParticipantRole.Master,
		},
	],
	editTicket: [
		{
			authorizedRole: ParticipantRole.Master,
		},
		{
			authorizedRole: ParticipantRole.Manager,
		},
	],
};

export function checkPermissions(
	action: RestrictedGameActions,
	actor: ParticipantRole,
	target?: ParticipantRole,
) {
	const permissions = RIGHTS[action];
	return permissions.some((p) => {
		if (!p.applicableTo) {
			return p.authorizedRole === actor;
		}
		if (target === undefined) {
			if (process.env.NODE_ENV === "development")
				console.warn(
					`Please provide the target because ${action} action requires it.`,
				);
			return false;
		}
		return p.authorizedRole === actor && p.applicableTo.has(target);
	});
}
