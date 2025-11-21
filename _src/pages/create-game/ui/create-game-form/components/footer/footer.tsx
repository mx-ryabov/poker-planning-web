import { Button } from "@/_src/shared/ui/components/button";
import {
	ArrowLeftIcon,
	ArrowRightIcon,
	ProfileIcon,
	SettingsIcon,
} from "@/_src/shared/ui/components/icon";

interface Props {
	navState: {
		hasGoBack: boolean;
		hasContinue: boolean;
		hasOpenAdvancedSettings: boolean;
		hasStartGame: boolean;
		isStepValid: boolean;
	};
	formState: {
		isFormValid: boolean;
		isPending: boolean;
	};
	actions: {
		goNextStep: () => void;
		goPrevStep: () => void;
	};
}

export function FormFooter(props: Props) {
	const {
		navState: {
			hasGoBack,
			hasContinue,
			hasOpenAdvancedSettings,
			hasStartGame,
			isStepValid,
		},
		formState: { isFormValid, isPending },
		actions: { goNextStep, goPrevStep },
	} = props;

	return (
		<div
			className="fixed bottom-0 flex w-full items-center justify-between px-10 pb-10"
			role="footer"
		>
			<section data-testid="auth-section">
				<p className="item-center flex flex-row text-sm text-neutral-600">
					<ProfileIcon className="mr-2" />
					<span>
						In near future I&apos;ll be able to sign up to see more
						app features
					</span>
				</p>
			</section>
			<section className="flex flex-row gap-4">
				{hasGoBack && (
					<Button
						variant="ghost"
						contentLeft={ArrowLeftIcon({ size: 18 })}
						aria-label="Back button"
						title="Back"
						type="button"
						onPress={goPrevStep}
						data-testid="back-btn"
					/>
				)}
				{hasContinue && (
					<Button
						title="Continue"
						aria-label="Continue button"
						contentRight={ArrowRightIcon({ size: 18 })}
						isDisabled={!isStepValid}
						onPress={goNextStep}
						type="button"
						data-testid="continue-btn"
					/>
				)}
				{hasOpenAdvancedSettings && (
					<Button
						title="Advanced Settings"
						variant="outline"
						aria-label="Advanced Settings button"
						contentRight={SettingsIcon({ size: 18 })}
						onPress={goNextStep}
						isDisabled={!isStepValid}
						type="button"
						data-testid="advanced-settings-btn"
					/>
				)}
				{hasStartGame && (
					<Button
						type="submit"
						aria-label="Start Game button"
						title="Start Game"
						isDisabled={!isFormValid}
						isPending={isPending}
						data-testid="start-game-btn"
					/>
				)}
			</section>
		</div>
	);
}
