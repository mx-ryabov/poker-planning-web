import { NEWLY_CREATED_GAME } from "@/__mocks__/game";
import { MASTER_PARTICIPANT } from "@/__mocks__/game/participant";
import { GetGameByIdResponse } from "@/_src/shared/api/game-api";

export const GAME_MOCK: GetGameByIdResponse = {
	...NEWLY_CREATED_GAME,
};

export const PARTICIPANT_MOCK = {
	...MASTER_PARTICIPANT,
};
