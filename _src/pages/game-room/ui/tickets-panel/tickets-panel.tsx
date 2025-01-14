import { createTicket, ParticipantRole } from "@/_src/shared/api";
import {
	selectCurrentGameId,
	selectCurrentRole,
	useGameState,
} from "../../model";
import { TicketCreator, TicketCreatorSubmitActionData } from "./ticket-creator";
import { useCallback, useRef } from "react";
import { TicketList } from "./ticket-list";
import { TicketListItem } from "./ticket-list-item";
import { TicketCreatorRenderFn } from "./ticket-creator/ticket-creator";

export function TicketsPanel() {
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
				const resData = await createTicket(gameId, data);
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
		[gameId, addTicketIfAbsent, scrollToListBottom],
	);

	const ticketCreatorClassNameRenderer: TicketCreatorRenderFn = useCallback(
		({ state }) =>
			`${state === "button" ? "fixed" : "sticky"} bottom-0 right-0 w-full`,
		[],
	);

	return (
		<div className="relative flex flex-col h-full">
			<TicketList ref={listRef}>
				{(ticketItemData) => (
					<TicketListItem
						key={ticketItemData.id}
						data={ticketItemData}
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
