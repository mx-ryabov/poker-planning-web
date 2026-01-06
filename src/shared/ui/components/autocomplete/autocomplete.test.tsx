/**
 * @jest-environment jsdom
 */
import { test, describe, expect, vi } from "vitest";
import { render, waitFor, within } from "@/test/utilities";
import { axe } from "jest-axe";
import { Autocomplete } from "./autocomplete";
import { Key } from "react-aria";

function renderAutocompleteSingle({
	disabledKeys,
	selectedKeys,
	onSelectionChange,
}: {
	disabledKeys?: Key[];
	selectedKeys?: Key[];
	onSelectionChange?: (
		_item: {
			id: string;
			textValue: string;
		}[],
	) => void;
}) {
	return render(
		<Autocomplete
			label="Select Single"
			selectionMode="single"
			placeholder="Select something"
			disabledKeys={disabledKeys}
			selectedKeys={selectedKeys}
			onSelectionChange={onSelectionChange}
			items={data}
		>
			{(item) => (
				<Autocomplete.Item key={item.id} textValue={item.textValue}>
					{item.textValue}
				</Autocomplete.Item>
			)}
		</Autocomplete>,
	);
}

function renderAutocompleteMultiple({
	disabledKeys,
	selectedKeys,
	placeholder,
	errorMessages,
	isDisabled,
	onSelectionChange,
}: {
	disabledKeys?: Key[];
	selectedKeys?: Key[];
	placeholder?: string;
	errorMessages?: string[];
	isDisabled?: boolean;
	onSelectionChange?: (
		_item: {
			id: string;
			textValue: string;
		}[],
	) => void;
}) {
	return render(
		<div style={{ width: 300, height: 1000 }}>
			<Autocomplete
				label="Select Multiple"
				selectionMode="multiple"
				disabledKeys={disabledKeys}
				selectedKeys={selectedKeys}
				placeholder={placeholder}
				isDisabled={isDisabled}
				onSelectionChange={onSelectionChange}
				errorMessages={errorMessages}
				items={data}
			>
				{(item) => (
					<Autocomplete.Item key={item.id} textValue={item.textValue}>
						{item.textValue}
					</Autocomplete.Item>
				)}
			</Autocomplete>
		</div>,
	);
}

