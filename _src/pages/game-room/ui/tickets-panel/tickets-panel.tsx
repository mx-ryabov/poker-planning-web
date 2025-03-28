import { ParticipantRole } from "@/_src/shared/api";
import {
	selectCurrentGameId,
	selectCurrentRole,
	useGameState,
} from "../../model";
import { TicketCreator, TicketCreatorSubmitActionData } from "./ticket-creator";
import { useCallback, useRef, useState } from "react";
import { TicketList } from "./ticket-list";
import { TicketListItem } from "./ticket-list-item";
import { TicketCreatorRenderFn } from "./ticket-creator/ticket-creator";
import { useApi } from "@/_src/app";

export function TicketsPanel() {
	const api = useApi();
	const listRef = useRef<HTMLDivElement | null>(null);
	const currentRole = useGameState(selectCurrentRole);
	const gameId = useGameState(selectCurrentGameId);
	const addTicketIfAbsent = useGameState((state) => state.addTicketIfAbsent);

	const scrollToListBottom = useCallback(() => {
		const listEl = listRef.current;
		if (listEl) {
			listEl.scrollTo({
				top: listEl.scrollHeight,
				behavior: "smooth",
			});
		}
	}, [listRef]);

	const onTicketCreatorSubmit = useCallback(
		async (data: TicketCreatorSubmitActionData) => {
			try {
				const resData = await api.game.ticket.createTicket(
					gameId,
					data,
				);
				addTicketIfAbsent(resData);
				scrollToListBottom();
			} catch (e: unknown) {
				let error: string;
				if (e instanceof Error) {
					error = e.message;
				}
				error = String(e);
				return { ok: false, error };
			}

			return { ok: true };
		},
		[gameId, addTicketIfAbsent, scrollToListBottom, api],
	);

	const ticketCreatorClassNameRenderer: TicketCreatorRenderFn = useCallback(
		({ state }) =>
			`${state === "button" ? "fixed" : "sticky"} bottom-0 right-0 max-w-full`,
		[],
	);

	const [openedTicketId, setOpenedTicketId] = useState<string | null>(null);

	return (
		<div className="relative flex h-full flex-col">
			<TicketList ref={listRef}>
				{(ticketItemData) => (
					<TicketListItem
						key={ticketItemData.id}
						data={ticketItemData}
						isOpen={openedTicketId === ticketItemData.id}
						onOpen={setOpenedTicketId}
						onClose={() => setOpenedTicketId(null)}
					/>
				)}
			</TicketList>
			{currentRole === ParticipantRole.Master && (
				<TicketCreator
					className={ticketCreatorClassNameRenderer}
					onSubmit={onTicketCreatorSubmit}
				/>
			)}
		</div>
	);
}
