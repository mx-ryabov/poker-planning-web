import { NEWLY_CREATED_GAME } from "@/_src/shared/mocks/game";
import { GetGameByIdResponse } from "@/_src/shared/api/game-api";

export const GAME_MOCK: GetGameByIdResponse = {
	...NEWLY_CREATED_GAME,
};
