import { test, describe, expect, vi } from "vitest";
import { act, render } from "@/test/utilities";
import { GameJoinForm } from "./game-join-form";
import { ApiFakeProvider } from "@/__mocks__/api-fake-provider";

function renderForm(
	onSubmit: (
		gameId: string,
		data: {
			displayName: string;
		},
	) => Promise<string | undefined> = vi.fn(),
) {
	return render(<GameJoinForm gameId={"game-id-test"} />, {
		wrapper: ({ children }) => (
			<ApiFakeProvider fakeApi={{ game: { joinAsGuest: onSubmit } }}>
				{children}
			</ApiFakeProvider>
		),
	});
}

describe("Game Join Form", () => {
	test("renders successfully", async () => {
		const { getByRole } = renderForm();
		const textField = getByRole("textbox", {
			name: /let's get acquainted/i,
		});
		expect(textField).toHaveAttribute("placeholder", "Type your name");
	});

	test("focuses on the creator name input by default", async () => {
		const { getByRole } = renderForm();

		const textField = getByRole("textbox", {
			name: /let's get acquainted/i,
		});
		expect(textField).toHaveFocus();
	});

	test("has the enter the game button disabled by default", async () => {
		const { getByRole } = renderForm();

		const startGameBtn = getByRole("button", { name: /enter the game/i });
		expect(startGameBtn).toBeDisabled();
	});

	test("has the start game button enabled if the displayName text field is valid", async () => {
		const { getByRole, user } = renderForm();

		const enterGameBtn = getByRole("button", { name: /enter the game/i });
		const textField = getByRole("textbox", {
			name: /let's get acquainted/i,
		});
		await user.type(textField, "Creator Name");
		expect(enterGameBtn).toBeEnabled();
	});

	test("has enter the game button disabled if display name text field is invalid", async () => {
		const { getByRole, user } = renderForm();

		const textField = getByRole("textbox", {
			name: /let's get acquainted/i,
		});
		await user.type(textField, "Particiapnt Name");
		await act(() => user.clear(textField));
		const startGameBtn = getByRole("button", { name: /enter the game/i });
		expect(startGameBtn).toBeDisabled();
	});

	describe("| Validation |", () => {
		test("the display name field doesn't show error when empty until the value changed", async () => {
			const { getByRole, user, getByTestId, queryByTestId } =
				renderForm();

			const textField = getByRole("textbox", {
				name: /let's get acquainted/i,
			});
			await user.type(textField, "Participant Name");
			const errorMsg = queryByTestId("displayName-error-msg");
			expect(errorMsg).not.toBeInTheDocument();
			await user.clear(textField);
			expect(getByTestId("displayName-error-msg")).toBeInTheDocument();
		});

		test("the display name field shows an error when empty", async () => {
			const { getByRole, user, getByTestId } = renderForm();

			const textField = getByRole("textbox", {
				name: /let's get acquainted/i,
			});
			await user.type(textField, "Participant Name");
			await user.clear(textField);
			const errorMsg = getByTestId("displayName-error-msg");
			expect(errorMsg).toHaveTextContent(/Don't be shy!/i);
		});

		test("the display name field shows an error when has more than 50 characters", async () => {
			const { getByRole, user, getByTestId } = renderForm();

			const textField = getByRole("textbox", {
				name: /let's get acquainted/i,
			});
			await user.type(
				textField,
				"Game Name Game Name Game Name Game Name Game Name Game Name 1",
			);
			const errorMsg = getByTestId("displayName-error-msg");
			expect(errorMsg).toHaveTextContent(/Maybe you have a short name?/i);
		});
	});
});
