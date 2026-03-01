/**
 * @jest-environment jsdom
 */
import { test, describe, expect, vi, beforeEach } from "vitest";
import { act, render } from "@/test/utilities";
import { axe } from "jest-axe";
import { ToastRegion } from "./toast-region";
import { QueuedToast, ToastState } from "@react-stately/toast";
import { ToastContent } from "../models/toast-content";

function generateMockToasts(count: number): QueuedToast<ToastContent>[] {
	return Array.from({ length: count }, (_, i) => ({
		content: {
			title: `Test Title ${i}`,
			description: `Test Description ${i}`,
			variant: "info",
		},
		key: i.toString(),
	}));
}

const add = vi.fn();
const close = vi.fn();
const pauseAll = vi.fn();
const resumeAll = vi.fn();
const mockState: ToastState<ToastContent> = {
	visibleToasts: generateMockToasts(3),
	add,
	close,
	pauseAll,
	resumeAll,
};

function renderToastRegion() {
	return render(<ToastRegion state={mockState} />);
}

describe("ToastRegion Component", () => {
	beforeEach(() => {
		add.mockClear();
		close.mockClear();
		pauseAll.mockClear();
		resumeAll.mockClear();
	});
	test("renders correctly", async () => {
		const { getAllByTestId } = renderToastRegion();

		const toasts = getAllByTestId(/toast-\d+/);
		expect(toasts).toHaveLength(3);
	});

	test("collapses stack when not hovered", async () => {
		const { getByRole, getAllByTestId, user } = renderToastRegion();
		const region = getByRole("region");

		await act(() => user.unhover(region));

		const toasts = getAllByTestId(/toast-\d+/);
		expect(toasts[0]).toHaveStyle("bottom: 20px");
		expect(toasts[0]).toHaveStyle("z-index: 0");
		expect(toasts[0]).toHaveStyle("transform: scaleX(80%)");

		expect(toasts[1]).toHaveStyle("bottom: 10px");
		expect(toasts[1]).toHaveStyle("z-index: 10");
		expect(toasts[1]).toHaveStyle("transform: scaleX(90%)");

		expect(toasts[2]).toHaveStyle("bottom: 0px");
		expect(toasts[2]).toHaveStyle("z-index: 20");
		expect(toasts[2]).toHaveStyle("transform: scaleX(100%)");
	});

	test("expands stack when hovered", async () => {
		const { getByTestId, user, getAllByTestId, debug } =
			renderToastRegion();
		const region = getByTestId("toasts-region");

		await act(() => user.hover(region));

		const toasts = getAllByTestId(/toast-\d+/);
		debug(toasts);
		expect(toasts[0]).toHaveStyle("transform: scaleX(100%)");

		expect(toasts[1]).toHaveStyle("transform: scaleX(100%)");

		expect(toasts[2]).toHaveStyle("bottom: 0px");
		expect(toasts[2]).toHaveStyle("transform: scaleX(100%)");
	});

	test("doesn't violate any accessibility rules", async () => {
		const { container } = renderToastRegion();
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
