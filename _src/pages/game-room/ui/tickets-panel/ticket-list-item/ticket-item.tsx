import { GameTicket } from "@/_src/shared/api/game-api";
import { memo } from "react";
import { TicketItemTile } from "./components/ticket-item-tile";
import { TicketItemFullView } from "./components/ticket-item-full-view";
import { useTicketDelete, useIsTicketEditable } from "../../../model";

type Props = {
	data: GameTicket;
	isOpen: boolean;
	onOpen: (id: string) => void;
	onClose: () => void;
};

export const TicketListItem = memo((props: Props) => {
	const { data, isOpen, onOpen, onClose } = props;

	const isEditable = useIsTicketEditable();

	const { isDeleting, deleteTicket } = useTicketDelete({ ticket: data });

	if (isDeleting) return null;

	if (!isOpen) {
		return (
			<TicketItemTile
				onOpen={onOpen}
				deleteTicket={deleteTicket}
				data={data}
				isEditable={isEditable}
			/>
		);
	}

	return (
		<TicketItemFullView
			data={data}
			deleteTicket={deleteTicket}
			onClose={onClose}
			isEditable={isEditable}
		/>
	);
});
