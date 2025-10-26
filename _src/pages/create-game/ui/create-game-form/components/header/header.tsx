import Image from "next/image";
import LogoSvg from "@public/logo.svg";
import { NextLink } from "@/_src/shared/ui/next-components/next-link";
import { Stepper } from "./stepper";

interface Props {
	currentStepNumber: number;
}

export function FormHeader({ currentStepNumber }: Props) {
	return (
		<div
			className="fixed top-0 flex w-full flex-row items-center justify-between px-9 py-5"
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
			<Stepper stepsLength={3} currentStep={currentStepNumber} />
		</div>
	);
}
