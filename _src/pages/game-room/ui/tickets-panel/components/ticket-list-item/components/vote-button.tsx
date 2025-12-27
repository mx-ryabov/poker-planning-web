import {
	selectVotingProcess,
	useGameState,
	usePermissions,
	useVotingAsyncState,
} from "@/_src/pages/game-room/model";
import { GameTicket, GameVotingStatus } from "@/_src/shared/api";
import { Button } from "@/_src/shared/ui/components/button";
import { Highlighter } from "@/_src/shared/ui/components/highlighter";
import { CardsIcon } from "@/_src/shared/ui/components/icon";
import { useCallback } from "react";

type Props = {
	ticket: GameTicket;
};

export function VoteButton({ ticket }: Props) {
	const isAllowed = usePermissions("ChangeVoting");
	const { startVoting } = useVotingAsyncState();

	const status = useVoteButtonStatus(ticket.id);

	const onPress = useCallback(() => {
		startVoting(ticket.id);
	}, [ticket, startVoting]);

	if (!isAllowed || status === "disabled") return null;

	if (status === "ready-to-vote") {
		return (
			<Highlighter id="vote-button-in-the-ticket">
				<Button
					variant="outline"
					className="border-neutral-300 drop-shadow-none"
					data-testid={`vote-button-test-${ticket.id}`}
					size="small"
					onPress={onPress}
				>
					<CardsIcon size={16} />
					VOTE
				</Button>
			</Highlighter>
		);
	}

	return (
		<div className="border-primary-100 text-primary-500 flex h-7 items-center justify-center rounded-lg border px-2 text-xs">
			Under Vote
		</div>
	);
}

type VoteButtonStatus = "ready-to-vote" | "disabled" | "under-vote";
function useVoteButtonStatus(ticketId: string): VoteButtonStatus {
	const votingProcess = useGameState(selectVotingProcess);

	if (
		votingProcess.ticket?.id !== ticketId &&
		votingProcess.status !== GameVotingStatus.Inactive
	) {
		return "disabled";
	}

	if (
		(votingProcess.status === GameVotingStatus.InProgress ||
			votingProcess.status === GameVotingStatus.Revealed) &&
		votingProcess.ticket?.id === ticketId
	) {
		return "under-vote";
	}

	return "ready-to-vote";
}
