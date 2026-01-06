import { test, describe, expect, vi, beforeEach } from "vitest";
import { render } from "@/test/utilities";
import { axe } from "jest-axe";
import { buildTicketItemWrapper, TicketItemWrapperProps } from "./utility";
import { generateTicket } from "@/__mocks__/game";
import {
	GameTicket,
	ParticipantRole,
	TicketType,
} from "@/src/domain/entities/game";
import { TicketItemFullView } from "../components/ticket-item-full-view";
import { ComponentProps } from "react";
import { DeepPartial } from "@/src/shared/lib";

describe("TicketItemFullView component", () => {
	beforeEach(() => {
		onTicketClose.mockClear();
		deleteTicket.mockClear();
		updateTicketById.mockClear();
	});

	test("renders correctly", async () => {
		const { unmount } = renderComponent({});
		expect(() => unmount()).not.toThrow();
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container } = renderComponent({});
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});

	test("calls onClose when collapse button is clicked", async () => {
		const { getByTestId, user } = renderComponent({});
		const collapseButton = getByTestId("collapse-button");
		await user.click(collapseButton);
		expect(onTicketClose).toHaveBeenCalled();
	});

	test("triggers delete option action in ticket menu when current user is master", async () => {
		const { getByText, getByTestId, user } = renderComponent({});
		const optionsButton = getByTestId("ticket-item-menu");
		await user.click(optionsButton);
		const deleteOption = getByText("Delete");
		await user.click(deleteOption);
		expect(openModalFn).toHaveBeenNthCalledWith(
			1,
			expect.objectContaining({ onConfirm: deleteTicket }),
		);
	});

	test("triggers updateTicketById with correct parameters when title edited", async () => {
		const { getByText, getByDisplayValue, user } = renderComponent({
			componentProps: { isEditable: true },
		});
		const titleElement = getByText("Test Ticket");
		await user.click(titleElement);
		const inputElement = getByDisplayValue("Test Ticket");
		await user.type(inputElement, "Updated Title");
		await user.click(document.body);
		expect(updateTicketById).toHaveBeenNthCalledWith(
			1,
			"test-game-id",
			"test-ticket-id",
			expect.objectContaining({ title: "Test TicketUpdated Title" }),
		);
	});

	test("triggers updateTicketById with correct parameters when description edited", async () => {
		const { getByText, getByDisplayValue, getByTestId, user } =
			renderComponent({
				componentProps: { isEditable: true },
			});
		const descriptionElement = getByText("Test Description");
		await user.click(descriptionElement);
		const inputElement = getByDisplayValue("Test Description");
		await user.type(inputElement, "Updated Description");
		const confirmBtn = getByTestId("ticket-description-confirm-button");
		await user.click(confirmBtn);
		expect(updateTicketById).toHaveBeenNthCalledWith(
			1,
			"test-game-id",
			"test-ticket-id",
			expect.objectContaining({
				description: "Test DescriptionUpdated Description",
			}),
		);
	});

	test("triggers updateTicketById with correct parameters when estimation edited", async () => {
		const { getByTestId, user } = renderComponent({
			componentProps: { isEditable: true },
		});
		const estimation = getByTestId("ticket-estimation-read-view");
		await user.click(estimation);
		const inputElement = getByTestId("ticket-estimation-editor");
		await user.clear(inputElement);
		await user.type(inputElement, "2");
		const confirmBtn = getByTestId("ticket-estimation-confirm-button");
		await user.click(confirmBtn);
		expect(updateTicketById).toHaveBeenNthCalledWith(
			1,
			"test-game-id",
			"test-ticket-id",
			expect.objectContaining({
				estimation: "2",
			}),
		);
	});

	test("doesn't allow to change fields when isEditable=false", async () => {
		const { getByTestId } = renderComponent({
			componentProps: { isEditable: false },
		});
		const title = getByTestId("ticket-title-read-view");
		const description = getByTestId("ticket-description-read-view");
		const estimation = getByTestId("ticket-estimation-read-view");
		const ticketTypeSelector = getByTestId("ticket-type-selector");
		expect(title).toBeDisabled();
		expect(description).toBeDisabled();
		expect(estimation).toBeDisabled();
		expect(ticketTypeSelector).toBeDisabled();
	});

	describe("empty state when isEditable=true", () => {
		test("description has Empty placeholder", async () => {
			const { getByTestId } = renderComponent({
				componentProps: {
					isEditable: false,
					data: { description: "" },
				},
			});
			const description = getByTestId("ticket-description-read-view");
			expect(description).toHaveTextContent("Empty");
		});

		test("estimation has None placeholder", async () => {
			const { getByTestId } = renderComponent({
				componentProps: {
					isEditable: false,
					data: { estimation: "" },
				},
			});
			const estimation = getByTestId("ticket-estimation-read-view");
			expect(estimation).toHaveTextContent("-");
		});
	});
});

const openModalFn = vi.fn();
const onTicketClose = vi.fn();
const deleteTicket = vi.fn();
const updateTicketById = vi.fn(
	async (gameId: string, ticketId: string, data: GameTicket) => {
		return { ...data, id: ticketId, gameId };
	},
);

type Props = {
	wrapperProps?: TicketItemWrapperProps;
	componentProps?: DeepPartial<ComponentProps<typeof TicketItemFullView>>;
};

function renderComponent(props: Props) {
	const {
		wrapperProps = {
			currentRole: ParticipantRole.Master,
			openModalFn,
			apiFake: {
				game: {
					ticket: {
						updateTicketById,
					},
				},
			},
		},
		componentProps,
	} = props;

	return render(
		<TicketItemFullView
			data={{
				...generateTicket({
					id: "test-ticket-id",
					title: "Test Ticket",
					description: "Test Description",
					type: TicketType.Story,
					identifier: "TST-1",
					estimation: "5",
				}),
				...componentProps?.data,
			}}
			isEditable={componentProps?.isEditable || false}
			onClose={onTicketClose}
			deleteTicket={deleteTicket}
		/>,
		{
			wrapper: buildTicketItemWrapper(wrapperProps),
		},
	);
}
