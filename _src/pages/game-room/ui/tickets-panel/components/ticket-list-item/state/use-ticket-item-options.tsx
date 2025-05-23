import { useCallback, useMemo } from "react";
import { useConfirmationModal } from "@/_src/shared/providers";
import {
	checkPermissions,
	selectCurrentRole,
	useGameState,
} from "@/_src/pages/game-room/model";
import { TrashIcon } from "@/_src/shared/ui/components/icon/svg/trash.icon";

type Props = {
	deleteTicket: () => void;
};

export function useTicketItemOptions({ deleteTicket }: Props) {
	const { open } = useConfirmationModal();
	const currentRole = useGameState(selectCurrentRole);

	const openDeleteConfirmationModal = useCallback(() => {
		open({
			title: "Are you sure?",
			contentMessage:
				"Please confirm that you want to delete the ticket.",
			confirmBtnText: "Delete",
			confirmBtnAppearence: "danger",
			onConfirm: deleteTicket,
		});
	}, [open, deleteTicket]);

	const options = useMemo(() => {
		const result = [];
		if (checkPermissions("DeleteTicket", currentRole)) {
			result.push({
				title: "Delete",
				icon: <TrashIcon size={20} className="shrink-0" />,
				action: openDeleteConfirmationModal,
			});
		}
		return result;
	}, [currentRole, openDeleteConfirmationModal]);

	return options;
}
