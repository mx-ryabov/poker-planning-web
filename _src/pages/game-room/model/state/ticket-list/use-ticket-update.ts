import { useApi } from "@/_src/shared/providers";
import { GameSchemaBuildersMap } from "@/_src/entities/game";
import {
	selectCurrentGameId,
	useGameState,
} from "@/_src/pages/game-room/model";
import { GameTicket } from "@/_src/shared/api/game-api/dto";
import { useMutation } from "@/_src/shared/lib";
import { useGlobalToast } from "@/_src/shared/ui/components/toast";
import { useCallback, useOptimistic } from "react";
import { z } from "zod";

export const TicketItemStateSchema = z.object({
	title: GameSchemaBuildersMap.ticket.title(
		"Title can't be empty",
		"Title can't exceed 255 characters.",
	),
	description: GameSchemaBuildersMap.ticket.description(),
	estimation: GameSchemaBuildersMap.ticket.estimation(
		"Estimation can't exceed 10 characters.",
	),
	type: GameSchemaBuildersMap.ticket.type(
		"Don't you forgot anything? (Ticket Type)",
	),
});

export type TicketItemState = z.infer<typeof TicketItemStateSchema>;

export function useTicketUpdate(defaultData: GameTicket) {
	const api = useApi();
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
		mutateFn: (data) =>
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
