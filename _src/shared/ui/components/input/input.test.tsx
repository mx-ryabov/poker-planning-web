import { describe, test, vi, expect } from "vitest";
import { Input } from "./component";
import { render } from "@/test/utilities";
import { axe } from "jest-axe";
import { PeopleIcon } from "../icon";
import { ButtonSquare } from "../button";

describe("Input (Text Field)", () => {
	test("renders correctly", () => {
		const wrapper = render(<Input label="Label" />);

		expect(() => wrapper.unmount()).not.toThrow();
	});

	test("renders start content", () => {
		const { getByTestId } = render(
			<Input label="Label" startIcon={PeopleIcon} />,
		);

		getByTestId("icon-PeopleIcon");
	});

	test("fire onChange when text changed", async () => {
		const onChangeFn = vi.fn();
		const { user, getByRole } = render(
			<Input label="Label" onChange={onChangeFn} />,
		);
		const input = getByRole("textbox");

		await user.type(input, "text");

		expect(onChangeFn).toHaveBeenLastCalledWith("text");
	});

	test("renders error message", async () => {
		const { getByText } = render(
			<Input label="Label" errors={["Error message"]} />,
		);

		getByText(/Error message/i);
	});

	test("is impossible to change if disabled", async () => {
		const onChangeFn = vi.fn();
		const { user, getByRole } = render(
			<Input label="Label" onChange={onChangeFn} isDisabled={true} />,
		);
		const input = getByRole("textbox");

		expect(input).toBeDisabled();
		await user.type(input, "text");
		expect(onChangeFn).not.toHaveBeenCalled();
	});

	test("renders the end content", async () => {
		const onButtonPressFn = vi.fn();
		const { getByRole, user } = render(
			<Input
				label="Label"
				endContent={
					<ButtonSquare icon={PeopleIcon} onPress={onButtonPressFn} />
				}
			/>,
		);

		const button = getByRole("button");
		await user.click(button);

		expect(onButtonPressFn).toHaveBeenCalled();
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container } = render(<Input label="Label" />);
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
