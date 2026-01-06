import { PermissionMap, RolePermission } from "./types";
import { RestrictedActionType } from "./types";

export type PermissionCheckOptions<TRole> = {
	actor: TRole;
	target?: TRole;
};

export type PermissionChecker<
	TRole extends string | number,
	TAction extends RestrictedActionType,
> = (action: TAction, options: PermissionCheckOptions<TRole>) => boolean;

/**
 * Factory function that creates a permission checker with a bound permission map.
 * This allows you to create domain-specific checkers without passing the permission map on every call.
 *
 * @param permissionMap - The permission map to use for checking
 * @returns A permission checker function
 *
 * @example
 * const checkGamePermission = createPermissionChecker(GAME_PERMISSIONS);
 * const canEdit = checkGamePermission(GameActions.EditTicket, { actor: currentRole });
 */
export function createPermissionChecker<
	TRole extends string | number,
	TAction extends RestrictedActionType,
>(
	permissionMap: PermissionMap<TAction, TRole>,
): PermissionChecker<TRole, TAction> {
	return (
		action: TAction,
		options: PermissionCheckOptions<TRole>,
	): boolean => {
		const { actor, target } = options;
		const permissions = permissionMap[action as keyof typeof permissionMap];

		if (!permissions) {
			if (process.env.NODE_ENV === "development") {
				console.warn(
					`No permissions defined for action "${action}". Defaulting to false.`,
				);
			}
			return false;
		}

		return permissions.some((p: RolePermission<TRole>) => {
			if (!p.applicableTo) {
				return p.authorizedRole === actor;
			}
			if (target === undefined) {
				if (process.env.NODE_ENV === "development")
					console.warn(
						`Please provide the target because "${action}" action requires it.`,
					);
				return false;
			}
			return p.authorizedRole === actor && p.applicableTo.has(target);
		});
	};
}
