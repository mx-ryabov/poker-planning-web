import { GameSchemaBuildersMap } from "@/_src/entities/game";
import { useApi } from "@/_src/shared/providers";
import { z } from "zod";
import { selectCurrentGameId, useGameState } from "../../store";
import { useMutation } from "@/_src/shared/lib";
import { GameTicket } from "@/_src/shared/api";

type UseTicketCreatorFormStateProps = {
	onSucceed?: (data: GameTicket) => void;
	onError?: (e: Error) => void;
};

export function useTicketCreate(props: UseTicketCreatorFormStateProps = {}) {
	const { onSucceed, onError } = props;
	const api = useApi();
	const gameId = useGameState(selectCurrentGameId);
	const addTicketIfAbsent = useGameState((state) => state.addTicketIfAbsent);

	const { isPending, error, mutate } = useMutation<
		TicketCreatorState,
		GameTicket
	>({
		validationSchema: TicketCreatorSchema,
		mutateFn: async (data) => api.game.ticket.createTicket(gameId, data),
		onSuccess: (data) => {
			addTicketIfAbsent(data);
			if (onSucceed) onSucceed(data);
		},
		onError: (e) => {
			if (onError) onError(e);
		},
	});

	return { isPending, error, mutate };
}

export type TicketCreatorState = z.infer<typeof TicketCreatorSchema>;
export const TicketCreatorSchema = z.object({
	title: GameSchemaBuildersMap.ticket.title(
		"Don't be silent",
		"Title can't exceed 255 characters.",
	),
	type: GameSchemaBuildersMap.ticket.type(
		"Don't you forgot anything? (Ticket Type)",
	),
});
