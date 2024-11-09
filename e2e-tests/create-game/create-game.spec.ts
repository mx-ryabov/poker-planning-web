import {
	test,
	expect,
	http,
	HttpResponse,
	passthrough,
} from "next/experimental/testmode/playwright/msw";
import { GET_VOTING_SYSTEMS, POST_GAMES } from "./create-game.mocks";

// Unfortunately I can't use process.env.HOST because within this testing environment a syntax with assigning a varaible doesn't work properly
const HOST = process.env.BE_HTTP_HOST;
test.use({
	mswHandlers: [
		[
			http.get(`${HOST}/api/voting-systems`, () => {
				return HttpResponse.json(GET_VOTING_SYSTEMS);
			}),
			http.post(`${HOST}/api/games`, () => {
				return HttpResponse.json(POST_GAMES);
			}),
			http.all("*", () => {
				return passthrough();
			}),
		],
		{ scope: "test" },
	],
});

test.describe("Create Game form", () => {
	test("renders successfully", async ({ page }) => {
		await page.goto(`/create-game`);
		await page.getByPlaceholder("Team Planning").click();
		await page.getByPlaceholder("Team Planning").fill("Game Name");
		await page.getByTestId("continue-btn").click();
		await page.getByText(/Fibonacci/i).click();
		await page.getByTestId("continue-btn").click();
		await page.getByPlaceholder("Type your name").fill("Maxim");
		await page.getByTestId("advanced-settings-btn").click();
		await page.getByTestId("switch-container").click();
		await page.getByTestId("start-game-btn").click();
		await expect(page.getByTestId("start-game-btn")).toBeEnabled();
	});
});
