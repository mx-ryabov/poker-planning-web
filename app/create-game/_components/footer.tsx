import { useCallback } from "react";
import {
	useCreateGameFormNavigation,
	useCreateGameFormNavigationDispatch,
} from "../_providers/create-game-form-navigation/hooks";
import { CreateGameFormActions as Actions } from "../_providers/create-game-form-navigation/actions";

interface Props {
	className?: string;
}

export default function CreateGameFooter(props: Props) {
	const formNavigation = useCreateGameFormNavigation();
	const formDispatch = useCreateGameFormNavigationDispatch();

	const nextStep = useCallback(() => {
		const nextStep = formNavigation.stepData.nextStep;
		if (nextStep) {
			formDispatch({ type: Actions.Type.NextStep });
		}
	}, [formDispatch, formNavigation]);

	const prevStep = useCallback(() => {
		formDispatch({ type: Actions.Type.PrevStep });
	}, [formDispatch]);

	return (
		<footer
			className={`${props.className} h-[100px] w-full flex justify-end px-[40px]`}
		>
			{formNavigation.stepData.number > 1 && (
				<button
					className="px-[20px] border-2 rounded border-black h-[60px]"
					type="button"
					onClick={prevStep}
				>
					Back
				</button>
			)}
			{(formNavigation.stepData.showContinueBtn ||
				formNavigation.stepData.showAdvancedSettingsBtn) && (
				<button
					className="px-[20px] border-2 rounded border-black h-[60px] ml-[12px]"
					type="button"
					onClick={nextStep}
				>
					{formNavigation.stepData.showContinueBtn
						? "Continue"
						: "Advanced Settings"}
				</button>
			)}
			{formNavigation.stepData.showStartGameBtn && (
				<button
					className="px-[20px] border-2 rounded border-black h-[60px] ml-[12px]"
					type="submit"
				>
					Start Game
				</button>
			)}
		</footer>
	);
}
