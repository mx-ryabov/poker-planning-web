/**
 * @jest-environment jsdom
 */
import { test, describe, expect, vi, beforeEach, afterEach } from "vitest";
import { act, render, waitFor, within } from "@/test/utilities";
import { axe } from "jest-axe";
import { TicketCreator, TicketCreatorProps } from "../ticket-creator";
import { TicketType } from "@/_src/shared/api/game-api/dto";

function renderComponent({ onSubmit = vi.fn() }: Partial<TicketCreatorProps>) {
	return render(<TicketCreator onSubmit={onSubmit} />);
}

describe("Ticket Creator", () => {
	beforeEach(() => {
		vi.useFakeTimers({ shouldAdvanceTime: true });
	});

	afterEach(() => {
		vi.runOnlyPendingTimers();
		vi.useRealTimers();
	});

	test("renders successfully", async () => {
		const { unmount, getByRole } = renderComponent({});

		getByRole("button");
		expect(() => unmount()).not.toThrow();
	});

	describe("Opening", () => {
		test("opens a creation form by clicking on the ticket", async () => {
			const { user, getByRole, getByTestId } = renderComponent({});

			const formOpener = getByRole("button");
			await user.click(formOpener);
			const form = getByTestId("ticket-creator-form");
			within(form).getByTestId("ticket-type-selector");
			within(form).getByRole("textbox");
		});

		test("closes an opened creation form when clicking outside", async () => {
			const { user, getByRole, queryByTestId } = renderComponent({});

			const formOpener = getByRole("button");
			await user.click(formOpener);
			expect(queryByTestId("ticket-creator-form")).toBeInTheDocument();
			await user.click(document.documentElement);
			expect(
				queryByTestId("ticket-creator-form"),
			).not.toBeInTheDocument();
		});
	});

	describe("Focus Management", () => {
		test("focuses on input once opened", async () => {
			const { user, getByRole } = renderComponent({});

			const formOpener = getByRole("button");
			await user.click(formOpener);
			const textField = getByRole("textbox");

			expect(textField).toHaveFocus();
		});

		test("focuses on the text field after ticket type selection", async () => {
			const { user, getByRole, getByTestId, getAllByRole } =
				renderComponent({});

			const formOpener = getByRole("button");
			await user.click(formOpener);
			const textField = getByRole("textbox");
			const typeSelector = getByTestId("ticket-type-selector");
			await user.click(typeSelector);

			expect(textField).not.toHaveFocus();

			const types = getAllByRole("menuitemradio");
			await user.click(types[1]);

			expect(textField).toHaveFocus();
		});
	});

	describe("Form Interaction", () => {
		test("has ticket type selector and text field when empty", async () => {
			const { user, getByRole, getByTestId } = renderComponent({});

			const formOpener = getByRole("button");
			await user.click(formOpener);
			const form = getByTestId("ticket-creator-form");
			within(form).getByTestId("ticket-type-selector");
			within(form).getByRole("textbox");
		});

		test("shows submit button when the text field has at least one character", async () => {
			const { user, getByRole, queryByTestId } = renderComponent({});

			const formOpener = getByRole("button");
			await user.click(formOpener);
			const textField = getByRole("textbox");
			expect(
				queryByTestId("ticket-creator-submit"),
			).not.toBeInTheDocument();
			await user.type(textField, "ticket name");
			expect(queryByTestId("ticket-creator-submit")).toBeInTheDocument();
		});

		test("hides submit button when the text field doesn't have any characters", async () => {
			const { user, getByRole, queryByTestId } = renderComponent({});

			const formOpener = getByRole("button");
			await user.click(formOpener);
			const textField = getByRole("textbox");
			expect(
				queryByTestId("ticket-creator-submit"),
			).not.toBeInTheDocument();
			await user.type(textField, "ticket name");
			expect(queryByTestId("ticket-creator-submit")).toBeInTheDocument();
			await user.clear(textField);
			expect(
				queryByTestId("ticket-creator-submit"),
			).not.toBeInTheDocument();
		});

		test("submits a form data when valid and the submit button is pressed", async () => {
			const onSubmitFn = vi.fn().mockReturnValue({ ok: true });
			const { user, getByRole, getByTestId, getAllByRole } =
				renderComponent({ onSubmit: onSubmitFn });

			const formOpener = getByRole("button");
			await user.click(formOpener);

			const textField = getByRole("textbox");
			await user.type(textField, "ticket name");

			const typeSelector = getByTestId("ticket-type-selector");
			await user.click(typeSelector);

			const types = getAllByRole("menuitemradio");
			await user.click(types[1]);

			const submitBtn = getByTestId("ticket-creator-submit");
			await user.click(submitBtn);

			expect(onSubmitFn).toHaveBeenNthCalledWith(1, {
				type: TicketType.Task,
				title: "ticket name",
			});
		});

		test("submits a form data when valid, the text field is focused and Enter is pressed", async () => {
			const onSubmitFn = vi.fn().mockReturnValue({ ok: true });
			const { user, getByRole, getByTestId, getAllByRole } =
				renderComponent({ onSubmit: onSubmitFn });

			const formOpener = getByRole("button");
			await user.click(formOpener);

			const typeSelector = getByTestId("ticket-type-selector");
			await user.click(typeSelector);

			const types = getAllByRole("menuitemradio");
			await user.click(types[1]);

			const textField = getByRole("textbox");
			await user.type(textField, "ticket name");

			await user.keyboard("[Enter]");

			expect(onSubmitFn).toHaveBeenNthCalledWith(1, {
				type: TicketType.Task,
				title: "ticket name",
			});
		});
	});

	describe("Loading State Handling", () => {
		test("disables the text field and shows pending state in the submit button when the form submitting", async () => {
			const onSubmitFn = vi.fn(
				async (): Promise<{ ok: boolean; error?: string }> => {
					return new Promise((resolve) => {
						setTimeout(() => {
							resolve({ ok: true });
						}, 1000);
					});
				},
			);
			const { user, getByRole, getByTestId, getByText } = renderComponent(
				{
					onSubmit: onSubmitFn,
				},
			);

			const formOpener = getByRole("button");
			await user.click(formOpener);

			const textField = getByRole("textbox");
			await user.type(textField, "ticket name");

			const submitBtn = getByTestId("ticket-creator-submit");

			await user.keyboard("[Enter]");
			expect(submitBtn).toBeDisabled();
			expect(textField).toBeDisabled();
		});
	});

	describe("Validation Handling", () => {
		test("do nothing if the text field is empty and Enter pressed", async () => {
			const onSubmitFn = vi.fn(async () => ({
				ok: false,
				error: "Server Error",
			}));
			const { user, getByRole } = renderComponent({
				onSubmit: onSubmitFn,
			});

			const formOpener = getByRole("button");
			await user.click(formOpener);

			await user.keyboard("[Enter]");

			expect(onSubmitFn).toHaveBeenCalledTimes(0);
		});

		test("shows a vlidation error when the text field is empty and dirty", async () => {
			const { user, getByRole, getByTestId } = renderComponent({});

			const formOpener = getByRole("button");
			await user.click(formOpener);

			const textField = getByRole("textbox");
			await user.type(textField, "ticket name");
			await user.clear(textField);

			await waitFor(async () => {
				getByTestId("field-error-icon");
			});
		});

		test("shows a vlidation error when it's returned from the server", async () => {
			const onSubmitFn = vi.fn(async () => ({
				ok: false,
				error: "Server Error",
			}));
			const { user, getByRole, getByTestId } = renderComponent({
				onSubmit: onSubmitFn,
			});

			const formOpener = getByRole("button");
			await user.click(formOpener);

			const textField = getByRole("textbox");
			await user.type(textField, "ticket name");

			await user.keyboard("[Enter]");

			await waitFor(async () => {
				getByTestId("field-error-icon");
			});
		});
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container, getByRole, user } = renderComponent({});

		const formOpener = getByRole("button");
		await user.click(formOpener);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
