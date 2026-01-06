import { test, describe, expect, vi } from "vitest";
import { render } from "@/test/utilities";
import { axe } from "jest-axe";
import { Button } from "./button";
import { CheckIcon } from "../icon";

describe("Button", () => {
	test("renders correctly", async () => {
		const wrapper = render(<Button>Click me!</Button>);

		expect(() => wrapper.unmount()).not.toThrow();
	});

	test("is pressable", async () => {
		const onPressFn = vi.fn();
		const { user, getByRole } = render(
			<Button onPress={onPressFn}>Click me!</Button>,
		);
		const button = getByRole("button");

		await user.click(button);

		expect(onPressFn).toHaveBeenCalled();
	});

	test("isn't pressable when disabled", async () => {
		const onPressFn = vi.fn();
		const { user, getByRole } = render(
			<Button isDisabled onPress={onPressFn}>
				Click me!
			</Button>,
		);
		const button = getByRole("button");

		await user.click(button);

		expect(onPressFn).not.toHaveBeenCalled();
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container } = render(<Button>Click me!</Button>);
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});

	test("renders square button correctly", async () => {
		const wrapper = render(
			<Button shape="square">
				<CheckIcon size={18} />
			</Button>,
		);

		expect(() => wrapper.unmount()).not.toThrow();
	});

	test("square button is pressable", async () => {
		const onPressFn = vi.fn();
		const { user, getByRole } = render(
			<Button shape="square" onPress={onPressFn}>
				<CheckIcon size={18} />
			</Button>,
		);
		const button = getByRole("button");

		await user.click(button);

		expect(onPressFn).toHaveBeenCalled();
	});

	test("square button isn't pressable when disabled", async () => {
		const onPressFn = vi.fn();
		const { user, getByRole } = render(
			<Button shape="square" isDisabled onPress={onPressFn}>
				<CheckIcon size={18} />
			</Button>,
		);
		const button = getByRole("button");

		await user.click(button);

		expect(onPressFn).not.toHaveBeenCalled();
	});

	test("square button isn't pressable when isPending", async () => {
		const onPressFn = vi.fn();
		const { user, getByRole } = render(
			<Button shape="square" isPending={true} onPress={onPressFn}>
				<CheckIcon size={18} />
			</Button>,
		);
		const button = getByRole("button");

		await user.click(button);

		expect(onPressFn).not.toHaveBeenCalled();
	});

	test("square button doesn't violate any accessiblity rules", async () => {
		const { container } = render(
			<Button shape="square">
				<CheckIcon size={18} />
			</Button>,
		);
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
