import { test, describe, expect } from "vitest";
import { render } from "@/test/utilities";
import { VoteButton } from "./vote-button";
import { ApiFakeProvider, FakeApi } from "@/__mocks__/api-fake-provider";
import { ReactNode } from "react";
import {
	generateGame,
	generateParticipant,
} from "../../__tests__/game-state-store.test-helpers";
import { GameStateProvider } from "../../model";
import { ParticipantRole } from "@/_src/shared/api/game-api";

describe("VoteButton", () => {
	test("renders correctly", async () => {
		const { unmount, getByRole } = renderComponent();

		const btn = getByRole("button");
		expect(btn).toHaveTextContent("Start Voting");
		expect(btn).toBeEnabled();
		expect(() => unmount()).not.toThrow();
	});

	test("returns null when it's not allowed to use this button (f.e. when participantRole=VotingMember)", async () => {
		const { queryByRole } = renderComponent({
			participantRole: ParticipantRole.VotingMember,
		});

		expect(queryByRole("button")).not.toBeInTheDocument();
	});
});

type RenderProps = {
	activeVotingTicketId?: string;
	participantRole?: ParticipantRole;
};
function renderComponent(props?: RenderProps) {
	return render(
		<VoteButton
			ticketId="test-ticket-id"
			title={{
				notStarted: "Start Voting",
				currentInProgress: "Finish voting",
				anotherInProgress: "Voting...",
			}}
		/>,
		{
			wrapper: buildWrapper({
				apiFake: {},
				activeVotingTicketId: props?.activeVotingTicketId,
				participantRole:
					props?.participantRole || ParticipantRole.Master,
			}),
		},
	);
}

type BuildWrapperProps = {
	apiFake?: FakeApi;
} & RenderProps;
function buildWrapper({
	apiFake,
	activeVotingTicketId,
	participantRole,
}: BuildWrapperProps) {
	return ({ children }: { children: ReactNode }) => {
		const game = generateGame({ id: "test-game-id" });
		return (
			<ApiFakeProvider fakeApi={apiFake}>
				<GameStateProvider
					initialAsyncState={{
						game: {
							...game,
							votingProcess: !activeVotingTicketId
								? game.votingProcess
								: {
										isActive: true,
										ticketId: activeVotingTicketId,
									},
						},
						currentParticipant: generateParticipant({
							role: participantRole,
						}),
					}}
				>
					{children}
				</GameStateProvider>
			</ApiFakeProvider>
		);
	};
}
