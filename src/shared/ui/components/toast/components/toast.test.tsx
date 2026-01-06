import { test, describe, expect, vi } from "vitest";
import { render } from "@/test/utilities";
import { axe } from "jest-axe";
import { Toast } from "./toast";
import { QueuedToast, ToastState } from "@react-stately/toast";
import { ToastContent } from "../models/toast-content";

const mockToastContent: ToastContent = {
	title: "Test Title",
	description: "Test Description",
	variant: "info",
};

const mocktoast: QueuedToast<ToastContent> = {
	content: mockToastContent,
	key: "1",
};

const mockState: ToastState<ToastContent> = {
	visibleToasts: [mocktoast],
	add: vi.fn(),
	close: vi.fn(),
	pauseAll: vi.fn(),
	resumeAll: vi.fn(),
};

function renderToast() {
	return render(<Toast state={mockState} index={0} toast={mocktoast} />);
}

describe("Toast Component", () => {
	test("renders correctly", async () => {
		const { getByText, getByTestId } = renderToast();

		getByText("Test Title");
		getByText("Test Description");
		getByTestId(/infoicon/i);
	});

	test("renders the correct icon based on variant", async () => {
		const { getByTestId, rerender } = renderToast();

		expect(getByTestId(/infoicon/i)).toBeInTheDocument();

		rerender(
			<Toast
				state={mockState}
				index={0}
				toast={{
					...mocktoast,
					content: { ...mockToastContent, variant: "error" },
				}}
			/>,
		);
		expect(getByTestId(/erroricon/i)).toBeInTheDocument();

		rerender(
			<Toast
				state={mockState}
				index={0}
				toast={{
					...mocktoast,
					content: { ...mockToastContent, variant: "warning" },
				}}
			/>,
		);
		expect(getByTestId(/warningicon/i)).toBeInTheDocument();

		rerender(
			<Toast
				state={mockState}
				index={0}
				toast={{
					...mocktoast,
					content: { ...mockToastContent, variant: "success" },
				}}
			/>,
		);
		expect(getByTestId(/SuccessCircleIcon/i)).toBeInTheDocument();
	});

	test("calls remove function when close button is clicked", async () => {
		const { getByRole, user } = renderToast();

		const closeButton = getByRole("button");
		await user.click(closeButton);

		expect(mockState.close).toHaveBeenCalled();
	});

	test("doesn't violate any accessibility rules", async () => {
		const { container } = renderToast();
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
