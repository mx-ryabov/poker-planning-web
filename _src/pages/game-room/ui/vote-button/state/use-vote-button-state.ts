import { useCallback } from "react";
import {
	selectVotingProcess,
	useGameState,
	useIsStartVotingAllowed,
} from "../../../model";
import { useApi } from "@/_src/app";
import { GameVotingProcess } from "@/_src/shared/api/game-api";
import { VotingStatus } from "../types";

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
	const votingProcess = useGameState(selectVotingProcess);
	const votingStatus = getVotingStatus(votingProcess, ticketId);

	const startVotingInStore = useGameState((state) => state.startVoting);
	const startVoting = useCallback(async () => {
		await api.game.startVoting(gameId, ticketId || undefined);
		startVotingInStore(ticketId || undefined);
	}, [api, gameId, ticketId, startVotingInStore]);

	const finishVotingInStore = useGameState((state) => state.finishVoting);
	const finishVoting = useCallback(async () => {
		await api.game.finishVoting(gameId);
		finishVotingInStore();
	}, [api, gameId, finishVotingInStore]);

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
