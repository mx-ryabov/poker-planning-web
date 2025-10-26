import { cloneElement, ReactElement, useEffect, useRef } from "react";
import throttle from "lodash.throttle";
import { Dialog, Heading, ModalOverlay, Popover } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { NewButton } from "../button";
import { OnboardingState, useOnboardingState } from "./use-onboarding-state";
import { useOnboardingActions } from "./use-onboarding-actions";
import { Placement } from "react-aria";

export type OnboardingStepOptions = {
	highlighterClassName?: string;
	popupPlacement?: Placement;
	shouldTrackBorderRadius?: boolean;
};
export type OnboardingStepData = {
	title?: string;
	description: string;
	onNext?: () => void;
	onDismiss?: () => void;
};

export type OnboardingStepProps = {
	children: ReactElement;
	modelId: symbol;
	stepId: symbol;
	options?: OnboardingStepOptions;
	data: OnboardingStepData;
};

export function OnboardingStep({
	children,
	modelId,
	stepId,
	...props
}: OnboardingStepProps) {
	const state = useOnboardingState();

	const isActive =
		state?.activeOnboardingId === modelId &&
		state?.currentStepId === stepId;

	if (state === null || !isActive) return children;

	return (
		<OnboardingStepInner {...props} state={state}>
			{children}
		</OnboardingStepInner>
	);
}

type OnboardingStepInnerProps = {
	state: OnboardingState;
} & Omit<OnboardingStepProps, "modelId" | "stepId">;

function OnboardingStepInner({
	children,
	data,
	state,
	options,
}: OnboardingStepInnerProps) {
	const {
		highlighterClassName,
		popupPlacement = "bottom start",
		shouldTrackBorderRadius = true,
	} = options || {};
	const { nextStep, finishOnboarding } = useOnboardingActions();

	const isLastStep =
		(state?.currentStepInd || 0) + 1 === state.totalStepsCount;

	const containerRef = useRef<HTMLDivElement | null>(null);
	const highlighterRef = useRef<HTMLDivElement | null>(null);
	const showCaseRef = useRef<Element | null>(null);

	useEffect(() => {
		const container = containerRef.current;
		const highlighter = highlighterRef.current;
		if (!container || !highlighter) return;

		const showCaseEl = container.previousElementSibling;
		if (!showCaseEl) {
			console.error("Provided children should be a single HTMLElement");
			return;
		}

		showCaseRef.current = showCaseEl;
		if (shouldTrackBorderRadius) {
			const showCaseBorderRadius =
				getComputedStyle(showCaseEl).borderRadius;
			highlighter.style.borderRadius = showCaseBorderRadius;
		}

		const showCaseRect = showCaseEl.getBoundingClientRect();
		updateHighlighterPosition(showCaseRect, highlighter);

		const onResize = throttle(() => {
			updateHighlighterPosition(
				showCaseEl.getBoundingClientRect(),
				highlighter,
			);
		}, 20);

		const observer = new ResizeObserver(() => {
			updateHighlighterPosition(
				showCaseEl.getBoundingClientRect(),
				highlighter,
			);
		});
		observer.observe(showCaseEl);

		window.addEventListener("resize", onResize);

		return () => {
			observer.disconnect();
			window.removeEventListener("resize", onResize);
		};
	}, [containerRef, showCaseRef, highlighterRef, shouldTrackBorderRadius]);

	const onOpenChange = (isOpen: boolean) => {
		if (!isOpen) finishOnboarding();
	};

	const onNextPressed = () => {
		nextStep();
		if (data.onNext) data.onNext();
	};

	const onDismissPressed = () => {
		finishOnboarding();
		if (data.onDismiss) data.onDismiss();
	};

	return (
		<>
			{children}
			<div className="hidden" ref={containerRef}></div>
			<ModalOverlay
				isOpen={true}
				onOpenChange={onOpenChange}
				className="fixed inset-0 bg-neutral-900/30 z-50"
				data-testid="onboarding-step-modal-overlay"
			>
				<div
					className={twMerge(
						"outline-3 outline-primary-500 fixed top-0 left-0 *:pointer-events-none *:drop-shadow-none *:shadow-none",
						highlighterClassName,
					)}
					ref={highlighterRef}
				>
					{cloneElement(children)}
				</div>
				<Popover
					placement={popupPlacement}
					className="data-entering:animate-popup data-exiting:animate-popup-reverse"
					triggerRef={showCaseRef}
				>
					<Dialog className="drop-shadow-sm rounded-sm px-4 py-3 bg-primary-500">
						<div className="flex flex-col">
							<Heading
								slot="title"
								className="text-xl font-semibold mb-1 text-white"
							>
								{data.title}
							</Heading>
							<p className="mb-3 text-sm text-white whitespace-pre-line leading-6">
								{data.description}
							</p>
							<div className="flex flex-row justify-between items-center">
								<span className="text-sm text-white">
									{state.currentStepInd + 1}/
									{state.totalStepsCount}
								</span>
								<div className="flex flex-row gap-2">
									{!isLastStep && (
										<NewButton
											onPress={onDismissPressed}
											variant="ghost"
											size="small"
											className="text-white"
										>
											Dismiss
										</NewButton>
									)}
									<NewButton
										onPress={onNextPressed}
										size="small"
									>
										{isLastStep ? "Done" : "Next"}
									</NewButton>
								</div>
							</div>
						</div>
					</Dialog>
				</Popover>
			</ModalOverlay>
		</>
	);
}

function updateHighlighterPosition(
	showCaseRect: DOMRect,
	highlighter: HTMLElement,
) {
	const clonedShowCaseEl = highlighter.firstElementChild as HTMLElement;

	if (clonedShowCaseEl) {
		clonedShowCaseEl.style.width = `${showCaseRect.width}px`;
		clonedShowCaseEl.style.height = `${showCaseRect.height}px`;
	}
	highlighter.style.transform = `translate(${showCaseRect.left}px, ${showCaseRect.top}px)`;
}
