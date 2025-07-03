"use client";
import { usePermissions } from "../../../model";
import { ResultsChart, VotingResultsApplier } from "./components";

export function VotingResults() {
	const isChangeVotingAllowed = usePermissions("ChangeVoting");

	return (
		<div className="flex flex-row items-center justify-center gap-4">
			<ResultsChart />
			{isChangeVotingAllowed && <VotingResultsApplier />}
		</div>
	);
}
