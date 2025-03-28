import {
	checkPermissions,
	selectCurrentRole,
	useGameState,
} from "@/_src/pages/game-room/model";
import { useMemo } from "react";

export function useIsTicketEditable() {
	const currentRole = useGameState(selectCurrentRole);
	return useMemo(
		() => checkPermissions("EditTicket", currentRole),
		[currentRole],
	);
}
