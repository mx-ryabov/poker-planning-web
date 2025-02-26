import { TicketType } from "@/_src/shared/api/game-api/dto";

export type UpdateGameTicket = {
	title: string;
	description?: string;
	type: TicketType;
	estimation: string | null;
};
