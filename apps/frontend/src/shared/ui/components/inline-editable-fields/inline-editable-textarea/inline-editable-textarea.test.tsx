import { render } from "@/test/utilities";
import { describe, test, expect, vi } from "vitest";
import { InlineEditableTextarea } from "./inline-editable-textarea";

describe("InlineEditableTextarea", () => {
	test("renders correctly", () => {
		const { getByText } = render(
			<InlineEditableTextarea
				label="Test Label"
				value=""
				id="test-id"
				placeholder="Test Placeholder"
				styles={{ editorView: {}, readView: {} }}
				onConfirm={vi.fn()}
				onEditorChange={vi.fn()}
			/>,
		);

		expect(getByText("Test Placeholder")).toBeInTheDocument();
	});

	test("calls onEditorChange when input changes", async () => {
		const onEditorChange = vi.fn();
		const { getByRole, user, getByTestId } = render(
			<InlineEditableTextarea
				label="Test Label"
				value="Test Value"
				id="test-id"
				placeholder="Test Placeholder"
				styles={{ editorView: {}, readView: {} }}
				onConfirm={vi.fn()}
				onEditorChange={onEditorChange}
			/>,
		);

		const readView = getByTestId("test-id-read-view");
		await user.click(readView);

		const textField = getByRole("textbox");
		await user.type(textField, "New Value");

		expect(onEditorChange).toHaveBeenCalledWith("Test ValueNew Value");
	});

	test("calls onConfirm when Enter key is pressed and shouldConfirmOnEnter=true", async () => {
		const onConfirm = vi.fn();
		const { getByRole, user, getByTestId } = render(
			<InlineEditableTextarea
				label="Test Label"
				value="Test Value"
				id="test-id"
				placeholder="Test Placeholder"
				shouldConfirmOnEnter
				styles={{ editorView: {}, readView: {} }}
				onConfirm={onConfirm}
				onEditorChange={vi.fn()}
			/>,
		);

		const readView = getByTestId("test-id-read-view");
		await user.click(readView);

		const textField = getByRole("textbox");
		await user.type(textField, "New Value");
		await user.type(textField, "{enter}");

		expect(onConfirm).toHaveBeenNthCalledWith(1, "Test ValueNew Value");
	});

	test("doesn not calls onConfirm when Enter key is pressed and shouldConfirmOnEnter=false", async () => {
		const onConfirm = vi.fn();
		const { getByRole, user, getByTestId } = render(
			<InlineEditableTextarea
				label="Test Label"
				value="Test Value"
				id="test-id"
				placeholder="Test Placeholder"
				shouldConfirmOnEnter={false}
				styles={{ editorView: {}, readView: {} }}
				onConfirm={onConfirm}
				onEditorChange={vi.fn()}
			/>,
		);

		const readView = getByTestId("test-id-read-view");
		await user.click(readView);

		const textField = getByRole("textbox");
		await user.type(textField, "New Value");
		await user.type(textField, "{enter}");

		expect(onConfirm).toHaveBeenCalledTimes(0);
	});

	test("shows error when editing and it's provided", async () => {
		const { getByText, user, getByTestId } = render(
			<InlineEditableTextarea
				label="Test Label"
				value=""
				id="test-id"
				styles={{ editorView: {}, readView: {} }}
				onConfirm={vi.fn()}
				onEditorChange={vi.fn()}
				error="Test Error"
			/>,
		);

		const readView = getByTestId("test-id-read-view");
		await user.click(readView);

		const errorIcon = getByTestId("field-error-icon");
		await user.hover(errorIcon);
		getByText("Test Error");
	});
});
