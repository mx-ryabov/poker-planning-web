import { Button } from "@/src/shared/ui/components/button";
import {
	ArrowLeftIcon,
	ArrowRightIcon,
	ProfileIcon,
	SettingsIcon,
} from "@/src/shared/ui/components/icon";

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
						aria-label="Back button"
						type="button"
						onPress={goPrevStep}
						data-testid="back-btn"
					>
						<ArrowLeftIcon size={18} />
						Back
					</Button>
				)}
				{hasContinue && (
					<Button
						aria-label="Continue button"
						isDisabled={!isStepValid}
						onPress={goNextStep}
						type="button"
						data-testid="continue-btn"
					>
						Continue
						<ArrowRightIcon size={18} />
					</Button>
				)}
				{hasOpenAdvancedSettings && (
					<Button
						variant="outline"
						aria-label="Advanced Settings button"
						onPress={goNextStep}
						isDisabled={!isStepValid}
						type="button"
						data-testid="advanced-settings-btn"
					>
						Advanced Settings
						<SettingsIcon size={18} />
					</Button>
				)}
				{hasStartGame && (
					<Button
						type="submit"
						aria-label="Start Game button"
						isDisabled={!isFormValid}
						isPending={isPending}
						data-testid="start-game-btn"
					>
						Start Game
					</Button>
				)}
			</section>
		</div>
	);
}
