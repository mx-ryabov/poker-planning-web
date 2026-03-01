import { useMemo } from "react";
import { GameActionType, ParticipantRole } from "@/src/domain/entities/game";
import { checkGamePermission } from "@/src/domain/entities/game";
import { selectCurrentRole, useGameState } from "../_store";

/**
 * Game-specific permission hook that automatically uses the current game participant's role.
 * This is a convenience wrapper around the generic usePermissions hook.
 *
 * @param action - The game action to check permissions for
 * @param targetRole - Optional target role for actions that require it (e.g., KickParticipant)
 * @returns boolean indicating if the action is allowed for the current user
 *
 * @example
 * // Simple permission check
 * const canEditTicket = useGamePermissions(GameActions.EditTicket);
 *
 * @example
 * // Permission check with target
 * const canKickManager = useGamePermissions(
 *   GameActions.KickParticipant,
 *   ParticipantRole.Manager
 * );
 */
export function useGamePermissions(
	action: GameActionType,
	targetRole?: ParticipantRole,
): boolean {
	const currentRole = useGameState(selectCurrentRole);
	return useMemo(
		() =>
			checkGamePermission(action, {
				actor: currentRole,
				target: targetRole,
			}),
		[currentRole, action, targetRole],
	);
}
