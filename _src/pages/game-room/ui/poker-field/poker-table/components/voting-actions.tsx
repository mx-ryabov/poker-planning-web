import {
	selectVotingProcess,
	useGameState,
	useVotingAsyncState,
} from "@/_src/pages/game-room/model";
import { GameVotingStatus } from "@/_src/shared/api";
import { Button } from "@/_src/shared/ui/components/button";
import {
	CardsIcon,
	PlayIcon,
	RefreshIcon,
} from "@/_src/shared/ui/components/icon";
import { TicketLink } from "../../ticket-link";
import { useCallback } from "react";

export function VotingActions() {
	const votingProcess = useGameState(selectVotingProcess);
	const {
		isStartVotingPending,
		startVoting,
		isRevealCardsPending,
		revealCards,
		isFinishVotingPending,
		finishVoting,
	} = useVotingAsyncState();

	const onStartVoting = useCallback(() => startVoting(null), [startVoting]);
	const onRevote = useCallback(
		() => startVoting(votingProcess.ticket?.id || null),
		[startVoting, votingProcess],
	);

	return (
		<>
			{votingProcess.status === GameVotingStatus.Inactive && (
				<div className="flex flex-col items-center gap-2">
					<Button
						title="Start Voting"
						contentRight={<PlayIcon size={24} thikness="regular" />}
						onPress={onStartVoting}
						isPending={isStartVotingPending}
					/>
					<p className="w-40 text-center text-xs text-neutral-500">
						Or choose a ticket for voting in the Issues List
					</p>
				</div>
			)}
			{votingProcess.status === GameVotingStatus.InProgress && (
				<div className="flex flex-col items-center gap-2">
					<Button
						title="Reveal Cards"
						contentLeft={<CardsIcon size={24} />}
						onPress={revealCards}
						isPending={isRevealCardsPending}
					/>
					{votingProcess.ticket === null ? (
						<p className="text-sm text-neutral-500">
							Regular Voting in progress
						</p>
					) : (
						<div className="flex flex-row gap-1 text-sm text-neutral-500">
							The ticket{" "}
							<TicketLink
								identifier={votingProcess.ticket.identifier}
								ticketId={votingProcess.ticket.id}
								className="text-primary-500 hover:text-primary-600"
							/>{" "}
							under vote
						</div>
					)}
				</div>
			)}
			{votingProcess.status === GameVotingStatus.Revealed && (
				<div className="flex flex-row gap-2">
					<Button
						title="Finish Voting"
						className="w-max"
						onPress={finishVoting}
						isPending={isFinishVotingPending}
					/>
					<Button
						title="Revote"
						contentLeft={<RefreshIcon size={24} />}
						variant="outline"
						className="border"
						onPress={onRevote}
						isPending={isStartVotingPending}
					/>
				</div>
			)}
		</>
	);
}
