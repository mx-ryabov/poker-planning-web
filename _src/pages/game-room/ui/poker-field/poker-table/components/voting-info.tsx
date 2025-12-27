import {
	GameManagementTab,
	selectGameMaster,
	selectTicketsCount,
	selectUnestimatedTicketsCount,
	selectVotingProcess,
	useGameManagementState,
	useGameState,
} from "@/_src/pages/game-room/model";
import { TicketLink } from "../../ticket-link";
import { GameVotingStatus } from "@/_src/shared/api";
import { Link, LinkButton } from "@/_src/shared/ui/components/link";
import { Modal } from "@/_src/shared/ui/components/modal";
import { Button } from "@/_src/shared/ui/components/button";
import { CloseIcon } from "@/_src/shared/ui/components/icon";
import { ReactNode } from "react";

export function VotingInfo() {
	const gameMaster = useGameState(selectGameMaster);
	const votingProcess = useGameState(selectVotingProcess);
	const unestimatedTicketsCount = useGameState(selectUnestimatedTicketsCount);
	const ticketsCount = useGameState(selectTicketsCount);

	const isBetweenVotes =
		votingProcess.status === GameVotingStatus.Inactive &&
		(ticketsCount === 0 || unestimatedTicketsCount > 0);
	const isAllEstimated =
		votingProcess.status === GameVotingStatus.Inactive &&
		unestimatedTicketsCount === 0 &&
		ticketsCount > 0;
	const isVotingInProgress =
		votingProcess.status === GameVotingStatus.InProgress;

	return (
		<div>
			{isBetweenVotes && (
				<div className="flex flex-col items-center gap-2">
					<h3 className="text-center font-semibold text-neutral-900">
						Time to relax!
					</h3>
					<div className="flex flex-col items-center text-center text-sm text-neutral-700 leading-5">
						Waiting for{" "}
						{gameMaster?.displayName || "the game master"} to start
						the voting process
						<div className="flex flex-row gap-1 p-1 mt-2">
							<div className="bg-primary-600 h-1 w-1 animate-[simple-ping_linear_1s_infinite] rounded-full"></div>
							<div className="bg-primary-600 h-1 w-1 animate-[simple-ping_linear_2s_infinite] rounded-full"></div>
							<div className="bg-primary-600 h-1 w-1 animate-[simple-ping_linear_3s_infinite] rounded-full"></div>
						</div>
						<LearnMoreDialog>
							<LinkButton className="underline hover:text-primary-600 cursor-pointer">
								Learn more
							</LinkButton>
						</LearnMoreDialog>
					</div>
				</div>
			)}
			{isVotingInProgress && (
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
			{isAllEstimated && (
				<div className="flex flex-col items-center gap-1">
					<h3 className="text-lg font-semibold">Congratulations!</h3>
					<p className="text-center text-normal font-medium text-neutral-800">
						You&apos;re done. All the tickets are estimated 🎉
					</p>
				</div>
			)}
		</div>
	);
}

function LearnMoreDialog({ children }: { children: ReactNode }) {
	const gameMaster = useGameState(selectGameMaster);
	const setActiveTab = useGameManagementState((state) => state.setActiveTab);

	return (
		<Modal>
			{children}
			<Modal.Dialog className="w-4xl">
				{({ close }) => (
					<>
						<Modal.Header>
							<Modal.Title>What&apos;s going on?</Modal.Title>
							<Button
								variant="ghost"
								onPress={close}
								shape="square"
							>
								<CloseIcon size={20} />
							</Button>
						</Modal.Header>
						<Modal.Body>
							<p className="">
								When the voting is not active, don&apos;t worry!
							</p>
							<p className="mt-4">
								At this point, the next steps will depend on the
								game master (
								{gameMaster ? gameMaster.displayName : ""}).
							</p>
							<p className="mt-4">
								Soon, he should start voting for one of the
								tickets. As soon as the voting starts, you will
								immediately see an update in the interface (at
								the bottom of the screen, cards with estimate
								options will be shown).
							</p>
							<p className="mt-4">
								But if the voting has not yet started, you can
								explore
								<Link
									onPress={() => {
										setActiveTab(
											GameManagementTab.TaskList,
										);
										close();
									}}
									className="ml-2 text-primary-600"
								>
									the list of tickets
								</Link>
								, or just chat with your colleagues.
							</p>
						</Modal.Body>
						<Modal.Footer>
							{({ close }) => (
								<Button onPress={close}>Ok</Button>
							)}
						</Modal.Footer>
					</>
				)}
			</Modal.Dialog>
		</Modal>
	);
}
