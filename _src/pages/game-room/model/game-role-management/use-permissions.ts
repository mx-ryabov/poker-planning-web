import { useMemo } from "react";
import { selectCurrentRole, useGameState } from "../store";
import { checkPermissions } from "./permissions-checker";
import { RestrictedGameActionsType } from "./permissions-checker/restricted-game-actions";

export function usePermissions(action: RestrictedGameActionsType) {
	const currentRole = useGameState(selectCurrentRole);
	return useMemo(
		() => checkPermissions(action, currentRole),
		[currentRole, action],
	);
}
