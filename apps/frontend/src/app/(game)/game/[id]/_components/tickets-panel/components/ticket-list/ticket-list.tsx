import { GameTicket, ParticipantRole } from "@/src/domain/entities/game";
import { ReactNode, Ref, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import {
	selectCurrentRole,
	selectTickets,
	useGameState,
} from "@/src/app/(game)/game/[id]/_store";
import { ScrollShadow } from "@/src/shared/ui/components/scroll-shadow";
import { useSortedTickets } from "../tickets-sorting";
import { useFilteredTickets } from "../tickets-filter";

type Props = {
	className?: string;
	children: (ticketItemData: GameTicket) => ReactNode;
	ref?: Ref<HTMLDivElement | null>;
};

export function TicketList({ className, ref, children }: Props) {
	const tickets = useGameState(selectTickets);
	const filteredTickets = useFilteredTickets(tickets);
	const resultedTickets = useSortedTickets(filteredTickets);

	const emptyReason = useMemo(() => {
		if (tickets.length === 0) {
			return "no-tickets";
		}
		if (resultedTickets.length === 0) {
			return "no-filtered-tickets";
		}
		return "unknown";
	}, [resultedTickets, tickets]);

	return (
		<ScrollShadow
			className={twMerge("flex h-full w-full flex-col gap-2", className)}
			ref={ref}
			data-testid="ticket-list"
		>
			{resultedTickets.length > 0 ? (
				resultedTickets.map(children)
			) : (
				<TicketListEmptyState emptyReason={emptyReason} />
			)}
		</ScrollShadow>
	);
}

type EmptyStateProps = {
	emptyReason: "no-tickets" | "no-filtered-tickets" | "unknown";
};
function TicketListEmptyState({ emptyReason }: EmptyStateProps) {
	const currentRole = useGameState(selectCurrentRole);

	if (
		currentRole === ParticipantRole.Master ||
		currentRole === ParticipantRole.Manager
	) {
		return (
			<div className="flex h-full flex-col items-center justify-center gap-2">
				<h3 className="text-center text-lg font-bold text-neutral-900">
					{emptyReason === "no-tickets" &&
						"No tickets in your game yet"}
					{emptyReason === "no-filtered-tickets" &&
						"🔍 No tickets found for the selected filters"}
				</h3>
				<p className="text-center text-sm text-neutral-700">
					{emptyReason === "no-tickets" &&
						"Start creating them right now below 👇"}
					{emptyReason === "no-filtered-tickets" &&
						"Try different filters to find the tickets you're looking for"}
				</p>
			</div>
		);
	}
	return (
		<div className="flex h-full flex-col items-center justify-center gap-2">
			<h3 className="text-center text-lg font-bold text-neutral-900">
				{emptyReason === "no-tickets" && "No tickets in your game yet"}
				{emptyReason === "no-filtered-tickets" &&
					"🔍 No tickets found for the selected filters"}
			</h3>
			<p className="text-center text-sm text-neutral-700">
				{emptyReason === "no-tickets" &&
					"Your game master works hard to start gambling 🗿"}
				{emptyReason === "no-filtered-tickets" &&
					"Try different filters to find the tickets you're looking for"}
			</p>
		</div>
	);
}
