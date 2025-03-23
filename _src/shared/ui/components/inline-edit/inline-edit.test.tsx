/**
 * @jest-environment jsdom
 */
import { test, describe, expect, vi } from "vitest";
import { render, within } from "@/test/utilities";
import { axe } from "jest-axe";
import { InlineEdit } from "./component";
import { useState } from "react";
import { Input } from "../input";

type Props = {
	isDisabled?: boolean;
	isInvalid?: boolean;
};
function InlineEditRenderer({ isDisabled, isInvalid }: Props) {
	const [value, setValue] = useState("");

	return (
		<div>
			<InlineEdit
				label="Inline Edit Label"
				value={value}
				editView={(renderProps) => (
					<Input label="" {...renderProps} autoFocus />
				)}
				readView={() => <p className="border p-2">Value: {value}</p>}
				onConfirm={setValue}
				isInvalid={isInvalid}
				isDisabled={isDisabled}
			/>
		</div>
	);
}

function renderInlineEdit(props?: Props) {
	return render(
		<InlineEditRenderer
			isDisabled={props?.isDisabled}
			isInvalid={props?.isInvalid}
		/>,
	);
}

describe("InlineEdit", () => {
	test("renders correctly", async () => {
		const { unmount, getByText } = renderInlineEdit();
		getByText("Inline Edit Label");
		getByText(/value:/i);
		expect(() => unmount()).not.toThrow();
	});

	test("shows the provided editor, save and cancel buttons when the component is focused by tab", async () => {
		const { user, getByTestId } = renderInlineEdit();
		await user.tab();

		const actionButtons = getByTestId("action-buttons");
		const buttons = within(actionButtons).getAllByRole("button");
		expect(buttons).toHaveLength(2);
		within(buttons[0]).getByTestId("icon-CheckIcon");
		within(buttons[1]).getByTestId("icon-CloseIcon");
	});

	test("shows the provided editor, save and cancel buttons when the component (read view) is clicked", async () => {
		const { user, getByTestId } = renderInlineEdit();

		const readView = getByTestId("read-view");
		await user.click(readView);

		const actionButtons = getByTestId("action-buttons");
		const buttons = within(actionButtons).getAllByRole("button");
		expect(buttons).toHaveLength(2);
		within(buttons[0]).getByTestId("icon-CheckIcon");
		within(buttons[1]).getByTestId("icon-CloseIcon");
	});

	test("automatically focuses on the editor when it's opened", async () => {
		const { user, getByRole, getByTestId } = renderInlineEdit();

		const readView = getByTestId("read-view");
		await user.click(readView);

		const textField = getByRole("textbox");
		expect(textField).toHaveFocus();
	});

	test("changes focus between the text field and buttons", async () => {
		const { user, getByRole, getByTestId } = renderInlineEdit();

		await user.tab();
		const textField = getByRole("textbox");
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
		const { user, getByTestId, queryByTestId } = renderInlineEdit();

		await user.tab();
		getByTestId("action-buttons");
		await user.click(document.body);
		expect(queryByTestId("action-buttons")).not.toBeInTheDocument();
	});

	test("hides action buttons if loses focus from the text field or action buttons", async () => {
		const { user, queryByTestId } = renderInlineEdit();
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
		const { user, getByTestId } = renderInlineEdit();
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
		const { user, getByTestId, getByRole } = renderInlineEdit();

		let readView = getByTestId("read-view");
		await user.click(readView);

		const textField = getByRole("textbox");
		await user.type(textField, "new value");
		const [confirmBtn] = within(getByTestId("action-buttons")).getAllByRole(
			"button",
		);
		await user.click(confirmBtn);

		readView = getByTestId("read-view");
		expect(readView).toHaveTextContent("Value: new value");
	});

	test("saves filled value when the save button is pressed with Enter", async () => {
		const { user, getByRole, getByTestId } = renderInlineEdit();

		let readView = getByTestId("read-view");
		await user.click(readView);

		const textField = getByRole("textbox");
		await user.type(textField, "new value");

		await user.tab();
		await user.keyboard("[Enter]");

		readView = getByTestId("read-view");
		expect(readView).toHaveTextContent("Value: new value");
	});

	test("saves filled value when focus is lost", async () => {
		const { user, getByRole, queryByTestId, getByTestId } =
			renderInlineEdit();

		let readView = getByTestId("read-view");
		await user.click(readView);

		const textField = getByRole("textbox");
		await user.type(textField, "new value");

		await user.tab();
		await user.tab();
		await user.tab();

		expect(queryByTestId("action-buttons")).not.toBeInTheDocument();
		expect(textField).toHaveValue("new value");
	});

	test("reverts previous saved value if the cancel button is pressed after the text field value was changed", async () => {
		const { user, getByRole, getByTestId } = renderInlineEdit();

		let readView = getByTestId("read-view");
		await user.click(readView);

		let textField = getByRole("textbox");
		await user.type(textField, "new value");
		await user.tab();
		await user.keyboard("[Enter]");

		await user.click(readView);
		await user.type(textField, "lalala");
		await user.tab();
		await user.tab();
		await user.keyboard("[Enter]");

		expect(textField).toHaveValue("new value");
	});

	test("supports disabled state", async () => {
		const { user, getByTestId, queryByTestId } = renderInlineEdit({
			isDisabled: true,
		});

		let readView = getByTestId("read-view");
		await user.click(readView);
		expect(readView).toBeDisabled();
		await user.click(readView);
		expect(queryByTestId("action-buttons")).not.toBeInTheDocument();
	});

	// the InlineEdit isn't responsible for showing the error message but the read view OR/AND editor are responsible for that
	test("supports invalid state. the component shouldn't allow to confirm", async () => {
		const { getByTestId, user, getByRole } = renderInlineEdit({
			isInvalid: true,
		});

		let readView = getByTestId("read-view");
		await user.click(readView);
		const [confirmBtn] = within(getByTestId("action-buttons")).getAllByRole(
			"button",
		);
		expect(confirmBtn).toBeDisabled();

		let textField = getByRole("textbox");
		await user.type(textField, "lalala");
		await user.tab();
		await user.tab();

		readView = getByTestId("read-view");
		expect(readView).toHaveTextContent("Value:");
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container, user, getByTestId } = renderInlineEdit();
		let results = await axe(container);
		expect(results).toHaveNoViolations();

		let readView = getByTestId("read-view");
		await user.click(readView);

		results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
