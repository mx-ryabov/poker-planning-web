import { test, describe, expect, vi, beforeEach } from "vitest";
import { act, render, within } from "@/test/utilities";
import { axe } from "jest-axe";
import { SettingsPanel } from "./settings-panel";
import { GameRoomFakeProviderWrapper } from "../../__mocks__";
import {
	generateGame,
	generateParticipant,
} from "../../__tests__/game-state-store.test-helpers";
import {
	GameParticipant,
	GameSettings,
	ParticipantRole,
} from "@/_src/shared/api";

describe("Settings Panel", () => {
	beforeEach(() => {
		updateSettings.mockClear();
	});

	test("renders correctly", async () => {
		const { unmount, getByText } = renderComponent({});
		getByText(/Game's name/i);
		getByText(/Game master/i);
		getByText(/Auto-reveal cards/i);
		getByText(
			/Let the system automatically reveal the cards after everyone has voted/i,
		);
		expect(() => unmount()).not.toThrow();
	});

	describe("Name Field", () => {
		test("is read-only if the current user does NOT have role Master", async () => {
			const { getByTestId } = renderComponent({
				currentParticipant: generateParticipant({
					role: ParticipantRole.VotingMember,
				}),
			});

			let gameNameField = getByTestId("game-name-field-read-view");
			expect(gameNameField).toBeDisabled();
		});

		test("is editable if the current user has role - Master", async () => {
			const { getByTestId } = renderComponent({
				currentParticipant: generateParticipant({
					role: ParticipantRole.Master,
				}),
			});

			let gameNameField = getByTestId("game-name-field-read-view");
			expect(gameNameField).not.toBeDisabled();
		});

		test("changes the name of the game", async () => {
			updateSettings.mockResolvedValue({
				ok: true,
				data: {
					name: "Test Name Updated",
					updatedParticipants: [],
					isAutoRevealCards: false,
					autoRevealPeriod: 90,
				},
			});
			const { getByTestId, user } = renderComponent({});

			let gameNameField = getByTestId("game-name-field-read-view");
			await user.click(gameNameField);
			const gameNameFieldEditor = getByTestId("game-name-field-editor");
			await user.type(gameNameFieldEditor, " Updated");
			const confirmBtn = getByTestId("game-name-field-confirm-button");
			await user.click(confirmBtn);

			expect(updateSettings).toHaveBeenNthCalledWith(
				1,
				"test-game-id",
				expect.objectContaining({ name: "Test Name Updated" }),
			);
			gameNameField = getByTestId("game-name-field-read-view");
			expect(gameNameField).toHaveTextContent("Test Name Updated");
		});

		test("doesn't allow to change if a new name is empty", async () => {
			const { getByTestId, user } = renderComponent({});

			let gameNameField = getByTestId("game-name-field-read-view");
			await user.click(gameNameField);
			const gameNameFieldEditor = getByTestId("game-name-field-editor");
			await user.clear(gameNameFieldEditor);
			const confirmBtn = getByTestId("game-name-field-confirm-button");

			expect(confirmBtn).toBeDisabled();
			await user.keyboard("[Enter]");
			expect(updateSettings).not.toHaveBeenCalled();
		});

		test("doesn't allow to change if a new name has more than 50 characters", async () => {
			const { getByTestId, user } = renderComponent({});

			let gameNameField = getByTestId("game-name-field-read-view");
			await user.click(gameNameField);
			const gameNameFieldEditor = getByTestId("game-name-field-editor");
			await user.type(
				gameNameFieldEditor,
				" asndkjnasndjkasndk askndsdkjnflsnlcvfnsdv nfvklndflvnd flvndlf nvld fnvln dflvnld fnvl dfnvldfnlvfd",
			);
			const confirmBtn = getByTestId("game-name-field-confirm-button");

			expect(confirmBtn).toBeDisabled();
			await user.keyboard("[Enter]");
			expect(updateSettings).not.toHaveBeenCalled();
		});
	});

	describe("Game Master Selector Field", () => {
		test("is read-only if the current user does NOT have role Master", async () => {
			const { getByTestId } = renderComponent({
				currentParticipant: generateParticipant({
					role: ParticipantRole.VotingMember,
				}),
			});

			let gameMasterSelector = within(
				getByTestId(/game-master-selector/i),
			).getByRole("button");
			expect(gameMasterSelector).toBeDisabled();
		});

		test("is editable if the current user has role - Master", async () => {
			const { getByTestId } = renderComponent({
				currentParticipant: generateParticipant({
					role: ParticipantRole.Master,
				}),
			});

			let gameMasterSelector = within(
				getByTestId(/game-master-selector/i),
			).getByRole("button");
			expect(gameMasterSelector).toBeEnabled();
		});

		test("changes the master of the game", async () => {
			const currentParticipant = generateParticipant({
				displayName: "Master",
				role: ParticipantRole.Master,
			});
			const participant = generateParticipant({
				displayName: "Participant",
				role: ParticipantRole.VotingMember,
			});
			const anotherParticipantId = participant.id;
			updateSettings.mockResolvedValue({
				name: "Test Name",
				updatedParticipants: [
					{
						...currentParticipant,
						role: ParticipantRole.VotingMember,
					},
					{ ...participant, role: ParticipantRole.Master },
				],
				isAutoRevealCards: false,
				autoRevealPeriod: 90,
			});
			const { getByTestId, user, getByText, getByRole, debug } =
				renderComponent({
					currentParticipant,
					participants: [currentParticipant, participant],
				});

			let gameMasterSelector = within(
				getByTestId(/game-master-selector/i),
			).getByRole("button");

			await user.click(gameMasterSelector);
			const anotherParticipantOption = getByText("Participant");
			await user.click(anotherParticipantOption);

			expect(updateSettings).toHaveBeenNthCalledWith(
				1,
				"test-game-id",
				expect.objectContaining({
					gameMasterId: anotherParticipantId,
				}),
			);
		});

		test("has all the current participants in the list", async () => {
			const currentParticipant = generateParticipant({
				displayName: "Master",
				role: ParticipantRole.Master,
			});
			const participant = generateParticipant({
				displayName: "Participant",
				role: ParticipantRole.VotingMember,
			});
			const { getByTestId, user, debug, getByRole } = renderComponent({
				currentParticipant,
				participants: [currentParticipant, participant],
			});

			let gameMasterSelector = within(
				getByTestId(/game-master-selector/i),
			).getByRole("button");

			await user.click(gameMasterSelector);

			const optionsList = getByTestId("game-master-selector-list");
			const masterOption = within(optionsList).getByText(/Master/i);
			const participantOption =
				within(optionsList).getByText(/Participant/i);

			expect(masterOption).toBeInTheDocument();
			expect(participantOption).toBeInTheDocument();
		});

		test("has an item with post-fix (You) if it's a current user", async () => {
			const currentParticipant = generateParticipant({
				displayName: "Master",
				role: ParticipantRole.Master,
			});
			const participant = generateParticipant({
				displayName: "Participant",
				role: ParticipantRole.VotingMember,
			});
			const { getByTestId, user } = renderComponent({
				currentParticipant,
				participants: [currentParticipant, participant],
			});

			let gameMasterSelector = within(
				getByTestId(/game-master-selector/i),
			).getByRole("button");

			await user.click(gameMasterSelector);

			const optionsList = getByTestId("game-master-selector-list");
			const currentUserOption =
				within(optionsList).getByText("Master (You)");
			expect(currentUserOption).toBeInTheDocument();
		});
	});

	describe("Auto Reveal Cards Field", () => {
		test("is read-only if the current user does NOT have role Master", async () => {
			const { getByTestId } = renderComponent({
				currentParticipant: generateParticipant({
					role: ParticipantRole.VotingMember,
				}),
			});

			const autoRevealSwitchCheckbox = within(
				getByTestId("auto-reveal-cards-switch"),
			).getByRole("checkbox");
			const autoRevealPeriodInput = getByTestId(
				"auto-reveal-period-input-read-view",
			);

			expect(autoRevealSwitchCheckbox).toBeDisabled();
			expect(autoRevealPeriodInput).toBeDisabled();
		});

		test("has thw switcher editable if the current user has role - Master", async () => {
			const { getByTestId } = renderComponent({
				currentParticipant: generateParticipant({
					role: ParticipantRole.Master,
				}),
			});

			const autoRevealSwitchCheckbox = within(
				getByTestId("auto-reveal-cards-switch"),
			).getByRole("checkbox");

			expect(autoRevealSwitchCheckbox).not.toBeDisabled();
		});

		test("changes isAutoRevealCards", async () => {
			const { getByTestId, user } = renderComponent({
				currentParticipant: generateParticipant({
					role: ParticipantRole.Master,
				}),
			});

			const autoRevealSwitch = getByTestId("auto-reveal-cards-switch");

			await user.click(autoRevealSwitch);

			expect(updateSettings).toHaveBeenCalledWith(
				"test-game-id",
				expect.objectContaining({
					isAutoRevealCards: true,
				}),
			);
		});

		test("has Auto Reveal Period input disabled if the switcher is turned off", async () => {
			const { getByTestId } = renderComponent({
				currentParticipant: generateParticipant({
					role: ParticipantRole.Master,
				}),
			});

			const autoRevealPeriodInput = getByTestId(
				"auto-reveal-period-input-read-view",
			);

			expect(autoRevealPeriodInput).toBeDisabled();
		});

		test("has Auto Reveal Period input enabled if the switcher is turned on", async () => {
			updateSettings.mockResolvedValue({
				ok: true,
				data: {
					name: "Test Name Updated",
					updatedParticipants: [],
					isAutoRevealCards: true,
					autoRevealPeriod: 120,
				},
			});
			const { getByTestId, user } = renderComponent({
				currentParticipant: generateParticipant({
					role: ParticipantRole.Master,
				}),
			});

			const autoRevealSwitch = getByTestId("auto-reveal-cards-switch");
			await user.click(autoRevealSwitch);

			const autoRevealPeriodReader = getByTestId(
				"auto-reveal-period-input-read-view",
			);

			expect(autoRevealPeriodReader).not.toBeDisabled();
		});

		test("changes Auto Reveal Period input", async () => {
			const { getByTestId, user } = renderComponent({
				currentParticipant: generateParticipant({
					role: ParticipantRole.Master,
				}),
				settings: {
					isAutoRevealCards: true,
					autoRevealPeriod: 120,
				},
			});

			const autoRevealPeriodReader = getByTestId(
				"auto-reveal-period-input-read-view",
			);
			await user.click(autoRevealPeriodReader);

			const autoRevealEditor = getByTestId(
				"auto-reveal-period-input-editor",
			);
			await user.clear(autoRevealEditor);
			await user.type(autoRevealEditor, "90");
			await user.keyboard("[Enter]");

			expect(updateSettings).toHaveBeenCalledWith(
				"test-game-id",
				expect.objectContaining({
					autoRevealPeriod: 90,
				}),
			);
		});

		test("doesn't allow to input anything besides number to the Auto Reveal Period field", async () => {
			const { getByTestId, user } = renderComponent({
				currentParticipant: generateParticipant({
					role: ParticipantRole.Master,
				}),
				settings: {
					isAutoRevealCards: true,
					autoRevealPeriod: 90,
				},
			});

			const autoRevealPeriodReader = getByTestId(
				"auto-reveal-period-input-read-view",
			);
			await user.click(autoRevealPeriodReader);

			const autoRevealEditor = getByTestId(
				"auto-reveal-period-input-editor",
			);
			await user.clear(autoRevealEditor);
			await user.type(autoRevealEditor, "abc");
			await user.keyboard("[Enter]");

			expect(updateSettings).not.toHaveBeenCalled();
		});
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container } = renderComponent({});
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});

const updateSettings = vi.fn();

type Props = {
	currentParticipant?: GameParticipant;
	participants?: GameParticipant[];
	settings?: GameSettings;
};
function renderComponent({
	currentParticipant,
	participants,
	settings,
}: Props) {
	const defaultCurrentParticipant = generateParticipant({
		role: ParticipantRole.Master,
	});
	const defaultAdditionalParticipant = generateParticipant({
		role: ParticipantRole.VotingMember,
	});
	const game = generateGame({
		id: "test-game-id",
		name: "Test Name",
		participants: participants || [
			defaultCurrentParticipant,
			defaultAdditionalParticipant,
		],
	});
	if (settings) {
		game.settings = { ...game.settings, ...settings };
	}
	return render(<SettingsPanel />, {
		wrapper: GameRoomFakeProviderWrapper({
			apiProps: {
				game: { updateSettings },
			},
			gameStateProps: {
				game,
				currentParticipant:
					currentParticipant || defaultCurrentParticipant,
			},
		}),
	});
}
