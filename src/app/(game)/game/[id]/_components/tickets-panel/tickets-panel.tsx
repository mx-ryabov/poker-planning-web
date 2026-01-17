import { useRef } from "react";
import { cva } from "class-variance-authority";
import { useGamePermissions } from "@/src/app/(game)/game/[id]/_permissions";
import { GameActions } from "@/src/domain/entities/game";
import { TicketCreator, TicketList, TicketListItem } from "./components";
import { useScrollToListBottom } from "./behavior";
import { useTicketItemOpenerState } from "./state";
import { GameDrawerPanel } from "../game-management-drawer";
import {
	GameManagementTab,
	selectTicketsCount,
	useGameState,
} from "../../_store";
import { ListIcon, SortIcon } from "@/src/shared/ui/components/icon";
import { Button } from "@/src/shared/ui/components/button";
import { TicketsFilter } from "./components/tickets-filter/tickets-filter";
import { GameIntroOnboardingForParticipant } from "../onboardings";

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

function TicketsPanelSubTitle() {
	const ticketsCount = useGameState(selectTicketsCount);
	return `${ticketsCount} in the list`;
}

function TicketsPanelRightSlot() {
	return (
		<div className="flex flex-row gap-2">
			<Button
				variant="outline"
				shape="square"
				size="small"
				className="border-neutral-300"
			>
				<SortIcon size={16} thikness="regular" />
			</Button>
			<TicketsFilter />
		</div>
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
	},
	wrapper: ({ children }) => (
		<GameIntroOnboardingForParticipant.Steps.TicketsPanelStep>
			{children}
		</GameIntroOnboardingForParticipant.Steps.TicketsPanelStep>
	),
};

const ticketCreatorStyles = cva("bottom-0 right-0 max-w-full", {
	variants: {
		state: {
			button: "sticky",
			form: "sticky",
		},
	},
});
