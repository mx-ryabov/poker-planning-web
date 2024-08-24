import { render } from "@testing-library/react";
import { describe, test } from "vitest";
import { Input } from "../component";

describe("Input (Text Field)", () => {
	test("renders correctly", () => {
		render(<Input />);
	});
});
