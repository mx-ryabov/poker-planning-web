import { test, describe, expect } from "vitest";
import { render } from "@/test/utilities";
import { axe } from "jest-axe";
import { Avatar } from "./avatar";
import { Color } from "../../colors";

describe("Avatar", () => {
	test("renders successfully", async () => {
		const { unmount } = render(<Avatar altText={"Test Name"} />);

		expect(() => unmount()).not.toThrow();
	});

	test("displays correct initials depends on altText", async () => {
		const { rerender, container } = render(
			<Avatar altText={"Test Name"} />,
		);

		expect(container).toHaveTextContent("TN");
		rerender(
			<Avatar
				altText={"Absolutely different Name"}
				className="bg-primary-100 text-primary-500 w-10 h-10 shrink-0"
			/>,
		);
		expect(container).not.toHaveTextContent("Ad");
		expect(container).toHaveTextContent("AD");
	});

	test("displays maximum 2 characters", async () => {
		const { container } = render(<Avatar altText={"One Two Three"} />);

		expect(container).toHaveTextContent("OT");
	});

	test("displays online badge if online property is provided", async () => {
		const { queryByTestId, rerender } = render(
			<Avatar altText={"One Two Three"} />,
		);

		expect(queryByTestId("online-badge")).not.toBeInTheDocument();

		rerender(<Avatar altText={"One Two Three"} online />);

		expect(queryByTestId("online-badge")).toBeInTheDocument();
	});

	test("applies Error colors based on the first letter of altText", async () => {
		const { getByTestId } = render(<Avatar altText={"Abra"} />);

		const avatarFrame = getByTestId("avatar");
		expect(avatarFrame).toHaveStyle({
			"background-color": Color.Error100,
			color: Color.Error500,
		});
	});

	test("applies Warning colors based on the first letter of altText", async () => {
		const { getByTestId } = render(<Avatar altText={"Babra"} />);

		const avatarFrame = getByTestId("avatar");
		expect(avatarFrame).toHaveStyle({
			"background-color": Color.Warning100,
			color: Color.Warning500,
		});
	});

	test("applies Info colors based on the first letter of altText", async () => {
		const { getByTestId } = render(<Avatar altText={"Dabra"} />);

		const avatarFrame = getByTestId("avatar");
		expect(avatarFrame).toHaveStyle({
			"background-color": Color.Info100,
			color: Color.Info500,
		});
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container } = render(<Avatar altText={"Test Name"} />);
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
