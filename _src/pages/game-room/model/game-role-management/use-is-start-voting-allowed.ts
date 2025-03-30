import {
	checkPermissions,
	selectCurrentRole,
	useGameState,
} from "@/_src/pages/game-room/model";
import { useMemo } from "react";

export function useIsStartVotingAllowed() {
	const currentRole = useGameState(selectCurrentRole);
	return useMemo(
		() => checkPermissions("StartVoting", currentRole),
		[currentRole],
	);
}
