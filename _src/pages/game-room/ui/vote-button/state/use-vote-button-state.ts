import { useCallback, useMemo, useOptimistic } from "react";
import { selectVotingProcess, useGameState } from "../../../model";
import { useApi } from "@/_src/app";
import { GameVotingProcess } from "@/_src/shared/api/game-api";
import { VotingStatus } from "../types";
import { useMutation } from "@/_src/shared/lib";
import { useGlobalToast } from "@/_src/shared/ui/components/toast";

export type UseVoteButtonStateProps = {
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
	// Not the best approach to update optimistically because the store logic for starting and finishing of voting can be changed
	const [optimisticVotingProcess, setVotingProcess] = useOptimistic<
		GameVotingProcess,
		GameVotingProcess
	>(votingProcess, (state, optimisticStatus) => ({
		...state,
		...optimisticStatus,
	}));

	const votingStatus = useMemo(
		() => getVotingStatus(optimisticVotingProcess, ticketId),
		[optimisticVotingProcess, ticketId],
	);

	const startVotingInStore = useGameState((state) => state.startVoting);
	const { mutate: startVoting } = useMutation({
		onMutate: () => setVotingProcess({ isActive: true, ticketId }),
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
	const { mutate: finishVoting } = useMutation({
		onMutate: () => setVotingProcess({ isActive: false, ticketId: null }),
		mutateFn: () => api.game.finishVoting(gameId),
		onSuccess: () => finishVotingInStore(),
		onError: (error) =>
			toast?.add({
				title: `Finishing Voting failed. ${error.message}`,
				variant: "error",
				description: "Please try again",
			}),
	});

	return {
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
