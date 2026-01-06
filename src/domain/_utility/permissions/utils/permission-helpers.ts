import { RolePermission } from "../core/types";

/**
 * Create a list of simple permissions that have only authorizedRole (i.e. without applicableTo field)
 * @param authorizedRoles - roles that allowed to execute a particular action
 * @returns RolePermission[]
 */
export function createSimplePermission<TRole = string>(
	authorizedRoles: TRole[],
): RolePermission<TRole>[] {
	return authorizedRoles.map((authorizedRole) => ({ authorizedRole }));
}

