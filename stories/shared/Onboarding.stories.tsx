import { NewButton } from "@/_src/shared/ui/components/button";
import {
	OnboardingProvider,
	OnboardingStep,
	OnboardingStepData,
	useOnboardingActions,
} from "@/_src/shared/ui/components/onboarding";
import type { Meta } from "@storybook/react";

const meta = {
	title: "Shared/Onboarding",
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	argTypes: {},
} satisfies Meta;

export default meta;

export const Onboarding = () => {
	return (
		<OnboardingProvider>
			<Screen />
		</OnboardingProvider>
	);
};

const TEST_ONBOARDING_ID = Symbol("TEST_ONBOARDING");
const TEST_STEPS: OnboardingStepData[] = [
	{ title: "Step 1 Title", description: "Step 1 Description" },
	{ title: "Step 2 Title", description: "Step 2 Description" },
	{ title: "Step 3 Title", description: "Step 3 Description" },
];

function Screen() {
	const { startOnboarding } = useOnboardingActions();
	return (
		<div className="relative w-full h-full min-h-[400px] p-4">
			<NewButton
				onPress={() =>
					startOnboarding({
						id: TEST_ONBOARDING_ID,
						steps: TEST_STEPS,
					})
				}
			>
				Start Onboarding
			</NewButton>
			<OnboardingStep id={TEST_ONBOARDING_ID} stepNumber={0}>
				<div className="absolute w-[100px] h-[100px] bg-neutral-200 flex items-center justify-center left-6 top-1/2">
					Step 1
				</div>
			</OnboardingStep>
			<OnboardingStep id={TEST_ONBOARDING_ID} stepNumber={1}>
				<div className="absolute w-[200px] h-[50px] bg-primary-200 flex items-center justify-center right-4 top-4">
					Step 2
				</div>
			</OnboardingStep>
			<OnboardingStep id={TEST_ONBOARDING_ID} stepNumber={2}>
				<div className="absolute w-[400px] h-[200px] bg-info-200 flex items-center justify-center bottom-6 left-1/2">
					Step 3
				</div>
			</OnboardingStep>
		</div>
	);
}
