import { GameTicket } from "@/src/domain/entities/game";
import { useMemo } from "react";
import { selectVotingSystemVotes, useGameState } from "../../../../_store";
import { useTicketsSorting } from "./tickets-sorting.provider";

export function useSortedTickets(tickets: GameTicket[]) {
	const { sorting } = useTicketsSorting();
	const votes = useGameState(selectVotingSystemVotes);

	const votesRanking = useMemo(() => {
		return votes.reduce(
			(acc, vote) => {
				acc[vote.id] = vote.order;
				return acc;
			},
			{} as Record<string, number>,
		);
	}, [votes]);

	const valueToIdVotes = useMemo(() => {
		return votes.reduce(
			(acc, vote) => {
				acc[vote.value] = vote.id;
				return acc;
			},
			{} as Record<string, string>,
		);
	}, [votes]);

	return useMemo(() => {
		return tickets.sort((a, b) => {
			let aRank: number = 0;
			let bRank: number = 0;
			let compareByRank = true;

			if (a.estimation === null || a.estimation === "") {
				aRank = -Infinity;
			}
			if (b.estimation === null || b.estimation === "") {
				bRank = -Infinity;
			}
			const aVoteId = valueToIdVotes[a.estimation ?? ""];
			const bVoteId = valueToIdVotes[b.estimation ?? ""];
			if (aVoteId && bVoteId) {
				aRank = votesRanking[aVoteId];
				bRank = votesRanking[bVoteId];
			} else {
				compareByRank = false;
			}

			if (sorting === "lowest-to-highest") {
				if (compareByRank) {
					return aRank - bRank;
				}

				return (a.estimation ?? "").localeCompare(b.estimation ?? "");
			}
			if (sorting === "highest-to-lowest") {
				if (compareByRank) {
					return bRank - aRank;
				}

				return (b.estimation ?? "").localeCompare(a.estimation ?? "");
			}
			if (sorting === "newest") {
				return b.identifier.localeCompare(a.identifier);
			}
			if (sorting === "oldest") {
				return a.identifier.localeCompare(b.identifier);
			}
			return 0;
		});
	}, [tickets, sorting, votesRanking, valueToIdVotes]);
}
