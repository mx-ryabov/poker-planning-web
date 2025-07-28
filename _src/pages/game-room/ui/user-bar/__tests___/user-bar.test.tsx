import { test, describe, expect, vi } from "vitest";
import { render, within } from "@/test/utilities";
import { createGameStateStore } from "../../../model/store/game-state-store";
import {
	NEWLY_CREATED_GAME,
	MASTER_PARTICIPANT,
} from "@/_src/shared/mocks/game";
import { UserBar } from "../user-bar";
import { GameStateCotnext } from "../../../model/store/game-state-context";
import { ConfirmationModalProvider } from "@/_src/shared/providers/confirmation-modal-provider";

const gameStateStore = createGameStateStore({
	game: NEWLY_CREATED_GAME,
	currentParticipant: { ...MASTER_PARTICIPANT, displayName: "Maxim Test" },
});
function renderUserBar({ onLogout = vi.fn() }: { onLogout?: () => void }) {
	return render(
		<ConfirmationModalProvider>
			<GameStateCotnext.Provider value={gameStateStore}>
				<UserBar onLogout={onLogout} />
			</GameStateCotnext.Provider>
		</ConfirmationModalProvider>,
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

	test("has the second option Exit", async () => {
		const { getAllByRole, getByRole, user } = renderUserBar({});

		const userBarBtn = getByRole("button");
		await user.click(userBarBtn);

		const options = getAllByRole("menuitem");
		expect(options[1]).toHaveTextContent(/exit/i);
	});

	test("triggers onLogout callback when clicked", async () => {
		const onLogout = vi.fn();
		const { getAllByRole, getByRole, user, getByText, getByTestId } =
			renderUserBar({
				onLogout,
			});

		const userBarBtn = getByRole("button");
		await user.click(userBarBtn);

		const options = getAllByRole("menuitem");
		await user.click(options[1]);

		getByText(/are you sure you want to exit/i);
		const confirmBtn = getByTestId("confirm-button");
		await user.click(confirmBtn);
		expect(onLogout).toHaveBeenCalledOnce();
	});
});
