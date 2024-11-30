import { useEffect, useRef } from "react";

type StepperProps = {
	currentStep: number;
	stepsLength: number;
};

export const Stepper = ({ currentStep, stepsLength }: StepperProps) => {
	const stepperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const stepperEl = stepperRef.current;
		if (!stepperEl) return;

		const activeElement: HTMLDivElement | null = stepperEl.querySelector(
			"[data-step-type='active-element']",
		);
		const placeholderElements = stepperEl.querySelectorAll(
			"[data-step-type='placeholder-element']",
		);

		if (!activeElement || placeholderElements.length === 0) return;

		const firstPlaceholderElRect =
			placeholderElements[0].getBoundingClientRect();
		const transferPositionRect =
			placeholderElements[currentStep - 1]?.getBoundingClientRect();

		activeElement.style.transform = `translate(${transferPositionRect.left - firstPlaceholderElRect.left}px, ${transferPositionRect.top - firstPlaceholderElRect.top}px)`;
	}, [currentStep, stepperRef]);

	return (
		<div className="flex flex-row gap-2 relative" ref={stepperRef}>
			{Array.from(Array(stepsLength)).map((_, ind) => (
				<div
					key={ind}
					data-step-type="placeholder-element"
					data-step-number={ind}
					className="w-3 h-3 bg-primary-100 rounded-full"
				></div>
			))}
			<div
				data-step-type="active-element"
				className="w-3 h-3 bg-primary-500 rounded-full absolute transition-transform"
			></div>
		</div>
	);
};
