import { GameTicket } from "@/_src/shared/api/game-api";
import { memo, useMemo } from "react";
import { TicketItemTile } from "./components/ticket-item-tile";
import { TicketItemFullView } from "./components/ticket-item-full-view";
import {
	checkPermissions,
	selectCurrentRole,
	useGameState,
} from "../../../model";

type Props = {
	data: GameTicket;
	isOpen: boolean;
	onOpen: (id: string) => void;
	onClose: () => void;
};

export const TicketListItem = memo((props: Props) => {
	const { data, isOpen, onOpen, onClose } = props;
	const currentRole = useGameState(selectCurrentRole);

	const isReadOnly = useMemo(
		() => !checkPermissions("EditTicket", currentRole),
		[currentRole],
	);

	if (!isOpen) {
		return (
			<TicketItemTile
				onOpen={onOpen}
				data={data}
				isReadOnly={isReadOnly}
			/>
		);
	}

	return (
		<TicketItemFullView
			data={data}
			isReadOnly={isReadOnly}
			onClose={onClose}
		/>
	);
});
