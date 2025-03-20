import { GameTicket, TicketType } from "@/_src/shared/api/game-api";
import { Button } from "@/_src/shared/ui/components/button";
import { CardsIcon } from "@/_src/shared/ui/components/icon/svg/cards.icon";
import { TicketBugIcon } from "@/_src/shared/ui/components/icon/svg/ticket-bug.icon";
import { TicketStoryIcon } from "@/_src/shared/ui/components/icon/svg/ticket-story.icon";
import { TicketTaskIcon } from "@/_src/shared/ui/components/icon/svg/ticket-task.icon";
import { ReactNode, useCallback } from "react";
import { TicketItemMenu } from "./ticket-item-menu";

type Props = {
	data: GameTicket;
	isReadOnly: boolean;
	deleteTicket: () => void;
	onOpen: (id: string) => void;
};

export function TicketItemTile({
	data,
	isReadOnly,
	deleteTicket,
	onOpen,
}: Props) {
	const onContainerClick = useCallback(() => {
		onOpen(data.id);
	}, [onOpen, data.id]);

	return (
		<div
			className="group w-full flex flex-col gap-2 border border-neutral-100 p-2 rounded-xl hover:border-neutral-200 hover:shadow-xs transition-colors cursor-pointer"
			data-testid="ticket-list-item"
			onClick={onContainerClick}
		>
			<div className="flex flex-row items-center justify-between">
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
				<div className="flex flex-row gap-2">
					<TicketItemMenu
						className="transition-opacity opacity-0 group-hover:opacity-100 data-[pressed=true]:opacity-100"
						deleteTicket={deleteTicket}
					/>
				</div>
			</div>
			<div className="flex flex-row items-center gap-2">
				{!isReadOnly && (
					<Button
						title="Vote"
						contentLeft={<CardsIcon size={18} />}
						size="small"
						variant="grayed-out"
						className="drop-shadow-none rounded-lg text-primary-500"
					/>
				)}
				<p className="text-neutral-700 truncate">{data.title}</p>
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
