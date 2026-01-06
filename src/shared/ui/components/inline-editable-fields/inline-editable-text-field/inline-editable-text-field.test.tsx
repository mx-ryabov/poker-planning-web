import { render } from "@/test/utilities";
import { describe, test, expect, vi } from "vitest";
import { InlineEditableTextField } from "./inline-editable-text-field";

describe("InlineEditableTextField", () => {
	test("renders correctly", () => {
		const { getByText } = render(
			<InlineEditableTextField
				label="Test Label"
				value=""
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
			<InlineEditableTextField
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

	test("calls onConfirm when Enter key is pressed", async () => {
		const onConfirm = vi.fn();
		const { getByRole, user, getByTestId } = render(
			<InlineEditableTextField
				label="Test Label"
				value="Test Value"
				id="test-id"
				placeholder="Test Placeholder"
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

	test("shows error when editing and it's provided", async () => {
		const { getByText, user, getByTestId } = render(
			<InlineEditableTextField
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

	test("shows tooltip error when withTooltipError is true", async () => {
		const { getByTestId, getByText, user } = render(
			<InlineEditableTextField
				label="Test Label"
				value=""
				id="test-id"
				styles={{ editorView: {}, readView: {} }}
				onConfirm={vi.fn()}
				onEditorChange={vi.fn()}
				error="Tooltip Error"
				withTooltipError
			/>,
		);

		const readView = getByTestId("test-id-read-view");
		await user.click(readView);

		expect(getByText("Tooltip Error")).toBeInTheDocument();
	});

	test("calls validate and shows error when validation fails", async () => {
		const validate = vi.fn((value: string) =>
			value.length < 5 ? "Too short" : null,
		);
		const { getByRole, getByText, user, getByTestId } = render(
			<InlineEditableTextField
				label="Test Label"
				value=""
				id="test-id"
				placeholder="Test Placeholder"
				styles={{ editorView: {}, readView: {} }}
				onConfirm={vi.fn()}
				onEditorChange={vi.fn()}
				validate={validate}
				withTooltipError
			/>,
		);

		const readView = getByTestId("test-id-read-view");
		await user.click(readView);

		const textField = getByRole("textbox");
		await user.type(textField, "abc");

		expect(validate).toHaveBeenCalled();
		expect(getByText("Too short")).toBeInTheDocument();
	});
});
