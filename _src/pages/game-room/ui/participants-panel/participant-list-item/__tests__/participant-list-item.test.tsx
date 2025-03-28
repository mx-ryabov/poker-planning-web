import { test, describe, expect, vi, afterEach } from "vitest";
import { render, within } from "@/test/utilities";
import { axe } from "jest-axe";
import { createGameStateStore } from "../../../../model";
import {
	MASTER_PARTICIPANT,
	NEWLY_CREATED_GAME,
	VOTING_MEMBER_PARTICIPANT,
} from "@/_src/shared/mocks/game";
import { ParticipantListItem } from "../participant-list-item";
import { GameParticipant } from "@/_src/shared/api";
import { CURRENT_PARTICIPANT } from "./participant-list-item.mock";
import { UserRemoveIcon } from "@/_src/shared/ui/components/icon/svg/user-remove.icon";
import { GameStateCotnext } from "@/_src/pages/game-room/model/store/game-state-context";

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

const gameStateStore = createGameStateStore({
	game: NEWLY_CREATED_GAME,
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
		const { unmount, container } = renderComponent({
			...MASTER_PARTICIPANT,
			displayName: "Maxim Tester",
		});

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

	test("can have options", async () => {
		const { getByRole, getAllByRole, user } = renderComponent(
			VOTING_MEMBER_PARTICIPANT,
		);

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
		const { container } = renderComponent(VOTING_MEMBER_PARTICIPANT);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
