"use client";
import { cva } from "class-variance-authority";
import { selectVotingProcess, useGameState } from "../../model";
import { ReactElement } from "react";
import { PokerTable } from "./poker-table";
import { HoleCards } from "./hole-cards";

export function PokerField() {
	return (
		<PokerFieldInner
			pokerTable={<PokerTable />}
			holeCards={<HoleCards />}
		/>
	);
}

type Props = {
	pokerTable: ReactElement;
	holeCards: ReactElement;
};
function PokerFieldInner(props: Props) {
	const { pokerTable, holeCards } = props;
	const votingProcess = useGameState(selectVotingProcess);

	return (
		<div className="flex h-full w-full flex-col">
			<div className="h-full w-full">{pokerTable}</div>
			<div
				className={holeCardsContainerStyles({
					isActive: votingProcess.isActive,
				})}
				onAnimationEnd={(e) => {
					// TODO: unmount component when it's hidden (i.e. use animation keyframes and onAnimationEnd)
					console.log(e);
				}}
			>
				{holeCards}
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
