import {
	GameManagementTab,
	selectVotingProcess,
	useGameManagementState,
	useGameState,
	useVotingAsyncState,
} from "@/_src/pages/game-room/model";
import { GameVotingStatus } from "@/_src/shared/api";
import { Button, NewButton } from "@/_src/shared/ui/components/button";
import { CardsIcon, RefreshIcon } from "@/_src/shared/ui/components/icon";
import { TicketLink } from "../../ticket-link";
import { useCallback } from "react";
import { Highlighter } from "@/_src/shared/ui/components/highlighter";

export function VotingActions() {
	const votingProcess = useGameState(selectVotingProcess);
	const {
		isStartVotingPending,
		startVoting,
		isRevealCardsPending,
		revealCards,
		isFinishVotingPending,
		finishVoting,
		isCancelVotingPending,
		cancelVoting,
	} = useVotingAsyncState();

	const activeTab = useGameManagementState((state) => state.activeTab);
	const setActiveTab = useGameManagementState((state) => state.setActiveTab);

	const onTicketListLinkPress = useCallback(() => {
		if (activeTab !== GameManagementTab.TaskList) {
			setActiveTab(GameManagementTab.TaskList);
		}
	}, [setActiveTab, activeTab]);

	const onRevote = useCallback(
		() => startVoting(votingProcess.ticket?.id || null),
		[startVoting, votingProcess],
	);

	return (
		<>
			{votingProcess.status === GameVotingStatus.Inactive && (
				<div className="flex flex-col items-center gap-3">
					<p className="w-40 text-center text-normal font-medium text-neutral-800">
						Start from 👇
					</p>
					<Highlighter id="start-creating-tickets">
						<NewButton onPress={onTicketListLinkPress}>
							<CardsIcon size={18} />
							Create Tickets
						</NewButton>
					</Highlighter>
				</div>
			)}
			{votingProcess.status === GameVotingStatus.InProgress && (
				<div className="flex flex-col items-center gap-2">
					<div className="flex flex-row gap-2">
						<NewButton
							onPress={revealCards}
							isPending={isRevealCardsPending}
							className="min-w-max"
						>
							<CardsIcon size={24} />
							Reveal Cards
						</NewButton>
						<NewButton
							onPress={cancelVoting}
							variant="outline"
							isPending={isCancelVotingPending}
							className="min-w-max"
						>
							Cancel Voting
						</NewButton>
					</div>
					{votingProcess.ticket === null ? (
						<p className="text-sm text-neutral-900">
							Regular Voting in progress
						</p>
					) : (
						<div className="flex flex-row gap-1 text-sm text-neutral-900">
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
