import { TicketType } from "./game-ticket";

export type CreateTicketForGameRequest = {
	title: string;
	type: TicketType;
};
