import { Link } from "@/_src/shared/ui/components/link";
import { useCallback } from "react";
import { GameManagementTab, useGameManagementState } from "../../../model";
import { LinkButtonProps } from "@/_src/shared/ui/components/link/component";

type Props = {
	ticketId: string;
	identifier: string;
	className?: string;
} & Omit<LinkButtonProps, "onPress" | "children">;

export function TicketLink({ ticketId, identifier, ...props }: Props) {
	const setActiveTab = useGameManagementState((state) => state.setActiveTab);
	const setOpenedTicketId = useGameManagementState(
		(state) => state.setOpenedTicketId,
	);

	const onPress = useCallback(() => {
		setActiveTab(GameManagementTab.TaskList);
		setOpenedTicketId(ticketId);
	}, [setActiveTab, setOpenedTicketId, ticketId]);

	return (
		<Link {...props} onPress={onPress}>
			{identifier}
		</Link>
	);
}
