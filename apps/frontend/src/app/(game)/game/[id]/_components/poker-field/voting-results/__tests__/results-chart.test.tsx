import { test, describe, expect, vi } from "vitest";
import { render } from "@/test/utilities";
import { axe } from "jest-axe";
import { ResultsChart } from "../components";
import { GameRoomFakeProviderWrapper } from "@/src/app/(game)/game/[id]/__mocks__";
import { generateGame, generateParticipant } from "@/__mocks__/game";
import { GameParticipant } from "@/src/domain/entities/game";
import { PokerFieldActionContext } from "../../poker-field-provider";

describe("", () => {
	test("renders correctly", async () => {
		const { unmount } = renderComponent({});
		expect(() => unmount()).not.toThrow();
	});

	test("shows 'Nobody voted' text if all the particiapnts hasn't voted", async () => {
		const { getByText } = renderComponent({});

		getByText(/nobody voted/i);
	});

	test("doesn't show 'Nobody voted' text if all the particiapnts hasn't voted", async () => {
		const { queryByText } = renderComponent({
			participants: [
				generateParticipant({
					vote: {
						id: "test-id",
						order: 0,
						suit: "suit",
						value: "value",
					},
				}),
			],
		});

		expect(queryByText(/nobody voted/i)).not.toBeInTheDocument();
	});

	test("shows recommended (most popular) estimation", async () => {
		const { getByText, getAllByText } = renderComponent({
			participants: [
				generateParticipant({
					vote: {
						id: "test-id",
						order: 0,
						suit: "suit 1",
						value: "value 1",
					},
				}),
				generateParticipant({
					vote: {
						id: "test-id",
						order: 0,
						suit: "suit 1",
						value: "value 1",
					},
				}),
				generateParticipant({
					vote: {
						id: "test-id-1",
						order: 1,
						suit: "suit 2",
						value: "value 2",
					},
				}),
			],
		});

		expect(getAllByText(/suit 1 value 1/i)).not.toHaveLength(0);
		getByText(/recommended/i);
		getByText(/estimation/i);
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container } = renderComponent({});
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});

type RenderProps = {
	participants?: GameParticipant[];
};

function renderComponent({ participants = [] }: RenderProps) {
	return render(
		<PokerFieldActionContext.Provider
			value={{ setHighlightedVoteId: vi.fn() }}
		>
			<ResultsChart />
		</PokerFieldActionContext.Provider>,
		{
			wrapper: GameRoomFakeProviderWrapper({
				gameStateProps: {
					game: generateGame({
						participants,
					}),
					currentParticipant: generateParticipant({}),
				},
			}),
		},
	);
}
