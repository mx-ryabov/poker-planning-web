import {
	GameParticipant,
	GetGameByIdResponse,
} from "@/_src/shared/api/game-api";

export type GameAsyncState = {
	game: GetGameByIdResponse;
	currentParticipant: GameParticipant;
};
