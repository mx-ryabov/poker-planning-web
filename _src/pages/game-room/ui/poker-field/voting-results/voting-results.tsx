"use client";
import { usePermissions } from "../../../model";
import { ResultsChart, VotingResultsApplier } from "./components";

export function VotingResults() {
	const isChangeVotingAllowed = usePermissions("ChangeVoting");

	return (
		<div className="flex flex-row items-center justify-center gap-4">
			<div className="relative h-[200px] w-[200px]">
				<ResultsChart />
			</div>
			{isChangeVotingAllowed && <VotingResultsApplier />}
		</div>
	);
}
