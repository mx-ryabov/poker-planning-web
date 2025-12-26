import { test, describe, expect, vi } from "vitest";
import { render } from "@/test/utilities";
import { axe } from "jest-axe";
import { NewButton } from "./component";
import { CheckIcon } from "../icon";

describe("NewButton", () => {
	test("renders correctly", async () => {
		const wrapper = render(<NewButton>Click me!</NewButton>);

		expect(() => wrapper.unmount()).not.toThrow();
	});

	test("is pressable", async () => {
		const onPressFn = vi.fn();
		const { user, getByRole } = render(
			<NewButton onPress={onPressFn}>Click me!</NewButton>,
		);
		const button = getByRole("button");

		await user.click(button);

		expect(onPressFn).toHaveBeenCalled();
	});

	test("isn't pressable when disabled", async () => {
		const onPressFn = vi.fn();
		const { user, getByRole } = render(
			<NewButton isDisabled onPress={onPressFn}>
				Click me!
			</NewButton>,
		);
		const button = getByRole("button");

		await user.click(button);

		expect(onPressFn).not.toHaveBeenCalled();
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container } = render(<NewButton>Click me!</NewButton>);
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});

	test("renders square button correctly", async () => {
		const wrapper = render(
			<NewButton shape="square">
				<CheckIcon size={18} />
			</NewButton>,
		);

		expect(() => wrapper.unmount()).not.toThrow();
	});

	test("square button is pressable", async () => {
		const onPressFn = vi.fn();
		const { user, getByRole } = render(
			<NewButton shape="square" onPress={onPressFn}>
				<CheckIcon size={18} />
			</NewButton>,
		);
		const button = getByRole("button");

		await user.click(button);

		expect(onPressFn).toHaveBeenCalled();
	});

	test("square button isn't pressable when disabled", async () => {
		const onPressFn = vi.fn();
		const { user, getByRole } = render(
			<NewButton shape="square" isDisabled onPress={onPressFn}>
				<CheckIcon size={18} />
			</NewButton>,
		);
		const button = getByRole("button");

		await user.click(button);

		expect(onPressFn).not.toHaveBeenCalled();
	});

	test("square button isn't pressable when isPending", async () => {
		const onPressFn = vi.fn();
		const { user, getByRole } = render(
			<NewButton shape="square" isPending={true} onPress={onPressFn}>
				<CheckIcon size={18} />
			</NewButton>,
		);
		const button = getByRole("button");

		await user.click(button);

		expect(onPressFn).not.toHaveBeenCalled();
	});

	test("square button doesn't violate any accessiblity rules", async () => {
		const { container } = render(
			<NewButton shape="square">
				<CheckIcon size={18} />
			</NewButton>,
		);
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
