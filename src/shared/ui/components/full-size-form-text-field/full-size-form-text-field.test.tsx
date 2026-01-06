import { test, describe, expect, vi } from "vitest";
import { render } from "@/test/utilities";
import { FullSizeFormTextInput } from "./component";

describe("FullSizeFormTextInput", () => {
	test("renders", async () => {
		const { unmount, getByText, getByRole } = render(
			<FullSizeFormTextInput
				label="Name"
				placeholder="Team Planning"
				onEnter={vi.fn()}
			/>,
		);
		getByText(/Name/);
		const textField = getByRole("textbox");
		expect(textField).toHaveAttribute("placeholder", "Team Planning");
		expect(() => unmount()).not.toThrow();
	});

	test("can show the value's letters count and the total allowable count if the value.length > 0", async () => {
		const { getByRole, queryByTestId, getByTestId, user, rerender } =
			render(
				<FullSizeFormTextInput
					label="Name"
					placeholder="Team Planning"
					onEnter={vi.fn()}
					maxLength={50}
				/>,
			);
		const textField = getByRole("textbox");
		expect(queryByTestId("length-state")).not.toBeInTheDocument();
		await user.type(textField, "game name");
		rerender(
			<FullSizeFormTextInput
				label="Name"
				placeholder="Team Planning"
				value={"game name"}
				onEnter={vi.fn()}
				maxLength={50}
			/>,
		);
		const lengthState = getByTestId("length-state");
		expect(lengthState).toHaveTextContent("9/50");
	});

	test("can show validation message", async () => {
		const { getByTestId, rerender, queryByTestId } = render(
			<FullSizeFormTextInput
				label="Name"
				placeholder="Team Planning"
				onEnter={vi.fn()}
				name="test"
				maxLength={50}
			/>,
		);

		const errorContainer = queryByTestId("test-error-msg");
		expect(errorContainer).not.toBeInTheDocument();
		rerender(
			<FullSizeFormTextInput
				label="Name"
				placeholder="Team Planning"
				onEnter={vi.fn()}
				maxLength={50}
				name="test"
				error="Error Message"
			/>,
		);
		expect(getByTestId("test-error-msg")).toHaveTextContent(
			"Error Message",
		);
	});

	test("shows Enter shortcut if the value.length > 0 and hides if === 0", async () => {
		const { getByTestId, queryByTestId, rerender } = render(
			<FullSizeFormTextInput
				label="Name"
				placeholder="Team Planning"
				value=""
				onEnter={vi.fn()}
				maxLength={50}
			/>,
		);
		expect(queryByTestId("enter-shortcut")).not.toBeInTheDocument();
		rerender(
			<FullSizeFormTextInput
				label="Name"
				placeholder="Team Planning"
				value="something"
				onEnter={vi.fn()}
				maxLength={50}
			/>,
		);
		getByTestId("enter-shortcut");
		rerender(
			<FullSizeFormTextInput
				label="Name"
				placeholder="Team Planning"
				value=""
				onEnter={vi.fn()}
				maxLength={50}
			/>,
		);
		expect(queryByTestId("enter-shortcut")).not.toBeInTheDocument();
	});

	test("trggers onEnter if focused and Enter is pressed", async () => {
		const onEnterFn = vi.fn();
		const { user } = render(
			<FullSizeFormTextInput
				label="Name"
				placeholder="Team Planning"
				value="something"
				onEnter={onEnterFn}
				maxLength={50}
			/>,
		);
		await user.keyboard("[Enter]");
		expect(onEnterFn).toHaveBeenCalledTimes(0);
		await user.tab();
		await user.keyboard("[Enter]");
		expect(onEnterFn).toHaveBeenCalledOnce();
	});
});
