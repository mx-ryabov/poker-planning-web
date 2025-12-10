import { NEWLY_CREATED_GAME } from "@/_src/shared/mocks/game";
import {
	test,
	expect,
	http,
	HttpResponse,
	passthrough,
} from "next/experimental/testmode/playwright/msw";

const GAME_ID = "576c770e-d0a3-4c76-a861-1ef48348fe55";
const TOKEN = "fake-token";
const NEGOTIATE_MOCK = {
	negotiateVersion: 1,
	connectionId: "s2s_RV45NhY8xotei7WoHg",
	connectionToken: "BbOVZvPyW4IfN8nrtcr3Rg",
	availableTransports: [
		{
			transport: "WebSockets",
			transferFormats: ["Text", "Binary"],
		},
		{
			transport: "ServerSentEvents",
			transferFormats: ["Text"],
		},
		{
			transport: "LongPolling",
			transferFormats: ["Text", "Binary"],
		},
	],
};

// Unfortunately I can't use process.env.HOST because within this testing environment a syntax with assigning a varaible doesn't work properly
const HOST = process.env.NEXT_PUBLIC_HOST;
test.use({
	mswHandlers: [
		[
			http.get(`${HOST}/api/games/${GAME_ID}`, () => {
				return HttpResponse.json(NEWLY_CREATED_GAME);
			}),
			http.all("*", () => {
				return passthrough();
			}),
		],
		{ scope: "test" },
	],
});

test.describe("Game Room", () => {
	test.beforeEach(async ({ context }) => {
		await context.addCookies([
			{
				name: "token",
				value: TOKEN,
				path: "/",
				domain: "localhost:3000",
				httpOnly: true,
			},
		]);
		await context.route(
			`${HOST}/hubs/game/negotiate?gameId=${GAME_ID}&negotiateVersion=1`,
			async (route) => {
				await route.fulfill({
					body: JSON.stringify(NEGOTIATE_MOCK),
				});
			},
		);
		await context.routeWebSocket(
			`ws://localhost:5011/hubs/game?gameId=${GAME_ID}&id=dvOwNd5-L-FMshrgjwV8VA&access_token=${TOKEN}`,
			(ws) => {
				ws.onMessage((message) => {
					console.log("huh", message);
				});
			},
		);
		// page.on("websocket", (ws) => {
		// 	console.log(`WebSocket opened: ${ws.url()}>`);
		// 	ws.on("framesent", (event) => console.log(event.payload));
		// 	ws.on("framereceived", (event) => console.log(event.payload));
		// 	ws.on("close", () => console.log("WebSocket closed"));
		// });
	});

	test("renders successfully", async ({ page }) => {
		await page.goto(`http://localhost:3000/game/${GAME_ID}`);
		const gameManagementBar = page.getByTestId("game-management-bar");
		await expect(gameManagementBar.getByRole("button")).toHaveCount(3);
		await expect(
			page.getByTestId("game-management-drawer-content"),
		).not.toBeInViewport();
	});

	test.describe("Game Management Bar and Game Management Drawer", () => {
		test("opens the drawer when clicked on the TaskList button", async ({
			page,
		}) => {
			await page.goto(`http://localhost:3000/game/${GAME_ID}`);
			await page.getByLabel("TaskList").click();

			await expect(
				page.getByTestId("game-management-drawer-content"),
			).toBeInViewport();
			await expect(page.getByRole("heading")).toContainText(/issues/i);
		});

		test("switches between tabs", async ({ page }) => {
			await page.goto(`http://localhost:3000/game/${GAME_ID}`);
			await page.getByLabel("TaskList").click();

			await expect(page.getByRole("heading")).toContainText(/issues/i);

			await page.getByLabel("ParticipantList").click();
			await expect(page.getByRole("heading")).toContainText(
				"Participants",
			);
		});

		test("collapses the drawer if the collapse button was clicked", async ({
			page,
		}) => {
			await page.goto(`http://localhost:3000/game/${GAME_ID}`);
			await page.getByLabel("TaskList").click();

			await expect(
				page.getByTestId("game-management-drawer-content"),
			).toBeInViewport();

			await page.getByLabel("collapse-button").click();

			await expect(
				page.getByTestId("game-management-drawer-content"),
			).not.toBeInViewport();
		});

		test("collapses the drawer if the sliding selector was clicked", async ({
			page,
		}) => {
			await page.goto(`http://localhost:3000/game/${GAME_ID}`);
			await page.getByLabel("TaskList").click();

			await expect(
				page.getByTestId("game-management-drawer-content"),
			).toBeInViewport();

			await page.getByTestId("sliding-selector").click();

			await expect(
				page.getByTestId("game-management-drawer-content"),
			).not.toBeInViewport();
		});
	});
});
