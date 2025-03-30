"use client";
import { selectVotingSystemVotes, useGameState } from "../../../model";
import { EstimationCard } from "./components/estimation-card";

export function HoleCards() {
	const votes = useGameState(selectVotingSystemVotes);

	return (
		<div className="flex flex-col items-center gap-4">
			<p className="text-sm text-neutral-500">
				How long would it take you to complete this task?👇
			</p>
			<div className="flex flex-row gap-2">
				{votes.map((card) => (
					<EstimationCard
						key={card.id}
						rank={card.value}
						suit={card.suit}
						isActive={false}
					/>
				))}
			</div>
		</div>
	);
}
