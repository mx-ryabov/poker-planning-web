import { describe, test } from "vitest";
import { Input } from "../component";
import { render } from "@/test/utilities";
import { axe } from "jest-axe";

describe("Input (Text Field)", () => {
	test("renders correctly", () => {
		render(<Input label="Label" />);
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container } = render(<Input label="Label" />);
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
