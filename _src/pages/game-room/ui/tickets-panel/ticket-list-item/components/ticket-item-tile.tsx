import { GameTicket, TicketType } from "@/_src/shared/api/game-api";
import { Button } from "@/_src/shared/ui/components/button";
import { CardsIcon } from "@/_src/shared/ui/components/icon/svg/cards.icon";
import { TicketBugIcon } from "@/_src/shared/ui/components/icon/svg/ticket-bug.icon";
import { TicketStoryIcon } from "@/_src/shared/ui/components/icon/svg/ticket-story.icon";
import { TicketTaskIcon } from "@/_src/shared/ui/components/icon/svg/ticket-task.icon";
import { ReactNode, useCallback } from "react";
import { TicketItemMenu } from "./ticket-item-menu";
import { InlineEditableTextField } from "@/_src/shared/ui/components/inline-editable-fields";
import { useTicketUpdate } from "@/_src/pages/game-room/model";
import { VoteButton } from "../../../vote-button";

type Props = {
	data: GameTicket;
	isEditable: boolean;
	deleteTicket: () => void;
	onOpen: (id: string) => void;
};

export function TicketItemTile(props: Props) {
	const { data, isEditable, deleteTicket, onOpen } = props;

	const { optimisticData: state, updateByField } = useTicketUpdate(data);

	const onContainerClick = useCallback(() => {
		onOpen(data.id);
	}, [onOpen, data.id]);

	return (
		<div
			className="group flex w-full cursor-pointer flex-col gap-2 rounded-xl border border-neutral-100 p-2 transition-colors hover:border-neutral-200 hover:shadow-xs"
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
						className="opacity-0 transition-opacity group-hover:opacity-100 data-[pressed=true]:opacity-100"
						deleteTicket={deleteTicket}
					/>
				</div>
			</div>
			<div className="flex flex-row items-center justify-between gap-2">
				<VoteButton
					title={{
						notStarted: "Vote",
						currentInProgress: "Finish Voting",
						anotherInProgress: "Voting...",
					}}
					ticketId={data.id}
					size="small"
					variant="grayed-out"
					data-testid={`vote-button-${data.id}`}
					className="text-primary-500 rounded-lg drop-shadow-none disabled:text-neutral-300"
				/>
				<p className="flex-1 truncate text-neutral-700">{data.title}</p>
				<div className="flex w-12 justify-end">
					<InlineEditableTextField
						value={state.estimation || ""}
						placeholder="–"
						id="ticket-estimation"
						containerClassName="w-max max-w-full"
						isDisabled={!isEditable}
						styles={{
							readView: {
								textSize: "medium",
								size: "medium",
								variant: "filled",
							},
							editorView: {
								textSize: "medium",
								size: "medium",
							},
						}}
						onConfirm={(value) =>
							updateByField("estimation", value)
						}
					/>
				</div>
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
