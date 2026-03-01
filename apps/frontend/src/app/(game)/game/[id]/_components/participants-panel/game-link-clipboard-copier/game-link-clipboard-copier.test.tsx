import { test, describe, expect, vi, beforeEach, afterEach } from "vitest";
import { act, render, within } from "@/test/utilities";
import { axe } from "jest-axe";
import { GameLinkClipboardCopier } from "./game-link-clipboard-copier";

describe("Game Link Clipboard Copier", () => {
	beforeEach(() => {
		vi.useFakeTimers({ shouldAdvanceTime: true });
		vi.spyOn(window, "location", "get").mockReturnValue({
			href: "https://poker-planning.com/game/game-id",
		} as Location);
	});

	afterEach(() => {
		vi.runOnlyPendingTimers();
		vi.useRealTimers();
		vi.restoreAllMocks();
	});

	test("renders successfully", async () => {
		const { unmount, container, getByRole } = render(
			<GameLinkClipboardCopier />,
		);

		const input = getByRole("textbox");
		const copyBtn = getByRole("button");

		expect(input).toBeDisabled();
		within(copyBtn).getByTestId(/CopyIcon/i);
		expect(container).toHaveTextContent(/share the game link/i);
		expect(() => unmount()).not.toThrow();
	});

	test("contains current href in the input", async () => {
		const { getByRole } = render(<GameLinkClipboardCopier />);

		const input = getByRole("textbox");

		expect(input).toHaveValue("https://poker-planning.com/game/game-id");
	});

	test("copies the href to the clipboard if the copy button clicked", async () => {
		const clipboardWriteTextSpy = vi.spyOn(
			window.navigator.clipboard,
			"writeText",
		);
		const { getByRole, user } = render(<GameLinkClipboardCopier />);
		const copyBtn = getByRole("button");

		await user.click(copyBtn);
		expect(clipboardWriteTextSpy).toHaveBeenNthCalledWith(
			1,
			"https://poker-planning.com/game/game-id",
		);
	});

	test("shows the tooltip if the copy button clicked", async () => {
		const { getByRole, user } = render(<GameLinkClipboardCopier />);
		const copyBtn = getByRole("button");

		await user.click(copyBtn);
		const tooltip = getByRole("tooltip");

		expect(tooltip).toHaveTextContent(/copied/i);
	});

	test("hides the tooltip when time runs out", async () => {
		const { getByRole, user } = render(<GameLinkClipboardCopier />);
		const copyBtn = getByRole("button");

		await user.click(copyBtn);

		const tooltip = getByRole("tooltip");
		expect(tooltip).toBeVisible();

		await act(() => vi.runAllTimers());

		expect(tooltip).not.toBeVisible();
	});

	test("doesn't violate any accessibility rules", async () => {
		const { container } = render(<GameLinkClipboardCopier />);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
