import { ParticipantRole } from "@/_src/shared/api/game-api";
import { RestrictedGameActionsType } from "./restricted-game-actions";
import { GAME_PERMISSIONS } from "./permissions";

export function checkPermissions(
	action: RestrictedGameActionsType,
	actor: ParticipantRole,
	target?: ParticipantRole,
) {
	const permissions = GAME_PERMISSIONS[action];
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
