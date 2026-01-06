"use client";
import { cva } from "class-variance-authority";
import {
	selectVotingProcess,
	useGameState,
} from "@/src/app/(game)/game/[id]/_store";
import { ReactElement } from "react";
import { PokerTable } from "./poker-table";
import { HoleCards } from "./hole-cards";
import { GameVotingStatus } from "@/src/domain/entities/game";
import { VotingResults } from "./voting-results";
import { PokerFieldProvider } from "./poker-field-provider";

export function PokerField() {
	return (
		<PokerFieldProvider>
			<PokerFieldInner
				pokerTable={<PokerTable />}
				holeCards={<HoleCards />}
				votingResults={<VotingResults />}
			/>
		</PokerFieldProvider>
	);
}

type Props = {
	pokerTable: ReactElement;
	holeCards: ReactElement;
	votingResults: ReactElement;
};
function PokerFieldInner(props: Props) {
	const { pokerTable, holeCards, votingResults } = props;
	const votingProcess = useGameState(selectVotingProcess);

	return (
		<div className="flex h-full w-full flex-col">
			<div
				className="w-full-h-full flex-1 shrink"
				data-testid="poker-table-container"
			>
				{pokerTable}
			</div>
			<div>
				{votingProcess.status === GameVotingStatus.InProgress && (
					<div
						className={holeCardsContainerStyles({
							isActive:
								votingProcess.status ===
								GameVotingStatus.InProgress,
						})}
						onAnimationEnd={(e) => {
							// TODO: unmount component when it's hidden (i.e. use animation keyframes and onAnimationEnd)
							console.log(e);
						}}
						data-testid="hole-cards-container"
					>
						{holeCards}
					</div>
				)}
				{votingProcess.status === GameVotingStatus.Revealed && (
					<div data-testid="voting-results-container">
						{votingResults}
					</div>
				)}
			</div>
		</div>
	);
}

const holeCardsContainerStyles = cva(
	"flex w-full justify-center p-8 transition-all duration-300",
	{
		variants: {
			isActive: {
				true: "translate-y-0 opacity-100",
				false: "translate-y-full opacity-0",
			},
		},
	},
);
