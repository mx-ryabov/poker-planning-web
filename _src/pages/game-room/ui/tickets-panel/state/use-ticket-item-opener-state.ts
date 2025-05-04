import { useCallback } from "react";
import { useGameManagementState } from "../../../model";

export function useTicketItemOpenerState() {
	const openedTicketId = useGameManagementState(
		(state) => state.openedTicketId,
	);
	const setOpenedTicketId = useGameManagementState(
		(state) => state.setOpenedTicketId,
	);

	const checkIfOpened = useCallback(
		(ticketId: string) => openedTicketId === ticketId,
		[openedTicketId],
	);

	const onOpen = useCallback(
		(ticketId: string) => {
			setOpenedTicketId(ticketId);
		},
		[setOpenedTicketId],
	);

	const onClose = useCallback(
		() => setOpenedTicketId(null),
		[setOpenedTicketId],
	);

	return { checkIfOpened, onOpen, onClose };
}
