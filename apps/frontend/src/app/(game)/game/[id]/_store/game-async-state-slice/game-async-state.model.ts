import {
	GameParticipant,
	GetGameByIdResponse,
} from "@/src/domain/entities/game";

export type GameAsyncState = {
	game: GetGameByIdResponse;
	currentParticipant: GameParticipant;
};
