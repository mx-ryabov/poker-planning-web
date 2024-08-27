import { test, describe, expect, vi } from "vitest";
import { render, screen } from "@/test/utilities";
import { axe } from "jest-axe";
import { Chip, ChipGroup } from "./component";
import { useListData } from "react-stately";

describe("Chip Group", () => {
	test("renders correctly", async () => {
		const { unmount, getByText } = render(
			<ChipGroup>
				<Chip textValue="Apple" />
				<Chip textValue="Orange" />
			</ChipGroup>,
		);

		getByText("Apple");
		getByText("Orange");

		expect(() => unmount()).not.toThrow();
	});

	test("removes a chip when statefull", async () => {
		const initialItems = [
			{ id: 1, name: "Maxim" },
			{ id: 2, name: "Tanya" },
			{ id: 3, name: "Jack" },
		];
		const onRemoveFn = vi.fn();

		const { user, getAllByRole } = render(
			<ChipGroup items={initialItems} onRemove={onRemoveFn}>
				{(item) => <Chip textValue={item.name} key={item.id} />}
			</ChipGroup>,
		);

		const chipsRemoveBtns = getAllByRole("button");
		expect(chipsRemoveBtns.length).toBe(3);
		await user.click(chipsRemoveBtns[2]);
		expect(onRemoveFn).toHaveBeenNthCalledWith(1, new Set([3]));
	});

	test("should have disabled chips", async () => {
		const { queryByRole } = render(
			<ChipGroup>
				<Chip textValue="Chip" isDisabled />
			</ChipGroup>,
		);

		const chipRemoveBtn = queryByRole("button");
		expect(chipRemoveBtn).toBeNull();
	});

	test("switches focus between chips by tab", async () => {
		const { user, getAllByRole } = render(
			<ChipGroup>
				<Chip textValue="Apple" />
				<Chip textValue="Orange" />
			</ChipGroup>,
		);

		const [appleChip, orangeChip] = getAllByRole("row");

		await user.tab();
		expect(appleChip).toHaveAttribute("data-focused", "true");
		expect(orangeChip).not.toHaveAttribute("data-focused", "true");
		await user.keyboard("[ArrowRight]");
		expect(appleChip).not.toHaveAttribute("data-focused", "true");
		expect(orangeChip).toHaveAttribute("data-focused", "true");
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container } = render(
			<ChipGroup>
				<Chip textValue="Chip" />
			</ChipGroup>,
		);
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
