import { test, describe, expect } from "vitest";
import { render } from "@/test/utilities";
import { axe } from "jest-axe";
import { InternalErrorBoundary } from "./error-boundary";
import { useEffect } from "react";

function ThrowError() {
	useEffect(() => {
		throw new Error("Test error");
	}, []);
	return <div>This will not render</div>;
}

describe("InternalErrorBoundary", () => {
	test("renders children when no error occurs", () => {
		const { getByText } = render(
			<InternalErrorBoundary>
				<span>Child Content</span>
			</InternalErrorBoundary>,
		);
		expect(getByText("Child Content")).toBeInTheDocument();
	});

	test("renders fallback UI when error is thrown", () => {
		const { getByText } = render(
			<InternalErrorBoundary>
				<ThrowError />
			</InternalErrorBoundary>,
		);
		expect(getByText("Oops!")).toBeInTheDocument();
		expect(getByText("Something went wrong...")).toBeInTheDocument();
		expect(getByText(/try again/i)).toBeInTheDocument();
	});

	test("has Try Again button is presseble", async () => {
		const { getByText } = render(
			<InternalErrorBoundary>
				<ThrowError />
			</InternalErrorBoundary>,
		);
		const resetButton = getByText(/try again/i);
		expect(resetButton).toBeEnabled();
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container } = render(
			<InternalErrorBoundary>
				<ThrowError />
			</InternalErrorBoundary>,
		);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
