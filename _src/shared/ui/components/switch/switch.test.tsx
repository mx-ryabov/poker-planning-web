import { test, describe, expect } from "vitest";
import { Switch } from "./component";
import { render, screen, waitFor } from "@/test/utilities";
import { axe } from "jest-axe";

describe("Switch", () => {
	test("renders correctly", async () => {
		const wrapper = render(<Switch label="Switch label" />);

		expect(() => wrapper.unmount()).not.toThrow();
	});

	test("has focus on tab", async () => {
		const { user } = render(<Switch label="Switch label" />);
		const switchContainer = screen.getByTestId("switch-container");
		expect(switchContainer).not.toHaveStyle(focusStyles);
		await user.tab();

		waitFor(() => expect(switchContainer).toHaveStyle(focusStyles));
	});

	test("should check and uncheck", async () => {
		const { user } = render(
			<Switch label="Switch label" defaultSelected={false} />,
		);

		const checkboxContainer = screen.getAllByTestId("checkbox-container");
		const checkbox = screen.getByRole("checkbox");

		expect(checkbox).not.toBeChecked();
		await user.click(checkboxContainer[0]);
		waitFor(() => expect(checkbox).toBeChecked());

		await user.click(checkboxContainer[0]);
		waitFor(() => expect(checkbox).not.toBeChecked());
	});

	test("shouldn't check if disabled", async () => {
		const { user } = render(
			<Switch label="Switch label" isDisabled={true} />,
		);
		const checkbox = screen.getByRole("checkbox");
		const checkboxContainer = screen.getAllByTestId("checkbox-container");

		expect(checkbox).not.toBeChecked();
		await user.click(checkboxContainer[0]);
		waitFor(() => expect(checkbox).not.toBeChecked());
	});

	test("should be checked if defaultSelected=true", async () => {
		render(<Switch label="Switch label" defaultSelected={true} />);
		const checkbox = screen.getByRole("checkbox");

		expect(checkbox).toBeChecked();
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container } = render(<Switch label="Label" />);
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});

const focusStyles = {
	"outline-color": "#845EC2",
	"outline-offset": "2px",
	"outline-style": "solid",
};
