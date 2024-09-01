/**
 * @jest-environment jsdom
 */
import { test, describe, expect, vi } from "vitest";
import { act, render, screen, waitFor, within } from "@/test/utilities";
import { axe } from "jest-axe";
import { Autocomplete } from "./component";
import { Key } from "react-aria";

function renderAutocompleteSingle({
	disabledKeys,
	selectedKeys,
	onSelectionChange,
}: {
	disabledKeys?: Key[];
	selectedKeys?: Key[];
	onSelectionChange?: (
		item: {
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

describe("Autocomplete", () => {
	describe("with selectionMode=single", () => {
		test("renders correctly", async () => {
			const { unmount, getByText, getByRole } = renderAutocompleteSingle(
				{},
			);

			getByText("Select Single");
			const inputContainer = getByRole("group");
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

				expect(within(list).getAllByRole("option")).toHaveLength(
					data.length,
				);
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

			test("resets the focused item when re-opening the menu", async () => {
				const { user, getByRole } = renderAutocompleteSingle({});

				const triggerButton = getByRole("button");
				await user.click(triggerButton);
				await user.keyboard("[ArrowDown]");
				const list = getByRole("listbox");
				const items = within(list).getAllByRole("option");
				expect(items[0]).toHaveAttribute("data-focused", "true");
				await user.click(triggerButton);
				await user.click(triggerButton);
				expect(items[0]).not.toHaveAttribute("data-focused", "true");
			});
		});

		describe("showing menu", () => {
			test("changes a focus between items via arrow keys", async () => {
				const { user, getByRole } = renderAutocompleteSingle({});

				const triggerButton = getByRole("button");
				await user.click(triggerButton);
				await user.keyboard("[ArrowDown]");
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
				await user.keyboard("[ArrowDown]");
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
				await user.keyboard("[ArrowDown]");
				await user.keyboard("[Enter]");

				expect(onSelectionChangeFn).toHaveBeenCalledOnce();
				expect(onSelectionChangeFn).toHaveBeenCalledWith([
					{ id: "2", textValue: "Orange" },
				]);
				expect(textField).toHaveValue("Orange");
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
				await user.keyboard("[ArrowDown]");
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
				await user.keyboard("[ArrowDown]");
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
