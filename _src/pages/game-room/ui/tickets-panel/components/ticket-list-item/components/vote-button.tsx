import {
	selectVotingProcess,
	useGameState,
	usePermissions,
	useVotingAsyncState,
} from "@/_src/pages/game-room/model";
import { GameTicket, GameVotingStatus } from "@/_src/shared/api";
import { ButtonSquare } from "@/_src/shared/ui/components/button";
import { CardsIcon } from "@/_src/shared/ui/components/icon";
import { useCallback } from "react";

type Props = {
	ticket: GameTicket;
};

export function VoteButton({ ticket }: Props) {
	const isAllowed = usePermissions("ChangeVoting");
	const { startVoting, revealCards } = useVotingAsyncState();

	const status = useVoteButtonStatus(ticket.id);

	const onPress = useCallback(() => {
		if (status === "ready-to-vote" || status === "ready-to-revote")
			startVoting(ticket.id);
		if (status === "ready-to-reveal") revealCards();
	}, [status, ticket, startVoting, revealCards]);

	if (!isAllowed || status === "disabled") return null;

	if (status === "ready-to-vote") {
		return (
			<ButtonSquare
				icon={CardsIcon}
				variant="outline"
				className="border-neutral-100 drop-shadow-none"
				data-testid="vote-button-test-ticket-id"
				size="small"
				onPress={onPress}
			/>
		);
	}

	return (
		<div className="border-primary-100 text-primary-500 flex h-7 items-center justify-center rounded-lg border px-2 text-xs">
			Under Vote
		</div>
	);
}

type VoteButtonStatus =
	| "ready-to-vote"
	| "disabled"
	| "ready-to-reveal"
	| "ready-to-revote";
function useVoteButtonStatus(ticketId: string): VoteButtonStatus {
	const votingProcess = useGameState(selectVotingProcess);

	if (
		votingProcess.ticket?.id !== ticketId &&
		votingProcess.status !== GameVotingStatus.Inactive
	) {
		return "disabled";
	}

	if (
		votingProcess.status === GameVotingStatus.InProgress &&
		votingProcess.ticket?.id === ticketId
	) {
		return "ready-to-reveal";
	}

	if (
		votingProcess.status === GameVotingStatus.Revealed &&
		votingProcess.ticket?.id === ticketId
	) {
		return "ready-to-revote";
	}

	return "ready-to-vote";
}
