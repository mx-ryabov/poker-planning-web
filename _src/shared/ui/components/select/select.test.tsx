import { test, describe, expect, vi } from "vitest";
import { render, screen, waitFor, within } from "@/test/utilities";
import { axe } from "jest-axe";
import { Select } from "./component";
import { Key, Selection } from "@react-types/shared";

/**
 * Renders Select with
 * - Label: Select Single
 * - Placeholder: Select something
 * - Items: [
 * 		{key: 1, textValue: "Item 1"},
 * 		{key: 2, textValue: "Item 2"},
 * 		{key: 3, textValue: "Item 3"}
 * ]
 */
function renderStatefullSelect(onSelectionChange?: (keys: Selection) => void) {
	return render(
		<Select
			label="Select Single"
			placeholder="Select something"
			aria-label="Select Single"
			onSelectionChange={onSelectionChange}
		>
			<Select.Item key="1" textValue="Item 1" aria-label="Item 1">
				Item 1
			</Select.Item>
			<Select.Item key="2" textValue="Item 2" aria-label="Item 2">
				Item 2
			</Select.Item>
			<Select.Item key="3" textValue="Item 3" aria-label="Item 3">
				Item 3
			</Select.Item>
		</Select>,
	);
}

function renderSelectMultiple({
	selectedKeys,
	disabledKeys,
	errorMessages,
	isDisabled,
	onSelectionChange,
}: {
	selectedKeys?: Key[];
	disabledKeys?: Key[];
	onSelectionChange?: (keys: Selection) => void;
	errorMessages?: string[];
	isDisabled?: boolean;
}) {
	return render(
		<Select
			label="Select Multiple"
			selectionMode="multiple"
			aria-label="Select Multiple"
			placeholder="Select many of something"
			items={selectData}
			disabledKeys={disabledKeys}
			selectedKeys={selectedKeys}
			onSelectionChange={onSelectionChange}
			isDisabled={isDisabled}
			errorMessages={errorMessages}
		>
			{(item) => (
				<Select.Item
					key={item.id}
					aria-label={`Item ${item.textValue}`}
					textValue={item.textValue}
				>
					{item.textValue}
				</Select.Item>
			)}
		</Select>,
	);
}

async function testWhetherSelectOpened(
	list: HTMLElement,
	trigger: HTMLElement,
	textItems: string[],
) {
	const options = within(list).getAllByRole("option");

	expect(trigger).toHaveAttribute("aria-pressed", "true");
	expect(list).toHaveAttribute("data-focused", "true");

	expect(options.length).toBe(textItems.length);
	for (let i = 0; i < textItems.length; i++) {
		expect(options[i]).toHaveTextContent(textItems[i]);
	}
}

async function testWhetherSelectMultipleOpened(list: HTMLElement) {
	const options = within(list).getAllByRole("option");

	expect(options.length).toBe(selectData.length);
	for (let i = 0; i < selectData.length; i++) {
		expect(options[i]).toHaveTextContent(selectData[i].textValue);
	}
}

