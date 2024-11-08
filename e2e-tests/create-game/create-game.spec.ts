// import { expect } from "@playwright/test";
// import { http, HttpResponse } from "msw";
// import { test } from "../../test/playwright-fixture";
import { CreateGameResponse } from "@/_src/shared/api/game-api";
import { VotingSystem } from "@/_src/shared/api/voting-system-api";
import {
	test,
	expect,
	http,
	HttpResponse,
	passthrough,
} from "next/experimental/testmode/playwright/msw";

const HOST = "http://localhost:5011";
test.use({
	mswHandlers: [
		[
			http.get(`${HOST}/api/voting-systems`, () => {
				return HttpResponse.json([
					{
						id: "6a113d25-34c9-4b49-985c-2df6dd67650c",
						name: "Fibonacci",
						votes: [
							{
								id: "bf0d4051-84a7-4162-8f48-580d4e488df2",
								order: 0,
								suit: "🏖️",
								value: "0",
								votingSystemId:
									"6a113d25-34c9-4b49-985c-2df6dd67650c",
							},
						],
					},
					{
						id: "6a113d25-34c9-4b49-985c-2df6dd67650b",
						name: "T-shirts",
						votes: [
							{
								id: "bf0d4051-84a7-4162-8f48-580d4e488df3",
								order: 0,
								suit: "🏖️",
								value: "XS",
								votingSystemId:
									"6a113d25-34c9-4b49-985c-2df6dd67650b",
							},
						],
					},
				] satisfies VotingSystem[]);
			}),
			http.post(`${HOST}/api/games`, () => {
				return HttpResponse.json({
					id: "6a113d25-34c9-4b49-905b-2df6dd67650b",
					name: "Team Planning",
					link: "",
					settings: {
						isAutoRevealCards: true,
					},
					masterToken: "",
				} satisfies CreateGameResponse);
			}),
			http.all("*", () => {
				return passthrough();
			}),
		],
		{ scope: "test" as "test" }, // or 'worker'
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
