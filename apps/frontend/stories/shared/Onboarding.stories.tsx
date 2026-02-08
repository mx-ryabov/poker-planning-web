import { Button } from "@/src/shared/ui/components/button";
import {
	OnboardingProvider,
	OnboardingStep,
	OnboardingStepData,
	useOnboardingActions,
} from "@/src/shared/ui/components/onboarding";
import type { Meta } from "@storybook/nextjs";

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

const MODEL_ID = Symbol("MODEL_ID");
const FIRST_STEP_ID = Symbol("FIRST_STEP_ID");
const SECOND_STEP_ID = Symbol("SECOND_STEP_ID");
const THIRD_STEP_ID = Symbol("THIRD_STEP_ID");

function Screen() {
	const { startOnboarding } = useOnboardingActions();
	return (
		<div className="relative w-full h-full min-h-[400px] p-4">
			<Button
				onPress={() =>
					startOnboarding({
						id: MODEL_ID,
						steps: [FIRST_STEP_ID, SECOND_STEP_ID, THIRD_STEP_ID],
					})
				}
			>
				Start Onboarding
			</Button>
			<OnboardingStep
				modelId={MODEL_ID}
				stepId={FIRST_STEP_ID}
				data={
					{
						title: "Welcome to the Onboarding",
						description:
							"This is a demo of the onboarding component. Click Next to continue.",
					} satisfies OnboardingStepData
				}
			>
				<div className="w-[100px] h-[100px] bg-neutral-200 flex items-center justify-center mt-6">
					Step 1
				</div>
			</OnboardingStep>
			<OnboardingStep
				modelId={MODEL_ID}
				stepId={SECOND_STEP_ID}
				data={
					{
						title: "Top Right Corner",
						description:
							"This is the top right corner of the screen.",
					} satisfies OnboardingStepData
				}
				options={{ popupPlacement: "left" }}
			>
				<div className="absolute w-[200px] h-[50px] bg-primary-200 flex items-center justify-center right-4 top-4">
					Step 2
				</div>
			</OnboardingStep>
			<OnboardingStep
				modelId={MODEL_ID}
				stepId={THIRD_STEP_ID}
				data={
					{
						title: "Bottom Center",
						description: "This is the bottom center of the screen.",
					} satisfies OnboardingStepData
				}
				options={{
					popupPlacement: "top",
					highlighterClassName: "rounded-md",
				}}
			>
				<div className="absolute w-[400px] h-[200px] bg-info-200 flex items-center justify-center bottom-6 left-1/2">
					Step 3
				</div>
			</OnboardingStep>
		</div>
	);
}
