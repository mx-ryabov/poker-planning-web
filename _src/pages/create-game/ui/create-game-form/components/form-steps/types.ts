export type StepProps = {
	isActive: boolean;
	onValidate: (_isValid: boolean) => void;
	onNextStep: () => void;
};
