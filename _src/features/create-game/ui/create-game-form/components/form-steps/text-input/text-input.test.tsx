import { test, describe, expect, vi } from "vitest";
import { render } from "@/test/utilities";
import { TextInput } from "./text-input";

describe("Create Game Form Text Input", () => {
	test("renders", async () => {
		const { unmount, getByText, getByRole } = render(
			<TextInput
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
				<TextInput
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
			<TextInput
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
		const { getByTestId, rerender } = render(
			<TextInput
				label="Name"
				placeholder="Team Planning"
				onEnter={vi.fn()}
				maxLength={50}
			/>,
		);

		const errorContainer = getByTestId("error-msg");
		expect(errorContainer).toHaveTextContent("");
		rerender(
			<TextInput
				label="Name"
				placeholder="Team Planning"
				onEnter={vi.fn()}
				maxLength={50}
				error="Error Message"
			/>,
		);
		expect(errorContainer).toHaveTextContent("Error Message");
	});

	test("shows Enter shortcut if the value.length > 0 and hides if === 0", async () => {
		const { getByTestId, queryByTestId, rerender } = render(
			<TextInput
				label="Name"
				placeholder="Team Planning"
				value=""
				onEnter={vi.fn()}
				maxLength={50}
			/>,
		);
		expect(queryByTestId("enter-shortcut")).not.toBeInTheDocument();
		rerender(
			<TextInput
				label="Name"
				placeholder="Team Planning"
				value="something"
				onEnter={vi.fn()}
				maxLength={50}
			/>,
		);
		getByTestId("enter-shortcut");
		rerender(
			<TextInput
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
			<TextInput
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
