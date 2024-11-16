/**
 * @jest-environment jsdom
 */
import { test, describe, expect, vi } from "vitest";
import { act, render, within } from "@/test/utilities";
import { CreateGameForm } from "./form";
import { CreateGameRequest } from "@/_src/shared/api/game-api";
import { VotingSystemsProvider } from "@/_src/entities/voting-system";
import { ReactNode } from "react";
import { VotingSystem } from "@/_src/shared/api/voting-system-api";

const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<VotingSystemsProvider value={VOTING_SYSTEMS_MOCK}>
			{children}
		</VotingSystemsProvider>
	);
};

const helper = ({
	getByRole,
	queryByRole,
	getByTestId,
	user,
}: ReturnType<typeof render>) => ({
	getNameField: () => {
		return getByRole("textbox", {
			name: /What is the name of your game?/i,
		});
	},
	getVSField: () => {
		return getByRole("radiogroup", { name: /choose your voting system/i });
	},
	queryVSField: () => {
		return queryByRole("radiogroup", {
			name: /choose your voting system/i,
		});
	},
	getCreatorNameField: () => {
		return getByRole("textbox", { name: /let's get acquainted/i });
	},
	getIsAutoRevealField: () => {
		return getByRole("checkbox", { name: /auto-reveal/i });
	},
	queryIsAutoRevealField: () => {
		return queryByRole("checkbox", { name: /auto-reveal/i });
	},
	getAdvancedSettingsFields: () => {
		return getByTestId("advanced-settings-fields-container");
	},
	getContinueBtn: () => {
		return getByRole("button", { name: /continue/i });
	},
	getBackBtn: () => {
		return getByRole("button", { name: /back/i });
	},
	getAdvancedSettingsBtn: () => {
		return getByRole("button", { name: /advanced settings/i });
	},
	getStartGameBtn: () => {
		return getByRole("button", { name: /start game/i });
	},
	goToTheVSStep: async () => {
		const textField = getByRole("textbox", {
			name: /What is the name of your game?/i,
		});
		const continueBtn = getByRole("button", { name: /continue/i });

		await user.type(textField, "Game Name");
		await user.click(continueBtn);
	},
	goToCreatorNameStep: async () => {
		const textField = getByRole("textbox", {
			name: /What is the name of your game?/i,
		});
		const continueBtn = getByRole("button", { name: /continue/i });

		await user.type(textField, "Game Name");
		await user.click(continueBtn);

		const votingSystemsRadioGroup = getByRole("radiogroup", {
			name: /choose your voting system/i,
		});
		const optionContainers = within(votingSystemsRadioGroup).getAllByTestId(
			"voting-system-option-container",
		);
		await user.click(optionContainers[0]);
		await user.click(continueBtn);
	},
	goToAdvancedSettingsStep: async () => {
		const gmaeNameField = getByRole("textbox", {
			name: /What is the name of your game?/i,
		});
		const continueBtn = getByRole("button", { name: /continue/i });

		await user.type(gmaeNameField, "Game Name");
		await user.click(continueBtn);

		const votingSystemsRadioGroup = getByRole("radiogroup", {
			name: /choose your voting system/i,
		});
		const optionContainers = within(votingSystemsRadioGroup).getAllByTestId(
			"voting-system-option-container",
		);
		await user.click(optionContainers[0]);
		await user.click(continueBtn);

		const creatorNameField = getByRole("textbox", {
			name: /let's get acquainted/i,
		});
		await user.type(creatorNameField, "Creator Name");
		const advancedSettingsBtn = getByRole("button", {
			name: /advanced settings/i,
		});
		await user.click(advancedSettingsBtn);
	},
});

const renderForm = ({
	submitMock,
}: {
	submitMock: (_req: CreateGameRequest) => Promise<string>;
}) => {
	const renderResult = render(
		<CreateGameForm createGameAsGuest={submitMock} />,
		{
			wrapper: Providers,
		},
	);
	return {
		...renderResult,
		helper: helper({ ...renderResult }),
	};
};

describe("Create Game Form", () => {
	test("renders successfully", async () => {
		const { unmount, getByRole, helper } = renderForm({
			submitMock: vi.fn(),
		});
		const header = getByRole("header");
		within(header).getByRole("link");
		helper.getNameField();
		const footer = getByRole("footer");
		expect(within(footer).getByRole("button")).toHaveTextContent(
			/continue/i,
		);
		expect(() => unmount()).not.toThrow();
	});

	describe("Name Step", () => {
		test("renders and visible as the first step", async () => {
			const { helper } = renderForm({ submitMock: vi.fn() });
			const nameTextField = helper.getNameField();
			expect(nameTextField).toHaveAttribute(
				"placeholder",
				"Team Planning",
			);
		});

		test("focuses on the name input by default", async () => {
			const { helper } = renderForm({ submitMock: vi.fn() });
			const nameTextField = helper.getNameField();
			expect(nameTextField).toHaveFocus();
		});

		test("has only the ocntinue button in the footer", async () => {
			const { getByRole } = renderForm({ submitMock: vi.fn() });
			const footer = getByRole("footer");
			const buttons = within(footer).getAllByRole("button");
			expect(buttons).toHaveLength(1);
			expect(buttons[0]).toHaveTextContent("Continue");
		});

		test("has the continue button disabled by default", async () => {
			const { helper } = renderForm({ submitMock: vi.fn() });
			const continueBtn = helper.getContinueBtn();
			expect(continueBtn).toBeDisabled();
		});

		test("has the continue button enabled if the Game Name text field is valid", async () => {
			const { helper, user } = renderForm({ submitMock: vi.fn() });
			const continueBtn = helper.getContinueBtn();
			const textField = helper.getNameField();

			await user.type(textField, "Game Name");
			expect(continueBtn).toBeEnabled();
		});

		test("has the continue button disabled if the Game Name text field is invalid", async () => {
			const { helper, user } = renderForm({ submitMock: vi.fn() });
			const textField = helper.getNameField();

			await user.type(textField, "Game Name");
			await act(() => user.clear(textField));
			const continueBtn = helper.getContinueBtn();
			expect(continueBtn).toBeDisabled();
		});

		describe("| Validation |", () => {
			test("the game name field doesn't show error when empty until the value changed", async () => {
				const { helper, user, getByTestId } = renderForm({
					submitMock: vi.fn(),
				});
				const textField = helper.getNameField();

				await user.type(textField, "Game Name");
				const errorMsg = within(
					getByTestId("name-text-field-container"),
				).queryByTestId("error-msg");
				expect(errorMsg).toBeEmptyDOMElement();
				await user.clear(textField);
				expect(errorMsg).not.toBeEmptyDOMElement();
			});

			test("the game name field shows an error when empty", async () => {
				const { helper, user, getByTestId } = renderForm({
					submitMock: vi.fn(),
				});
				const textField = helper.getNameField();

				await user.type(textField, "Game Name");
				await user.clear(textField);
				const errorMsg = within(
					getByTestId("name-text-field-container"),
				).getByTestId("error-msg");
				expect(errorMsg).toHaveTextContent(
					/You have to come up with something. The name can't be empty/i,
				);
			});

			test("the game name field shows an error when has more than 50 characters", async () => {
				const { helper, user, getByTestId } = renderForm({
					submitMock: vi.fn(),
				});
				const textField = helper.getNameField();

				await user.type(
					textField,
					"Game Name Game Name Game Name Game Name Game Name Game Name 1",
				);
				const errorMsg = within(
					getByTestId("name-text-field-container"),
				).getByTestId("error-msg");
				expect(errorMsg).toHaveTextContent(
					/Statistically, 50 can be painful. For your brain, to perceive the information./i,
				);
			});
		});

		test("navigates to the Voting Systems step when valid and the continue button is pressed", async () => {
			const { helper, user } = renderForm({
				submitMock: vi.fn(),
			});
			const textField = helper.getNameField();
			const continueBtn = helper.getContinueBtn();

			await user.type(textField, "Game Name");
			expect(helper.queryVSField()).not.toBeInTheDocument();
			await user.click(continueBtn);
			helper.getVSField();
		});
	});

	describe("Voting System Step", () => {
		test("renders successfully", async () => {
			const { helper } = renderForm({
				submitMock: vi.fn(),
			});
			await helper.goToTheVSStep();
			const votingSystemsRadioGroup = helper.getVSField();
			expect(
				within(votingSystemsRadioGroup).getByTestId(
					"voting-systems-field-label",
				),
			).toHaveTextContent("Now choose your voting system");
			expect(
				within(votingSystemsRadioGroup).getByTestId(
					"voting-systems-field-description",
				),
			).toHaveTextContent("You can change all settings during the game");
		});

		test("has the Continue button disabled by default", async () => {
			const { helper } = renderForm({
				submitMock: vi.fn(),
			});
			await helper.goToTheVSStep();
			const continueBtn = helper.getContinueBtn();
			expect(continueBtn).toBeDisabled();
		});

		test("has the Back button enabled", async () => {
			const { helper } = renderForm({
				submitMock: vi.fn(),
			});
			await helper.goToTheVSStep();
			const backBtn = helper.getBackBtn();
			expect(backBtn).toBeEnabled();
		});

		test("navigates to the Game Name step when the Back button is clicked", async () => {
			const { helper, user } = renderForm({
				submitMock: vi.fn(),
			});
			await helper.goToTheVSStep();
			const backBtn = helper.getBackBtn();
			expect(helper.queryVSField()).toBeInTheDocument();
			await user.click(backBtn);
			expect(helper.queryVSField()).not.toBeInTheDocument();
		});

		test("has 2 options (voting systems)", async () => {
			const { helper } = renderForm({
				submitMock: vi.fn(),
			});
			await helper.goToTheVSStep();
			const votingSystemsRadioGroup = helper.getVSField();
			const optionContainers = within(
				votingSystemsRadioGroup,
			).getAllByTestId("voting-system-option-container");
			expect(optionContainers).toHaveLength(2);
			expect(optionContainers[0]).toHaveTextContent(/Fibonacci/i);
			expect(optionContainers[1]).toHaveTextContent(/T-shirts/i);
		});

		test("has the first option focused", async () => {
			const { helper } = renderForm({
				submitMock: vi.fn(),
			});
			await helper.goToTheVSStep();
			const votingSystemsRadioGroup = helper.getVSField();

			const optionContainers = within(
				votingSystemsRadioGroup,
			).getAllByTestId("voting-system-option-container");
			expect(optionContainers[0]).toHaveAttribute("data-focused", "true");
			expect(
				within(optionContainers[0]).getByRole("radio"),
			).toHaveFocus();
		});

		test("can navigate between options via arrow keys", async () => {
			const { helper, user } = renderForm({
				submitMock: vi.fn(),
			});
			await helper.goToTheVSStep();
			const votingSystemsRadioGroup = helper.getVSField();

			const optionContainers = within(
				votingSystemsRadioGroup,
			).getAllByTestId("voting-system-option-container");
			expect(optionContainers[0]).toHaveAttribute("data-focused", "true");
			await user.keyboard("[ArrowDown]");
			expect(optionContainers[1]).toHaveAttribute("data-focused", "true");
		});

		test("can select an option via Space if it's focused", async () => {
			const { helper, user } = renderForm({
				submitMock: vi.fn(),
			});
			await helper.goToTheVSStep();
			const votingSystemsRadioGroup = helper.getVSField();

			const optionContainers = within(
				votingSystemsRadioGroup,
			).getAllByTestId("voting-system-option-container");
			expect(optionContainers[0]).not.toHaveAttribute(
				"data-selected",
				"true",
			);
			await user.keyboard("[Space]");
			expect(optionContainers[0]).toHaveAttribute(
				"data-selected",
				"true",
			);
			await user.keyboard("[ArrowDown]");
			await user.keyboard("[Space]");
			expect(optionContainers[1]).toHaveAttribute(
				"data-selected",
				"true",
			);
		});

		test("can seelct an option on click", async () => {
			const { helper, user } = renderForm({
				submitMock: vi.fn(),
			});
			await helper.goToTheVSStep();
			const votingSystemsRadioGroup = helper.getVSField();

			const optionContainers = within(
				votingSystemsRadioGroup,
			).getAllByTestId("voting-system-option-container");
			await user.click(optionContainers[0]);
			expect(optionContainers[0]).toHaveAttribute(
				"data-selected",
				"true",
			);
		});

		test("makes the continue button enabled if any option is selected", async () => {
			const { helper, user } = renderForm({
				submitMock: vi.fn(),
			});
			await helper.goToTheVSStep();
			const votingSystemsRadioGroup = helper.getVSField();

			const optionContainers = within(
				votingSystemsRadioGroup,
			).getAllByTestId("voting-system-option-container");
			await act(async () => await user.click(optionContainers[0]));
			expect(optionContainers[0]).toHaveAttribute(
				"data-selected",
				"true",
			);
			const continueBtn = helper.getContinueBtn();
			expect(continueBtn).toBeEnabled();
		});

		test("navigates to the creator name step if valid and the continue button clicked", async () => {
			const { helper } = renderForm({
				submitMock: vi.fn(),
			});
			await helper.goToCreatorNameStep();
		});
	});

	describe("Creator Name Step", () => {
		test("renders successfully", async () => {
			const { helper } = renderForm({
				submitMock: vi.fn(),
			});
			await helper.goToCreatorNameStep();
			const textField = helper.getCreatorNameField();
			expect(textField).toHaveAttribute("placeholder", "Type your name");
		});

		test("focuses on the creator name input by default", async () => {
			const { helper } = renderForm({ submitMock: vi.fn() });
			await helper.goToCreatorNameStep();
			const textField = helper.getCreatorNameField();
			expect(textField).toHaveFocus();
		});

		test("has the back, advanced settings and start game buttons in the footer", async () => {
			const { getByRole, helper } = renderForm({ submitMock: vi.fn() });
			await helper.goToCreatorNameStep();
			const footer = getByRole("footer");
			const buttons = within(footer).getAllByRole("button");
			expect(buttons).toHaveLength(3);
			expect(buttons[0]).toHaveTextContent(/Back/i);
			expect(buttons[1]).toHaveTextContent(/Advanced Settings/i);
			expect(buttons[2]).toHaveTextContent(/Start Game/i);
		});

		test("has the start game button disabled by default", async () => {
			const { helper } = renderForm({ submitMock: vi.fn() });
			await helper.goToCreatorNameStep();
			const startGameBtn = helper.getStartGameBtn();
			expect(startGameBtn).toBeDisabled();
		});

		test("has the advanced settings button disabled by default", async () => {
			const { helper } = renderForm({ submitMock: vi.fn() });
			await helper.goToCreatorNameStep();
			const advancedSettingsBtn = helper.getAdvancedSettingsBtn();
			expect(advancedSettingsBtn).toBeDisabled();
		});

		test("has the start game button enabled if the Creator Name text field is valid", async () => {
			const { helper, user } = renderForm({ submitMock: vi.fn() });
			await helper.goToCreatorNameStep();
			const startGameBtn = helper.getStartGameBtn();
			const textField = helper.getCreatorNameField();
			await user.type(textField, "Creator Name");
			expect(startGameBtn).toBeEnabled();
		});

		test("has the advanced settings button enabled if the Creator Name text field is valid", async () => {
			const { helper, user } = renderForm({ submitMock: vi.fn() });
			await helper.goToCreatorNameStep();
			const advancedSettingsBtn = helper.getAdvancedSettingsBtn();
			const textField = helper.getCreatorNameField();
			await user.type(textField, "Creator Name");
			expect(advancedSettingsBtn).toBeEnabled();
		});

		test("has start game and advanced settings buttons disabled if the Game Name text field is invalid", async () => {
			const { helper, user } = renderForm({ submitMock: vi.fn() });
			await helper.goToCreatorNameStep();
			const advancedSettingsBtn = helper.getAdvancedSettingsBtn();
			const textField = helper.getCreatorNameField();
			await user.type(textField, "Creator Name");
			await act(() => user.clear(textField));
			const startGameBtn = helper.getStartGameBtn();
			expect(startGameBtn).toBeDisabled();
			expect(advancedSettingsBtn).toBeDisabled();
		});

		describe("| Validation |", () => {
			test("the creator name field doesn't show error when empty until the value changed", async () => {
				const { helper, user, getByTestId } = renderForm({
					submitMock: vi.fn(),
				});
				await helper.goToCreatorNameStep();
				const textField = helper.getCreatorNameField();
				await user.type(textField, "Creator Name");
				const errorMsg = within(
					getByTestId("creatorName-text-field-container"),
				).queryByTestId("error-msg");
				expect(errorMsg).toBeEmptyDOMElement();
				await user.clear(textField);
				expect(errorMsg).not.toBeEmptyDOMElement();
			});

			test("the creator name field shows an error when empty", async () => {
				const { helper, user, getByTestId } = renderForm({
					submitMock: vi.fn(),
				});
				await helper.goToCreatorNameStep();
				const textField = helper.getCreatorNameField();
				await user.type(textField, "Creator Name");
				await user.clear(textField);
				const errorMsg = within(
					getByTestId("creatorName-text-field-container"),
				).getByTestId("error-msg");
				expect(errorMsg).toHaveTextContent(/Don't be shy!/i);
			});

			test("the creator name field shows an error when has more than 50 characters", async () => {
				const { helper, user, getByTestId } = renderForm({
					submitMock: vi.fn(),
				});
				await helper.goToCreatorNameStep();
				const textField = helper.getCreatorNameField();
				await user.type(
					textField,
					"Game Name Game Name Game Name Game Name Game Name Game Name 1",
				);
				const errorMsg = within(
					getByTestId("creatorName-text-field-container"),
				).getByTestId("error-msg");
				expect(errorMsg).toHaveTextContent(
					/Maybe you have a short name?/i,
				);
			});
		});

		test("navigates to the Advanced Settings step when valid and the Advanced Settings button is pressed", async () => {
			const { helper, user } = renderForm({
				submitMock: vi.fn(),
			});
			await helper.goToCreatorNameStep();
			const textField = helper.getCreatorNameField();
			await user.type(textField, "Creator Name");
			const advancedSettingsBtn = helper.getAdvancedSettingsBtn();
			expect(helper.queryIsAutoRevealField()).not.toBeInTheDocument();
			await user.click(advancedSettingsBtn);
			helper.getIsAutoRevealField();
		});
	});

	describe("Advanced Settings Step", () => {
		test("renders successfully", async () => {
			const { helper, getByText, getByTestId } = renderForm({
				submitMock: vi.fn(),
			});
			await helper.goToAdvancedSettingsStep();
			getByText(/Advanced Settings/i);
			const description = getByTestId(
				"advanced-settings-step-description",
			);
			expect(description).toHaveTextContent(
				/You can change all settings during the game/i,
			);
			const fieldsContainer = helper.getAdvancedSettingsFields();
			expect(fieldsContainer).toHaveTextContent(/auto-reveal cards/i);
		});

		test("has only Back and Start Game buttons available", async () => {
			const { helper } = renderForm({
				submitMock: vi.fn(),
			});
			await helper.goToAdvancedSettingsStep();
			const backBtn = helper.getBackBtn();
			const startGameBtn = helper.getStartGameBtn();

			expect(backBtn).toBeEnabled();
			expect(startGameBtn).toBeEnabled();
		});

		test("has Auto-Reveal Cards checkbox that can be checked and unchecked", async () => {
			const { helper, getAllByTestId, user } = renderForm({
				submitMock: vi.fn(),
			});
			await helper.goToAdvancedSettingsStep();
			const autoRevealCardsField = helper.getIsAutoRevealField();
			expect(autoRevealCardsField).not.toBeChecked();
			const autoRevealFieldContainer = getAllByTestId(
				"auto-reveal-cards-field-container",
			)[0];
			await user.click(autoRevealFieldContainer);
			expect(autoRevealCardsField).toBeChecked();
		});

		test("can navigate back to the Creator Name Step", async () => {
			const { helper, user } = renderForm({
				submitMock: vi.fn(),
			});
			await helper.goToAdvancedSettingsStep();
			const backBtn = helper.getBackBtn();
			await user.click(backBtn);
			helper.getCreatorNameField();
		});
	});

	test("submits data when the start game button clicked", async () => {
		const submitMock = vi.fn();
		const { helper, user, getAllByTestId } = renderForm({
			submitMock,
		});
		await helper.goToAdvancedSettingsStep();
		const autoRevealFieldContainer = getAllByTestId(
			"auto-reveal-cards-field-container",
		)[0];
		await user.click(autoRevealFieldContainer);
		const startGameBtn = helper.getStartGameBtn();
		expect(startGameBtn).toBeEnabled();
		await user.click(startGameBtn);
		expect(submitMock).toHaveBeenNthCalledWith(1, {
			name: "Game Name",
			votingSystemId: "6a113d25-34c9-4b49-985c-2df6dd67650c",
			creatorName: "Creator Name",
			isAutoRevealCards: true,
		});
	});
});

const VOTING_SYSTEMS_MOCK: VotingSystem[] = [
	{
		id: "6a113d25-34c9-4b49-985c-2df6dd67650c",
		name: "Fibonacci",
		votes: [
			{
				id: "bf0d4051-84a7-4162-8f48-580d4e488df2",
				order: 0,
				suit: "🏖️",
				value: "0",
				votingSystemId: "6a113d25-34c9-4b49-985c-2df6dd67650c",
			},
		],
	},
	{
		id: "6a113d25-34c9-4b49-985c-2df6dd67650b",
		name: "T-shirts",
		votes: [
			{
				id: "bf0d4051-84a7-4162-8f48-580d4e488df3",
				order: 0,
				suit: "🏖️",
				value: "XS",
				votingSystemId: "6a113d25-34c9-4b49-985c-2df6dd67650b",
			},
		],
	},
];
