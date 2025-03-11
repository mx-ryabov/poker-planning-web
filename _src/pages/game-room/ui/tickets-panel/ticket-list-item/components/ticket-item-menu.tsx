import { ButtonSquare } from "@/_src/shared/ui/components/button";
import { CloseIcon } from "@/_src/shared/ui/components/icon";
import { MoreIcon } from "@/_src/shared/ui/components/icon/svg/more.icon";
import { Menu } from "@/_src/shared/ui/components/menu";
import { twMerge } from "tailwind-merge";
import { useTicketItemOptions } from "../state/use-ticket-item-options";

type Props = {
	className?: string;
};

export function TicketItemMenu(props: Props) {
	const { className } = props;

	const options = useTicketItemOptions();

	if (options.length === 0) return null;

	return (
		<Menu>
			<ButtonSquare
				icon={MoreIcon}
				variant="ghost"
				className={twMerge("shrink-0", className)}
				size="small"
			/>
			<Menu.Content placement="bottom end">
				{options.map((option) => (
					<Menu.Item onAction={option.action} key={option.title}>
						{option.icon}
						{option.title}
					</Menu.Item>
				))}
			</Menu.Content>
		</Menu>
	);
}
