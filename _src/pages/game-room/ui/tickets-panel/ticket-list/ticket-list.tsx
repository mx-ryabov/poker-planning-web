import { GameTicket, ParticipantRole } from "@/_src/shared/api";
import { ReactNode, Ref } from "react";
import { twMerge } from "tailwind-merge";
import { selectCurrentRole, selectTickets, useGameState } from "../../../model";
import { ScrollShadow } from "@/_src/shared/ui/components/scroll-shadow";
import {
	UNSTABLE_ListLayout,
	UNSTABLE_Virtualizer,
} from "react-aria-components";

type Props = {
	className?: string;
	children: (ticketItemData: GameTicket) => ReactNode;
	ref?: Ref<HTMLDivElement | null>;
};

export function TicketList({ className, ref, children }: Props) {
	const tickets = useGameState(selectTickets);

	return (
		<ScrollShadow
			className={twMerge("flex flex-col gap-2 w-full h-full", className)}
			ref={ref}
			data-testid="ticket-list"
		>
			{tickets.length > 0 ? (
				<UNSTABLE_Virtualizer
					layout={new UNSTABLE_ListLayout({ rowHeight: 78 })}
				>
					{tickets.map(children)}
				</UNSTABLE_Virtualizer>
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
			<div className="h-full flex flex-col justify-center items-center gap-2">
				<h3 className="text-lg text-center font-black text-neutral-500">
					No issues in your game yet
				</h3>
				<p className="text-sm text-center text-neutral-500">
					Start creating them right now below 👇
				</p>
			</div>
		);
	}
	return (
		<div className="h-full flex flex-col justify-center items-center gap-2">
			<h3 className="text-lg text-center font-black text-neutral-500">
				No issues in your game yet
			</h3>
			<p className="text-sm text-center text-neutral-500">
				Your game master works hard to start gambling 🗿
			</p>
		</div>
	);
}
