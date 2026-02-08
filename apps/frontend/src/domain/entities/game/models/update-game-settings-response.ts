import { GameParticipant } from "./game-participant";

export type UpdateGameSettingsResponse = {
	name: string;
	updatedParticipants: GameParticipant[];
	isAutoRevealCards: boolean;
	autoRevealPeriod: number;
};
