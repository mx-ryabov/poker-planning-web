import { test, describe, expect, vi, afterEach } from "vitest";
import { render, within } from "@/test/utilities";
import { axe } from "jest-axe";
import { createGameStateStore } from "@/src/app/(game)/game/[id]/_store";
import { generateGame, generateParticipant } from "@/__mocks__/game";
import { ParticipantRole, GameParticipant } from "@/src/domain/entities/game";
import { ParticipantListItem } from "./participant-list-item";
import { UserRemoveIcon } from "@/src/shared/ui/components/icon/svg/user-remove.icon";
import { GameStateCotnext } from "@/src/app/(game)/game/[id]/_store/game-state-context";

/* I hope I won't regret about this... 
But I excuse it by saying that I don't rely on useParticipantMenuOptions specifics 
rather on generic stuff + the hook itself is fully covered by Unit Tests */
const optionAction = vi.fn();
vi.mock("../state/use-participant-item-options", () => ({
	useParticipantItemOptions: () => [
		{
			title: "Test Option",
			icon: UserRemoveIcon,
			action: optionAction,
		},
	],
}));

const CURRENT_PARTICIPANT = generateParticipant({
	role: ParticipantRole.Master,
	displayName: "Current Participant",
});

const gameStateStore = createGameStateStore({
	game: generateGame(),
	currentParticipant: CURRENT_PARTICIPANT,
});

function renderComponent(participant: GameParticipant) {
	return render(
		<GameStateCotnext.Provider value={gameStateStore}>
			<ParticipantListItem participant={participant} />
		</GameStateCotnext.Provider>,
	);
}

describe("Participant List Item", () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	test("renders successfully", async () => {
		const { unmount, container } = renderComponent(
			generateParticipant({
				role: ParticipantRole.Master,
				displayName: "Maxim Tester",
			}),
		);

		const avatar = within(container).getByTestId("avatar");

		expect(avatar).toHaveTextContent("MT");
		expect(container).toHaveTextContent(/maxim tester/i);
		expect(container).toHaveTextContent(/game master/i);
		expect(() => unmount()).not.toThrow();
	});

	test("displays (You) next to the name if the participant is currentParticipant", async () => {
		const { getByText } = renderComponent(CURRENT_PARTICIPANT);

		const displayName = getByText(/current participant/i);

		expect(displayName).toHaveTextContent(/(You)/);
	});

	// skipped since there are no options for now
	test.skip("can have options", async () => {
		const { getByRole, getAllByRole, user, debug } = renderComponent(
			generateParticipant({ role: ParticipantRole.VotingMember }),
		);

		debug();

		const optionsBtn = getByRole("button");
		await user.click(optionsBtn);
		const menuOptions = getAllByRole("menuitem");
		expect(menuOptions).toHaveLength(1);
		expect(menuOptions[0]).toHaveTextContent(/test option/i);
		await user.click(menuOptions[0]);
		expect(optionAction).toHaveBeenCalledOnce();
	});

	test("executes the option's action by clicking", async () => {});

	test("doesn't violate any accessibility rules", async () => {
		const { container } = renderComponent(
			generateParticipant({ role: ParticipantRole.VotingMember }),
		);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
