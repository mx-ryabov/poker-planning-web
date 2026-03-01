/**
 * @jest-environment jsdom
 */
import "@/__mocks__/intersection-observer";
import { test, describe, expect, vi, beforeEach } from "vitest";
import { act, render, within, waitFor } from "@/test/utilities";
import { axe } from "jest-axe";
import {
	generateGame,
	generateParticipant,
	generateTicket,
} from "@/__mocks__/game";
import {
	CreateTicketForGameRequest,
	ParticipantRole,
	TicketType,
} from "@/src/domain/entities/game";
import { TicketsPanel } from "./tickets-panel";
import { GameRoomFakeProviderWrapper } from "../../__mocks__";
import { Fragment } from "react/jsx-runtime";
import { __clearStorageCache__TestOnly } from "@/src/shared/lib";

describe("Tickets Panel", () => {
	beforeEach(() => {
		__clearStorageCache__TestOnly();
		localStorage.clear();
	});

	test("renders succsesfully", async () => {
		const { unmount, getAllByTestId, getByTestId, user } =
			renderComponent();
		const ticketItems = getAllByTestId(/ticket-list-item/i);
		const ticketCreatorOpener = getByTestId("ticket-creator-toggler");

		expect(ticketItems).toHaveLength(6);
		await user.click(ticketCreatorOpener);
		expect(() => unmount()).not.toThrow();
	});

	test("creates a ticket and adds it to the list", async () => {
		const { getAllByTestId, getByTestId, user } = renderComponent();
		const ticketCreatorOpener = getByTestId("ticket-creator-toggler");

		await user.click(ticketCreatorOpener);
		const ticketCreatorTextField = within(
			getByTestId("ticket-creator-form"),
		).getByRole("textbox");
		await user.type(ticketCreatorTextField, "New Ticket");

		expect(getAllByTestId(/ticket-list-item/i)).toHaveLength(6);
		await user.keyboard("[Enter]");
		expect(getAllByTestId(/ticket-list-item/i)).toHaveLength(7);
		expect(createTicket).toHaveBeenNthCalledWith(1, "test-game-id", {
			title: "New Ticket",
			type: TicketType.Story,
		});
	});

	test("expands/opens a ticket on click", async () => {
		const { getByTestId, user } = renderComponent();

		const ticketToOpen = getByTestId("ticket-list-item-ticket-id-1");
		await user.click(ticketToOpen);

		expect(
			getByTestId("ticket-list-item-full-view-ticket-id-1"),
		).toBeInTheDocument();
	});

	test("collapses/closes a ticket on collapse button click", async () => {
		const { getByTestId, queryByTestId, user } = renderComponent();

		const ticketToOpen = getByTestId("ticket-list-item-ticket-id-1");
		await user.click(ticketToOpen);

		const expandedTicket = getByTestId(
			"ticket-list-item-full-view-ticket-id-1",
		);
		const collapseBtn =
			within(expandedTicket).getByTestId("collapse-button");
		await act(() => user.click(collapseBtn));

		expect(getByTestId("ticket-list-item-ticket-id-1")).toBeInTheDocument();
		expect(
			queryByTestId("ticket-list-item-full-view-ticket-id-1"),
		).not.toBeInTheDocument();
	});

	describe("Control Bar Togglers", () => {
		test("shows sorting panel when sort toggle is clicked", async () => {
			const { user, getByTestId, queryByTestId } = renderComponent();

			expect(
				queryByTestId("tickets-sorting-trigger"),
			).not.toBeInTheDocument();

			const sortToggle = getByTestId("tickets-sorting-toggle");
			await user.click(sortToggle);

			await waitFor(() => {
				expect(
					getByTestId("tickets-sorting-trigger"),
				).toBeInTheDocument();
			});
		});

		test("shows filter panel when filter toggle is clicked", async () => {
			const { user, getByTestId, queryByTestId } = renderComponent();

			expect(
				queryByTestId("tickets-filter-by-type-trigger"),
			).not.toBeInTheDocument();

			const filterToggle = getByTestId("tickets-filter-toggle");
			await user.click(filterToggle);

			await waitFor(() => {
				expect(
					getByTestId("tickets-filter-by-type-trigger"),
				).toBeInTheDocument();
				expect(
					getByTestId("tickets-filter-by-status-trigger"),
				).toBeInTheDocument();
			});
		});

		test("shows search input when search toggle is clicked", async () => {
			const { user, getByTestId, queryByTestId } = renderComponent();

			expect(
				queryByTestId("tickets-text-filter-input"),
			).not.toBeInTheDocument();

			const searchToggle = getByTestId("tickets-search-toggle");
			await user.click(searchToggle);

			expect(queryByTestId("tickets-text-filter-input")).toBeVisible();
		});

		test("hides panels when togglers are clicked again", async () => {
			const { user, getByTestId, queryByTestId } = renderComponent();

			const sortToggle = getByTestId("tickets-sorting-toggle");

			await user.click(sortToggle);
			await waitFor(() => {
				expect(
					getByTestId("tickets-sorting-trigger"),
				).toBeInTheDocument();
			});

			await user.click(sortToggle);
			await waitFor(() => {
				expect(
					queryByTestId("tickets-sorting-trigger"),
				).not.toBeInTheDocument();
			});
		});
	});

	describe("Text Search", () => {
		test("filters tickets by title text", async () => {
			const { user, getByPlaceholderText, getAllByTestId, getByTestId } =
				renderComponent();

			const searchToggle = getByTestId("tickets-search-toggle");
			await user.click(searchToggle);

			const searchInput = getByPlaceholderText("Search");
			await user.type(searchInput, "Bug");

			const ticketItems = getAllByTestId(/ticket-list-item/i);
			const ticketTexts = ticketItems.map(
				(item) => item.textContent ?? "",
			);
			expect(ticketItems).toHaveLength(2);
			expect(ticketTexts).toEqual(
				expect.arrayContaining([
					expect.stringContaining("Bug Fix"),
					expect.stringContaining("Another Bug"),
				]),
			);
		});

		test("search is case-insensitive", async () => {
			const { user, getByPlaceholderText, getAllByTestId, getByTestId } =
				renderComponent();

			const searchToggle = getByTestId("tickets-search-toggle");
			await user.click(searchToggle);

			const searchInput = getByPlaceholderText("Search");
			await user.type(searchInput, "bug");

			const ticketItems = getAllByTestId(/ticket-list-item/i);
			expect(ticketItems).toHaveLength(2);
		});

		test("shows empty state when no tickets match search", async () => {
			const {
				user,
				getByPlaceholderText,
				getByText,
				queryAllByTestId,
				getByTestId,
			} = renderComponent();

			const searchToggle = getByTestId("tickets-search-toggle");
			await user.click(searchToggle);

			const searchInput = getByPlaceholderText("Search");
			await user.type(searchInput, "nonexistent");

			expect(queryAllByTestId(/ticket-list-item/i)).toHaveLength(0);
			expect(
				getByText(/No tickets found for the selected filters/i),
			).toBeInTheDocument();
		});

		test("clears search when clear button is clicked", async () => {
			const {
				user,
				getByPlaceholderText,
				getAllByTestId,
				getByLabelText,
				getByTestId,
			} = renderComponent();

			const searchToggle = getByTestId("tickets-search-toggle");
			await user.click(searchToggle);

			const searchInput = getByPlaceholderText("Search");
			await user.type(searchInput, "Bug");

			expect(getAllByTestId(/ticket-list-item/i)).toHaveLength(2);

			const clearButton = getByLabelText("Clear text filter");
			await user.click(clearButton);

			expect(getAllByTestId(/ticket-list-item/i)).toHaveLength(6);
		});

		test("shows search indicator badge when search is applied", async () => {
			const { user, getByPlaceholderText, getByTestId } =
				renderComponent();

			const searchToggle = getByTestId("tickets-search-toggle");
			await user.click(searchToggle);

			const searchInput = getByPlaceholderText("Search");
			await user.type(searchInput, "Bug");

			await user.click(searchToggle);

			expect(getByTestId("tickets-search-indicator")).toBeInTheDocument();
		});
	});

	describe("Filter by Type", () => {
		test("filters tickets by Bug type", async () => {
			const { user, getAllByTestId, getByTestId } = renderComponent();

			const filterToggle = getByTestId("tickets-filter-toggle");
			await user.click(filterToggle);

			await waitFor(() => {
				expect(
					getByTestId("tickets-filter-by-type-trigger"),
				).toBeInTheDocument();
			});

			const typeButton = getByTestId("tickets-filter-by-type-trigger");
			await user.click(typeButton);

			const bugOption = await waitFor(() =>
				getByTestId("tickets-filter-by-type-option-2"),
			);
			await user.click(bugOption);

			const ticketItems = getAllByTestId(/ticket-list-item/i);
			const ticketTexts = ticketItems.map(
				(item) => item.textContent ?? "",
			);
			expect(ticketItems).toHaveLength(2);
			expect(ticketTexts).toEqual(
				expect.arrayContaining([
					expect.stringContaining("Bug Fix"),
					expect.stringContaining("Another Bug"),
				]),
			);
		});

		test("filters tickets by Story type", async () => {
			const { user, getAllByTestId, getByTestId } = renderComponent();

			const filterToggle = getByTestId("tickets-filter-toggle");
			await user.click(filterToggle);

			await waitFor(() => {
				expect(
					getByTestId("tickets-filter-by-type-trigger"),
				).toBeInTheDocument();
			});

			const typeButton = getByTestId("tickets-filter-by-type-trigger");
			await user.click(typeButton);

			const storyOption = await waitFor(() =>
				getByTestId("tickets-filter-by-type-option-0"),
			);
			await user.click(storyOption);

			const ticketItems = getAllByTestId(/ticket-list-item/i);
			const ticketTexts = ticketItems.map(
				(item) => item.textContent ?? "",
			);
			expect(ticketItems).toHaveLength(2);
			expect(ticketTexts).toEqual(
				expect.arrayContaining([
					expect.stringContaining("User Story"),
					expect.stringContaining("Another Story"),
				]),
			);
		});

		test("filters tickets by Task type", async () => {
			const { user, getAllByTestId, getByTestId } = renderComponent();

			const filterToggle = getByTestId("tickets-filter-toggle");
			await user.click(filterToggle);

			await waitFor(() => {
				expect(
					getByTestId("tickets-filter-by-type-trigger"),
				).toBeInTheDocument();
			});

			const typeButton = getByTestId("tickets-filter-by-type-trigger");
			await user.click(typeButton);

			const taskOption = await waitFor(() =>
				getByTestId("tickets-filter-by-type-option-1"),
			);
			await user.click(taskOption);

			const ticketItems = getAllByTestId(/ticket-list-item/i);
			const ticketTexts = ticketItems.map(
				(item) => item.textContent ?? "",
			);
			expect(ticketItems).toHaveLength(2);
			expect(ticketTexts).toEqual(
				expect.arrayContaining([
					expect.stringContaining("Task Item"),
					expect.stringContaining("Another Task"),
				]),
			);
		});

		test("clears type filter when same option selected again", async () => {
			const { user, getAllByTestId, getByTestId } = renderComponent();

			const filterToggle = getByTestId("tickets-filter-toggle");
			await user.click(filterToggle);

			await waitFor(() => {
				expect(
					getByTestId("tickets-filter-by-type-trigger"),
				).toBeInTheDocument();
			});

			const typeButton = getByTestId("tickets-filter-by-type-trigger");
			await user.click(typeButton);

			const bugOption = await waitFor(() =>
				getByTestId("tickets-filter-by-type-option-2"),
			);
			await user.click(bugOption);

			expect(getAllByTestId(/ticket-list-item/i)).toHaveLength(2);

			await user.click(typeButton);
			const bugOption2 = await waitFor(() =>
				getByTestId("tickets-filter-by-type-option-2"),
			);
			await user.click(bugOption2);

			expect(getAllByTestId(/ticket-list-item/i)).toHaveLength(6);
		});
	});

	describe("Filter by Status", () => {
		test("filters tickets to show only estimated", async () => {
			const { user, getAllByTestId, getByTestId } = renderComponent();

			const filterToggle = getByTestId("tickets-filter-toggle");
			await user.click(filterToggle);

			await waitFor(() => {
				expect(
					getByTestId("tickets-filter-by-status-trigger"),
				).toBeInTheDocument();
			});

			const statusButton = getByTestId(
				"tickets-filter-by-status-trigger",
			);
			await user.click(statusButton);

			const estimatedOption = await waitFor(() =>
				getByTestId("tickets-filter-by-status-option-estimated"),
			);
			await user.click(estimatedOption);

			const ticketItems = getAllByTestId(/ticket-list-item/i);
			expect(ticketItems).toHaveLength(4);
		});

		test("filters tickets to show only unestimated", async () => {
			const { user, getAllByTestId, getByTestId } = renderComponent();

			const filterToggle = getByTestId("tickets-filter-toggle");
			await user.click(filterToggle);

			await waitFor(() => {
				expect(
					getByTestId("tickets-filter-by-status-trigger"),
				).toBeInTheDocument();
			});

			const statusButton = getByTestId(
				"tickets-filter-by-status-trigger",
			);
			await user.click(statusButton);

			const unestimatedOption = await waitFor(() =>
				getByTestId("tickets-filter-by-status-option-unestimated"),
			);
			await user.click(unestimatedOption);

			const ticketItems = getAllByTestId(/ticket-list-item/i);
			expect(ticketItems).toHaveLength(2);
		});
	});

	describe("Combined Filters", () => {
		test("applies both type and status filters together", async () => {
			const { user, getAllByTestId, getByTestId } = renderComponent();

			const filterToggle = getByTestId("tickets-filter-toggle");
			await user.click(filterToggle);

			await waitFor(() => {
				expect(
					getByTestId("tickets-filter-by-type-trigger"),
				).toBeInTheDocument();
			});

			const typeButton = getByTestId("tickets-filter-by-type-trigger");
			await user.click(typeButton);
			const bugOption = await waitFor(() =>
				getByTestId("tickets-filter-by-type-option-2"),
			);
			await user.click(bugOption);

			const statusButton = getByTestId(
				"tickets-filter-by-status-trigger",
			);
			await user.click(statusButton);
			const estimatedOption = await waitFor(() =>
				getByTestId("tickets-filter-by-status-option-estimated"),
			);
			await user.click(estimatedOption);

			const ticketItems = getAllByTestId(/ticket-list-item/i);
			expect(ticketItems).toHaveLength(1);
			expect(ticketItems[0]).toHaveTextContent("Another Bug");
		});

		test("resets all selective filters when Reset button clicked", async () => {
			const { user, getAllByTestId, getByTestId } = renderComponent();

			const filterToggle = getByTestId("tickets-filter-toggle");
			await user.click(filterToggle);

			await waitFor(() => {
				expect(
					getByTestId("tickets-filter-by-type-trigger"),
				).toBeInTheDocument();
			});

			const typeButton = getByTestId("tickets-filter-by-type-trigger");
			await user.click(typeButton);
			const bugOption = await waitFor(() =>
				getByTestId("tickets-filter-by-type-option-2"),
			);
			await user.click(bugOption);

			expect(getAllByTestId(/ticket-list-item/i)).toHaveLength(2);

			const resetButton = getByTestId(
				"tickets-selective-filters-reset-button",
			);
			await user.click(resetButton);

			expect(getAllByTestId(/ticket-list-item/i)).toHaveLength(6);
		});

		test("shows filter count badge on toggle button", async () => {
			const { user, getByTestId } = renderComponent();

			const filterToggle = getByTestId("tickets-filter-toggle");
			await user.click(filterToggle);

			await waitFor(() => {
				expect(
					getByTestId("tickets-filter-by-type-trigger"),
				).toBeInTheDocument();
			});

			const typeButton = getByTestId("tickets-filter-by-type-trigger");
			await user.click(typeButton);
			const bugOption = await waitFor(() =>
				getByTestId("tickets-filter-by-type-option-2"),
			);
			await user.click(bugOption);

			const statusButton = getByTestId(
				"tickets-filter-by-status-trigger",
			);
			await user.click(statusButton);
			const estimatedOption = await waitFor(() =>
				getByTestId("tickets-filter-by-status-option-estimated"),
			);
			await user.click(estimatedOption);

			await user.click(filterToggle);

			await waitFor(() => {
				expect(
					getByTestId("tickets-filter-count-badge"),
				).toHaveTextContent("2");
			});
		});
	});

	describe("Sorting", () => {
		test("sorts tickets by Newest (default)", async () => {
			const { getAllByTestId } = renderComponent();

			const ticketItems = getAllByTestId(/ticket-list-item/i);
			expect(ticketItems[0]).toHaveTextContent("T-6");
			expect(ticketItems[5]).toHaveTextContent("T-1");
		});

		test("sorts tickets by Oldest", async () => {
			const { user, getAllByTestId, getByTestId } = renderComponent();

			const sortToggle = getByTestId("tickets-sorting-toggle");
			await user.click(sortToggle);

			await waitFor(() => {
				expect(
					getByTestId("tickets-sorting-trigger"),
				).toBeInTheDocument();
			});

			const sortButton = getByTestId("tickets-sorting-trigger");
			await user.click(sortButton);

			const oldestOption = await waitFor(() =>
				getByTestId("tickets-sorting-option-oldest"),
			);
			await user.click(oldestOption);

			const ticketItems = getAllByTestId(/ticket-list-item/i);
			expect(ticketItems[0]).toHaveTextContent("T-1");
			expect(ticketItems[5]).toHaveTextContent("T-6");
		});

		test("sorts tickets by estimation Low to High", async () => {
			const { user, getAllByTestId, getByTestId } = renderComponent();

			const sortToggle = getByTestId("tickets-sorting-toggle");
			await user.click(sortToggle);

			await waitFor(() => {
				expect(
					getByTestId("tickets-sorting-trigger"),
				).toBeInTheDocument();
			});

			const sortButton = getByTestId("tickets-sorting-trigger");
			await user.click(sortButton);

			const lowToHighOption = await waitFor(() =>
				getByTestId("tickets-sorting-option-lowest-to-highest"),
			);
			await user.click(lowToHighOption);

			const ticketItems = getAllByTestId(/ticket-list-item/i).map(
				(item) => item.textContent ?? "",
			);
			expect(ticketItems).toEqual(
				expect.arrayContaining([
					expect.stringContaining("Task Item"),
					expect.stringContaining("User Story"),
					expect.stringContaining("Another Story"),
					expect.stringContaining("Another Bug"),
				]),
			);
		});

		test("sorts tickets by estimation High to Low", async () => {
			const { user, getAllByTestId, getByTestId } = renderComponent();

			const sortToggle = getByTestId("tickets-sorting-toggle");
			await user.click(sortToggle);

			await waitFor(() => {
				expect(
					getByTestId("tickets-sorting-trigger"),
				).toBeInTheDocument();
			});

			const sortButton = getByTestId("tickets-sorting-trigger");
			await user.click(sortButton);

			const highToLowOption = await waitFor(() =>
				getByTestId("tickets-sorting-option-highest-to-lowest"),
			);
			await user.click(highToLowOption);

			const ticketItems = getAllByTestId(/ticket-list-item/i).map(
				(item) => item.textContent ?? "",
			);
			expect(ticketItems).toEqual(
				expect.arrayContaining([
					expect.stringContaining("Another Bug"),
					expect.stringContaining("Another Story"),
					expect.stringContaining("User Story"),
					expect.stringContaining("Task Item"),
				]),
			);
		});
	});

	describe("Sorting with Filters", () => {
		test("applies sorting to filtered results", async () => {
			const { user, getAllByTestId, getByTestId } = renderComponent();

			const filterToggle = getByTestId("tickets-filter-toggle");
			await user.click(filterToggle);

			await waitFor(() => {
				expect(
					getByTestId("tickets-filter-by-type-trigger"),
				).toBeInTheDocument();
			});

			const typeButton = getByTestId("tickets-filter-by-type-trigger");
			await user.click(typeButton);
			const bugOption = await waitFor(() =>
				getByTestId("tickets-filter-by-type-option-2"),
			);
			await user.click(bugOption);

			const sortToggle = getByTestId("tickets-sorting-toggle");
			await user.click(sortToggle);

			await waitFor(() => {
				expect(
					getByTestId("tickets-sorting-trigger"),
				).toBeInTheDocument();
			});

			const sortButton = getByTestId("tickets-sorting-trigger");
			await user.click(sortButton);

			const highToLowOption = await waitFor(() =>
				getByTestId("tickets-sorting-option-highest-to-lowest"),
			);
			await user.click(highToLowOption);

			const ticketItems = getAllByTestId(/ticket-list-item/i);
			expect(ticketItems).toHaveLength(2);
			expect(ticketItems[0]).toHaveTextContent("Another Bug");
			expect(ticketItems[1]).toHaveTextContent("Bug Fix");
		});
	});

	describe("Subtitle Display", () => {
		test("shows total count when no filters applied", async () => {
			const { getByText } = renderComponent();

			expect(getByText("6 in the list")).toBeInTheDocument();
		});

		test("shows filtered count when filters applied", async () => {
			const { user, getByText, getByTestId } = renderComponent();

			const filterToggle = getByTestId("tickets-filter-toggle");
			await user.click(filterToggle);

			await waitFor(() => {
				expect(
					getByTestId("tickets-filter-by-type-trigger"),
				).toBeInTheDocument();
			});

			const typeButton = getByTestId("tickets-filter-by-type-trigger");
			await user.click(typeButton);
			const bugOption = await waitFor(() =>
				getByTestId("tickets-filter-by-type-option-2"),
			);
			await user.click(bugOption);

			await waitFor(() => {
				expect(getByText("2 of 6 in the list")).toBeInTheDocument();
			});
		});
	});

	test("doesn't violate any accessibility rules", async () => {
		const { container } = renderComponent();
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});

const createTicket = vi.fn(
	async (gameId: string, data: CreateTicketForGameRequest) => {
		return { ok: true, data: generateTicket({ ...data }) };
	},
);

function Panel() {
	const Wrapper = TicketsPanel?.wrapper || Fragment;
	return (
		<Wrapper>
			<div>
				<header
					className="mx-6 mt-6 flex flex-col gap-2"
					data-testid="game-management-drawer-header"
				>
					<div className="flex h-fit w-full flex-row justify-between items-center">
						<div className="relative flex h-full flex-col overflow-hidden">
							<div className="flex flex-row gap-1 items-center">
								{TicketsPanel.header.icon({
									size: 42,
									thikness: "light",
								})}
								<div className="flex flex-col justify-center">
									<h2>{TicketsPanel.header.title}</h2>
									{TicketsPanel.header?.subTitle && (
										<p className="text-xs text-neutral-700">
											{TicketsPanel.header?.subTitle}
										</p>
									)}
								</div>
							</div>
						</div>
						{TicketsPanel.header.rightSlot}
					</div>
					{TicketsPanel.header.bottomSlot && (
						<div className="w-full h-fit flex">
							{TicketsPanel.header.bottomSlot}
						</div>
					)}
				</header>
				<div>{TicketsPanel.body}</div>
			</div>
		</Wrapper>
	);
}

function renderComponent() {
	return render(<Panel />, {
		wrapper: GameRoomFakeProviderWrapper({
			apiProps: {
				game: { ticket: { createTicket } },
			},
			gameStateProps: {
				game: generateGame({
					id: "test-game-id",
					tickets: [
						generateTicket({
							id: "ticket-id-1",
							title: "Bug Fix",
							type: TicketType.Bug,
							estimation: null,
							identifier: "T-1",
						}),
						generateTicket({
							id: "ticket-id-2",
							title: "User Story",
							type: TicketType.Story,
							estimation: "5",
							identifier: "T-2",
						}),
						generateTicket({
							id: "ticket-id-3",
							title: "Task Item",
							type: TicketType.Task,
							estimation: "3",
							identifier: "T-3",
						}),
						generateTicket({
							id: "ticket-id-4",
							title: "Another Bug",
							type: TicketType.Bug,
							estimation: "8",
							identifier: "T-4",
						}),
						generateTicket({
							id: "ticket-id-5",
							title: "Another Story",
							type: TicketType.Story,
							estimation: "8",
							identifier: "T-5",
						}),
						generateTicket({
							id: "ticket-id-6",
							title: "Another Task",
							type: TicketType.Task,
							estimation: null,
							identifier: "T-6",
						}),
					],
				}),
				currentParticipant: generateParticipant({
					role: ParticipantRole.Master,
				}),
			},
		}),
	});
}
