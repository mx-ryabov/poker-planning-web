import { test, describe, expect, vi } from "vitest";
import { render, within } from "@/test/utilities";
import { CreateGameFooter } from "./footer";
import { Dispatch, ReactNode } from "react";
import {
	CreateGameFormActions,
	CreateGameFormContext,
	CreateGameFormDispatchContext,
	CreateGameFormState,
	DefaultCreateGameState,
} from "@/_src/pages/create-game/model";

type ProviderValue = {
	state: CreateGameFormState;
	dispatch: Dispatch<CreateGameFormActions.Actions>;
};
type MockCreateGameFormProviderProps = {
	children: ReactNode;
	value: ProviderValue;
};
const MockCreateGameFormProvider = ({
	children,
	value,
}: MockCreateGameFormProviderProps) => {
	return (
		<CreateGameFormContext.Provider value={value.state}>
			<CreateGameFormDispatchContext.Provider value={value.dispatch}>
				{children}
			</CreateGameFormDispatchContext.Provider>
		</CreateGameFormContext.Provider>
	);
};

type StepOptionsSimplified = {
	number?: number;
	showContinueBtn?: boolean;
	isNextStepEnabled?: boolean;
	showAdvancedSettingsBtn?: boolean;
	showStartGameBtn?: boolean;
	isStartGameEnabled?: boolean;
	action?: (..._args: any[]) => void;
};
function generateProviderState(
	stepOptions: StepOptionsSimplified,
): ProviderValue {
	return {
		state: {
			...DefaultCreateGameState,
			stepData: {
				...DefaultCreateGameState.stepData,
				[DefaultCreateGameState.step]: {
					...DefaultCreateGameState.stepData[
						DefaultCreateGameState.step
					],
					...stepOptions,
				},
			},
		},
		dispatch: stepOptions.action || vi.fn(),
	};
}

const renderFooter = (
	stepOptions: StepOptionsSimplified,
	footerProps: { isPending: boolean } = { isPending: false },
) => {
	return render(
		<MockCreateGameFormProvider value={generateProviderState(stepOptions)}>
			<CreateGameFooter isPending={footerProps.isPending} />
		</MockCreateGameFormProvider>,
	);
};

describe("Create Game Form Footer", () => {
	test("renders", async () => {
		const { getByRole } = renderFooter({});

		const continueBtn = getByRole("button");
		expect(continueBtn).toHaveTextContent("Continue");
	});

	describe("| Continue Button |", () => {
		test("is visible if a step has showContinueBtn=true", async () => {
			const { getByTestId } = renderFooter({
				showContinueBtn: true,
			});

			getByTestId("continue-btn");
		});

		test("is hidden if a step has showContinueBtn=false", async () => {
			const { queryByTestId } = renderFooter({
				showContinueBtn: false,
			});

			expect(queryByTestId("continue-btn")).not.toBeInTheDocument();
		});

		test("is disabled if a step has isNextStepEnabled=false", async () => {
			const { getByTestId } = renderFooter({
				showContinueBtn: true,
				isNextStepEnabled: false,
			});

			expect(getByTestId("continue-btn")).toBeDisabled();
		});

		test("is enabled if a step has isNextStepEnabled=true", async () => {
			const { getByTestId } = renderFooter({
				showContinueBtn: true,
				isNextStepEnabled: true,
			});

			expect(getByTestId("continue-btn")).not.toBeDisabled();
		});

		test("dispatches NextStep on click if enabled", async () => {
			const action = vi.fn();
			const { getByTestId, user, rerender } = renderFooter({
				showContinueBtn: true,
				isNextStepEnabled: false,
				action,
			});
			const continueBtn = getByTestId("continue-btn");
			await user.click(continueBtn);
			expect(action).toHaveBeenCalledTimes(0);

			rerender(
				<MockCreateGameFormProvider
					value={generateProviderState({
						showContinueBtn: true,
						isNextStepEnabled: true,
						action,
					})}
				>
					<CreateGameFooter isPending={false} />
				</MockCreateGameFormProvider>,
			);
			await user.click(continueBtn);
			expect(action).toHaveBeenNthCalledWith(1, {
				type: CreateGameFormActions.Type.NextStep,
			});
		});
	});

	describe("| Back Button |", () => {
		test("is visible if a step number > 1", async () => {
			const { getByTestId, queryByTestId, rerender } = renderFooter({
				number: 1,
			});
			expect(queryByTestId("back-btn")).not.toBeInTheDocument();

			rerender(
				<MockCreateGameFormProvider
					value={generateProviderState({
						number: 2,
					})}
				>
					<CreateGameFooter isPending={false} />
				</MockCreateGameFormProvider>,
			);

			getByTestId("back-btn");
		});

		test("dispatches PrevStep on click if enabled", async () => {
			const action = vi.fn();
			const { getByTestId, user } = renderFooter({
				number: 2,
				action,
			});

			const backBtn = getByTestId("back-btn");
			await user.click(backBtn);
			expect(action).toHaveBeenNthCalledWith(1, {
				type: CreateGameFormActions.Type.PrevStep,
			});
		});
	});

	describe("| Advanced Settings Button |", () => {
		test("is visible when showAdvancedSettingsBtn=true", async () => {
			const { getByTestId, queryByTestId, rerender } = renderFooter({
				showAdvancedSettingsBtn: false,
			});
			expect(
				queryByTestId("advanced-settings-btn"),
			).not.toBeInTheDocument();

			rerender(
				<MockCreateGameFormProvider
					value={generateProviderState({
						showAdvancedSettingsBtn: true,
					})}
				>
					<CreateGameFooter isPending={false} />
				</MockCreateGameFormProvider>,
			);

			getByTestId("advanced-settings-btn");
		});

		test("is disabled when isNextStepEnabled=false", async () => {
			const { getByTestId } = renderFooter({
				showAdvancedSettingsBtn: true,
				isNextStepEnabled: false,
			});
			expect(getByTestId("advanced-settings-btn")).toBeDisabled();
		});

		test("dispatches NextStep on click if enabled", async () => {
			const action = vi.fn();
			const { getByTestId, user } = renderFooter({
				showAdvancedSettingsBtn: true,
				isNextStepEnabled: true,
				action,
			});
			const advancedSettingsBtn = getByTestId("advanced-settings-btn");
			await user.click(advancedSettingsBtn);
			expect(action).toHaveBeenNthCalledWith(1, {
				type: CreateGameFormActions.Type.NextStep,
			});
		});
	});

	describe("| Start Game Button |", () => {
		test("is visible when showStartGameBtn=true", async () => {
			const { getByTestId } = renderFooter({
				showStartGameBtn: true,
			});

			getByTestId("start-game-btn");
		});

		test("is hidden when showStartGameBtn=false", async () => {
			const { queryByTestId } = renderFooter({
				showStartGameBtn: false,
			});

			expect(queryByTestId("start-game-btn")).not.toBeInTheDocument();
		});
	});
});
