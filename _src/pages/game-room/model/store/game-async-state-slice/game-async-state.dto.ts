import { GameParticipant, TicketType } from "@/_src/shared/api/game-api/dto";

export type UpdateGameTicket = {
	title: string;
	description?: string;
	type: TicketType;
	estimation: string | null;
};

export type UpdateGameSettings = {
	name: string;
	updatedParticipants: GameParticipant[];
	isAutoRevealCards: boolean;
	autoRevealPeriod: number;
};
