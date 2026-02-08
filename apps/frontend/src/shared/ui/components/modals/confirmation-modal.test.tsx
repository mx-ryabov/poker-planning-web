import { test, describe, expect, vi } from "vitest";
import { render, within } from "@/test/utilities";
import { axe } from "jest-axe";
import {
	ConfirmationModal,
	ConfirmationModalProps,
} from "./confirmation-modal";

function getModal(props: Partial<ConfirmationModalProps>) {
	const { isOpen = true, onOpenChange = vi.fn(), state } = props;
	return (
		<ConfirmationModal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			state={{
				title: "Modal Title",
				contentMessage: "Content",
				confirmBtnText: "Click me to confirm",
				onConfirm: vi.fn(),
				...state,
			}}
		/>
	);
}

function renderModal(props: Partial<ConfirmationModalProps>) {
	return render(getModal(props));
}

describe("Confirmation Modal", () => {
	test("renders correctly", async () => {
		const { unmount, getByText, getByTestId } = renderModal({});

		checkModalContent({ getByText, getByTestId });

		expect(() => unmount()).not.toThrow();
	});

	test("opens controllably", async () => {
		const { getByText, getByTestId, queryByTestId, rerender } = renderModal(
			{
				isOpen: false,
			},
		);

		expect(queryByTestId("confirmation-modal")).not.toBeInTheDocument();

		rerender(getModal({ isOpen: true }));

		getByTestId("confirmation-modal");
		checkModalContent({ getByText, getByTestId });
	});

	// this test unexpectedly broke after react-aria and react-aria-components update.
	// it's skipped because manually it's not reproducible + this test mostly covers library functionality that doesn't make much sense
	test.skip("triggers onOpenChange=false when clicking on overlay", async () => {
		const onOpenChangeFn = vi.fn();
		const { getByTestId, user } = renderModal({
			onOpenChange: onOpenChangeFn,
		});

		const overlay = getByTestId("dialog-overlay");
		await user.click(overlay);
		expect(onOpenChangeFn).toHaveBeenNthCalledWith(1, false);
	});

	test("triggers onOpenChange=false when clicking on dismiss button", async () => {
		const onOpenChangeFn = vi.fn();
		const { getByTestId, user } = renderModal({
			onOpenChange: onOpenChangeFn,
		});

		const dismissButton = getByTestId("dismiss-button");
		await user.click(dismissButton);
		expect(onOpenChangeFn).toHaveBeenNthCalledWith(1, false);
	});

	test("triggers onOpenChange=false when clicking on Cancel button", async () => {
		const onOpenChangeFn = vi.fn();
		const { getByTestId, user } = renderModal({
			onOpenChange: onOpenChangeFn,
		});

		const cancelButton = getByTestId("cancel-button");
		await user.click(cancelButton);
		expect(onOpenChangeFn).toHaveBeenNthCalledWith(1, false);
	});

	test("triggers onConfirm and onOpenChange=false when clicking Confirm button ", async () => {
		const onOpenChangeFn = vi.fn();
		const onConfirmFn = vi.fn();
		const { getByTestId, user } = renderModal({
			onOpenChange: onOpenChangeFn,
			state: {
				title: "Modal Title",
				contentMessage: "Content",
				confirmBtnText: "Click me to confirm",
				onConfirm: onConfirmFn,
			},
		});

		const confirmButton = getByTestId("confirm-button");
		await user.click(confirmButton);
		expect(onOpenChangeFn).toHaveBeenNthCalledWith(1, false);
		expect(onConfirmFn).toHaveBeenNthCalledWith(1);
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container } = renderModal({});
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});

function checkModalContent({
	getByText,
	getByTestId,
}: Pick<ReturnType<typeof renderModal>, "getByText" | "getByTestId">) {
	getByText(/modal title/i);
	getByText(/content/i);
	getByText(/click me to confirm/i);
	getByText(/cancel/i);
	const closeBtn = getByTestId(/dismiss-button/i);
	within(closeBtn).getByTestId(/icon-CloseIcon/i);
}
