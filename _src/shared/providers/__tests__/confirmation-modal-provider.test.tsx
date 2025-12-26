import { test, describe, expect, vi } from "vitest";
import { render } from "@/test/utilities";

import { Button } from "@/_src/shared/ui/components/button";
import {
	ConfirmationModalProvider,
	useConfirmationModal,
} from "../confirmation-modal-provider";

type Props = {
	title?: string;
	contentMessage?: string;
	confirmBtnText?: string;
	onConfirm: () => void;
};
function ModalController({
	title,
	contentMessage,
	confirmBtnText,
	onConfirm,
}: Props) {
	const { open } = useConfirmationModal();
	return (
		<Button
			data-testid="opener"
			onPress={() =>
				open({
					title: title || "Title",
					contentMessage: contentMessage || "Description",
					confirmBtnText: confirmBtnText || "Confirm",
					onConfirm,
				})
			}
		>
			Open Modal
		</Button>
	);
}
function getComponent(props: Props) {
	return (
		<ConfirmationModalProvider>
			<ModalController {...props} />
		</ConfirmationModalProvider>
	);
}

function renderComponent(props: Props) {
	return render(getComponent(props));
}

describe("Confirmation Modal Provider", () => {
	test("renders correctly", async () => {
		const { unmount, getByTestId, queryByTestId, user } = renderComponent({
			onConfirm: vi.fn(),
		});
		const opener = getByTestId("opener");
		const modal = queryByTestId("confirmation-modal");

		expect(modal).not.toBeInTheDocument();

		await user.click(opener);
		getByTestId("confirmation-modal");

		expect(() => unmount()).not.toThrow();
	});

	test("uses the provided state and clean up the previous one when is opened more than one time", async () => {
		const {
			getByTestId,
			getByText,
			user,
			queryByTestId,
			rerender,
			queryByText,
		} = renderComponent({
			title: "First Title",
			contentMessage: "First Description",
			confirmBtnText: "First Confirm",
			onConfirm: vi.fn(),
		});
		const opener = getByTestId("opener");
		await user.click(opener);
		getByText("First Title");
		getByText("First Description");
		getByText("First Confirm");

		const cancel = getByTestId("cancel-button");
		await user.click(cancel);
		const modal = queryByTestId("confirmation-modal");

		expect(modal).not.toBeInTheDocument();

		rerender(
			getComponent({
				title: "Second Title",
				contentMessage: "Second Description",
				confirmBtnText: "Second Confirm",
				onConfirm: vi.fn(),
			}),
		);
		await user.click(opener);
		const title = queryByText("First Title");
		expect(title).not.toBeInTheDocument();
		const description = queryByText("First Description");
		expect(description).not.toBeInTheDocument();
		const confirmBtn = queryByText("First Confirm");
		expect(confirmBtn).not.toBeInTheDocument();

		getByText("Second Title");
		getByText("Second Description");
		getByText("Second Confirm");
	});

	test("opens the modal with the correct state", async () => {
		const onConfirm = vi.fn();
		const { getByTestId, getByText, user } = renderComponent({
			title: "Test Title",
			contentMessage: "Test Description",
			confirmBtnText: "Test Confirm",
			onConfirm,
		});
		const opener = getByTestId("opener");

		await user.click(opener);

		getByText("Test Title");
		getByText("Test Description");
		getByText("Test Confirm");
	});

	test("calls onConfirm when confirm button is clicked", async () => {
		const onConfirm = vi.fn();
		const { getByTestId, user } = renderComponent({
			title: "Test Title",
			contentMessage: "Test Description",
			confirmBtnText: "Test Confirm",
			onConfirm,
		});
		const opener = getByTestId("opener");

		await user.click(opener);

		const confirmButton = getByTestId("confirm-button");
		await user.click(confirmButton);

		expect(onConfirm).toHaveBeenCalled();
	});

	test("closes the modal when cancel button is clicked", async () => {
		const { getByTestId, queryByTestId, user } = renderComponent({
			title: "Test Title",
			contentMessage: "Test Description",
			confirmBtnText: "Test Confirm",
			onConfirm: vi.fn(),
		});
		const opener = getByTestId("opener");

		await user.click(opener);

		const cancelButton = getByTestId("cancel-button");
		await user.click(cancelButton);

		const modal = queryByTestId("confirmation-modal");
		expect(modal).not.toBeInTheDocument();
	});

	test("throws error when useConfirmationModal is used outside of ConfirmationModalProvider", () => {
		const TestComponent = () => {
			useConfirmationModal();
			return null;
		};

		expect(() => render(<TestComponent />)).toThrow(
			"useConfirmationModal must be within ConfirmationModalProvider",
		);
	});
});
