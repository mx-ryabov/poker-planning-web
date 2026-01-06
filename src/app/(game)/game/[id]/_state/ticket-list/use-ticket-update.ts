import { useDomainApi } from "@/src/domain/providers";
import { GameSchemaBuildersMap } from "@/src/domain/entities/game";

import { GameTicket } from "@/src/domain/entities/game/models";
import { useMutation } from "@/src/shared/lib";
import { useGlobalToast } from "@/src/shared/ui/components/toast";
import { useCallback, useOptimistic } from "react";
import { z } from "zod";
import { selectCurrentGameId, useGameState } from "../../_store";

export const TicketItemStateSchema = z.object({
	title: GameSchemaBuildersMap.ticket.title(
		"Title can't be empty",
		"Title can't exceed 255 characters.",
	),
	description: GameSchemaBuildersMap.ticket.description(),
	estimation: GameSchemaBuildersMap.ticket.estimation(
		(limit) => `Estimation can't exceed ${limit} characters.`,
	),
	type: GameSchemaBuildersMap.ticket.type(
		"Don't you forgot anything? (Ticket Type)",
	),
});

export type TicketItemState = z.infer<typeof TicketItemStateSchema>;

export function useTicketUpdate(defaultData: GameTicket) {
	const api = useDomainApi();
	const toastState = useGlobalToast();
	const gameId = useGameState(selectCurrentGameId);
	const updateTicket = useGameState((state) => state.updateTicket);

	const [optimisticData, mutateOptimistic] = useOptimistic<
		GameTicket,
		TicketItemState
	>(defaultData, (state, optimisticData) => ({
		...state,
		...optimisticData,
	}));

	const { isPending, error, mutate } = useMutation<
		TicketItemState,
		Omit<GameTicket, "id" | "identifier">
	>({
		validationSchema: TicketItemStateSchema,
		mutateFn: async (data) =>
			api.game.ticket.updateTicketById(gameId, defaultData.id, data),
		onSuccess: (data) => {
			updateTicket(defaultData.id, data);
		},
		onError: (e) => {
			toastState?.add(
				{
					title: `Server Error`,
					description: e.message,
					variant: "error",
				},
				{
					timeout: 5000,
				},
			);
		},
		onMutate: mutateOptimistic,
	});

	const updateByField = useCallback(
		<TField extends keyof TicketItemState>(
			field: TField,
			value: TicketItemState[TField],
		) => {
			mutate({ ...defaultData, [field]: value });
		},
		[mutate, defaultData],
	);

	return { optimisticData, isPending, error, updateByField };
}
