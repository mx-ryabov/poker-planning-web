import { useCallback } from "react";
import {
	useCreateGameFormNavigation,
	useCreateGameFormNavigationDispatch,
	CreateGameFormActions as Actions,
} from "../../../model";
import { Button } from "@/_src/shared/ui/components/button";
import {
	ArrowLeftIcon,
	ArrowRightIcon,
	ProfileIcon,
	SettingsIcon,
} from "@/_src/shared/ui/components/icon";
import { twMerge } from "tailwind-merge";
import { Color } from "@/_src/shared/ui";
import { NextLink } from "@/_src/shared/ui/next-components/next-link";

interface Props {
	className?: string;
}

export function CreateGameFooter(props: Props) {
	const formNavigation = useCreateGameFormNavigation();
	const formDispatch = useCreateGameFormNavigationDispatch();

	const nextStep = useCallback(() => {
		formDispatch({ type: Actions.Type.NextStep });
	}, [formDispatch]);

	const prevStep = useCallback(() => {
		formDispatch({ type: Actions.Type.PrevStep });
	}, [formDispatch]);

	return (
		<footer
			className={twMerge(
				"w-full flex justify-between px-10 pb-10 items-center",
				props.className,
			)}
		>
			<section>
				<p className="flex flex-row text-neutral-300 item-center text-sm">
					<ProfileIcon color={Color.Neutral300} className="mr-2" />
					<NextLink
						href="/sign-in"
						className="text-neutral-900 mr-1 leading-relaxed"
					>
						Login
					</NextLink>
					<span>or</span>
					<NextLink
						href="/sign-up"
						className="text-neutral-900 mx-1 leading-relaxed"
					>
						Sign Up
					</NextLink>
					<span>to see more app features</span>
				</p>
			</section>
			<section className="flex flex-row gap-4">
				{formNavigation.stepData.number > 1 && (
					<Button
						variant="ghost"
						iconLeft={ArrowLeftIcon}
						title="Back"
						type="button"
						onPress={prevStep}
					/>
				)}
				{formNavigation.stepData.showContinueBtn && (
					<Button
						title="Continue"
						iconRight={ArrowRightIcon}
						isDisabled={!formNavigation.stepData.isNextStepEnabled}
						onPress={nextStep}
						type="button"
					/>
				)}
				{formNavigation.stepData.showAdvancedSettingsBtn && (
					<Button
						title="Advanced Settings"
						variant="outline"
						iconRight={SettingsIcon}
						onPress={nextStep}
						isDisabled={!formNavigation.stepData.isNextStepEnabled}
						type="button"
					/>
				)}
				{formNavigation.stepData.showStartGameBtn && (
					<Button
						type="submit"
						title="Start Game"
						isDisabled={!formNavigation.isStartGameEnabled}
					/>
				)}
			</section>
		</footer>
	);
}
