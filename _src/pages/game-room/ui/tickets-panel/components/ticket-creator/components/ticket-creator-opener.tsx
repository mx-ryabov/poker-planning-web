import { ButtonSquare } from "@/_src/shared/ui/components/button";
import { PlusIcon } from "@/_src/shared/ui/components/icon";
import { cva } from "class-variance-authority";

type Props = {
	isOpened: boolean;
	onPress: () => void;
};

export function TicketCreatorOpener({ isOpened, onPress }: Props) {
	return (
		<ButtonSquare
			icon={PlusIcon}
			data-state="button"
			data-testid="ticket-creator-toggler"
			variant={isOpened ? "outline" : "default"}
			className={openerStyles({ isOpened })}
			onPress={onPress}
		/>
	);
}

const openerStyles = cva("shrink-0 transition-all duration-150 ease-linear", {
	variants: {
		isOpened: {
			true: [
				"-translate-y-17 rounded-full rotate-45 border border-neutral-400 h-8 w-8",
			],
			false: ["shadow-lg shadow-primary-200"],
		},
	},
});
