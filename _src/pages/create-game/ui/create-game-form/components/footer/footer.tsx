import { useCallback } from "react";
import {
	useCreateGameFormNavigation,
	useCreateGameFormNavigationDispatch,
	CreateGameFormActions as Actions,
} from "../../../../model";
import { Button } from "@/_src/shared/ui/components/button";
import {
	ArrowLeftIcon,
	ArrowRightIcon,
	ProfileIcon,
	SettingsIcon,
} from "@/_src/shared/ui/components/icon";
import { twMerge } from "tailwind-merge";
import { Color } from "@/_src/shared/ui/colors";
import { NextLink } from "@/_src/shared/ui/next-components/next-link";

interface Props {
	className?: string;
	isPending: boolean;
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
			role="footer"
		>
			<section data-testid="auth-section">
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
						contentLeft={ArrowLeftIcon({ size: 18 })}
						aria-label="Back button"
						title="Back"
						type="button"
						onPress={prevStep}
						data-testid="back-btn"
					/>
				)}
				{formNavigation.stepData.showContinueBtn && (
					<Button
						title="Continue"
						aria-label="Continue button"
						contentRight={ArrowRightIcon({ size: 18 })}
						isDisabled={!formNavigation.stepData.isNextStepEnabled}
						onPress={nextStep}
						type="button"
						data-testid="continue-btn"
					/>
				)}
				{formNavigation.stepData.showAdvancedSettingsBtn && (
					<Button
						title="Advanced Settings"
						variant="outline"
						aria-label="Advanced Settings button"
						contentRight={SettingsIcon({ size: 18 })}
						onPress={nextStep}
						isDisabled={!formNavigation.stepData.isNextStepEnabled}
						type="button"
						data-testid="advanced-settings-btn"
					/>
				)}
				{formNavigation.stepData.showStartGameBtn && (
					<Button
						type="submit"
						aria-label="Start Game button"
						title="Start Game"
						isDisabled={!formNavigation.isStartGameEnabled}
						isPending={props.isPending}
						data-testid="start-game-btn"
					/>
				)}
			</section>
		</footer>
	);
}
