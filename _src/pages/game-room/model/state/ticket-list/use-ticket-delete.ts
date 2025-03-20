import { deleteTicketById, GameTicket } from "@/_src/shared/api/game-api";
import { useGlobalToast } from "@/_src/shared/ui/components/toast";
import { selectCurrentGameId, useGameState } from "../../store";
import { useCallback } from "react";
import { useMutation } from "@/_src/shared/lib";

type Props = {
	ticket: GameTicket;
};

export function useTicketDelete({ ticket }: Props) {
	const toastState = useGlobalToast();

	const gameId = useGameState(selectCurrentGameId);
	const removeTicket = useGameState((state) => state.removeTicket);

	const mutateFn = useCallback(async () => {
		await deleteTicketById(gameId, ticket.id);
		return ticket;
	}, [ticket, gameId]);

	const { isPending, mutate } = useMutation({
		mutateFn,
		onSuccess: (deletedTicket) => {
			removeTicket(deletedTicket.id);
			toastState?.add(
				{
					title: `Ticket ${ticket.identifier} has been deleted successfuly`,
					variant: "success",
				},
				{ timeout: 3000 },
			);
		},
		onError: (e) => {
			toastState?.add(
				{
					title: `Ticket ${ticket.identifier} hasn't been deleted`,
					description: `${e instanceof Error ? e.message : e}`,
					variant: "error",
				},
				{ timeout: 3000 },
			);
		},
	});

	return { isDeleting: isPending, deleteTicket: mutate };
}