describe("Autocomplete", () => {
	describe("with selectionMode=single", () => {
		test("renders correctly", async () => {
			const { unmount, getByText, getByRole } = renderAutocompleteSingle(
				{},
			);

			getByText("Select Single");
			const inputContainer = getByRole("presentation");
			within(inputContainer).getByRole("textbox");
			within(inputContainer).getByRole("button");

			expect(() => unmount()).not.toThrow();
		});

		test("shows an error message when invalid", async () => {
			const { getByText } = render(
				<Autocomplete
					label="Select Single"
					selectionMode="single"
					placeholder="Select something"
					errorMessages={["Error :("]}
					items={data}
				>
					{(item) => (
						<Autocomplete.Item
							key={item.id}
							textValue={item.textValue}
						>
							{item.textValue}
						</Autocomplete.Item>
					)}
				</Autocomplete>,
			);

			const errorMsg = getByText("Error :(");
			expect(errorMsg).toBeVisible();
		});

		test("can be disabled", async () => {
			const { getByRole } = render(
				<Autocomplete
					label="Select Single"
					selectionMode="single"
					placeholder="Select something"
					isDisabled
					items={data}
				>
					{(item) => (
						<Autocomplete.Item
							key={item.id}
							textValue={item.textValue}
						>
							{item.textValue}
						</Autocomplete.Item>
					)}
				</Autocomplete>,
			);

			const textField = getByRole("textbox");
			const triggerButton = getByRole("button");

			expect(textField).toBeDisabled();
			expect(triggerButton).toBeDisabled();
		});

		test("can have disabled keys", async () => {
			const onSelectionChangeFn = vi.fn();
			const { getByRole, user } = renderAutocompleteSingle({
				disabledKeys: ["1", "3"],
				onSelectionChange: onSelectionChangeFn,
			});

			const triggerButton = getByRole("button");
			await user.click(triggerButton);
			const list = getByRole("listbox");
			const items = within(list).getAllByRole("option");

			expect(items[0]).toHaveAttribute("aria-disabled", "true");
			expect(items[2]).toHaveAttribute("aria-disabled", "true");
			await user.click(items[0]);
			expect(onSelectionChangeFn).toHaveBeenCalledTimes(0);
		});

		test("supports sections", async () => {
			const { getByText, user, getByRole } = render(
				<Autocomplete
					label="Select Single"
					selectionMode="single"
					placeholder="Select something"
				>
					<Autocomplete.Section title="Section 1">
						<Autocomplete.Item key="1" textValue="Item 1">
							Item 1
						</Autocomplete.Item>
						<Autocomplete.Item key="2" textValue="Item 2">
							Item 2
						</Autocomplete.Item>
					</Autocomplete.Section>
					<Autocomplete.Item key="3" textValue="Item 3">
						Item 3
					</Autocomplete.Item>
				</Autocomplete>,
			);

			const triggerButton = getByRole("button");
			await user.click(triggerButton);

			const sectionHeader = getByText("Section 1");
			expect(sectionHeader).toBeVisible();
			expect(sectionHeader).toHaveRole("banner");
		});

		describe("opening", () => {
			test("opens filtered list when searching via input", async () => {
				const { user, getByRole } = renderAutocompleteSingle({});

				const textField = getByRole("textbox");
				await user.type(textField, "P");
				const list = getByRole("listbox");
				expect(
					within(list).queryByText("Orange"),
				).not.toBeInTheDocument();
				expect(within(list).queryByText("Peach")).toBeInTheDocument();
				expect(within(list).queryByText("Pear")).toBeInTheDocument();

				await user.type(textField, "i");
				expect(
					within(list).queryByText("Peach"),
				).not.toBeInTheDocument();
				expect(
					within(list).queryByText("Pear"),
				).not.toBeInTheDocument();
				expect(
					within(list).queryByText("Pineapple"),
				).toBeInTheDocument();
			});

			test("opens a full list on trigger click (even despite the filled input)", async () => {
				const { user, getByRole } = renderAutocompleteSingle({});

				const triggerButton = getByRole("button");
				const textField = getByRole("textbox");
				await user.type(textField, "P");
				await user.click(document.body);
				await user.click(triggerButton);
				const list = getByRole("listbox");
				const items = within(list).getAllByRole("option");

				expect(items).toHaveLength(data.length);
			});

			test("opens a full list on ArrowDown when focused (even despite the filled input)", async () => {
				const { user, getByRole } = renderAutocompleteSingle({});

				const textField = getByRole("textbox");
				await user.type(textField, "P");
				const list = getByRole("listbox");
				const items = within(list).getAllByRole("option");

				await user.click(items[0]);
				await user.keyboard("[ArrowDown]");

				expect(
					within(getByRole("listbox")).getAllByRole("option"),
				).toHaveLength(data.length);
			});

			test("opens a full list when focused", async () => {
				const { user, getByRole } = renderAutocompleteSingle({});

				const textField = getByRole("textbox");
				await user.type(textField, "P");
				await user.click(document.body);
				await user.tab();
				const list = getByRole("listbox");
				const items = within(list).getAllByRole("option");

				expect(items).toHaveLength(data.length);
			});

			test("keeps focus within the textfield after opening the menu", async () => {
				const { user, getByRole } = renderAutocompleteSingle({});

				const triggerButton = getByRole("button");
				const textField = getByRole("textbox");

				await user.click(triggerButton);
				expect(textField).toHaveFocus();
				await user.click(document.body);

				await user.tab();
				expect(textField).toHaveFocus();
				await user.click(document.body);

				await user.click(textField);
				await user.keyboard("[Escape]");
				await user.keyboard("[ArrowDown]");
				expect(textField).toHaveFocus();
			});

			test("resets the focused item to the first one when re-opening the menu", async () => {
				const { user, getByRole } = renderAutocompleteSingle({});

				const triggerButton = getByRole("button");
				await user.click(triggerButton);
				await user.keyboard("[ArrowDown]");
				let items = within(getByRole("listbox")).getAllByRole("option");
				expect(items[1]).toHaveAttribute("data-focused", "true");
				await user.click(triggerButton);
				await user.click(triggerButton);
				items = within(getByRole("listbox")).getAllByRole("option");
				expect(items[1]).not.toHaveAttribute("data-focused", "true");
				expect(items[0]).toHaveAttribute("data-focused", "true");
			});
		});

		describe("showing menu", () => {
			test("changes a focus between items via arrow keys", async () => {
				const { user, getByRole } = renderAutocompleteSingle({});

				const triggerButton = getByRole("button");
				await user.click(triggerButton);
				const list = getByRole("listbox");
				const items = within(list).getAllByRole("option");
				expect(items[0]).toHaveAttribute("data-focused", "true");
				await user.keyboard("[ArrowDown]");
				expect(items[0]).not.toHaveAttribute("data-focused", "true");
				expect(items[1]).toHaveAttribute("data-focused", "true");
			});

			test("can select an item by click", async () => {
				const onSelectionChangeFn = vi.fn();
				const { user, getByRole } = renderAutocompleteSingle({
					onSelectionChange: onSelectionChangeFn,
				});

				const triggerButton = getByRole("button");
				const textField = getByRole("textbox");
				await user.click(triggerButton);
				const list = getByRole("listbox");
				const items = within(list).getAllByRole("option");
				await user.click(items[0]);

				expect(onSelectionChangeFn).toHaveBeenCalledOnce();
				expect(onSelectionChangeFn).toHaveBeenCalledWith([
					{ id: "1", textValue: "Apple" },
				]);
				expect(textField).toHaveValue("Apple");
			});

			test("can select an item by Enter when the item is focused", async () => {
				const onSelectionChangeFn = vi.fn();
				const { user, getByRole } = renderAutocompleteSingle({
					onSelectionChange: onSelectionChangeFn,
				});

				const triggerButton = getByRole("button");
				const textField = getByRole("textbox");
				await user.click(triggerButton);
				await user.keyboard("[Enter]");

				expect(onSelectionChangeFn).toHaveBeenCalledOnce();
				expect(onSelectionChangeFn).toHaveBeenCalledWith([
					{ id: "1", textValue: "Apple" },
				]);
				expect(textField).toHaveValue("Apple");
			});

			test("avoids focusing by arrow keys on an item if the item is disabled", async () => {
				const onSelectionChangeFn = vi.fn();
				const { user, getByRole } = renderAutocompleteSingle({
					onSelectionChange: onSelectionChangeFn,
					disabledKeys: ["1"],
				});

				const triggerButton = getByRole("button");
				const textField = getByRole("textbox");
				await user.click(triggerButton);
				await user.keyboard("[Enter]");

				expect(onSelectionChangeFn).toHaveBeenCalledOnce();
				expect(onSelectionChangeFn).toHaveBeenCalledWith([
					{ id: "2", textValue: "Orange" },
				]);
				expect(textField).toHaveValue("Orange");
			});

			test("avoids focusing on the first key when opening if it's disabled and focus on the first available item", async () => {
				const onSelectionChangeFn = vi.fn();
				const { user, getByRole } = renderAutocompleteSingle({
					onSelectionChange: onSelectionChangeFn,
					disabledKeys: ["1"],
				});

				const triggerButton = getByRole("button");
				await user.click(triggerButton);
				const items = within(getByRole("listbox")).getAllByRole(
					"option",
				);

				expect(items[0]).toHaveAttribute("aria-disabled", "true");
				expect(items[0]).toHaveAttribute("data-focused", "false");
				expect(items[1]).toHaveAttribute("data-focused", "true");
			});

			test("avoids focusing on hovering on an item if the item is disabled", async () => {
				const { user, getByRole } = renderAutocompleteSingle({
					disabledKeys: ["1"],
				});

				const triggerButton = getByRole("button");
				await user.click(triggerButton);
				const list = getByRole("listbox");
				const items = within(list).getAllByRole("option");
				await user.hover(items[0]);

				expect(items[0]).not.toHaveAttribute("data-focused", "true");
			});

			test("focuses on the first item whenever the text field is changed", async () => {
				const { user, getByRole } = renderAutocompleteSingle({});

				const trigger = getByRole("button");
				const textField = getByRole("textbox");
				await user.click(trigger);
				await user.keyboard("[ArrowDown]");
				await user.type(textField, "W");
				const options = within(getByRole("listbox")).getAllByRole(
					"option",
				);
				expect(options[0]).toHaveAttribute("data-focused", "true");
			});
		});

		describe("typing in the textfield", () => {
			test("filters the list items using contains strategy", async () => {
				const { user, getByRole } = renderAutocompleteSingle({});

				const textField = getByRole("textbox");
				await user.type(textField, "P");
				const list = getByRole("listbox");
				expect(
					within(list).queryByText("Pineapple"),
				).toBeInTheDocument();
				expect(within(list).queryByText("Peach")).toBeInTheDocument();
				expect(within(list).queryByText("Pear")).toBeInTheDocument();

				await user.type(textField, "ea");
				expect(within(list).queryByText("Peach")).toBeInTheDocument();
				expect(within(list).queryByText("Pear")).toBeInTheDocument();
				expect(
					within(list).queryByText("Pineapple"),
				).not.toBeInTheDocument();

				await user.type(textField, "r");
				expect(within(list).queryByText("Pear")).toBeInTheDocument();
				expect(
					within(list).queryByText("Peach"),
				).not.toBeInTheDocument();
				expect(
					within(list).queryByText("Pineapple"),
				).not.toBeInTheDocument();
			});

			test("applies an item's name to the input if they're not equal and popup was closed", async () => {
				const { user, getByRole } = renderAutocompleteSingle({});

				const textField = getByRole("textbox");
				const triggerButton = getByRole("button");
				await user.click(triggerButton);
				await user.keyboard("[Enter]");
				await user.click(textField);
				await user.keyboard("[Backspace]");

				expect(textField).toHaveValue("Appl");
				await user.click(triggerButton);
				expect(textField).toHaveValue("Apple");
			});

			test("unselect an item when the input becomes empty", async () => {
				const onSelectionChangeFn = vi.fn();
				const { user, getByRole } = renderAutocompleteSingle({
					onSelectionChange: onSelectionChangeFn,
				});

				const textField = getByRole("textbox");
				const triggerButton = getByRole("button");
				await user.click(triggerButton);
				await user.keyboard("[Enter]");
				expect(onSelectionChangeFn).toHaveBeenCalledWith([
					{ id: "1", textValue: "Apple" },
				]);
				await user.click(textField);
				await user.keyboard("[Backspace]");
				await user.keyboard("[Backspace]");
				await user.keyboard("[Backspace]");
				await user.keyboard("[Backspace]");
				await user.keyboard("[Backspace]");

				expect(textField).toHaveValue("");
				const list = getByRole("listbox");
				const items = within(list).getAllByRole("option");
				expect(items[0]).not.toHaveAttribute("data-selected", "true");
				expect(onSelectionChangeFn).toHaveBeenCalledTimes(2);
				expect(onSelectionChangeFn).toHaveBeenCalledWith([]);
			});

			test("supports an empty state when nothing has found", async () => {
				const { user, getByRole } = renderAutocompleteSingle({});

				const textField = getByRole("textbox");
				const triggerButton = getByRole("button");
				await user.click(triggerButton);
				await user.type(textField, "qweqweqw");
				const list = getByRole("listbox");

				expect(list).toHaveTextContent("The list is empty.");
			});
		});

		describe("closing menu", () => {
			test("closes popup when an item is selected", async () => {
				const { user, getByRole, queryByRole } =
					renderAutocompleteSingle({});

				const triggerButton = getByRole("button");
				await user.click(triggerButton);
				await user.keyboard("[ArrowDown]");
				await user.keyboard("[Enter]");

				await waitFor(() => {
					expect(queryByRole("listbox")).not.toBeInTheDocument();
				});
			});

			test("closes on trigger click if opened", async () => {
				const { user, getByRole, queryByRole } =
					renderAutocompleteSingle({});

				const triggerButton = getByRole("button");
				await user.click(triggerButton);
				expect(queryByRole("listbox")).toBeInTheDocument();
				await user.click(triggerButton);
				expect(queryByRole("listbox")).not.toBeInTheDocument();
			});

			test("closes on clicking outside", async () => {
				const { user, getByRole, queryByRole } =
					renderAutocompleteSingle({});

				const triggerButton = getByRole("button");
				await user.click(triggerButton);
				expect(queryByRole("listbox")).toBeInTheDocument();
				await user.click(document.body);
				expect(queryByRole("listbox")).not.toBeInTheDocument();
			});

			test("close on Escape", async () => {
				const { user, getByRole, queryByRole } =
					renderAutocompleteSingle({});

				const triggerButton = getByRole("button");
				await user.click(triggerButton);
				expect(queryByRole("listbox")).toBeInTheDocument();
				await user.keyboard("[Escape]");
				expect(queryByRole("listbox")).not.toBeInTheDocument();
			});
		});

		describe("loading state?", () => {
			test.todo("shows the loading state when loading?", async () => {});
		});

		test("can be controllable (i.e. stateless)", async () => {
			const onSelectionChangeFn = vi.fn();
			const { user, getByRole, rerender } = renderAutocompleteSingle({
				onSelectionChange: onSelectionChangeFn,
				selectedKeys: ["1"],
			});

			const triggerButton = getByRole("button");
			const textField = getByRole("textbox");

			expect(textField).toHaveValue("Apple");
			await user.click(triggerButton);
			await user.keyboard("[ArrowDown]");
			await user.keyboard("[ArrowDown]");
			await user.keyboard("[Enter]");
			rerender(
				<Autocomplete
					label="Select Single"
					selectionMode="single"
					placeholder="Select something"
					selectedKeys={["2"]}
					onSelectionChange={onSelectionChangeFn}
					items={data}
				>
					{(item) => (
						<Autocomplete.Item
							key={item.id}
							textValue={item.textValue}
						>
							{item.textValue}
						</Autocomplete.Item>
					)}
				</Autocomplete>,
			);
			expect(textField).toHaveValue("Orange");
		});

		test.todo("supports validation?", async () => {});

		test.todo("supports work with forms?", async () => {});

		test("doesn't violate any accessiblity rules", async () => {
			const { container, getByRole, user } = renderAutocompleteSingle({});

			const triggerButton = getByRole("button");
			await user.click(triggerButton);
			const results = await axe(container);

			expect(results).toHaveNoViolations();
		});
	});

	describe("with selectionMode=multiple", () => {
		test("renders correctly with selected items", async () => {
			const { unmount, getByText, getByRole } =
				renderAutocompleteMultiple({
					placeholder: "Select something",
				});

			getByText("Select Multiple");
			const valueBox = getByRole("group");
			within(valueBox).getByRole("textbox");
			within(valueBox).getByTestId("trigger");

			expect(valueBox).toHaveTextContent("Select something");
			expect(() => unmount()).not.toThrow();
		});

		test("shows an error message when invalid", async () => {
			const { getByText } = renderAutocompleteMultiple({
				errorMessages: ["Error message"],
			});

			getByText("Error message");
		});

		test("can be disabled", async () => {
			const { queryByRole, getByRole, getByTestId, user } =
				renderAutocompleteMultiple({
					isDisabled: true,
				});

			const trigger = getByTestId("trigger");
			const textField = getByRole("textbox");
			await user.click(trigger);
			const list = queryByRole("listbox");

			expect(list).not.toBeInTheDocument();
			expect(textField).toBeDisabled();
		});

		test("can only read keys when disabled", async () => {
			const { getByTestId } = renderAutocompleteMultiple({
				isDisabled: true,
				selectedKeys: ["3", "5"],
			});

			const chips = within(getByTestId("value-box")).getAllByTestId(
				"selected-item-chip",
			);
			expect(chips).toHaveLength(2);
			expect(chips[0]).toHaveTextContent("Avocado");
			expect(chips[1]).toHaveTextContent("Banana");
		});

		test("supports sections", async () => {
			const { user, getByRole, getByTestId } = render(
				<div style={{ width: 300, height: 1000 }}>
					<Autocomplete
						label="Select Multiple"
						selectionMode="multiple"
					>
						{dataWithSections.map((section) => (
							<Autocomplete.Section
								title={section.title}
								items={section.items}
								key={section.title}
							>
								{(item) => (
									<Autocomplete.Item
										key={item.id}
										textValue={item.textValue}
									>
										{item.textValue}
									</Autocomplete.Item>
								)}
							</Autocomplete.Section>
						))}
					</Autocomplete>
				</div>,
			);

			const trigger = getByTestId("trigger");
			await user.click(trigger);
			const headers = within(getByRole("listbox")).getAllByRole("banner");
			expect(headers).toHaveLength(2);
		});

		describe("list", () => {
			test("supports multiple selection via click", async () => {
				const onSelectionChangeFn = vi.fn();
				const { getByTestId, user, getByRole } =
					renderAutocompleteMultiple({
						onSelectionChange: onSelectionChangeFn,
					});

				const trigger = getByTestId("trigger");
				await user.click(trigger);
				const list = getByRole("listbox");
				const items = within(list).getAllByRole("option");

				expect(items[0]).not.toHaveAttribute("aria-selected", "true");
				await user.click(items[0]);
				expect(items[0]).toHaveAttribute("aria-selected", "true");
				expect(onSelectionChangeFn).toHaveBeenCalledWith([
					{ id: "1", textValue: "Apple" },
				]);

				expect(items[2]).not.toHaveAttribute("aria-selected", "true");
				await user.click(items[2]);
				expect(items[2]).toHaveAttribute("aria-selected", "true");
				expect(onSelectionChangeFn).toHaveBeenCalledWith([
					{ id: "1", textValue: "Apple" },
					{ id: "3", textValue: "Avocado" },
				]);

				expect(onSelectionChangeFn).toHaveBeenCalledTimes(2);
			});

			test("can unselect a selected item via click", async () => {
				const onSelectionChangeFn = vi.fn();
				const { getByTestId, user, getByRole } =
					renderAutocompleteMultiple({
						onSelectionChange: onSelectionChangeFn,
					});

				const trigger = getByTestId("trigger");
				await user.click(trigger);
				const list = getByRole("listbox");
				const items = within(list).getAllByRole("option");

				await user.click(items[0]);
				expect(onSelectionChangeFn).toHaveBeenCalledWith([
					{ id: "1", textValue: "Apple" },
				]);
				await user.click(items[0]);
				expect(onSelectionChangeFn).toHaveBeenCalledWith([]);

				expect(onSelectionChangeFn).toHaveBeenCalledTimes(2);
			});

			test("supports multiple selection via Enter", async () => {
				const onSelectionChangeFn = vi.fn();
				const { getByTestId, user, getByRole } =
					renderAutocompleteMultiple({
						onSelectionChange: onSelectionChangeFn,
					});

				const trigger = getByTestId("trigger");
				await user.click(trigger);
				const list = getByRole("listbox");
				const items = within(list).getAllByRole("option");

				expect(items[0]).not.toHaveAttribute("aria-selected", "true");
				await user.keyboard("[Enter]");
				expect(items[0]).toHaveAttribute("aria-selected", "true");
				expect(onSelectionChangeFn).toHaveBeenCalledWith([
					{ id: "1", textValue: "Apple" },
				]);

				expect(items[2]).not.toHaveAttribute("aria-selected", "true");
				await user.keyboard("[ArrowDown]");
				await user.keyboard("[ArrowDown]");
				await user.keyboard("[Enter]");
				expect(items[2]).toHaveAttribute("aria-selected", "true");
				expect(onSelectionChangeFn).toHaveBeenCalledWith([
					{ id: "1", textValue: "Apple" },
					{ id: "3", textValue: "Avocado" },
				]);

				expect(onSelectionChangeFn).toHaveBeenCalledTimes(2);
			});

			test("can unselect a selected item via Enter", async () => {
				const onSelectionChangeFn = vi.fn();
				const { getByTestId, user } = renderAutocompleteMultiple({
					onSelectionChange: onSelectionChangeFn,
				});

				const trigger = getByTestId("trigger");
				await user.click(trigger);

				await user.keyboard("[Enter]");
				expect(onSelectionChangeFn).toHaveBeenCalledWith([
					{ id: "1", textValue: "Apple" },
				]);
				await user.keyboard("[Enter]");
				expect(onSelectionChangeFn).toHaveBeenCalledWith([]);
			});

			test("focuses on the first item when becomes opened", async () => {
				const { getByTestId, getByRole, user } =
					renderAutocompleteMultiple({});

				const trigger = getByTestId("trigger");
				await user.click(trigger);
				const list = getByRole("listbox");
				const items = within(list).getAllByRole("option");
				expect(items[0]).toHaveAttribute("data-focused", "true");
			});

			test("focuses on the first item when becomes opened and the previous focus was not on the first item", async () => {
				const { getByTestId, getByRole, user } =
					renderAutocompleteMultiple({});

				const trigger = getByTestId("trigger");
				await user.click(trigger);
				await user.keyboard("[ArrowDown]");
				let list = getByRole("listbox");
				let items = within(list).getAllByRole("option");
				// confirm that the focus isn't on the first item
				expect(items[1]).toHaveAttribute("data-focused", "true");
				// close and open again to reset focus
				await user.click(trigger);
				await user.click(trigger);
				list = getByRole("listbox");
				items = within(list).getAllByRole("option");
				expect(items[0]).toHaveAttribute("data-focused", "true");
			});

			test("changes focused item on ArrowDown and ArrowUp keys", async () => {
				const { getByTestId, getByRole, user } =
					renderAutocompleteMultiple({});

				const trigger = getByTestId("trigger");
				await user.click(trigger);
				await user.keyboard("[ArrowDown]");
				const list = getByRole("listbox");
				const items = within(list).getAllByRole("option");
				expect(items[1]).toHaveAttribute("data-focused", "true");
				expect(items[0]).not.toHaveAttribute("data-focused", "true");
				expect(items[2]).not.toHaveAttribute("data-focused", "true");
				await user.keyboard("[ArrowDown]");
				expect(items[2]).toHaveAttribute("data-focused", "true");
				expect(items[0]).not.toHaveAttribute("data-focused", "true");
				expect(items[1]).not.toHaveAttribute("data-focused", "true");
				await user.keyboard("[ArrowUp]");
				await user.keyboard("[ArrowUp]");
				expect(items[0]).toHaveAttribute("data-focused", "true");
				expect(items[1]).not.toHaveAttribute("data-focused", "true");
				expect(items[2]).not.toHaveAttribute("data-focused", "true");
			});

			test("keeps the focus on the first item whenever the list changes due to filtration", async () => {
				const { getByTestId, getByRole, user } =
					renderAutocompleteMultiple({});

				const trigger = getByTestId("trigger");
				const textField = getByRole("textbox");
				await user.click(trigger);
				let items = within(getByRole("listbox")).getAllByRole("option");
				expect(items[0]).toHaveAttribute("data-focused", "true");
				await user.keyboard("[ArrowDown]");
				await user.keyboard("[ArrowDown]");
				expect(items[2]).toHaveAttribute("data-focused", "true");
				await user.type(textField, "B");
				items = within(getByRole("listbox")).getAllByRole("option");
				expect(items[0]).toHaveAttribute("data-focused", "true");
				expect(items[0]).toHaveTextContent("Banana");
			});

			test("resets the focus when reopened", async () => {
				const { getByTestId, getByRole, user } =
					renderAutocompleteMultiple({});

				const trigger = getByTestId("trigger");
				await user.click(trigger);
				await user.keyboard("[ArrowDown]");
				await user.keyboard("[ArrowDown]");
				let items = within(getByRole("listbox")).getAllByRole("option");
				expect(items[2]).toHaveAttribute("data-focused", "true");
				await user.click(trigger);
				await user.click(trigger);
				items = within(getByRole("listbox")).getAllByRole("option");
				expect(items[0]).toHaveAttribute("data-focused", "true");
			});

			test("can be closed on Escape", async () => {
				const { getByTestId, queryByRole, user } =
					renderAutocompleteMultiple({});

				const trigger = getByTestId("trigger");
				await user.click(trigger);
				await user.keyboard("[Escape]");

				expect(queryByRole("listbox")).not.toBeInTheDocument();
			});

			test("can be closed on focus change to another element", async () => {
				const { getByTestId, queryByRole, user } =
					renderAutocompleteMultiple({});

				const trigger = getByTestId("trigger");
				await user.click(trigger);
				await user.tab();

				expect(queryByRole("listbox")).not.toBeInTheDocument();
			});

			test("can be closed on blur-sm", async () => {
				const { getByTestId, queryByRole, user } =
					renderAutocompleteMultiple({});

				const trigger = getByTestId("trigger");
				await user.click(trigger);
				await user.click(document.body);

				expect(queryByRole("listbox")).not.toBeInTheDocument();
			});

			test("avoids focusing by arrow keys on an item if the item is disabled", async () => {
				const { getByTestId, getByRole, user } =
					renderAutocompleteMultiple({ disabledKeys: ["1", "3"] });

				const trigger = getByTestId("trigger");
				await user.click(trigger);
				const items = within(getByRole("listbox")).getAllByRole(
					"option",
				);

				expect(items[0]).toHaveAttribute("aria-disabled", "true");
				expect(items[0]).toHaveAttribute("data-focused", "false");
				expect(items[1]).toHaveAttribute("data-focused", "true");
				expect(items[2]).toHaveAttribute("aria-disabled", "true");
				await user.keyboard("[ArrowDown]");
				expect(items[2]).toHaveAttribute("data-focused", "false");
				expect(items[3]).toHaveAttribute("data-focused", "true");
			});

			test("avoids focusing on hovering on an item if the item is disabled", async () => {
				const { getByTestId, getByRole, user } =
					renderAutocompleteMultiple({ disabledKeys: ["1", "3"] });

				const trigger = getByTestId("trigger");
				await user.click(trigger);
				const items = within(getByRole("listbox")).getAllByRole(
					"option",
				);

				expect(items[0]).toHaveAttribute("aria-disabled", "true");
				expect(items[2]).toHaveAttribute("aria-disabled", "true");
				await user.hover(items[0]);
				expect(items[0]).toHaveAttribute("data-focused", "false");
				await user.hover(items[2]);
				expect(items[2]).toHaveAttribute("data-focused", "false");
			});

			test("renders an empty state when nothing was found", async () => {
				const { getByTestId, getByRole, user } =
					renderAutocompleteMultiple({});

				const trigger = getByTestId("trigger");
				const textField = getByRole("textbox");
				await user.click(trigger);
				await user.type(textField, "abracadabra");
				const list = getByRole("listbox");

				expect(list).toHaveTextContent("The list is empty.");
			});

			// probably it should be tested with another way
			test.skip("recalculate its position whenever the value box changes its size?", async () => {
				const { getByTestId, getByRole, user } =
					renderAutocompleteMultiple({});

				const trigger = getByTestId("trigger");
				await user.click(trigger);

				const initialTopPosition = getComputedStyle(
					getByTestId("popover"),
				).top;

				const items = within(getByRole("listbox")).getAllByRole(
					"option",
				);
				await user.click(items[0]);
				await user.click(items[1]);
				await user.click(items[2]);
				await user.click(items[3]);
				await user.click(items[4]);

				await waitFor(
					() => {
						const changedTopPosition = getComputedStyle(
							getByTestId("popover"),
						).top;
						expect(initialTopPosition).not.toEqual(
							changedTopPosition,
						);
					},
					{ timeout: 300 },
				);
			});
		});
		describe("value box", () => {
			test("focuses on the text field on container click", async () => {
				const { getByTestId, getByRole, user } =
					renderAutocompleteMultiple({});

				const valueBox = getByTestId("value-box");
				await user.click(valueBox);
				getByRole("listbox");
			});

			test.todo(
				"focuses on the text field when closed and any chip was removed",
				async () => {},
			);

			test("filters the list items using contains strategy", async () => {
				const { getByRole, user } = renderAutocompleteMultiple({});

				const textField = getByRole("textbox");
				await user.click(textField);
				const initialItemsCount = within(
					getByRole("listbox"),
				).getAllByRole("option").length;
				await user.type(textField, "App");
				const filteredItems = within(getByRole("listbox")).getAllByRole(
					"option",
				);

				expect(initialItemsCount).not.toEqual(filteredItems.length);
				expect(filteredItems[0]).toHaveTextContent("Apple");
				for (const item of filteredItems) {
					expect(item).not.toHaveTextContent("Banana");
				}
			});

			test("clears the text field if the list is closed", async () => {
				const { getByRole, user } = renderAutocompleteMultiple({});

				const textField = getByRole("textbox");
				await user.click(textField);
				await user.type(textField, "App");
				expect(textField).toHaveValue("App");
				await user.click(document.body);

				expect(textField).toHaveValue("");
			});

			test("shows selected items as groups of chips", async () => {
				const { getByRole, getByTestId, user } =
					renderAutocompleteMultiple({});

				const trigger = getByTestId("trigger");
				await user.click(trigger);
				const items = within(getByRole("listbox")).getAllByRole(
					"option",
				);
				await user.click(items[0]);
				await user.click(items[1]);
				await user.click(items[2]);

				const chips = within(getByTestId("value-box")).getAllByTestId(
					"selected-item-chip",
				);
				expect(chips).toHaveLength(3);
				expect(chips[0]).toHaveTextContent("Apple");
				expect(chips[1]).toHaveTextContent("Orange");
				expect(chips[2]).toHaveTextContent("Avocado");
			});

			test("removes a chip if an corresponding item was unselected", async () => {
				const { getByRole, getByTestId, user } =
					renderAutocompleteMultiple({});

				const trigger = getByTestId("trigger");
				await user.click(trigger);
				const items = within(getByRole("listbox")).getAllByRole(
					"option",
				);
				await user.click(items[0]);
				await user.click(items[1]);

				let chips = within(getByTestId("value-box")).getAllByTestId(
					"selected-item-chip",
				);
				expect(chips).toHaveLength(2);
				expect(chips[0]).toHaveTextContent("Apple");
				expect(chips[1]).toHaveTextContent("Orange");
				await user.click(items[0]);
				chips = within(getByTestId("value-box")).getAllByTestId(
					"selected-item-chip",
				);
				expect(chips).toHaveLength(1);
				expect(chips[0]).toHaveTextContent("Orange");
			});

			test("unselects an item in the list if the close button on the corresponding chip was pressed", async () => {
				const { getByRole, getByTestId, user } =
					renderAutocompleteMultiple({});

				const trigger = getByTestId("trigger");
				await user.click(trigger);
				const items = within(getByRole("listbox")).getAllByRole(
					"option",
				);
				await user.click(items[0]);
				await user.click(items[1]);

				let chips = within(getByTestId("value-box")).getAllByTestId(
					"selected-item-chip",
				);
				const removeOrangeBtn = within(chips[1]).getByRole("button");
				await user.click(removeOrangeBtn);
				chips = within(getByTestId("value-box")).getAllByTestId(
					"selected-item-chip",
				);
				expect(chips).toHaveLength(1);
				expect(chips[0]).toHaveTextContent("Apple");
			});

			test("focuses on the last chip in the group if the caret on the poistion 0 and ArrowLeft pressed", async () => {
				const { getByRole, getByTestId, user } =
					renderAutocompleteMultiple({});

				const trigger = getByTestId("trigger");
				const textField = getByRole("textbox");
				await user.click(trigger);
				const items = within(getByRole("listbox")).getAllByRole(
					"option",
				);
				await user.click(items[0]);
				await user.click(items[1]);
				await user.type(textField, "A");
				await user.keyboard("[ArrowLeft]");

				const chips = within(getByTestId("value-box")).getAllByTestId(
					"selected-item-chip",
				);

				expect(chips[1]).not.toHaveAttribute("data-focused", "true");
				await user.keyboard("[ArrowLeft]");
				expect(chips[1]).toHaveAttribute("data-focused", "true");
			});

			test("removes a chip and unselects a corresponding item if the chip is focused and Delete key pressed", async () => {
				const { getByRole, getByTestId, user } =
					renderAutocompleteMultiple({});

				const trigger = getByTestId("trigger");
				await user.click(trigger);
				const items = within(getByRole("listbox")).getAllByRole("option");
				await user.click(items[0]);
				await user.click(items[1]);
				await user.keyboard("[ArrowLeft]");
				await user.keyboard("[Delete]");

				const chips = within(getByTestId("value-box")).getAllByTestId(
					"selected-item-chip",
				);
				expect(chips).toHaveLength(1);
				expect(chips[0]).toHaveAttribute("data-focused", "true");
			});

			test("removes the latest chip and unselects a correspodning item if the caret has position 0 and Backspace key is pressed", async () => {
				const { getByRole, getByTestId, user } =
					renderAutocompleteMultiple({});

				const trigger = getByTestId("trigger");
				const textField = getByRole("textbox");
				await user.click(trigger);
				let items = within(getByRole("listbox")).getAllByRole("option");
				await user.click(items[0]);
				await user.click(items[1]);
				await user.type(textField, "A");
				await user.keyboard("[Backspace]");

				let chips = within(getByTestId("value-box")).getAllByTestId(
					"selected-item-chip",
				);

				expect(chips).toHaveLength(2);
				await user.keyboard("[Backspace]");
				chips = within(getByTestId("value-box")).getAllByTestId(
					"selected-item-chip",
				);
				items = within(getByRole("listbox")).getAllByRole("option");
				expect(chips).toHaveLength(1);
				expect(chips[0]).toHaveTextContent("Apple");
				expect(items[0]).toHaveAttribute("aria-selected", "true");
				expect(items[1]).not.toHaveAttribute("aria-selected", "true");
				expect(items[0]).toHaveTextContent("Apple");
			});

			test("doesn't focus on chips that are selected and disabled at the same time", async () => {
				const { getByRole, getByTestId, user } =
					renderAutocompleteMultiple({
						selectedKeys: ["2", "4"],
						disabledKeys: ["2", "4"],
					});

				const textField = getByRole("textbox");
				await user.click(textField);
				await user.keyboard("[ArrowLeft]");

				const chips = within(getByTestId("value-box")).getAllByTestId(
					"selected-item-chip",
				);

				expect(chips[1]).not.toHaveAttribute("data-focused", "true");
			});

			test("doesn't remove disabled chips via Backspace", async () => {
				const { getByRole, getByTestId, user } =
					renderAutocompleteMultiple({
						selectedKeys: ["2", "4"],
						disabledKeys: ["2", "4"],
					});

				const textField = getByRole("textbox");
				await user.click(textField);
				await user.keyboard("[Backspace]");

				const chips = within(getByTestId("value-box")).getAllByTestId(
					"selected-item-chip",
				);

				expect(chips).toHaveLength(2);
			});

			test("focuses on enabled chips via arrow keys and doesn't focuses on disabled chips", async () => {
				const { getByRole, getByTestId, user } =
					renderAutocompleteMultiple({
						selectedKeys: ["2", "4"],
						disabledKeys: ["2"],
					});

				const textField = getByRole("textbox");
				await user.click(textField);
				await user.keyboard("[ArrowLeft]");

				let chips = within(getByTestId("value-box")).getAllByTestId(
					"selected-item-chip",
				);

				expect(chips[1]).toHaveAttribute("data-focused", "true");
				await user.keyboard("[ArrowLeft]");
				chips = within(getByTestId("value-box")).getAllByTestId(
					"selected-item-chip",
				);
				expect(chips[0]).not.toHaveAttribute("data-focused", "true");
			});
		});

		describe("loading state?", () => {
			test.todo("shows the loading state when loading?", async () => {});
		});

		test("can be controllable (i.e. stateless)", async () => {
			const onSelectionChangeFn = vi.fn();
			const { user, getByTestId, rerender } = renderAutocompleteMultiple({
				onSelectionChange: onSelectionChangeFn,
				selectedKeys: ["1", "3"],
			});

			const trigger = getByTestId("trigger");
			let chips = within(getByTestId("value-box")).getAllByTestId(
				"selected-item-chip",
			);

			expect(chips).toHaveLength(2);
			expect(chips[0]).toHaveTextContent("Apple");
			expect(chips[1]).toHaveTextContent("Avocado");
			await user.click(trigger);
			await user.keyboard("[ArrowDown]");
			await user.keyboard("[Enter]");
			rerender(
				<div style={{ width: 300, height: 1000 }}>
					<Autocomplete
						label="Select Multiple"
						selectionMode="multiple"
						selectedKeys={["1", "2", "3"]}
						onSelectionChange={onSelectionChangeFn}
						items={data}
					>
						{(item) => (
							<Autocomplete.Item
								key={item.id}
								textValue={item.textValue}
							>
								{item.textValue}
							</Autocomplete.Item>
						)}
					</Autocomplete>
				</div>,
			);
			chips = within(getByTestId("value-box")).getAllByTestId(
				"selected-item-chip",
			);
			expect(chips).toHaveLength(3);
		});

		test.todo("supports validation?", async () => {});

		test.todo("supports work with forms?", async () => {});

		test("doesn't violate any accessiblity rules", async () => {
			const { container, getByTestId, user } = renderAutocompleteMultiple(
				{ selectedKeys: ["1"] },
			);

			const trigger = getByTestId("trigger");
			await user.click(trigger);
			const results = await axe(container);

			expect(results).toHaveNoViolations();
		});
	});
});

