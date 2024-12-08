import { test, describe, expect } from "vitest";
import { render, screen } from "@/test/utilities";
import { axe } from "jest-axe";
import { Avatar } from "./component";

describe("Avatar", () => {
	test("renders successfully", async () => {
		const { unmount } = render(
			<Avatar
				altText={"Test Name"}
				className="bg-primary-100 text-primary-500 w-10 h-10 shrink-0"
			/>,
		);

		expect(() => unmount()).not.toThrow();
	});

	test("displays correct initials depends on altText", async () => {
		const { rerender, container } = render(
			<Avatar
				altText={"Test Name"}
				className="bg-primary-100 text-primary-500 w-10 h-10 shrink-0"
			/>,
		);

		expect(container).toHaveTextContent("TN");
		rerender(
			<Avatar
				altText={"Absolutely different Name"}
				className="bg-primary-100 text-primary-500 w-10 h-10 shrink-0"
			/>,
		);
		expect(container).not.toHaveTextContent("AdN");
		expect(container).toHaveTextContent("ADN");
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container } = render(
			<Avatar
				altText={"Test Name"}
				className="bg-primary-100 text-primary-500 w-10 h-10 shrink-0"
			/>,
		);
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
