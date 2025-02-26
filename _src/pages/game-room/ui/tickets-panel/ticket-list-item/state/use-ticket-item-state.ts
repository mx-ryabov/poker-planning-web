import { GameTicket, TicketType } from "@/_src/shared/api/game-api/dto";
import { useCallback, useOptimistic, useState, useTransition } from "react";
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

export type UpdateTicketAction = (data: TicketItemState) => Promise<void>;

export function useTicketItemState(
	data: GameTicket,
	onChangeAsync: UpdateTicketAction,
) {
	const [error, setError] = useState<Partial<
		Record<keyof TicketItemState, string[]>
	> | null>(null);
	const [isPending, startTransition] = useTransition();
	const [optimisticTicket, addOptimisticTicket] = useOptimistic<
		GameTicket,
		TicketItemState
	>(data, (state, optimisticState) => {
		return { ...state, ...optimisticState };
	});

	// TODO: move from the common state to an individual state inside TicketItemField
	const update = useCallback(
		<TField extends keyof TicketItemState>(
			field: TField,
			value: TicketItemState[TField],
		) => {
			setError(null);
			const parsed = TicketItemStateSchema.safeParse({
				...data,
				[field]: value,
			});
			if (parsed.success) {
				startTransition(async () => {
					try {
						addOptimisticTicket(parsed.data);
						await onChangeAsync(parsed.data);
					} catch (e: unknown) {
						setError({
							[field]: [
								e instanceof Error ? e.message : String(e),
							],
						});
					}
				});
			} else {
				setError({
					...parsed.error?.formErrors.fieldErrors,
				});
			}
		},
		[onChangeAsync, data, addOptimisticTicket, startTransition],
	);

	return { state: optimisticTicket, isPending, error, update };
}
