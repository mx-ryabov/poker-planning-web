import { ParticipantRole } from "@/_src/shared/api/game-api";
import { RolePermission } from "./types";

/**
 * Create a list of simple permissions that have only authorizedRole (i.e. without applicableTo field)
 * @param authorizedRoles - roles that allowed to execute a particular action
 * @returns RolePermission[]
 */
export function createSimplePermission(
	authorizedRoles: ParticipantRole[],
): RolePermission[] {
	return authorizedRoles.map((authorizedRole) => ({ authorizedRole }));
}
