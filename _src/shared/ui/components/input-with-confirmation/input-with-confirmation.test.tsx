/**
 * @jest-environment jsdom
 */
import { test, describe, expect, vi } from "vitest";
import { render, within, screen } from "@/test/utilities";
import { axe } from "jest-axe";
import { InputWithConfirmation } from "./input-with-confirmation";

describe("Input With Confirmation", () => {
	test("renders correctly", async () => {
		const { unmount, getByText, getByRole } = render(
			<InputWithConfirmation label="Label" placeholder="Placeholder" />,
		);

		getByText("Label");
		const textField = getByRole("textbox");

		expect(textField).toHaveAttribute("placeholder", "Placeholder");
		expect(() => unmount()).not.toThrow();
	});

	test("shows save and cancel buttons when the text field is focused", async () => {
		const { user, getByRole, getByTestId } = render(
			<InputWithConfirmation label="Label" placeholder="Placeholder" />,
		);

		const textField = getByRole("textbox");
		await user.click(textField);

		expect(textField).toHaveFocus();
		const actionButtons = getByTestId("action-buttons");
		const buttons = within(actionButtons).getAllByRole("button");

		expect(buttons).toHaveLength(2);
		within(buttons[0]).getByTestId("icon-CloseIcon");
		within(buttons[1]).getByTestId("icon-CheckIcon");
	});

	test("changes focus between the text field and buttons", async () => {
		const { user, getByRole, getByTestId } = render(
			<InputWithConfirmation label="Label" placeholder="Placeholder" />,
		);

		const textField = getByRole("textbox");
		await user.tab();
		const buttons = within(getByTestId("action-buttons")).getAllByRole(
			"button",
		);

		expect(textField).toHaveFocus();
		await user.tab();
		expect(buttons[0]).toHaveFocus();
		await user.tab();
		expect(buttons[1]).toHaveFocus();
		await user.tab({ shift: true });
		expect(buttons[0]).toHaveFocus();
		await user.tab({ shift: true });
		expect(textField).toHaveFocus();
	});

	test("hides action buttons if clicked outside", async () => {
		const { user, getByRole, getByTestId, queryByTestId } = render(
			<InputWithConfirmation label="Label" placeholder="Placeholder" />,
		);

		const textField = getByRole("textbox");
		await user.click(textField);
		getByTestId("action-buttons");
		await user.click(document.body);
		expect(queryByTestId("action-buttons")).not.toBeInTheDocument();
	});

	test("hides action buttons if loses focus from the text field or action buttons", async () => {
		const { user, queryByTestId } = render(
			<InputWithConfirmation label="Label" placeholder="Placeholder" />,
		);

		// tab on the textfield
		await user.tab();
		// tab on the cancel button
		await user.tab();
		// tab on the save button
		await user.tab();
		// tab outside
		await user.tab();
		expect(queryByTestId("action-buttons")).not.toBeInTheDocument();
	});

	test("doesn't hide actions buttons if focus is being changed between the text field and action buttons", async () => {
		const { user, getByTestId } = render(
			<InputWithConfirmation label="Label" placeholder="Placeholder" />,
		);

		await user.tab();
		getByTestId("action-buttons");
		await user.tab();
		getByTestId("action-buttons");
		await user.tab();
		getByTestId("action-buttons");
		await user.tab({ shift: true });
		getByTestId("action-buttons");
		await user.tab({ shift: true });
		getByTestId("action-buttons");
	});

	test("saves filled value when the save button is clicked", async () => {
		const onChangeFn = vi.fn();
		const { user, getByTestId, getByRole, queryByTestId } = render(
			<InputWithConfirmation
				label="Label"
				placeholder="Placeholder"
				onChange={onChangeFn}
			/>,
		);

		const textField = getByRole("textbox");
		await user.click(textField);
		await user.type(textField, "new value");
		const buttons = within(getByTestId("action-buttons")).getAllByRole(
			"button",
		);
		await user.click(buttons[1]);

		expect(onChangeFn).toHaveBeenCalledOnce();
		expect(onChangeFn).toHaveBeenCalledWith("new value");
		expect(queryByTestId("action-buttons")).not.toBeInTheDocument();
		expect(textField).toHaveValue("new value");
	});

	test("saves filled value when the save button is pressed with Enter", async () => {
		const onChangeFn = vi.fn();
		const { user, getByRole, queryByTestId } = render(
			<InputWithConfirmation
				label="Label"
				placeholder="Placeholder"
				onChange={onChangeFn}
			/>,
		);

		const textField = getByRole("textbox");
		await user.click(textField);
		await user.type(textField, "new value");
		await user.tab();
		await user.tab();
		await user.keyboard("[Enter]");

		expect(onChangeFn).toHaveBeenCalledOnce();
		expect(onChangeFn).toHaveBeenCalledWith("new value");
		expect(queryByTestId("action-buttons")).not.toBeInTheDocument();
		expect(textField).toHaveValue("new value");
	});

	test("saves filled value when focus is lost", async () => {
		const onChangeFn = vi.fn();
		const { user, getByRole, queryByTestId } = render(
			<InputWithConfirmation
				label="Label"
				placeholder="Placeholder"
				onChange={onChangeFn}
			/>,
		);

		const textField = getByRole("textbox");
		await user.click(textField);
		await user.type(textField, "new value");
		await user.tab();
		await user.tab();
		await user.tab();

		expect(onChangeFn).toHaveBeenCalledOnce();
		expect(onChangeFn).toHaveBeenCalledWith("new value");
		expect(queryByTestId("action-buttons")).not.toBeInTheDocument();
		expect(textField).toHaveValue("new value");
	});

	test.todo("save filled value when Enter is pressed?", async () => {});

	test("reverts previous saved value if the cancel button is pressed after the text field value was changed", async () => {
		const onChangeFn = vi.fn();
		const { user, getByRole, getByTestId, queryByTestId } = render(
			<div>
				<InputWithConfirmation
					label="Label"
					placeholder="Placeholder"
					onChange={onChangeFn}
				/>
				<button>test</button>
			</div>,
		);

		let textField = getByRole("textbox");
		await user.click(textField);
		await user.click(document.body);
		await user.click(textField);
		await user.type(textField, "new value");
		await user.tab();
		await user.tab();
		await user.keyboard("[Enter]");
		await user.click(textField);
		await user.type(textField, "lalala");
		await user.tab();
		await user.keyboard("[Enter]");

		expect(onChangeFn).toHaveBeenCalledOnce();
		expect(onChangeFn).toHaveBeenCalledWith("new value");
		expect(queryByTestId("action-buttons")).not.toBeInTheDocument();
		expect(textField).toHaveValue("new value");
	});

	test("doesn't fire onChange when saving and the value wasn't changed", async () => {
		const onChangeFn = vi.fn();
		const { user, getByRole, getByTestId } = render(
			<InputWithConfirmation
				label="Label"
				placeholder="Placeholder"
				onChange={onChangeFn}
			/>,
		);

		const textField = getByRole("textbox");
		await user.click(textField);
		await user.type(textField, "new value");
		await user.tab();
		await user.tab();
		await user.keyboard("[Enter]");

		expect(onChangeFn).toHaveBeenCalledOnce();
		expect(onChangeFn).toHaveBeenCalledWith("new value");
		expect(textField).not.toHaveFocus();
		await user.click(textField);
		expect(textField).toHaveFocus();
		await user.type(textField, "u");
		await user.keyboard("[Backspace]");
		await user.tab();
		await user.keyboard("[Enter]");

		expect(onChangeFn).toHaveBeenCalledOnce();
		expect(onChangeFn).toHaveBeenCalledWith("new value");
	});

	test("supports disabled state", async () => {
		const { user, getByRole, queryByTestId } = render(
			<InputWithConfirmation
				label="Label"
				placeholder="Placeholder"
				isDisabled
			/>,
		);

		const textField = getByRole("textbox");
		expect(textField).toBeDisabled();
		await user.click(textField);
		expect(queryByTestId("action-buttons")).not.toBeInTheDocument();
	});

	test("supports invalid state", async () => {
		const { getByText } = render(
			<InputWithConfirmation
				label="Label"
				placeholder="Placeholder"
				errors={["Error message"]}
			/>,
		);
		getByText("Error message");
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container, user } = render(
			<InputWithConfirmation
				label="Label"
				placeholder="Placeholder"
				errors={["Error message"]}
			/>,
		);
		await user.tab();
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
