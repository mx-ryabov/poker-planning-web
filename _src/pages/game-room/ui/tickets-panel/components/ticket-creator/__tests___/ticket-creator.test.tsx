/**
 * @jest-environment jsdom
 */
import { test, describe, expect, vi, beforeEach, afterEach } from "vitest";
import { act, render, waitFor, within } from "@/test/utilities";
import { axe } from "jest-axe";
import { TicketCreator, TicketCreatorProps } from "../ticket-creator";
import { GameTicket, TicketType } from "@/_src/shared/api/game-api/dto";
import {
	GameRoomFakeProviderWrapper,
	GameRoomFakeProviderWrapperProps,
} from "@/_src/pages/game-room/__mocks__";
import { generateTicket } from "@/_src/pages/game-room/__tests__/game-state-store.test-helpers";
import {
	generateUnknownErrorRes,
	generateValidationErrorRes,
} from "@/_src/shared/mocks";

function renderComponent({
	onSubmitSucceed = vi.fn(),
	...wrapperProps
}: Partial<TicketCreatorProps> & GameRoomFakeProviderWrapperProps) {
	return render(<TicketCreator onSubmitSucceed={onSubmitSucceed} />, {
		wrapper: GameRoomFakeProviderWrapper(wrapperProps),
	});
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
			const { user, getByTestId } = renderComponent({});

			const formToggler = getByTestId("ticket-creator-toggler");
			await user.click(formToggler);
			const form = getByTestId("ticket-creator-form");
			within(form).getByTestId("ticket-type-selector");
			within(form).getByRole("textbox");
		});

		test("closes an opened creation form when clicking on close button", async () => {
			const { user, getByTestId, queryByTestId } = renderComponent({});

			const formToggler = getByTestId("ticket-creator-toggler");
			await user.click(formToggler);
			expect(queryByTestId("ticket-creator-form")).toBeInTheDocument();
			await user.click(formToggler);
			expect(
				queryByTestId("ticket-creator-form"),
			).not.toBeInTheDocument();
		});
	});

	describe("Focus Management", () => {
		test("focuses on input once opened", async () => {
			const { user, getByRole, getByTestId } = renderComponent({});

			const formToggler = getByTestId("ticket-creator-toggler");
			await user.click(formToggler);
			const textField = getByRole("textbox");

			expect(textField).toHaveFocus();
		});

		test("focuses on the text field after ticket type selection", async () => {
			const { user, getByRole, getByTestId, getAllByRole, debug } =
				renderComponent({});

			const formToggler = getByTestId("ticket-creator-toggler");
			await user.click(formToggler);
			const textField = getByRole("textbox");
			const typeSelector = getByTestId("ticket-type-selector");
			await user.click(typeSelector);

			expect(textField).not.toHaveFocus();

			const types = getAllByRole("menuitemradio");
			await act(async () => await user.click(types[1]));

			expect(textField).toHaveFocus();
		});
	});

	describe("Form Interaction", () => {
		test("has ticket type selector and text field when empty", async () => {
			const { user, getByTestId } = renderComponent({});

			const formToggler = getByTestId("ticket-creator-toggler");
			await user.click(formToggler);
			const form = getByTestId("ticket-creator-form");
			within(form).getByTestId("ticket-type-selector");
			within(form).getByRole("textbox");
		});

		test("shows submit button when the text field has at least one character", async () => {
			const { user, getByRole, queryByTestId, getByTestId } =
				renderComponent({});

			const formToggler = getByTestId("ticket-creator-toggler");
			await user.click(formToggler);
			const textField = getByRole("textbox");
			expect(
				queryByTestId("ticket-creator-submit"),
			).not.toBeInTheDocument();
			await user.type(textField, "ticket name");
			expect(queryByTestId("ticket-creator-submit")).toBeInTheDocument();
		});

		test("hides submit button when the text field doesn't have any characters", async () => {
			const { user, getByRole, queryByTestId, getByTestId } =
				renderComponent({});

			const formToggler = getByTestId("ticket-creator-toggler");
			await user.click(formToggler);
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
			const onSubmitSucceedFn = vi.fn();
			const createTicketFn = vi.fn();
			const { user, getByRole, getByTestId, getAllByRole } =
				renderComponent({
					onSubmitSucceed: onSubmitSucceedFn,
					apiProps: {
						game: { ticket: { createTicket: createTicketFn } },
					},
				});

			const formToggler = getByTestId("ticket-creator-toggler");
			await user.click(formToggler);

			const textField = getByRole("textbox");
			await user.type(textField, "ticket name");

			const typeSelector = getByTestId("ticket-type-selector");
			await user.click(typeSelector);

			const types = getAllByRole("menuitemradio");
			await user.click(types[1]);

			const submitBtn = getByTestId("ticket-creator-submit");
			await user.click(submitBtn);

			expect(onSubmitSucceedFn).toHaveBeenCalledOnce();
			expect(createTicketFn).toHaveBeenNthCalledWith(1, "test-game-id", {
				title: "ticket name",
				type: TicketType.Task,
			});
		});

		test("submits a form data when valid, the text field is focused and Enter is pressed", async () => {
			const onSubmitSucceedFn = vi.fn();
			const createTicketFn = vi.fn();
			const { user, getByRole, getByTestId, getAllByRole } =
				renderComponent({
					onSubmitSucceed: onSubmitSucceedFn,
					apiProps: {
						game: { ticket: { createTicket: createTicketFn } },
					},
				});

			const formToggler = getByTestId("ticket-creator-toggler");
			await user.click(formToggler);

			const typeSelector = getByTestId("ticket-type-selector");
			await user.click(typeSelector);

			const types = getAllByRole("menuitemradio");
			await user.click(types[1]);

			const textField = getByRole("textbox");
			await user.type(textField, "ticket name");

			await user.keyboard("[Enter]");

			expect(onSubmitSucceedFn).toHaveBeenCalledOnce();
			expect(createTicketFn).toHaveBeenNthCalledWith(1, "test-game-id", {
				title: "ticket name",
				type: TicketType.Task,
			});
		});
	});

	describe("Loading State Handling", () => {
		test("disables the text field and shows pending state in the submit button when the form submitting", async () => {
			const createTicketFn = vi.fn(
				async (gameId, ticketData): Promise<GameTicket> => {
					return new Promise((resolve) => {
						setTimeout(() => {
							resolve(generateTicket({ ...ticketData }));
						}, 1000);
					});
				},
			);
			const { user, getByRole, getByTestId } = renderComponent({
				onSubmitSucceed: vi.fn(),
				apiProps: {
					game: { ticket: { createTicket: createTicketFn } },
				},
			});

			const formToggler = getByTestId("ticket-creator-toggler");
			await user.click(formToggler);

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
			const onSubmitSucceedFn = vi.fn();
			const { user, getByTestId } = renderComponent({
				onSubmitSucceed: onSubmitSucceedFn,
			});

			const formToggler = getByTestId("ticket-creator-toggler");
			await user.click(formToggler);

			await user.keyboard("[Enter]");

			expect(onSubmitSucceedFn).toHaveBeenCalledTimes(0);
		});

		test("shows a vlidation error when the text field is empty and dirty", async () => {
			const { user, getByRole, getByTestId } = renderComponent({});

			const formToggler = getByTestId("ticket-creator-toggler");
			await user.click(formToggler);

			const textField = getByRole("textbox");
			await user.type(textField, "ticket name");
			await user.clear(textField);

			await waitFor(async () => {
				getByTestId("field-error-icon");
			});
		});

		test("shows a vlidation error when it's returned from the server", async () => {
			const createTicketFn = vi.fn(async () => {
				throw generateValidationErrorRes("error", { title: ["error"] })
					.error;
			});
			const { user, getByRole, getByTestId } = renderComponent({
				onSubmitSucceed: vi.fn(),
				apiProps: {
					game: { ticket: { createTicket: createTicketFn } },
				},
			});

			const formToggler = getByTestId("ticket-creator-toggler");
			await user.click(formToggler);

			const textField = getByRole("textbox");
			await user.type(textField, "ticket name");

			await user.keyboard("[Enter]");

			await waitFor(async () => {
				getByTestId("field-error-icon");
			});
		});
	});

	test("shows an error boundary fallback when a server returns unknown error", async () => {
		const createTicketFn = vi.fn(async () => {
			throw generateUnknownErrorRes("Test Error").error;
		});

		const { user, getByRole, getByTestId } = renderComponent({
			onSubmitSucceed: vi.fn(),
			apiProps: {
				game: { ticket: { createTicket: createTicketFn } },
			},
		});

		const formToggler = getByTestId("ticket-creator-toggler");
		await user.click(formToggler);

		const textField = getByRole("textbox");
		await user.type(textField, "ticket name");

		await act(() => user.keyboard("[Enter]"));

		getByTestId("error-fallback");
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container, getByTestId, user } = renderComponent({});

		const formToggler = getByTestId("ticket-creator-toggler");
		await user.click(formToggler);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
