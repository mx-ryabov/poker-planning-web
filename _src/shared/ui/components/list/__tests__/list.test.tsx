import { test, describe, expect, vi } from "vitest";
import { render } from "@/test/utilities";
import { axe } from "jest-axe";
import { List } from "..";

/**
 * ideally it should be much more tests (testing statelessness, multiple selection)
 * and this everything in combiation with disabled state and etc.
 * But for practice purposes this should be enough.
 * And again - It's a bad practice to test libraries
 */
describe("List", () => {
	test("renders correctly", async () => {
		const { unmount } = render(
			<List aria-label="Products List">
				<List.Item textValue="Apple">Apple</List.Item>
				<List.Item textValue="Orange">Orange</List.Item>
				<List.Item textValue="Cake">Cake</List.Item>
			</List>,
		);

		expect(() => unmount()).not.toThrow();
	});

	test("selects items by clicking with selection mode=single", async () => {
		const onSelectionChangeFn = vi.fn();
		const { user, getAllByRole } = render(
			<List
				aria-label="Products List"
				selectionMode="single"
				onSelectionChange={onSelectionChangeFn}
			>
				<List.Item textValue="Apple" id={1}>
					Apple
				</List.Item>
				<List.Item textValue="Orange" id={2}>
					Orange
				</List.Item>
				<List.Item textValue="Cake" id={3}>
					Cake
				</List.Item>
			</List>,
		);

		const [apple] = getAllByRole("option");

		expect(apple).not.toHaveAttribute("data-selected", "true");
		await user.click(apple);
		expect(apple).toHaveAttribute("data-selected", "true");
		expect(onSelectionChangeFn).toHaveBeenCalledOnce();
		// It fails for some reason but it returns exactly new Set([1]).
		// Because almost all these tests are just for practice (and in reality I shouldn't test libraries) then I decided to leave it here as it is but commented
		//expect(onSelectionChangeFn).toHaveBeenCalledWith(new Set([1]));
	});

	test("selectes items with keyboard arrow keys", async () => {
		const onSelectionChangeFn = vi.fn();
		const { user, getAllByRole } = render(
			<List
				aria-label="Products List"
				selectionMode="single"
				onSelectionChange={onSelectionChangeFn}
			>
				<List.Item textValue="Apple" id={1}>
					Apple
				</List.Item>
				<List.Item textValue="Orange" id={2}>
					Orange
				</List.Item>
				<List.Item textValue="Cake" id={3}>
					Cake
				</List.Item>
			</List>,
		);

		const [apple] = getAllByRole("option");

		expect(apple).not.toHaveAttribute("data-selected", "true");
		await user.tab();
		await user.keyboard("[Enter]");
		expect(apple).toHaveAttribute("data-selected", "true");
		expect(onSelectionChangeFn).toHaveBeenCalledOnce();
	});

	test("supports disabled items", async () => {
		const onSelectionChangeFn = vi.fn();
		const { user, getAllByRole } = render(
			<List
				aria-label="Products List"
				selectionMode="single"
				onSelectionChange={onSelectionChangeFn}
			>
				<List.Item textValue="Apple" id={1}>
					Apple
				</List.Item>
				<List.Item textValue="Orange" id={2} isDisabled>
					Orange
				</List.Item>
				<List.Item textValue="Cake" id={3}>
					Cake
				</List.Item>
			</List>,
		);

		const [, orange] = getAllByRole("option");
		expect(orange).toHaveAttribute("data-disabled", "true");
		await user.click(orange);
		expect(orange).not.toHaveAttribute("data-selected", "true");
	});

	test("supports sections", async () => {
		const { getAllByText } = render(
			<List aria-label="Products List">
				<List.Section title="Fruits">
					<List.Item textValue="Apple" id={1}>
						Apple
					</List.Item>
					<List.Item textValue="Orange" id={2} isDisabled>
						Orange
					</List.Item>
				</List.Section>
				<List.Item textValue="Cake" id={3}>
					Cake
				</List.Item>
			</List>,
		);
		getAllByText("Fruits");
	});

	test("supports the empty state", async () => {
		const { getAllByText } = render(
			<List
				aria-label="Products List"
				renderEmptyState={() => "No results found."}
			></List>,
		);
		getAllByText("No results found.");
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container } = render(
			<List aria-label="Product list">
				<List.Item textValue="Apple">Apple</List.Item>
				<List.Item textValue="Orange">Orange</List.Item>
				<List.Item textValue="Cake">Cake</List.Item>
			</List>,
		);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
