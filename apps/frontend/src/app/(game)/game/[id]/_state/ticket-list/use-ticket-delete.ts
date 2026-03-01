import { GameTicket } from "@/src/domain/entities/game";
import { useGlobalToast } from "@/src/shared/ui/components/toast";
import { selectCurrentGameId, useGameState } from "../../_store";
import { useCallback } from "react";
import { useMutation } from "@/src/shared/lib";
import { useDomainApi } from "@/src/domain/providers/api-provider";

type Props = {
	ticket: GameTicket;
};

export function useTicketDelete({ ticket }: Props) {
	const api = useDomainApi();
	const toastState = useGlobalToast();

	const gameId = useGameState(selectCurrentGameId);
	const removeTicket = useGameState((state) => state.removeTicket);

	const mutateFn = useCallback(async () => {
		await api.game.ticket.deleteTicketById(gameId, ticket.id);
		return ticket;
	}, [ticket, gameId, api]);

	const { isPending, mutate } = useMutation({
		mutateFn,
		onSuccess: (deletedTicket) => {
			removeTicket(deletedTicket.id);
			toastState?.add(
				{
					title: `Ticket ${ticket.identifier} has been deleted successfuly`,
					variant: "success",
				},
				{ timeout: 5000 },
			);
		},
		onError: (e) => {
			toastState?.add({
				title: `Ticket ${ticket.identifier} hasn't been deleted`,
				description: e.message,
				variant: "error",
			});
		},
	});

	return { isDeleting: isPending, deleteTicket: mutate };
}
