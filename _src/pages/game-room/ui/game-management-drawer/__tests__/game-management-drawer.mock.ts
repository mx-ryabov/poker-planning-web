import { NEWLY_CREATED_GAME } from "@/__mocks__/game";
import { GetGameByIdResponse } from "@/_src/shared/api/game-api";

export const GAME_MOCK: GetGameByIdResponse = {
	...NEWLY_CREATED_GAME,
	tickets: [
		{
			id: "randim-id",
			title: "ticket title",
			description: "ticket description",
		},
		{
			id: "randim-id-1",
			title: "ticket title 1",
			description: "ticket description 1",
		},
	],
};