describe("Select", () => {
	describe("single selection", () => {
		test("renders correctly", async () => {
			const { unmount, getByText, getByTestId } = renderStatefullSelect();

			getByText("Select Single");
			const triggerWithPlaceholder = getByText("Select something");
			getByTestId("icon-ArrowDownIcon");

			expect(triggerWithPlaceholder).toHaveRole("button");
			expect(() => unmount()).not.toThrow();
		});

		test("opens on trggier click", async () => {
			const { user, getByRole } = renderStatefullSelect();

			const trigger = getByRole("button");
			await user.click(trigger);
			const list = getByRole("listbox");

			await testWhetherSelectOpened(list, trigger, [
				"Item 1",
				"Item 2",
				"Item 3",
			]);
		});

		test("can be focused", async () => {
			const { user, getByRole } = renderStatefullSelect();
			const trigger = getByRole("button");

			expect(trigger).not.toHaveAttribute("data-focused", "true");
			await user.tab();
			expect(trigger).toHaveAttribute("data-focused", "true");
		});

		test("opens on enter when focused", async () => {
			const { user, getByRole } = renderStatefullSelect();
			const trigger = getByRole("button");

			expect(trigger).not.toHaveAttribute("data-focused", "true");
			await user.tab();
			await user.keyboard("[Enter]");
			const list = getByRole("listbox");

			await testWhetherSelectOpened(list, trigger, [
				"Item 1",
				"Item 2",
				"Item 3",
			]);
		});

		test("opens on Space when focused", async () => {
			const { user, getByRole } = renderStatefullSelect();
			const trigger = getByRole("button");

			expect(trigger).not.toHaveAttribute("data-focused", "true");
			await user.tab();
			await user.keyboard("[Space]");
			const list = getByRole("listbox");

			await testWhetherSelectOpened(list, trigger, [
				"Item 1",
				"Item 2",
				"Item 3",
			]);
		});

		test.skip("opens on ArrowDown when focused", async () => {
			const { user, getByRole } = renderStatefullSelect();
			const trigger = getByRole("button");

			expect(trigger).not.toHaveAttribute("data-focused", "true");
			await user.tab();
			await user.keyboard("[ArrowDown]");
			const list = getByRole("listbox");

			await testWhetherSelectOpened(list, trigger, [
				"Item 1",
				"Item 2",
				"Item 3",
			]);
		});

		test("closes on trigger click", async () => {
			const { user, queryByRole, getByRole } = renderStatefullSelect();

			const trigger = getByRole("button");
			await user.click(trigger);
			await user.click(trigger);
			const list = queryByRole("listbox");

			expect(list).not.toBeInTheDocument();
		});

		test("closes on click outside", async () => {
			const { user, queryByRole, getByRole } = renderStatefullSelect();

			const trigger = getByRole("button");
			await user.click(trigger);
			await user.click(document.body);
			const list = queryByRole("listbox");

			expect(list).not.toBeInTheDocument();
		});

		test("closes on Escape", async () => {
			const { user, queryByRole, getByRole } = renderStatefullSelect();

			const trigger = getByRole("button");
			await user.click(trigger);
			await user.keyboard("[Escape]");
			const list = queryByRole("listbox");

			expect(list).not.toBeInTheDocument();
		});

		test("supports sections", async () => {
			const { user, getByRole } = render(
				<Select
					label="Select Single"
					placeholder="Select something"
					aria-label="Select Single"
				>
					<Select.Section title="Title" aria-label="Section Title">
						<Select.Item
							key="1"
							textValue="Item 1"
							aria-label="Item 1"
						>
							Item 1
						</Select.Item>
						<Select.Item
							key="2"
							textValue="Item 2"
							aria-label="Item 2"
						>
							Item 2
						</Select.Item>
					</Select.Section>
					<Select.Item key="3" textValue="Item 3" aria-label="Item 3">
						Item 3
					</Select.Item>
				</Select>,
			);
			const trigger = getByRole("button");
			await user.click(trigger);
			const list = getByRole("listbox");
			const section = within(list).getByRole("group");
			const sectionHeader = within(section).getByRole("presentation");

			expect(sectionHeader).toHaveTextContent("Title");
		});

		test("trggers onSelectionChange when the selection is changed", async () => {
			const onSelectionChangeFn = vi.fn();
			const { user, getByRole } =
				renderStatefullSelect(onSelectionChangeFn);

			const trigger = getByRole("button");
			await user.click(trigger);
			const list = getByRole("listbox");
			const options = within(list).getAllByRole("option");
			await user.click(options[0]);

			expect(onSelectionChangeFn).toHaveBeenCalledOnce();
			expect(onSelectionChangeFn.mock.calls[0][0].has("1")).toBeTruthy();
		});

		test("selects on click and closes", async () => {
			const onSelectionChangeFn = vi.fn();
			const { user, getByRole } =
				renderStatefullSelect(onSelectionChangeFn);

			const trigger = getByRole("button");
			await user.click(trigger);
			const list = getByRole("listbox");
			const options = within(list).getAllByRole("option");
			await user.click(options[0]);

			expect(onSelectionChangeFn).toHaveBeenCalledOnce();
			expect(onSelectionChangeFn.mock.calls[0][0].has("1")).toBeTruthy();
			expect(trigger).toHaveTextContent("Item 1");
			expect(list).not.toBeInTheDocument();
		});

		test("changes focused item via arrow keys", async () => {
			const { user, getByRole } = renderStatefullSelect();

			const trigger = getByRole("button");
			await user.click(trigger);
			const list = getByRole("listbox");
			const options = within(list).getAllByRole("option");
			await user.keyboard("[ArrowDown]");

			expect(options[0]).toHaveAttribute("data-focused", "true");
			expect(options[0]).toHaveClass(
				"outline-2 outline-primary-500 outline",
			);
		});

		test("selects on Enter and closes", async () => {
			const onSelectionChangeFn = vi.fn();
			const { user, getByRole } =
				renderStatefullSelect(onSelectionChangeFn);

			const trigger = getByRole("button");
			await user.click(trigger);
			const list = getByRole("listbox");
			await user.keyboard("[ArrowDown]");
			await user.keyboard("[Enter]");

			expect(onSelectionChangeFn).toHaveBeenCalledOnce();
			expect(onSelectionChangeFn.mock.calls[0][0].has("1")).toBeTruthy();
			expect(trigger).toHaveTextContent("Item 1");
			expect(list).not.toBeInTheDocument();
		});

		test("supports disabled items", async () => {
			const onSelectionChangeFn = vi.fn();
			const { user, getByRole } = render(
				<Select
					label="Select Single"
					aria-label="Select Single"
					onSelectionChange={onSelectionChangeFn}
				>
					<Select.Section title="Title" aria-label="Section Title">
						<Select.Item
							key="1"
							textValue="Item 1"
							aria-label="Item 1"
						>
							Item 1
						</Select.Item>
						<Select.Item
							isDisabled={true}
							key="2"
							textValue="Item 2"
							aria-label="Item 2"
						>
							Item 2
						</Select.Item>
					</Select.Section>
					<Select.Separator />
					<Select.Item key="3" textValue="Item 3" aria-label="Item 3">
						Item 3
					</Select.Item>
				</Select>,
			);

			const trigger = getByRole("button");
			await user.click(trigger);
			const list = getByRole("listbox");
			const options = within(list).getAllByRole("option");
			await user.click(options[1]);

			expect(onSelectionChangeFn).toHaveBeenCalledTimes(0);
			expect(list).toBeInTheDocument();
		});

		test("supports disabled keys", async () => {
			const onSelectionChangeFn = vi.fn();
			const { user, getByRole } = render(
				<Select
					label="Select Single"
					aria-label="Select Single"
					onSelectionChange={onSelectionChangeFn}
					disabledKeys={["2"]}
				>
					<Select.Section title="Title" aria-label="Section Title">
						<Select.Item
							key="1"
							textValue="Item 1"
							aria-label="Item 1"
						>
							Item 1
						</Select.Item>
						<Select.Item
							key="2"
							textValue="Item 2"
							aria-label="Item 2"
						>
							Item 2
						</Select.Item>
					</Select.Section>
					<Select.Separator />
					<Select.Item key="3" textValue="Item 3" aria-label="Item 3">
						Item 3
					</Select.Item>
				</Select>,
			);

			const trigger = getByRole("button");
			await user.click(trigger);
			const list = getByRole("listbox");
			const options = within(list).getAllByRole("option");
			await user.click(options[1]);

			expect(onSelectionChangeFn).toHaveBeenCalledTimes(0);
			expect(list).toBeInTheDocument();
		});

		test("renders a custom empty state when there are no elements to show", async () => {
			const { user, getByRole } = render(
				<Select aria-label="Empty Select" label="Select Multiple">
					{[]}
				</Select>,
			);

			const trigger = getByRole("button");
			await user.click(trigger);
			const list = getByRole("listbox");

			expect(list).toHaveTextContent("The list is empty.");
		});

		// Needs red border check
		test.skip("renders an error message", async () => {
			const { getByRole } = render(
				<Select
					label="Select"
					errorMessages={["Error 1", "Error 2"]}
					aria-label="Select with Error"
					isInvalid
				>
					<Select.Item key="1">Item 1</Select.Item>
					<Select.Item key="2">Item 2</Select.Item>
					<Select.Item key="3">Item 3</Select.Item>
				</Select>,
			);

			const errorBox = getByRole("alert");

			expect(errorBox).toHaveTextContent("Error 1");
		});

		// Select shouldn't be hovered when disabled
		test.skip("can be disabled", async () => {
			const { user, getByRole, queryByRole } = render(
				<Select label="Select" aria-label="Select Disabled" isDisabled>
					<Select.Item key="1">Item 1</Select.Item>
					<Select.Item key="2">Item 2</Select.Item>
					<Select.Item key="3">Item 3</Select.Item>
				</Select>,
			);

			const trigger = getByRole("button");
			expect(trigger).toBeDisabled();

			await user.click(trigger);
			expect(queryByRole("listbox")).not.toBeInTheDocument();
		});

		test("supports controllable selection", async () => {
			const onSelectionChangeFn = vi.fn();

			const { user, getByRole, rerender } = render(
				<Select
					label="Controllable Select"
					aria-label="Controllable Select"
					items={selectData}
					selectedKeys={[]}
					onSelectionChange={onSelectionChangeFn}
				>
					{(item) => (
						<Select.Item
							key={item.id}
							aria-label={`Item ${item.textValue}`}
							textValue={item.textValue}
						>
							{item.textValue}
						</Select.Item>
					)}
				</Select>,
			);

			const trigger = getByRole("button");
			await user.click(trigger);
			const list = getByRole("listbox");
			const options = within(list).getAllByRole("option");
			await user.click(options[0]);

			expect(onSelectionChangeFn).toHaveBeenCalledOnce();
			expect(onSelectionChangeFn.mock.calls[0][0].has("1")).toBeTruthy();

			expect(trigger).not.toHaveTextContent("Item 1");

			rerender(
				<Select
					label="Controllable Select"
					aria-label="Controllable Select"
					items={selectData}
					selectedKeys={["1"]}
					onSelectionChange={onSelectionChangeFn}
				>
					{(item) => (
						<Select.Item
							key={item.id}
							aria-label={`Item ${item.textValue}`}
							textValue={item.textValue}
						>
							{item.textValue}
						</Select.Item>
					)}
				</Select>,
			);

			expect(trigger).toHaveTextContent("Item 1");
			expect(list).not.toBeInTheDocument();
		});

		test.todo("supports validation?", async () => {});

		test.todo("works with forms?", async () => {});

		test("doesn't violate any accessiblity rules", async () => {
			const { container } = renderStatefullSelect();
			const results = await axe(container);

			expect(results).toHaveNoViolations();
		});
	});

	describe("multiple selection", () => {
		test("renders correctly", async () => {
			const { unmount, getByText } = renderSelectMultiple({});

			getByText("Select Multiple");
			const triggerWithPlaceholder = getByText(
				"Select many of something",
			);

			expect(triggerWithPlaceholder).toHaveRole("button");
			expect(() => unmount()).not.toThrow();
		});

		test("renders correctly with default selected keys", async () => {
			const { unmount, getByText, getAllByRole } = renderSelectMultiple({
				selectedKeys: ["1", "2"],
			});

			getByText("Select Multiple");
			const triggerWithPlaceholder = getByText(
				"Select many of something",
			);

			expect(triggerWithPlaceholder).toHaveRole("button");
			const chips = getAllByRole("row");
			expect(chips).toHaveLength(2);
			expect(() => unmount()).not.toThrow();
		});

		test("opens on trggier button click", async () => {
			const { user, getByRole } = renderSelectMultiple({});

			const trigger = getByRole("button");
			await user.click(trigger);
			const list = getByRole("listbox");

			await testWhetherSelectMultipleOpened(list);
		});

		test("can be focused", async () => {
			const { user, getByRole } = renderSelectMultiple({});

			const trigger = getByRole("button");

			expect(trigger).not.toHaveAttribute("data-focused", "true");
			await user.tab();
			expect(trigger).toHaveAttribute("data-focused", "true");
		});

		test("opens on Space when focused", async () => {
			const { user, getByRole } = renderSelectMultiple({});

			await user.tab();
			await user.keyboard("[Space]");
			const list = getByRole("listbox");

			await testWhetherSelectMultipleOpened(list);
		});

		test("opens on Enter when focused", async () => {
			const { user, getByRole } = renderSelectMultiple({});

			await user.tab();
			await user.keyboard("[Enter]");
			const list = getByRole("listbox");

			await testWhetherSelectMultipleOpened(list);
		});

		test.skip("opens on ArrowDown when focused", async () => {
			const { user, getByRole } = renderSelectMultiple({});

			await user.tab();
			await user.keyboard("[ArrowDown]");
			const list = getByRole("listbox");

			await testWhetherSelectMultipleOpened(list);
		});

		test("closes on trigger click", async () => {
			const { user, getByRole } = renderSelectMultiple({});

			const trigger = getByRole("button");
			await user.click(trigger);
			const list = getByRole("listbox");

			await testWhetherSelectMultipleOpened(list);

			await user.click(trigger);
			expect(list).not.toBeInTheDocument();
		});

		test("closes on click outside", async () => {
			const { user, getByRole } = renderSelectMultiple({});

			const trigger = getByRole("button");
			await user.click(trigger);
			const list = getByRole("listbox");

			await testWhetherSelectMultipleOpened(list);

			await user.click(document.body);
			expect(list).not.toBeInTheDocument();
		});

		test.skip("closes on Escape?", async () => {});

		test("selects multiple items on click", async () => {
			const onSelectionChangeFn = vi.fn();
			const { user, getByRole, getByTestId } = renderSelectMultiple({
				onSelectionChange: onSelectionChangeFn,
			});

			const valueContainer = getByTestId("select-value-container");
			const trigger = within(valueContainer).getByRole("button");
			await user.click(trigger);
			const list = getByRole("listbox");
			const options = within(list).getAllByRole("option");
			await user.click(options[0]);
			await user.click(options[2]);

			const chips = within(valueContainer).getAllByRole("row");
			expect(chips).toHaveLength(2);
			expect(list).toBeInTheDocument();
			within(options[0]).getByTestId("icon-CheckIcon");
			within(options[2]).getByTestId("icon-CheckIcon");
			expect(onSelectionChangeFn).toHaveBeenCalledTimes(2);
			// the first call is with Set([1])
			expect(onSelectionChangeFn.mock.calls[0][0].has("1")).toBeTruthy();
			// the second call is with Set([1, 3])
			expect(onSelectionChangeFn.mock.calls[1][0].has("1")).toBeTruthy();
			expect(onSelectionChangeFn.mock.calls[1][0].has("3")).toBeTruthy();
		});

		test("unselects on click", async () => {
			const onSelectionChangeFn = vi.fn();
			const { user, getByRole, getByTestId } = renderSelectMultiple({
				onSelectionChange: onSelectionChangeFn,
			});

			const valueContainer = getByTestId("select-value-container");
			const trigger = within(valueContainer).getByRole("button");
			await user.click(trigger);
			const list = getByRole("listbox");
			const options = within(list).getAllByRole("option");
			await user.click(options[0]);
			await user.click(options[2]);
			await user.click(options[0]);

			const chips = within(valueContainer).getAllByRole("row");
			expect(chips).toHaveLength(1);
			expect(list).toBeInTheDocument();
			expect(
				within(options[0]).queryByTestId("icon-CheckIcon"),
			).not.toBeInTheDocument();
			within(options[2]).getByTestId("icon-CheckIcon");
			expect(onSelectionChangeFn).toHaveBeenCalledTimes(3);
			// the first call is with Set([1])
			expect(onSelectionChangeFn.mock.calls[0][0].has("1")).toBeTruthy();
			// the second call is with Set([1, 3])
			expect(onSelectionChangeFn.mock.calls[1][0].has("1")).toBeTruthy();
			expect(onSelectionChangeFn.mock.calls[1][0].has("3")).toBeTruthy();
			// the third call is with Set([3])
			expect(onSelectionChangeFn.mock.calls[2][0].has("3")).toBeTruthy();
		});

		test("unselects on chip close button", async () => {
			const onSelectionChangeFn = vi.fn();
			const { user, getByRole, getByTestId } = renderSelectMultiple({
				onSelectionChange: onSelectionChangeFn,
			});

			const valueContainer = getByTestId("select-value-container");
			const trigger = within(valueContainer).getByRole("button");
			await user.click(trigger);
			const list = getByRole("listbox");
			const options = within(list).getAllByRole("option");
			await user.click(options[0]);
			await user.click(options[2]);
			let chips = within(valueContainer).getAllByRole("row");
			const firstChipCloseBtn = within(chips[0]).getByRole("button");
			await user.click(firstChipCloseBtn);
			chips = within(valueContainer).getAllByRole("row");

			expect(chips).toHaveLength(1);
			expect(
				within(options[0]).queryByTestId("icon-CheckIcon"),
			).not.toBeInTheDocument();
			within(options[2]).getByTestId("icon-CheckIcon");
			expect(onSelectionChangeFn).toHaveBeenCalledTimes(3);
			// the first call is with Set([1])
			expect(onSelectionChangeFn.mock.calls[0][0].has("1")).toBeTruthy();
			// the second call is with Set([1, 3])
			expect(onSelectionChangeFn.mock.calls[1][0].has("1")).toBeTruthy();
			expect(onSelectionChangeFn.mock.calls[1][0].has("3")).toBeTruthy();
			// the third call is with Set([3])
			expect(onSelectionChangeFn.mock.calls[2][0].has("3")).toBeTruthy();
		});

		test("changes focused item via arrow keys", async () => {
			const { user, getByRole } = renderSelectMultiple({});

			const trigger = getByRole("button");
			await user.click(trigger);
			const list = getByRole("listbox");
			const options = within(list).getAllByRole("option");

			expect(options[0]).not.toHaveAttribute("data-focused", "true");
			await user.keyboard("[ArrowDown]");
			expect(options[0]).toHaveAttribute("data-focused", "true");
		});

		test("selects on Enter", async () => {
			const onSelectionChangeFn = vi.fn();
			const { user, getByRole, getByTestId } = renderSelectMultiple({
				onSelectionChange: onSelectionChangeFn,
			});

			const trigger = getByRole("button");
			const valueContainer = getByTestId("select-value-container");
			await user.click(trigger);
			const list = getByRole("listbox");
			const options = within(list).getAllByRole("option");
			await user.keyboard("[ArrowDown]");
			await user.keyboard("[Enter]");
			await user.keyboard("[ArrowDown]");
			await user.keyboard("[ArrowDown]");
			await user.keyboard("[Enter]");

			const chips = within(valueContainer).getAllByRole("row");
			expect(chips).toHaveLength(2);
			expect(list).toBeInTheDocument();
			within(options[0]).getByTestId("icon-CheckIcon");
			within(options[2]).getByTestId("icon-CheckIcon");
			expect(onSelectionChangeFn).toHaveBeenCalledTimes(2);
			// the first call is with Set([1])
			expect(onSelectionChangeFn.mock.calls[0][0].has("1")).toBeTruthy();
			// the second call is with Set([1, 2])
			expect(onSelectionChangeFn.mock.calls[1][0].has("1")).toBeTruthy();
			expect(onSelectionChangeFn.mock.calls[1][0].has("3")).toBeTruthy();
		});

		test("supports disabled keys", async () => {
			const { user, getByRole } = renderSelectMultiple({
				disabledKeys: ["1", "3"],
			});

			const trigger = getByRole("button");
			await user.click(trigger);
			const list = getByRole("listbox");
			const options = within(list).getAllByRole("option");

			expect(options[0]).not.toHaveAttribute("data-focused", "true");
			expect(options[0]).toHaveAttribute("data-disabled", "true");
			await user.keyboard("[ArrowDown]");
			expect(options[0]).not.toHaveAttribute("data-focused", "true");
			expect(options[1]).toHaveAttribute("data-focused", "true");
		});

		test("renders an error message", async () => {
			const { getByRole } = renderSelectMultiple({
				errorMessages: ["Error!"],
			});

			const errorsContainer = getByRole("alert");
			within(errorsContainer).getByText("Error!");
		});

		test("can be disabled", async () => {
			const { getByRole } = renderSelectMultiple({
				isDisabled: true,
			});

			const trigger = getByRole("button");
			expect(trigger).toBeDisabled();
		});

		test("supports controllable selection", async () => {
			const onSelectionChangeFn = vi.fn();

			const { user, getByRole, rerender, getByTestId } = render(
				<Select
					label="Controllable Select"
					aria-label="Controllable Select"
					selectionMode="multiple"
					items={selectData}
					selectedKeys={[]}
					onSelectionChange={onSelectionChangeFn}
				>
					{(item) => (
						<Select.Item
							key={item.id}
							aria-label={`Item ${item.textValue}`}
							textValue={item.textValue}
						>
							{item.textValue}
						</Select.Item>
					)}
				</Select>,
			);

			const trigger = getByRole("button");
			const valueContainer = getByTestId("select-value-container");
			await user.click(trigger);
			const list = getByRole("listbox");
			const options = within(list).getAllByRole("option");

			await user.click(options[0]);
			rerender(
				<Select
					label="Controllable Select"
					aria-label="Controllable Select"
					selectionMode="multiple"
					items={selectData}
					selectedKeys={["1"]}
					onSelectionChange={onSelectionChangeFn}
				>
					{(item) => (
						<Select.Item
							key={item.id}
							aria-label={`Item ${item.textValue}`}
							textValue={item.textValue}
						>
							{item.textValue}
						</Select.Item>
					)}
				</Select>,
			);

			expect(onSelectionChangeFn).toHaveBeenCalledTimes(1);
			expect(onSelectionChangeFn.mock.calls[0][0].has("1")).toBeTruthy();

			await user.click(options[2]);
			rerender(
				<Select
					label="Controllable Select"
					aria-label="Controllable Select"
					selectionMode="multiple"
					items={selectData}
					selectedKeys={["1", "3"]}
					onSelectionChange={onSelectionChangeFn}
				>
					{(item) => (
						<Select.Item
							key={item.id}
							aria-label={`Item ${item.textValue}`}
							textValue={item.textValue}
						>
							{item.textValue}
						</Select.Item>
					)}
				</Select>,
			);

			expect(onSelectionChangeFn).toHaveBeenCalledTimes(2);
			expect(onSelectionChangeFn.mock.calls[1][0].has("1")).toBeTruthy();
			expect(onSelectionChangeFn.mock.calls[1][0].has("3")).toBeTruthy();

			let chips = within(valueContainer).getAllByRole("row");

			expect(chips).toHaveLength(2);
			expect(within(list).getAllByTestId("icon-CheckIcon")).toHaveLength(
				2,
			);
		});

		test.todo("supports validation?", async () => {});

		test.todo("works with forms?", async () => {});

		test("doesn't violate any accessiblity rules", async () => {
			const { container } = renderSelectMultiple({});
			const results = await axe(container);

			expect(results).toHaveNoViolations();
		});
	});
});

const selectData = [
	{ id: "1", textValue: "Item 1" },
	{ id: "2", textValue: "Item 2" },
	{ id: "3", textValue: "Item 3" },
	{ id: "4", textValue: "Item 4" },
	{ id: "5", textValue: "Item 5" },
	{ id: "6", textValue: "Item 6" },
	{ id: "7", textValue: "Item 7" },
	{ id: "8", textValue: "Item 8" },
	{ id: "9", textValue: "Item 9" },
	{ id: "10", textValue: "Item 10" },
];
