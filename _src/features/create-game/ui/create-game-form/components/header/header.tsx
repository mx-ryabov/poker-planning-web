import { Logo } from "@/_src/shared/ui/components/logo";
import { useCreateGameFormNavigation } from "../../../../model";
import { twMerge } from "tailwind-merge";
import { NextLink } from "@/_src/shared/ui/next-components/next-link";
import { Stepper } from "./stepper";

interface Props {
	className?: string;
}

export const CreateGameHeader = (props: Props) => {
	const formState = useCreateGameFormNavigation();

	return (
		<header
			className={twMerge(
				"flex flex-row w-full px-9 py-5 justify-between items-center",
				props.className,
			)}
		>
			<NextLink href="/">
				<Logo />
			</NextLink>
			<Stepper
				stepsLength={formState.stepsLength}
				currentStep={formState.stepData.number}
			/>
		</header>
	);
};
