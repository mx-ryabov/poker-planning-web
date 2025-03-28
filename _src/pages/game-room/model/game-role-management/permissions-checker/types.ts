import { ParticipantRole } from "@/_src/shared/api/game-api";
import { RestrictedGameActionsType } from "./restricted-game-actions";

export type RolePermission = {
	authorizedRole: ParticipantRole;
	applicableTo?: Set<ParticipantRole>;
};

export type GamePermissions = Record<
	RestrictedGameActionsType,
	RolePermission[]
>;
