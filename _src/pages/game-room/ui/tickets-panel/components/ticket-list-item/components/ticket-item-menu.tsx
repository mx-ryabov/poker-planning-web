import { ButtonSquare } from "@/_src/shared/ui/components/button";
import { MoreIcon } from "@/_src/shared/ui/components/icon/svg/more.icon";
import { Menu } from "@/_src/shared/ui/components/menu";
import { twMerge } from "tailwind-merge";
import { useTicketItemOptions } from "../state/use-ticket-item-options";

type Props = {
	className?: string;
	ticketId: string;
	deleteTicket: () => void;
};

export function TicketItemMenu(props: Props) {
	const { className, ticketId, deleteTicket } = props;

	const options = useTicketItemOptions({ deleteTicket, ticketId });

	if (options.length === 0) return null;

	return (
		<Menu>
			<ButtonSquare
				icon={MoreIcon}
				variant="ghost"
				className={twMerge("shrink-0", className)}
				size="small"
				data-testid="ticket-item-menu"
			/>
			<Menu.Content placement="bottom end">
				{options.map((option) => (
					<Menu.Item
						onAction={option.action}
						key={option.title}
						isDisabled={option.disabled}
					>
						{option.icon}
						{option.title}
					</Menu.Item>
				))}
			</Menu.Content>
		</Menu>
	);
}
