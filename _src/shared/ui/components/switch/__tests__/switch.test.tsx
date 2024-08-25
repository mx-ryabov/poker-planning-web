import { test, describe, expect } from "vitest";
import { Switch } from "../component";
import { render } from "@/test/utilities";
import { axe } from "jest-axe";

describe("Switch", () => {
	test("renders correctly", async () => {
		const wrapper = render(<Switch label="Switch label" />);

		expect(() => wrapper.unmount()).not.toThrow();
	});

	test("has focus on tab", async () => {
		render(<Switch label="Switch label" />);
	});

	test("should check and uncheck", async () => {
		render(<Switch label="Switch label" />);
	});

	test("shouldn't check if disabled", async () => {
		render(<Switch label="Switch label" />);
	});

	test("should be checked if defaultSelected=true", async () => {
		render(<Switch label="Switch label" />);
	});

	test("is controllable", async () => {
		render(<Switch label="Switch label" />);
	});

	test("should work with default values", async () => {
		render(<Switch label="Switch label" />);
	});

	test("should work with React Hook Form???", async () => {
		render(<Switch label="Switch label" />);
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container } = render(<Switch label="Label" />);
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
