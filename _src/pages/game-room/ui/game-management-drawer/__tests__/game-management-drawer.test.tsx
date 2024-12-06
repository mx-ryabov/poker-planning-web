import { test, describe, expect } from "vitest";
import { act, render, within } from "@/test/utilities";
import {
	createGameStateStore,
	GameManagementTab,
	GameStateProvider,
} from "../../../model";
import { GAME_MOCK } from "./game-management-drawer.mock";
import { GameManagementDrawer } from "../game-management-drawer";
import { MASTER_PARTICIPANT } from "@/_src/shared/mocks/game/participant";

const gameStateStore = createGameStateStore({
	game: GAME_MOCK,
	currentParticipant: MASTER_PARTICIPANT,
});
function renderDrawer() {
	return render(
		<GameStateProvider store={gameStateStore}>
			<GameManagementDrawer />
		</GameStateProvider>,
	);
}

describe("Game Management Drawer", () => {
	test("renders correctly", async () => {
		const { unmount, queryByTestId, getByTestId } = renderDrawer();

		expect(
			queryByTestId("game-management-drawer-body"),
		).not.toBeInTheDocument();

		act(() =>
			gameStateStore
				.getState()
				.setActiveTab(GameManagementTab.ParticipantList),
		);

		const gameManagementDrawer = getByTestId(
			"game-management-drawer-content",
		);
		within(gameManagementDrawer).getByTestId(
			"game-management-drawer-header",
		);
		within(gameManagementDrawer).getByTestId("game-management-drawer-body");

		expect(() => unmount()).not.toThrow();
	});

	describe("Header", () => {
		test("has title, subtitle and icon corresponding to the active tab", async () => {
			const { getByRole } = renderDrawer();

			act(() =>
				gameStateStore
					.getState()
					.setActiveTab(GameManagementTab.ParticipantList),
			);

			const header = getByRole("banner");
			expect(header).toHaveTextContent(/participants/i);
			expect(header).toHaveTextContent(/online/i);
			expect(
				within(header).queryByTestId(/peopleicon/i),
			).toBeInTheDocument();
		});

		test("is the active tab is ParticipantList then shows the user's count", async () => {
			const { getByRole } = renderDrawer();

			act(() =>
				gameStateStore
					.getState()
					.setActiveTab(GameManagementTab.ParticipantList),
			);

			const header = getByRole("banner");
			expect(header).toHaveTextContent(/1 online/i);
		});

		test("is the active tab is TaskList then shows the task's count", async () => {
			const { getByRole } = renderDrawer();

			act(() =>
				gameStateStore
					.getState()
					.setActiveTab(GameManagementTab.TaskList),
			);

			const header = getByRole("banner");
			expect(header).toHaveTextContent(/issues/i);
			expect(header).toHaveTextContent(/2 in the list/i);
			expect(
				within(header).queryByTestId(/listicon/i),
			).toBeInTheDocument();
		});

		test("has the correct content based on the active tab", async () => {
			const { getByRole } = renderDrawer();

			act(() =>
				gameStateStore
					.getState()
					.setActiveTab(GameManagementTab.ParticipantList),
			);
			const header = getByRole("banner");
			expect(header).toHaveTextContent(/participants/i);
			expect(
				within(header).queryByTestId(/peopleicon/i),
			).toBeInTheDocument();

			act(() =>
				gameStateStore
					.getState()
					.setActiveTab(GameManagementTab.TaskList),
			);
			expect(header).toHaveTextContent(/issues/i);
			expect(
				within(header).queryByTestId(/listicon/i),
			).toBeInTheDocument();

			act(() =>
				gameStateStore
					.getState()
					.setActiveTab(GameManagementTab.Settings),
			);
			expect(header).toHaveTextContent(/settings/i);
			expect(
				within(header).queryByTestId(/settingsicon/i),
			).toBeInTheDocument();
		});
	});

	describe("Body", () => {
		test("has the correct content based on the active tab", async () => {
			const { getByTestId } = renderDrawer();

			act(() =>
				gameStateStore
					.getState()
					.setActiveTab(GameManagementTab.ParticipantList),
			);
			const body = getByTestId("game-management-drawer-body");
			within(body).getByTestId(
				`game-management-panel-${GameManagementTab.ParticipantList}`,
			);

			act(() =>
				gameStateStore
					.getState()
					.setActiveTab(GameManagementTab.TaskList),
			);
			within(body).getByTestId(
				`game-management-panel-${GameManagementTab.TaskList}`,
			);

			act(() =>
				gameStateStore
					.getState()
					.setActiveTab(GameManagementTab.Settings),
			);
			within(body).getByTestId(
				`game-management-panel-${GameManagementTab.Settings}`,
			);
		});
	});

	test("closes the drawer and makes the active tab = null if the arrow button is clicked", async () => {
		const { user, getByTestId, queryByTestId } = renderDrawer();

		act(() =>
			gameStateStore
				.getState()
				.setActiveTab(GameManagementTab.ParticipantList),
		);

		const separartor = getByTestId("drawer-separator");
		const arrowBtn = within(separartor).getByRole("button");
		await user.click(arrowBtn);

		expect(
			queryByTestId("game-management-drawer-body"),
		).not.toBeInTheDocument();
		expect(gameStateStore.getState().activeTab).toBe(null);
	});

	test("closes the drawer if the active tab is null", async () => {
		const { user, getByTestId, queryByTestId } = renderDrawer();

		act(() =>
			gameStateStore
				.getState()
				.setActiveTab(GameManagementTab.ParticipantList),
		);
		expect(
			queryByTestId("game-management-drawer-body"),
		).toBeInTheDocument();

		act(() => gameStateStore.getState().setActiveTab(null));
		expect(
			queryByTestId("game-management-drawer-body"),
		).not.toBeInTheDocument();
	});
});
