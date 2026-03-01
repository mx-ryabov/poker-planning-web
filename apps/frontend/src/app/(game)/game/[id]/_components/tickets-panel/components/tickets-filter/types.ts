import { TicketType } from "@/src/domain/entities/game";
import { z } from "zod";

export const TicketsFilterValueSchema = z.object({
	textFilters: z.object({
		text: z.string(),
	}),
	selectiveFilters: z.object({
		type: z.nativeEnum(TicketType).optional(),
		status: z.enum(["estimated", "unestimated"]).optional(),
	}),
});

export type TicketsFilterValue = z.infer<typeof TicketsFilterValueSchema>;
export type TicketsFilterByStatusValue = NonNullable<
	TicketsFilterValue["selectiveFilters"]["status"]
>;
