import { useRef } from "react";
import { cva } from "class-variance-authority";
import { usePermissions } from "../../model/game-role-management/use-permissions";
import { TicketCreator, TicketList, TicketListItem } from "./components";
import { useScrollToListBottom } from "./behavior";
import { useTicketItemOpenerState } from "./state";

export function TicketsPanel() {
	const isCreationAllowed = usePermissions("CreateTicket");

	const listRef = useRef<HTMLDivElement | null>(null);
	const scrollToListBottom = useScrollToListBottom(listRef);

	const { checkIfOpened, onClose, onOpen } = useTicketItemOpenerState();

	return (
		<div className="relative flex h-full flex-col">
			<TicketList ref={listRef}>
				{(ticketItemData) => (
					<TicketListItem
						key={ticketItemData.id}
						data={ticketItemData}
						isOpen={checkIfOpened(ticketItemData.id)}
						onClose={onClose}
						onOpen={onOpen}
					/>
				)}
			</TicketList>
			{isCreationAllowed && (
				<TicketCreator
					className={ticketCreatorStyles}
					onSubmitSucceed={scrollToListBottom}
				/>
			)}
		</div>
	);
}

const ticketCreatorStyles = cva("bottom-0 right-0 max-w-full", {
	variants: {
		state: {
			button: "fixed",
			form: "sticky",
		},
	},
});
