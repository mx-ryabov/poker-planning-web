import { useMemo } from "react";
import { mergeClassNames } from "@/src/shared/lib/utils/merge-class-names";
import { TicketCreatorForm, TicketCreatorOpener } from "./components";
import { useTicketCreatorOpenerState } from "./state";
import { GameIntroOnboardingForMaster } from "../../../onboardings";

export type TicketCreatorRenderFn = (renderProps: {
	state: "button" | "form";
}) => string;

export type TicketCreatorProps = {
	className?: string | TicketCreatorRenderFn;
	onSubmitSucceed: () => void;
};

export function TicketCreator({
	className,
	onSubmitSucceed,
}: TicketCreatorProps) {
	const { isOpened, toggle } = useTicketCreatorOpenerState();

	const cn = useMemo(
		() =>
			mergeClassNames(
				"flex h-[58px] flex-row items-end justify-end gap-2",
				className,
			)({
				state: isOpened ? "form" : "button",
				defaultClassName: undefined,
			}),
		[className, isOpened],
	);

	return (
		<div className={cn}>
			<GameIntroOnboardingForMaster.Steps.CreateFirstTicketStep>
				<TicketCreatorOpener isOpened={isOpened} onPress={toggle} />
			</GameIntroOnboardingForMaster.Steps.CreateFirstTicketStep>
			{isOpened && (
				<TicketCreatorForm
					className="absolute w-full"
					onSubmitSucceed={onSubmitSucceed}
				/>
			)}
		</div>
	);
}
