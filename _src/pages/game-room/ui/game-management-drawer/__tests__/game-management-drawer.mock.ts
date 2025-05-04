import { NEWLY_CREATED_GAME } from "@/_src/shared/mocks/game";
import { GetGameByIdResponse } from "@/_src/shared/api/game-api";
import { generateTicket } from "../../../__tests__/game-state-store.test-helpers";

export const GAME_MOCK: GetGameByIdResponse = {
	...NEWLY_CREATED_GAME,
	tickets: [
		generateTicket({
			id: "randim-id",
			title: "ticket title",
			description: "ticket description",
		}),
		generateTicket({
			id: "randim-id-1",
			title: "ticket title 1",
			description: "ticket description 1",
		}),
	],
};
