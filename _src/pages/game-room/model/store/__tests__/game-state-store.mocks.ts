import { NEWLY_CREATED_GAME } from "@/_src/shared/mocks/game";
import { MASTER_PARTICIPANT } from "@/_src/shared/mocks/game/participant";
import { GetGameByIdResponse } from "@/_src/shared/api/game-api";

export const GAME_MOCK: GetGameByIdResponse = {
	...NEWLY_CREATED_GAME,
};

export const PARTICIPANT_MOCK = {
	...MASTER_PARTICIPANT,
};
