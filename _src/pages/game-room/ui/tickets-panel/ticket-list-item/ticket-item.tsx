import { GameTicket } from "@/_src/shared/api/game-api";
import { memo } from "react";
import { TicketItemTile } from "./components/ticket-item-tile";
import { TicketItemFullView } from "./components/ticket-item-full-view";

type Props = {
	data: GameTicket;
	isOpen: boolean;
	onOpen: (id: string) => void;
	onClose: () => void;
};

export const TicketListItem = memo((props: Props) => {
	const { data, isOpen, onOpen, onClose } = props;

	if (!isOpen) {
		return <TicketItemTile onOpen={onOpen} data={data} />;
	}

	return <TicketItemFullView data={data} onClose={onClose} />;
});
