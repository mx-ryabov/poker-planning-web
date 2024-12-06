import { test, describe, expect, vi } from "vitest";
import { render, within } from "@/test/utilities";
import { createGameStateStore } from "../../../model/store/game-state-store";
import {
	NEWLY_CREATED_GAME,
	MASTER_PARTICIPANT,
} from "@/_src/shared/mocks/game";
import { GameStateProvider } from "../../../model";
import { UserBar } from "../user-bar";

const gameStateStore = createGameStateStore({
	game: NEWLY_CREATED_GAME,
	currentParticipant: { ...MASTER_PARTICIPANT, displayName: "Maxim Test" },
});
function renderUserBar({ onLogout = vi.fn() }: { onLogout?: () => void }) {
	return render(
		<GameStateProvider store={gameStateStore}>
			<UserBar onLogout={onLogout} />
		</GameStateProvider>,
	);
}

describe("User Bar", () => {
	test("renders successfully", async () => {
		const { unmount, getByRole } = renderUserBar({});

		const userBarBtn = getByRole("button");

		expect(userBarBtn).toHaveTextContent("MT");
		expect(() => unmount()).not.toThrow();
	});

	test("has 2 options when opened", async () => {
		const { getByRole, user } = renderUserBar({});

		const userBarBtn = getByRole("button");
		await user.click(userBarBtn);

		const menu = getByRole("menu");
		expect(within(menu).getAllByRole("menuitem")).toHaveLength(2);
	});

	test("displays the current participant's display name when opened", async () => {
		const { getByRole, user } = renderUserBar({});

		const userBarBtn = getByRole("button");
		await user.click(userBarBtn);

		const menu = getByRole("menu");
		within(menu).getByText("Maxim Test");
	});

	test("has the first option My Account disabled", async () => {
		const { getAllByRole, getByRole, user } = renderUserBar({});

		const userBarBtn = getByRole("button");
		await user.click(userBarBtn);

		const options = getAllByRole("menuitem");
		expect(options[0]).toHaveTextContent(/my account/i);
		expect(options[0]).toHaveTextContent(/sign up to see more/i);
		expect(options[0]).toHaveAttribute("data-disabled", "true");
	});

	test("has the second option Logout", async () => {
		const { getAllByRole, getByRole, user } = renderUserBar({});

		const userBarBtn = getByRole("button");
		await user.click(userBarBtn);

		const options = getAllByRole("menuitem");
		expect(options[1]).toHaveTextContent(/logout/i);
	});

	test("triggers onLogout callback when clicked", async () => {
		const onLogout = vi.fn();
		const { getAllByRole, getByRole, user } = renderUserBar({ onLogout });

		const userBarBtn = getByRole("button");
		await user.click(userBarBtn);

		const options = getAllByRole("menuitem");
		await user.click(options[1]);

		expect(onLogout).toHaveBeenCalledOnce();
	});
});
