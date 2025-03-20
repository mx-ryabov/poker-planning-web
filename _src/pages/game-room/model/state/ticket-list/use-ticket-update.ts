import {
	selectCurrentGameId,
	useGameState,
} from "@/_src/pages/game-room/model";
import { updateTicketById } from "@/_src/shared/api/game-api";
import { GameTicket, TicketType } from "@/_src/shared/api/game-api/dto";
import { useMutation } from "@/_src/shared/lib";
import { useGlobalToast } from "@/_src/shared/ui/components/toast";
import { useCallback, useOptimistic } from "react";
import { z } from "zod";

export const TicketItemStateSchema = z.object({
	title: z.string().min(1, "Title can't be empty"),
	description: z.string().optional(),
	estimation: z.string().nullable(),
	type: z.nativeEnum(TicketType, {
		required_error: "Don't you forgot anything? (Ticket Type)",
	}),
});

export type TicketItemState = z.infer<typeof TicketItemStateSchema>;

export function useTicketUpdate(defaultData: GameTicket) {
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
		mutateFn: (data) => updateTicketById(gameId, defaultData.id, data),
		onSuccess: (data) => {
			updateTicket(defaultData.id, data);
		},
		onError: (e) => {
			toastState?.add({
				title: `Server Error`,
				description: e.message,
				variant: "error",
			});
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
