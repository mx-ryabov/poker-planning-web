import {
	selectVotingProcess,
	useGameState,
} from "@/_src/pages/game-room/model";
import { TicketLink } from "../../ticket-link";
import { GameVotingStatus } from "@/_src/shared/api";

export function VotingInfo() {
	const votingProcess = useGameState(selectVotingProcess);

	return (
		<div>
			{votingProcess.status === GameVotingStatus.Inactive && (
				<div>
					<h3 className="text-center font-semibold text-neutral-900">
						Time to relax!
					</h3>
					<p className="text-center text-sm text-neutral-700">
						Discuss your pets with colleagues. Or discuss colleagues
						with your pets.
					</p>
				</div>
			)}
			{votingProcess.status !== GameVotingStatus.Inactive && (
				<div>
					{votingProcess.ticket === null ? (
						<p className="text-neutral-900">
							Regular Voting in progress
						</p>
					) : (
						<div className="flex flex-row gap-2 text-neutral-700">
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
		</div>
	);
}
