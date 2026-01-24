import { useRef } from "react";
import { cva } from "class-variance-authority";
import { useGamePermissions } from "@/src/app/(game)/game/[id]/_permissions";
import { GameActions } from "@/src/domain/entities/game";
import {
	TicketCreator,
	TicketList,
	TicketListItem,
	TicketsControlBarTogglers,
	TicketsControlBarTogglersProvider,
	TicketsFilterProvider,
	TicketsSelectiveFilters,
	TicketsSorting,
	TicketsTextFilter,
	useFilteredTickets,
	useTicketsControlBarTogglers,
} from "./components";
import { useScrollToListBottom } from "./behavior";
import { useTicketItemOpenerState } from "./state";
import { GameDrawerPanel } from "../game-management-drawer";
import {
	GameManagementTab,
	selectCurrentGameId,
	selectTickets,
	useGameState,
} from "../../_store";
import { ListIcon } from "@/src/shared/ui/components/icon";
import { GameIntroOnboardingForParticipant } from "../onboardings";
import { TicketsSortingProvider } from "./components/tickets-sorting/tickets-sorting.provider";

function TicketsPanelBody() {
	const isCreationAllowed = useGamePermissions(GameActions.CreateTicket);

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
			button: "sticky",
			form: "sticky",
		},
	},
});

function TicketsPanelSubTitle() {
	const tickets = useGameState(selectTickets);
	const filteredTickets = useFilteredTickets(tickets);

	if (filteredTickets.length === tickets.length) {
		return `${tickets.length} in the list`;
	}

	return `${filteredTickets.length} of ${tickets.length} in the list`;
}

function TicketsPanelRightSlot() {
	return (
		<div className="flex flex-row gap-2">
			<TicketsControlBarTogglers />
		</div>
	);
}

function TicketsPanelBottomSlot() {
	const { barTogglersState } = useTicketsControlBarTogglers();

	const isAnyTogglerActive = Object.values(barTogglersState).some(Boolean);

	if (!isAnyTogglerActive) {
		return null;
	}

	return (
		<div className="w-full flex flex-col gap-3 pt-2">
			{barTogglersState.search && <TicketsTextFilter />}
			<div className="flex flex-row gap-2 items-center flex-wrap">
				{barTogglersState.sorting && <TicketsSorting />}
				{barTogglersState.sorting && barTogglersState.filter && (
					<span
						role="separator"
						className="h-4 w-px bg-neutral-300"
					></span>
				)}

				{barTogglersState.filter && (
					<div className="flex-1 min-w-[180px] flex flex-row flex-wrap">
						<TicketsSelectiveFilters />
					</div>
				)}
			</div>
		</div>
	);
}

function TicketsPanelWrapper({ children }: { children: React.ReactNode }) {
	const gameId = useGameState(selectCurrentGameId);
	return (
		<GameIntroOnboardingForParticipant.Steps.TicketsPanelStep>
			<TicketsControlBarTogglersProvider>
				<TicketsFilterProvider persistedKey={gameId}>
					<TicketsSortingProvider persistedKey={gameId}>
						{children}
					</TicketsSortingProvider>
				</TicketsFilterProvider>
			</TicketsControlBarTogglersProvider>
		</GameIntroOnboardingForParticipant.Steps.TicketsPanelStep>
	);
}

export const TicketsPanel: GameDrawerPanel = {
	tab: GameManagementTab.TaskList,
	body: <TicketsPanelBody />,
	header: {
		title: "Tickets",
		subTitle: <TicketsPanelSubTitle />,
		icon: ListIcon,
		rightSlot: <TicketsPanelRightSlot />,
		bottomSlot: <TicketsPanelBottomSlot />,
	},
	wrapper: TicketsPanelWrapper,
};
