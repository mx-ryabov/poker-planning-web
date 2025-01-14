import { GameTicket, TicketType } from "@/_src/shared/api/game-api";
import { Button } from "@/_src/shared/ui/components/button";
import {
	CardsIcon,
	TicketBugIcon,
	TicketStoryIcon,
	TicketTaskIcon,
} from "@/_src/shared/ui/components/icon";
import { ReactNode } from "react";

type Props = {
	data: GameTicket;
};

export function TicketListItem({ data }: Props) {
	return (
		<div
			className="w-full flex flex-col gap-2 border border-neutral-100 px-2 py-2 rounded-xl"
			data-testid="ticket-list-item"
		>
			<div className="flex flex-row items-center gap-2">
				<div>
					{data.type !== undefined
						? TicketTypeToIconMap[data.type]
						: null}
				</div>
				<span className="text-xs text-neutral-300">
					{data.identifier}
				</span>
			</div>
			<div className="flex flex-row items-center gap-2">
				{true && (
					<Button
						title="Vote"
						contentLeft={<CardsIcon size={18} />}
						size="small"
						variant="grayed-out"
						className="drop-shadow-none rounded-lg text-primary-500"
					/>
				)}
				<p className="text-neutral-700">{data.title}</p>
			</div>
		</div>
	);
}

const TicketTypeToIconMap: Record<TicketType, ReactNode> = {
	[TicketType.Story]: (
		<TicketStoryIcon size={20} className="text-success-500" />
	),
	[TicketType.Bug]: <TicketBugIcon size={20} className="text-error-500" />,
	[TicketType.Task]: <TicketTaskIcon size={20} className="text-info-500" />,
};