const data = [
	{ id: "1", textValue: "Apple" },
	{ id: "2", textValue: "Orange" },
	{ id: "3", textValue: "Avocado" },
	{ id: "4", textValue: "Watermelon" },
	{ id: "5", textValue: "Banana" },
	{ id: "6", textValue: "Mango" },
	{ id: "7", textValue: "Tomato" },
	{ id: "8", textValue: "Peach" },
	{ id: "9", textValue: "Pear" },
	{ id: "10", textValue: "Dragonfruit" },
	{ id: "11", textValue: "Pineapple" },
	{ id: "12", textValue: "Apricot" },
	{ id: "13", textValue: "Anabolic" },
];

const dataWithSections = [
	{
		id: "a",
		title: "Fruits",
		items: [
			{ id: "1", textValue: "Apple" },
			{ id: "2", textValue: "Orange" },
			{ id: "3", textValue: "Avocado" },
			{ id: "4", textValue: "Watermelon" },
			{ id: "5", textValue: "Banana" },
			{ id: "6", textValue: "Mango" },
		],
	},
	{
		id: "b",
		title: "Vegetables",
		items: [
			{ id: "7", textValue: "Tomato" },
			{ id: "8", textValue: "Peach" },
			{ id: "9", textValue: "Pear" },
			{ id: "10", textValue: "Dragonfruit" },
			{ id: "11", textValue: "Pineapple" },
			{ id: "12", textValue: "Apricot" },
			{ id: "13", textValue: "Anabolic" },
		],
	},
];
