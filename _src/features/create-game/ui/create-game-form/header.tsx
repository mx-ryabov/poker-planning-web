import { Logo } from "@/_src/shared/ui/components/logo";
import { useCreateGameFormNavigation } from "../../model";
import { twMerge } from "tailwind-merge";

interface Props {
	className?: string;
}

const CreateGameHeader = (props: Props) => {
	const formState = useCreateGameFormNavigation();

	return (
		<header
			className={twMerge(
				"flex flex-row w-full px-9 py-5 justify-between",
				props.className,
			)}
		>
			<Logo />
			<div>Step: {formState.stepData.number}</div>
		</header>
	);
};

export default CreateGameHeader;
