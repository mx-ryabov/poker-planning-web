import {
	checkPermissions,
	selectCurrentRole,
	useGameState,
} from "@/_src/pages/game-room/model";
import { TrashIcon } from "@/_src/shared/ui/components/icon/svg/trash.icon";
import { useCallback, useMemo } from "react";

export function useTicketItemOptions() {
	const currentRole = useGameState(selectCurrentRole);

	const deleteTicket = useCallback(() => {}, []);

	const options = useMemo(() => {
		const result = [];
		if (checkPermissions("DeleteTicket", currentRole)) {
			result.push({
				title: "Delete",
				icon: <TrashIcon size={20} className="shrink-0" />,
				action: deleteTicket,
			});
		}
		return result;
	}, [currentRole, deleteTicket]);

	return options;
}
