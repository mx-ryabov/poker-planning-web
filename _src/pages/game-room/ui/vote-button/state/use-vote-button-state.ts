import { useMemo } from "react";
import { selectVotingProcess, useGameState } from "../../../model";
import { useApi } from "@/_src/app";
import { GameVotingProcess } from "@/_src/shared/api/game-api";
import { VotingStatus } from "../types";
import { useMutation } from "@/_src/shared/lib";
import { useGlobalToast } from "@/_src/shared/ui/components/toast";

export type UseVoteButtonStateProps = {
	isPending: boolean;
	votingStatus: VotingStatus;
	startVoting: () => Promise<void>;
	finishVoting: () => Promise<void>;
};

export function useVoteButtonState(
	gameId: string,
	ticketId: string | null,
): UseVoteButtonStateProps {
	const api = useApi();
	const toast = useGlobalToast();
	const votingProcess = useGameState(selectVotingProcess);

	const votingStatus = useMemo(
		() => getVotingStatus(votingProcess, ticketId),
		[votingProcess, ticketId],
	);

	const startVotingInStore = useGameState((state) => state.startVoting);
	const { mutate: startVoting, isPending: isStartVotingPending } =
		useMutation({
			mutateFn: () => api.game.startVoting(gameId, ticketId || undefined),
			onSuccess: () => startVotingInStore(ticketId || undefined),
			onError: (error) =>
				toast?.add({
					title: `Starting Voting failed. ${error.message}`,
					variant: "error",
					description: "Please try again",
				}),
		});

	const finishVotingInStore = useGameState((state) => state.finishVoting);
	const { mutate: finishVoting, isPending: isFinishVotingPending } =
		useMutation({
			mutateFn: () => api.game.finishVoting(gameId),
			onSuccess: () => finishVotingInStore(),
			onError: () =>
				toast?.add({
					title: `Finishing Voting failed.`,
					variant: "error",
					description: "Please try again.",
				}),
		});

	return {
		// TODO: think about avoiding this flickering
		isPending: isStartVotingPending || isFinishVotingPending,
		votingStatus,
		startVoting,
		finishVoting,
	};
}

function getVotingStatus(
	votingProcess: GameVotingProcess,
	ticketId: string | null,
): VotingStatus {
	if (votingProcess.isActive && votingProcess.ticketId === ticketId)
		return "currentInProgress";
	if (votingProcess.isActive && votingProcess.ticketId !== ticketId)
		return "anotherInProgress";
	return "notStarted";
}
