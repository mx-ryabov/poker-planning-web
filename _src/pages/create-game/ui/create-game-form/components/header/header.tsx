import Image from "next/image";
import LogoSvg from "@public/logo.svg";
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
				"flex w-full flex-row items-center justify-between px-9 py-5",
				props.className,
			)}
			role="header"
		>
			<NextLink href="/">
				<Image
					src={LogoSvg}
					alt="Logo"
					height={24}
					width={175}
					priority
				/>
			</NextLink>
			<Stepper
				stepsLength={formState.stepsLength}
				currentStep={formState.stepData.number}
			/>
		</header>
	);
};
