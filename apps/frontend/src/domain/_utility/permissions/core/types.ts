export type RestrictedActionType = string;

export type RolePermission<TRole = string> = {
	authorizedRole: TRole;
	applicableTo?: Set<TRole>;
};

export type PermissionMap<
	TAction = RestrictedActionType,
	TRole = string,
> = Record<TAction extends string ? TAction : never, RolePermission<TRole>[]>;
