import { GameTicket, ParticipantRole } from "@/src/domain/entities/game";
import { ReactNode, Ref } from "react";
import { twMerge } from "tailwind-merge";
import {
	selectCurrentRole,
	selectTickets,
	useGameState,
} from "@/src/app/(game)/game/[id]/_store";
import { ScrollShadow } from "@/src/shared/ui/components/scroll-shadow";

type Props = {
	className?: string;
	children: (ticketItemData: GameTicket) => ReactNode;
	ref?: Ref<HTMLDivElement | null>;
};

export function TicketList({ className, ref, children }: Props) {
	const tickets = useGameState(selectTickets);

	return (
		<ScrollShadow
			className={twMerge("flex h-full w-full flex-col gap-2", className)}
			ref={ref}
			data-testid="ticket-list"
		>
			{tickets.length > 0 ? (
				// <Virtualizer
				// 	layout={ListLayout}
				// 	layoutOptions={{
				// 		rowHeight: 78,
				// 		padding: 4,
				// 		gap: 4,
				// 	}}
				// >
				tickets.map(children)
			) : (
				<TicketListEmptyState />
			)}
		</ScrollShadow>
	);
}

function TicketListEmptyState() {
	const currentRole = useGameState(selectCurrentRole);

	if (
		currentRole === ParticipantRole.Master ||
		currentRole === ParticipantRole.Manager
	) {
		return (
			<div className="flex h-full flex-col items-center justify-center gap-2">
				<h3 className="text-center text-lg font-bold text-neutral-900">
					No tickets in your game yet
				</h3>
				<p className="text-center text-sm text-neutral-700">
					Start creating them right now below 👇
				</p>
			</div>
		);
	}
	return (
		<div className="flex h-full flex-col items-center justify-center gap-2">
			<h3 className="text-center text-lg font-bold text-neutral-900">
				No tickets in your game yet
			</h3>
			<p className="text-center text-sm text-neutral-700">
				Your game master works hard to start gambling 🗿
			</p>
		</div>
	);
}
