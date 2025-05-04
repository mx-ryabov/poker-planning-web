import { test, describe, expect, vi } from "vitest";
import { render } from "@/test/utilities";
import { axe } from "jest-axe";
import { ResultsChart } from "../components";
import { GameRoomFakeProviderWrapper } from "@/_src/pages/game-room/__mocks__";
import {
	generateGame,
	generateParticipant,
} from "@/_src/pages/game-room/__tests__/game-state-store.test-helpers";
import { GameParticipant } from "@/_src/shared/api";
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
		const { getByText } = renderComponent({
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

		getByText("suit 1 value 1");
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
