"use client";
import { useGamePermissions } from "@/src/app/(game)/game/[id]/_permissions";
import { GameActions } from "@/src/domain/entities/game";
import { ResultsChart, VotingResultsApplier } from "./components";

export function VotingResults() {
	const isChangeVotingAllowed = useGamePermissions(GameActions.ChangeVoting);

	return (
		<div className="flex flex-row items-center justify-center gap-4">
			<ResultsChart />
			{isChangeVotingAllowed && <VotingResultsApplier />}
		</div>
	);
}
