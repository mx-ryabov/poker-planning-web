import { GameTicket } from "@/src/domain/entities/game";
import { TicketsFilterValue } from "./types";
import { useTicketsFilter } from "./tickets-filter.provider";
import { useMemo } from "react";
import { useFilter } from "react-aria";

export function useFilteredTickets(tickets: GameTicket[]) {
	const { contains } = useFilter({
		sensitivity: "base",
	});
	const { filterValue } = useTicketsFilter();

	const filteredTickets = useMemo(() => {
		return tickets.filter(buildTicketsFilter(filterValue, { contains }));
	}, [tickets, filterValue, contains]);

	return filteredTickets;
}

function buildTicketsFilter(
	filterValue: TicketsFilterValue,
	options: {
		contains: (text: string, search: string) => boolean;
	},
): (ticket: GameTicket) => boolean {
	return (ticket: GameTicket) => {
		let keep = true;
		if (filterValue.selectiveFilters?.type !== undefined) {
			keep &&= ticket.type === filterValue.selectiveFilters.type;
		}
		if (filterValue.selectiveFilters?.status !== undefined) {
			const isEstimated =
				ticket.estimation !== null && ticket.estimation !== "";
			keep &&=
				filterValue.selectiveFilters.status === "estimated"
					? isEstimated
					: !isEstimated;
		}
		if (filterValue.textFilters.text !== undefined) {
			keep &&= options.contains(
				ticket.title,
				filterValue.textFilters.text,
			);
		}
		return keep;
	};
}
