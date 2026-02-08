import { GameParticipant, TicketType } from "@/src/domain/entities/game/models";

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
