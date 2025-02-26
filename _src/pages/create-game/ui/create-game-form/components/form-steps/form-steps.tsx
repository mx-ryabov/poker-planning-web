import { CreateGameFormSteps } from "../../../../model/create-game-form-navigation";
import { cva } from "class-variance-authority";
import { NameStep } from "./name-step";
import { VotingSystemStep } from "./voting-system-step";
import { CreatorNameStep } from "./creator-name-step";
import { AdvancedSettingsStep } from "./advanced-settings-step";
import { Suspense } from "react";

const STEPS = {
	[CreateGameFormSteps.Name]: NameStep,
	[CreateGameFormSteps.VotingSystem]: VotingSystemStep,
	[CreateGameFormSteps.CreatorName]: CreatorNameStep,
	[CreateGameFormSteps.AdvancedSettings]: AdvancedSettingsStep,
};

type Props = {
	currentStep: CreateGameFormSteps;
	onStepValidate: (_isValid: boolean) => void;
	onNextStep: (_currentStep: CreateGameFormSteps) => void;
};

export const FormSteps = ({
	currentStep,
	onStepValidate,
	onNextStep,
}: Props) => {
	return (
		<div className="w-full h-full flex flex-row px-10" role="group">
			{Object.entries(STEPS).map(([stepName, StepElement], ind) => {
				return (
					<div
						className={stepContainerStyles({
							isActive: currentStep === stepName,
						})}
						aria-hidden={currentStep !== stepName}
						aria-labelledby={`step-${ind}-${stepName}`}
						key={stepName}
					>
						<Suspense fallback={"Loading..."}>
							<StepElement
								isActive={currentStep === stepName}
								onValidate={onStepValidate}
								onNextStep={() => onNextStep(currentStep)}
							/>
						</Suspense>
					</div>
				);
			})}
		</div>
	);
};

const stepContainerStyles = cva([], {
	variants: {
		isActive: {
			true: ["block"],
			false: ["hidden"],
		},
	},
});
