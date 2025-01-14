import { test, describe, expect, vi } from "vitest";
import { render } from "@/test/utilities";
import { axe } from "jest-axe";
import { Button, ButtonSquare } from "./component";
import { CheckIcon } from "../icon";

describe("Button", () => {
	test("renders correctly", async () => {
		const wrapper = render(<Button title="Click me!" />);

		expect(() => wrapper.unmount()).not.toThrow();
	});

	test("is pressable", async () => {
		const onPressFn = vi.fn();
		const { user, getByRole } = render(
			<Button title="Click me!" onPress={onPressFn} />,
		);
		const button = getByRole("button");

		await user.click(button);

		expect(onPressFn).toHaveBeenCalled();
	});

	test("isn't pressable when disabled", async () => {
		const onPressFn = vi.fn();
		const { user, getByRole } = render(
			<Button title="Click me!" isDisabled onPress={onPressFn} />,
		);
		const button = getByRole("button");

		await user.click(button);

		expect(onPressFn).not.toHaveBeenCalled();
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container } = render(<Button title="Click me!" />);
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});

describe("Button Square", () => {
	test("renders correctly", async () => {
		const wrapper = render(<ButtonSquare icon={CheckIcon} />);

		expect(() => wrapper.unmount()).not.toThrow();
	});

	test("is pressable", async () => {
		const onPressFn = vi.fn();
		const { user, getByRole } = render(
			<ButtonSquare icon={CheckIcon} onPress={onPressFn} />,
		);
		const button = getByRole("button");

		await user.click(button);

		expect(onPressFn).toHaveBeenCalled();
	});

	test("isn't pressable when disabled", async () => {
		const onPressFn = vi.fn();
		const { user, getByRole } = render(
			<ButtonSquare icon={CheckIcon} isDisabled onPress={onPressFn} />,
		);
		const button = getByRole("button");

		await user.click(button);

		expect(onPressFn).not.toHaveBeenCalled();
	});

	test("isn't pressable when isPending", async () => {
		const onPressFn = vi.fn();
		const { user, getByRole } = render(
			<ButtonSquare
				icon={CheckIcon}
				isPending={true}
				onPress={onPressFn}
			/>,
		);
		const button = getByRole("button");

		await user.click(button);

		expect(onPressFn).not.toHaveBeenCalled();
	});

	test("doesn't violate any accessiblity rules", async () => {
		const { container } = render(<ButtonSquare icon={CheckIcon} />);
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
