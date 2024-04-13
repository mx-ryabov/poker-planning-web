import { useCreateGameFormNavigation } from "../_providers/create-game-form-navigation/hooks";

interface Props {
	className?: string;
}

const CreateGameHeader = (props: Props) => {
	const formState = useCreateGameFormNavigation();

	return (
		<header
			className={`${props.className} h-[100px] w-full flex items-center justify-between px-[40px]`}
		>
			<div>Poker Planning</div>
			<div>Step: {formState.stepData.number}</div>
		</header>
	);
};

export default CreateGameHeader;
