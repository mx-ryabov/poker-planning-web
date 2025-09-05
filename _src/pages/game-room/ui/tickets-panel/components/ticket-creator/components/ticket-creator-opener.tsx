import { NewButton } from "@/_src/shared/ui/components/button";
import { Highlighter } from "@/_src/shared/ui/components/highlighter";
import { PlusIcon } from "@/_src/shared/ui/components/icon";
import { cva } from "class-variance-authority";

type Props = {
	isOpened: boolean;
	onPress: () => void;
};

export function TicketCreatorOpener({ isOpened, onPress }: Props) {
	return (
		<Highlighter id="new-ticket-btn">
			<NewButton
				data-state="button"
				data-testid="ticket-creator-toggler"
				variant={isOpened ? "outline" : "default"}
				className={openerStyles({ isOpened })}
				onPress={onPress}
			>
				<PlusIcon size={25} />
				{!isOpened && "New Ticket"}
			</NewButton>
		</Highlighter>
	);
}

const openerStyles = cva("shrink-0 transition-none", {
	variants: {
		isOpened: {
			true: [
				"-translate-y-17 rounded-full rotate-45 border border-neutral-400 h-8 w-8 p-0",
			],
			false: ["shadow-lg shadow-primary-200"],
		},
	},
});
