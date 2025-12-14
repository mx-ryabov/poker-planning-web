import { JSX, useCallback, useMemo } from "react";
import { useConfirmationModal } from "@/_src/shared/providers";
import {
	checkPermissions,
	selectCurrentRole,
	selectVotingProcess,
	useGameState,
} from "@/_src/pages/game-room/model";
import { TrashIcon } from "@/_src/shared/ui/components/icon/svg/trash.icon";

type TicketItemOptionType = {
	title: string;
	icon: JSX.Element;
	action: () => void;
	disabled?: boolean;
};

type Props = {
	ticketId: string;
	deleteTicket: () => void;
};

export function useTicketItemOptions({ ticketId, deleteTicket }: Props) {
	const { open } = useConfirmationModal();
	const currentRole = useGameState(selectCurrentRole);
	const { ticket } = useGameState(selectVotingProcess);

	const isDeletingDisabled = ticket?.id === ticketId;

	const openDeleteConfirmationModal = useCallback(() => {
		if (isDeletingDisabled) return;

		open({
			title: "Are you sure?",
			contentMessage:
				"Please confirm that you want to delete the ticket.",
			confirmBtnText: "Delete",
			confirmBtnAppearence: "danger",
			onConfirm: deleteTicket,
		});
	}, [open, deleteTicket, isDeletingDisabled]);

	const options: TicketItemOptionType[] = useMemo(() => {
		const result = [];
		if (checkPermissions("DeleteTicket", currentRole)) {
			result.push({
				title: "Delete",
				icon: <TrashIcon size={20} className="shrink-0" />,
				action: openDeleteConfirmationModal,
				disabled: isDeletingDisabled,
			});
		}
		return result;
	}, [currentRole, openDeleteConfirmationModal, isDeletingDisabled]);

	return options;
}
