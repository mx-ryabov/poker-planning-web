import { test, describe, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@/test/utilities";
import { useVoteButtonState } from "./use-vote-button-state";
import { ApiFakeProvider, FakeApi } from "@/__mocks__/api-fake-provider";
import { ReactNode } from "react";
import { GameStateProvider } from "../../../model";
import {
	generateGame,
	generateParticipant,
} from "../../../__tests__/game-state-store.test-helpers";
import { ParticipantRole } from "@/_src/shared/api/game-api";

const startVoting = vi.fn();
const finishVoting = vi.fn();

describe("UseVoteButtonState hook", () => {
	beforeEach(() => {
		startVoting.mockClear();
		finishVoting.mockClear();
	});

	test("renders correctly", async () => {
		const { unmount, result } = renderUseVoteButtonState();

		expect(result.current.votingStatus).toBe("notStarted");
		expect(() => unmount()).not.toThrow();
	});

	test("triggers startVoting server action if returned startVoting is invoked", async () => {
		const { result } = renderUseVoteButtonState();
		await act(() => result.current.startVoting());

		expect(startVoting).toHaveBeenNthCalledWith(
			1,
			"test-game-id",
			"test-ticket-id",
		);
	});

	test("triggers finishVoting server action if returned finishVoting is invoked", async () => {
		const { result } = renderUseVoteButtonState();
		await act(() => result.current.finishVoting());

		expect(finishVoting).toHaveBeenNthCalledWith(1, "test-game-id");
	});

	test("returns votingStatus=currentInProgress if startVoting has been called", async () => {
		const { result } = renderUseVoteButtonState();
		await act(() => result.current.startVoting());

		expect(result.current.votingStatus).toBe("currentInProgress");
	});

	test("returns votingStatus=notStarted if startVoting has been called and finishVoting after that", async () => {
		const { result } = renderUseVoteButtonState();
		await act(() => result.current.startVoting());
		await act(() => result.current.finishVoting());

		expect(result.current.votingStatus).toBe("notStarted");
	});

	test("returns votingStatus=anotherInProgress if votingProcess.ticketId from the store != provided ticketID", async () => {
		const { result } = renderUseVoteButtonState({
			activeVotingTicketId: "another-ticket-id",
		});

		expect(result.current.votingStatus).toBe("anotherInProgress");
	});
});

function renderUseVoteButtonState(props?: { activeVotingTicketId?: string }) {
	return renderHook(
		() => useVoteButtonState("test-game-id", "test-ticket-id"),
		{
			wrapper: buildWrapper({
				apiFake: {
					game: {
						startVoting,
						finishVoting,
					},
				},
				activeVotingTicketId: props?.activeVotingTicketId,
			}),
		},
	);
}

type BuildWrapperProps = {
	apiFake?: FakeApi;
	activeVotingTicketId?: string;
};
function buildWrapper({ apiFake, activeVotingTicketId }: BuildWrapperProps) {
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
							role: ParticipantRole.Master,
						}),
					}}
				>
					{children}
				</GameStateProvider>
			</ApiFakeProvider>
		);
	};
}
