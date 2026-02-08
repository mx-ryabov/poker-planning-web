import { test, describe, expect } from "vitest";
import { render } from "@/test/utilities";
import { axe } from "jest-axe";
import { PokerTable } from "../poker-table";
import { GameRoomFakeProviderWrapper } from "@/src/app/(game)/game/[id]/__mocks__";
import { generateGame, generateParticipant } from "@/__mocks__/game";
import { GameParticipant, ParticipantRole } from "@/src/domain/entities/game";
import { PokerFieldStateContext } from "../../poker-field-provider";

describe("Poker Table", () => {
	test("renders correctly", async () => {
		const { unmount } = renderComponent({});
		expect(() => unmount()).not.toThrow();
	});

	test("shows voting actions if the current participant has Master role", async () => {
		const { getByTestId } = renderComponent({
			currentParticipant: generateParticipant({
				role: ParticipantRole.Master,
			}),
		});

		getByTestId("voting-actions");
	});

	test("doesn't show voting actions if the current participant has not Master role", async () => {
		const { queryByTestId } = renderComponent({
			currentParticipant: generateParticipant({
				role: ParticipantRole.VotingMember,
			}),
		});

		expect(queryByTestId("voting-actions")).not.toBeInTheDocument();
	});

	test("shows voting info if the current participant has VotingMember role", async () => {
		const { getByTestId } = renderComponent({
			currentParticipant: generateParticipant({
				role: ParticipantRole.VotingMember,
			}),
		});

		getByTestId("voting-info");
	});

	test("doesn't show voting info if the current participant has not VotingMember role", async () => {
		const { queryByTestId } = renderComponent({
			currentParticipant: generateParticipant({
				role: ParticipantRole.Master,
			}),
		});

		expect(queryByTestId("voting-info")).not.toBeInTheDocument();
	});

	test("shows table players", async () => {
		const { getByText } = renderComponent({
			participants: [
				generateParticipant({
					id: "rendered-p-id",
					displayName: "Test Participant",
				}),
				generateParticipant({
					id: "rendered-p-id-2",
					displayName: "Test Participant 2",
				}),
			],
		});

		getByText("Test Participant");
		getByText("Test Participant 2");
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container } = renderComponent({});
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});

type RenderComponentProps = {
	currentParticipant?: GameParticipant;
	highlightedVoteId?: string | null;
	participants?: GameParticipant[];
};
function renderComponent(props: RenderComponentProps = {}) {
	const {
		currentParticipant = generateParticipant({}),
		highlightedVoteId = null,
		participants = [],
	} = props;
	return render(
		<PokerFieldStateContext.Provider value={{ highlightedVoteId }}>
			<PokerTable />
		</PokerFieldStateContext.Provider>,
		{
			wrapper: GameRoomFakeProviderWrapper({
				gameStateProps: {
					game: generateGame({
						participants,
					}),
					currentParticipant: currentParticipant,
				},
			}),
		},
	);
}
