import { parseAsStringLiteral, useQueryState } from "nuqs";
import { useMemo } from "react";
import { FormData } from "./use-form-data";

type Step = "gameName" | "votingSystem" | "personalInfo" | "advancedSettings";
type StepData = {
	number: number;
	nextStep: Step | null;
	prevStep: Step | null;
};
const STEPS_DATA: Record<Step, StepData> = {
	gameName: {
		number: 1,
		nextStep: "votingSystem",
		prevStep: null,
	},
	votingSystem: {
		number: 2,
		nextStep: "personalInfo",
		prevStep: "gameName",
	},
	personalInfo: {
		number: 3,
		nextStep: "advancedSettings",
		prevStep: "votingSystem",
	},
	advancedSettings: {
		number: 3,
		prevStep: "personalInfo",
		nextStep: null,
	},
};

type UseFormnavigationProps = {
	errors: Partial<Record<keyof FormData, string[] | undefined>> | undefined;
};
export function useFormNavigation(props: UseFormnavigationProps) {
	const { errors } = props;

	const [formStep, setFormStep] = useQueryState(
		"step",
		parseAsStringLiteral([
			"gameName",
			"votingSystem",
			"personalInfo",
			"advancedSettings",
		])
			.withDefault("gameName")
			.withOptions({ history: "push" }),
	);

	const stepData = STEPS_DATA[formStep];

	const isStepValid = useMemo(() => {
		if (!errors) return true;

		const { name, votingSystemId, creatorName } = errors;

		switch (formStep) {
			case "gameName":
				return name === undefined;
			case "votingSystem":
				return votingSystemId === undefined;
			case "personalInfo":
				return creatorName === undefined;
			default:
				return true;
		}
	}, [errors, formStep]);

	const hasGoBack = stepData.prevStep !== null;
	const hasContinue =
		stepData.nextStep !== null && formStep !== "personalInfo";
	const hasOpenAdvancedSettings = formStep === "personalInfo";
	const hasStartGame =
		formStep === "personalInfo" || formStep === "advancedSettings";

	const goNextStep = () => {
		const nextStep = stepData.nextStep;
		if (nextStep) {
			setFormStep(nextStep);
		}
	};

	const goPrevStep = () => {
		const prevStep = stepData.prevStep;
		if (prevStep) {
			setFormStep(prevStep);
		}
	};

	return {
		state: {
			formStep,
			stepData,
			isStepValid,
			hasGoBack,
			hasContinue,
			hasOpenAdvancedSettings,
			hasStartGame,
		},
		actions: {
			goNextStep,
			goPrevStep,
		},
	};
}
