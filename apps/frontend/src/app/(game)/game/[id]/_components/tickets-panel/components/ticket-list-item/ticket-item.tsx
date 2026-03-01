import { GameTicket } from "@/src/domain/entities/game";
import { memo } from "react";
import { TicketItemTile } from "./components/ticket-item-tile";
import { TicketItemFullView } from "./components/ticket-item-full-view";
import { useTicketDelete } from "@/src/app/(game)/game/[id]/_state";
import { useGamePermissions } from "@/src/app/(game)/game/[id]/_permissions";
import { GameActions } from "@/src/domain/entities/game";

type Props = {
	data: GameTicket;
	isOpen: boolean;
	onOpen: (id: string) => void;
	onClose: () => void;
};

function TicketListItemBase(props: Props) {
	const { data, isOpen, onOpen, onClose } = props;

	const isEditable = useGamePermissions(GameActions.EditTicket);
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
}

export const TicketListItem = memo(TicketListItemBase);
