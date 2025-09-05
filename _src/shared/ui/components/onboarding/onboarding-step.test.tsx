import { test, describe, expect } from "vitest";
import { render, within } from "@/test/utilities";
import { axe } from "jest-axe";
import { OnboardingStep, OnboardingStepData } from "./onboarding-step";
import { OnboardingProvider } from "./onboarding-provider";
import { useOnboardingActions } from "./use-onboarding-actions";

describe("Onboarding Step", () => {
	test("renders correctly when onboarding is inactive", async () => {
		const { unmount, user, getByText, queryByText } = renderComponent();

		getByText("Start Onboarding");
		getByText(/Testing Step Component/i);
		expect(queryByText(/description/i)).not.toBeInTheDocument();

		expect(() => unmount()).not.toThrow();
	});

	test("is displayed correctly when the step is active", async () => {
		const { user, getByText } = renderComponent();
		const startButton = getByText("Start Onboarding");
		await user.click(startButton);
		getByText(/description/i);
		getByText(/title/i);
	});

	test("isn't displayed if another step is active", async () => {
		const { user, getByText, queryByText } = renderComponent(
			{ description: "testing Description", title: "testing Title" },
			{ renderAs: "middle" },
		);
		const startButton = getByText("Start Onboarding");
		await user.click(startButton);
		expect(queryByText(/testing description/i)).not.toBeInTheDocument();
		expect(queryByText(/testing title/i)).not.toBeInTheDocument();
		getByText(/Another description/i);
		getByText(/Another title/i);
	});

	test("has Next button AND doesn't have Done button if the step isn't the last in the onboarding", async () => {
		const { user, getByText, queryByText } = renderComponent(
			{ description: "testing Description", title: "testing Title" },
			{ renderAs: "first" },
		);
		const startButton = getByText("Start Onboarding");
		await user.click(startButton);
		getByText(/Next/i);
		expect(queryByText(/Done/i)).not.toBeInTheDocument();
	});

	test("has Done button AND doesn't have Next button if the step is the latest in the onboarding", async () => {
		const { user, getByText, queryByText } = renderComponent(
			{ description: "testing Description", title: "testing Title" },
			{ renderAs: "last", otherSteps: [Symbol("custom_step_1")] },
		);
		const startButton = getByText("Start Onboarding");
		await user.click(startButton);
		const nextBtn = getByText(/Next/i);
		await user.click(nextBtn);
		getByText(/testing description/i);
		getByText(/testing title/i);
		getByText(/Done/i);
		expect(queryByText(/Next/i)).not.toBeInTheDocument();
	});

	test("displays the wrapped component on top of the overlay", async () => {
		const { user, getByText, queryAllByText, getByTestId } =
			renderComponent();
		const startButton = getByText("Start Onboarding");
		const initialWrappedComponentCount = queryAllByText(
			/Testing Step Component/i,
		).length;
		await user.click(startButton);
		const wrappedComponentCount = queryAllByText(
			/Testing Step Component/i,
		).length;
		expect(initialWrappedComponentCount).toBe(1);
		expect(wrappedComponentCount).toBe(2);
		const overlay = getByTestId("onboarding-step-modal-overlay");
		expect(overlay).toBeInTheDocument();
		expect(
			within(overlay).getByText(/Testing Step Component/i),
		).toBeInTheDocument();
	});

	test("displays the cloned wrapped component on the same position on the screen as the original one", async () => {
		const { user, getByText, getByTestId } = renderComponent();
		const originalComponent = getByText(/Testing Step Component/i);
		const startButton = getByText("Start Onboarding");
		await user.click(startButton);
		const overlay = getByTestId("onboarding-step-modal-overlay");
		const clonedComponent = within(overlay).getByText(
			/Testing Step Component/i,
		);
		const originalRect = originalComponent.getBoundingClientRect();
		const clonedRect = clonedComponent.getBoundingClientRect();
		expect(clonedRect.top).toBeCloseTo(originalRect.top, 1);
		expect(clonedRect.left).toBeCloseTo(originalRect.left, 1);
	});

	test("disappears when the Next button is clicked", async () => {
		const { user, getByText, queryByText } = renderComponent({
			title: "testing Title",
			description: "testing description",
		});
		const startButton = getByText("Start Onboarding");
		await user.click(startButton);
		const nextButton = getByText(/Next/i);
		await user.click(nextButton);
		expect(queryByText(/testing description/i)).not.toBeInTheDocument();
		expect(queryByText(/testing title/i)).not.toBeInTheDocument();
	});

	test("disappears when the Done button is clicked", async () => {
		const { user, getByText, queryByText } = renderComponent(
			{ title: "testing Title", description: "testing description" },
			{ renderAs: "last", otherSteps: [Symbol("custom_step_1")] },
		);
		const startButton = getByText("Start Onboarding");
		await user.click(startButton);
		const nextButton = getByText(/Next/i);
		await user.click(nextButton);
		const doneButton = getByText(/Done/i);
		await user.click(doneButton);
		expect(queryByText(/testing description/i)).not.toBeInTheDocument();
		expect(queryByText(/testing title/i)).not.toBeInTheDocument();
	});

	test("disappears when the Dismiss button is clicked", async () => {
		const { user, getByText, queryByText } = renderComponent({
			title: "testing Title",
			description: "testing description",
		});
		const startButton = getByText("Start Onboarding");
		await user.click(startButton);
		const dismissButton = getByText(/Dismiss/i);
		await user.click(dismissButton);
		expect(queryByText(/testing description/i)).not.toBeInTheDocument();
		expect(queryByText(/testing title/i)).not.toBeInTheDocument();
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container, user, getByText } = renderComponent();
		const startButton = getByText("Start Onboarding");
		await user.click(startButton);
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});

type RenderOptions = {
	otherSteps?: symbol[];
	renderAs?: "first" | "last" | "middle";
};
const MODEL_ID = Symbol("MODEL_ID");
const STEP_ID = Symbol("STEP_ID");
function renderComponent(
	data: OnboardingStepData = { description: "Description", title: "Title" },
	options: RenderOptions = {},
) {
	const {
		otherSteps = [Symbol("custom_step_1"), Symbol("custom_step_2")],
		renderAs = "first",
	} = options;
	let steps: symbol[] = [...otherSteps];
	if (renderAs === "first") {
		steps.unshift(STEP_ID);
	}
	if (renderAs === "last") {
		steps.push(STEP_ID);
	}
	if (renderAs === "middle" && otherSteps.length >= 2) {
		const middleIndex = Math.floor(otherSteps.length / 2);
		steps = [
			...otherSteps.slice(0, middleIndex),
			STEP_ID,
			...otherSteps.slice(middleIndex),
		];
	}

	return render(
		<div>
			<StartOnboardingButton steps={steps} />
			<OnboardingStep modelId={MODEL_ID} stepId={STEP_ID} data={data}>
				<div>Testing Step Component</div>
			</OnboardingStep>
			{otherSteps.map((stepId) => (
				<OnboardingStep
					key={String(stepId)}
					modelId={MODEL_ID}
					stepId={stepId}
					data={{
						description: "Another description",
						title: "Another title",
					}}
				>
					<div>Another Step Component {String(stepId)}</div>
				</OnboardingStep>
			))}
		</div>,
		{ wrapper: OnboardingProvider },
	);
}

function StartOnboardingButton({ steps }: { steps: symbol[] }) {
	const { startOnboarding } = useOnboardingActions();
	return (
		<button
			onClick={() =>
				startOnboarding({
					id: MODEL_ID,
					steps: steps,
				})
			}
		>
			Start Onboarding
		</button>
	);
}
