import { JSX, useCallback, useMemo } from "react";
import { useConfirmationModal } from "@/src/shared/providers";
import {
	selectVotingProcess,
	useGameState,
} from "@/src/app/(game)/game/[id]/_store";
import { TrashIcon } from "@/src/shared/ui/components/icon/svg/trash.icon";
import { GameActions } from "@/src/domain/entities/game";
import { useGamePermissions } from "@/src/app/(game)/game/[id]/_permissions";

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
	const { ticket } = useGameState(selectVotingProcess);
	const canDelete = useGamePermissions(GameActions.DeleteTicket);

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
		if (canDelete) {
			result.push({
				title: "Delete",
				icon: <TrashIcon size={20} className="shrink-0" />,
				action: openDeleteConfirmationModal,
				disabled: isDeletingDisabled,
			});
		}
		return result;
	}, [canDelete, openDeleteConfirmationModal, isDeletingDisabled]);

	return options;
}
