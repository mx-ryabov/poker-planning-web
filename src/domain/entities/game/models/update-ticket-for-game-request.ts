import { TicketType } from "./game-ticket";

export type UpdateTicketForGameRequest = {
	title: string;
	description?: string;
	type: TicketType;
	estimation: string | null;
};
