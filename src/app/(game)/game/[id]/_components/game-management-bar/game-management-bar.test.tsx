import { test, describe, expect } from "vitest";
import { render, within } from "@/test/utilities";
import { axe } from "jest-axe";
import { GameManagementBar } from ".";
import {
	GameManagementTab,
	createGameStateStore,
} from "@/src/app/(game)/game/[id]/_store";
import { generateGame, generateParticipant } from "@/__mocks__/game";
import { GameRoomFakeProviderWrapper } from "../../__mocks__";
import { ParticipantRole } from "@/src/domain/entities/game";

const gameStateStore = createGameStateStore({
	game: generateGame(),
	currentParticipant: generateParticipant({ role: ParticipantRole.Master }),
});
function renderGameManagementBar() {
	return render(<GameManagementBar />, {
		wrapper: GameRoomFakeProviderWrapper({
			gameStateStore,
		}),
	});
}

describe("Game Management Bar", () => {
	test("renders correctly", async () => {
		const { unmount, getAllByRole } = renderGameManagementBar();

		const buttons = getAllByRole("button");

		expect(buttons).toHaveLength(3);
		within(buttons[0]).getByTestId(/listicon/i);
		within(buttons[1]).getByTestId(/peopleicon/i);
		within(buttons[2]).getByTestId(/settingsicon/i);
		expect(() => unmount()).not.toThrow();
	});

	test("changes the active tab value in the store when clicking on a corresponding button", async () => {
		const { user, getAllByRole } = renderGameManagementBar();

		const buttons = getAllByRole("button");

		await user.click(buttons[0]);
		expect(gameStateStore.getState().activeTab).toBe(
			GameManagementTab.TaskList,
		);
		await user.click(buttons[1]);
		expect(gameStateStore.getState().activeTab).toBe(
			GameManagementTab.ParticipantList,
		);
	});

	test("resets the active tab in the store when clicking on an active button", async () => {
		const { user, getAllByRole, getByTestId } = renderGameManagementBar();

		const buttons = getAllByRole("button");

		await user.click(buttons[0]);
		expect(gameStateStore.getState().activeTab).toBe(
			GameManagementTab.TaskList,
		);
		await user.click(getByTestId("sliding-selector"));
		expect(gameStateStore.getState().activeTab).toBe(null);
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container } = renderGameManagementBar();
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
