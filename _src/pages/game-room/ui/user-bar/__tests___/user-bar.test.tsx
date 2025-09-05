import { test, describe, expect, vi } from "vitest";
import { render, waitFor, within } from "@/test/utilities";
import { UserBar } from "../user-bar";
import { GameRoomFakeProviderWrapper } from "../../../__mocks__";
import { ConfirmationModalProvider } from "@/_src/shared/providers/confirmation-modal-provider";
import { ParticipantRole } from "@/_src/shared/api";
import {
	generateGame,
	generateParticipant,
} from "../../../__tests__/game-state-store.test-helpers";

describe("User Bar", () => {
	test("renders successfully", async () => {
		const { unmount, getByRole } = renderUserBar({});

		const userBarBtn = getByRole("button");

		expect(userBarBtn).toHaveTextContent("MT");
		expect(() => unmount()).not.toThrow();
	});

	test("has the onboarding option for the master", async () => {
		const { getByRole, user } = renderUserBar({});

		const userBarBtn = getByRole("button");
		await user.click(userBarBtn);

		const menu = getByRole("group");
		within(menu).getByLabelText(/Onboardings/i);
	});

	test("onboarding submenu has 1 option for the master role", async () => {
		const { getByRole, getByText, user, getByTestId } = renderUserBar({});

		const userBarBtn = getByRole("button");
		await user.click(userBarBtn);

		const menu = getByRole("group");
		const onboardingOption = within(menu).getByLabelText(/Onboardings/i);
		await user.hover(onboardingOption);
		await waitFor(() => {
			getByText(/how to start the game/i);
			const onboardingOptions = within(
				getByTestId("onboarding-list"),
			).getAllByRole("menuitem");
			expect(onboardingOptions).toHaveLength(1);
		});
	});

	test("has the onboarding option for a voting memeber", async () => {
		const { getByRole, user } = renderUserBar({
			role: ParticipantRole.VotingMember,
		});
		const userBarBtn = getByRole("button");
		await user.click(userBarBtn);
		const menu = getByRole("group");
		within(menu).getByLabelText(/Onboardings/i);
	});

	test("onboarding submenu has 1 option for the voting memeber", async () => {
		const { getByRole, getByText, user, getByTestId } = renderUserBar({
			role: ParticipantRole.VotingMember,
		});
		const userBarBtn = getByRole("button");
		await user.click(userBarBtn);
		const menu = getByRole("group");
		const onboardingOption = within(menu).getByLabelText(/Onboardings/i);
		await user.hover(onboardingOption);
		await waitFor(() => {
			getByText(/what's going on/i);
			const onboardingOptions = within(
				getByTestId("onboarding-list"),
			).getAllByRole("menuitem");
			expect(onboardingOptions).toHaveLength(1);
		});
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

	// test("has the first option My Account disabled", async () => {
	// 	const { getAllByRole, getByRole, user } = renderUserBar({});

	// 	const userBarBtn = getByRole("button");
	// 	await user.click(userBarBtn);

	// 	const options = getAllByRole("menuitem");
	// 	expect(options[0]).toHaveTextContent(/my account/i);
	// 	expect(options[0]).toHaveTextContent(/sign up to see more/i);
	// 	expect(options[0]).toHaveAttribute("data-disabled", "true");
	// });

	test("has the option Exit", async () => {
		const { getByRole, user } = renderUserBar({});

		const userBarBtn = getByRole("button");
		await user.click(userBarBtn);

		const menu = getByRole("group");
		expect(menu).toHaveTextContent(/exit/i);
	});

	test("triggers onLogout callback when clicked", async () => {
		const onLogout = vi.fn();
		const { getByRole, user, getByText, getByTestId } = renderUserBar({
			onLogout,
		});

		const userBarBtn = getByRole("button");
		await user.click(userBarBtn);

		const exitOption = within(getByRole("group")).getByLabelText(/exit/i);
		await user.click(exitOption);

		getByText(/are you sure you want to exit/i);
		const confirmBtn = getByTestId("confirm-button");
		await user.click(confirmBtn);
		expect(onLogout).toHaveBeenCalledOnce();
	});
});

type RenderUserBarParams = {
	onLogout?: () => void;
	role?: ParticipantRole;
};
function renderUserBar({
	onLogout = vi.fn(),
	role = ParticipantRole.Master,
}: RenderUserBarParams) {
	return render(
		<ConfirmationModalProvider>
			<UserBar onLogout={onLogout} />
		</ConfirmationModalProvider>,
		{
			wrapper: GameRoomFakeProviderWrapper({
				gameStateProps: {
					game: generateGame({}),
					currentParticipant: generateParticipant({
						role,
						displayName: "Maxim Test",
					}),
				},
			}),
		},
	);
}
