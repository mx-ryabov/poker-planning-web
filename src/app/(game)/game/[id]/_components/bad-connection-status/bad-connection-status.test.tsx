import { test, describe, expect, vi } from "vitest";
import { render } from "@/test/utilities";
import { axe } from "jest-axe";
import { GameRoomFakeProviderWrapper } from "../../__mocks__";
import { BadConnectionStatus } from "./bad-connection-status";
import { createGameStateStore } from "@/src/app/(game)/game/[id]/_store";
import { generateGame, generateParticipant } from "@/__mocks__/game";
import { LiveStatus } from "../../_store/game-management-slice/game-managemet.model";

let mockExitAnimation = false;
vi.mock("@/src/shared/lib", async (importOriginal) => ({
	...(await importOriginal()),
	useExitAnimation: () => mockExitAnimation,
}));

describe("BadConnectionStatus", () => {
	test("renders nothing when connected", async () => {
		const { queryByText, unmount } = renderWithLiveStatus({
			status: "connected",
		});

		expect(queryByText(/Your game is going to start soon!/i)).toBeNull();
		expect(queryByText(/Joining.../i)).toBeNull();
		expect(queryByText(/Don't worry!/i)).toBeNull();
		expect(queryByText(/Something went wrong/i)).toBeNull();

		expect(() => unmount()).not.toThrow();
	});

	test("shows notStarted message", async () => {
		const { getByText } = renderWithLiveStatus({ status: "notStarted" });
		expect(
			getByText(/Your game is going to start soon!/i),
		).toBeInTheDocument();
	});

	test("shows connecting message", async () => {
		const { getByText } = renderWithLiveStatus({ status: "connecting" });
		expect(getByText(/Joining.../i)).toBeInTheDocument();
	});

	test("shows reconnecting message", async () => {
		const { getByText } = renderWithLiveStatus({ status: "reconnecting" });
		expect(getByText(/Don't worry!/i)).toBeInTheDocument();
		expect(getByText(/We'll have you back soon\./i)).toBeInTheDocument();
	});

	test("shows disconnected message", async () => {
		const { getByText } = renderWithLiveStatus({ status: "disconnected" });
		expect(getByText(/You were disconnected\./i)).toBeInTheDocument();
		expect(getByText(/Trying to reconnect\.{3}/i)).toBeInTheDocument();
	});

	test("shows failed message", async () => {
		const { getByText } = renderWithLiveStatus({
			status: "failed",
			reason: new Error("boom"),
		});
		expect(getByText(/Something went wrong/i)).toBeInTheDocument();
		expect(getByText(/Try to reload the page\./i)).toBeInTheDocument();
	});

	test("keeps overlay mounted during exit animation when connected", async () => {
		mockExitAnimation = true;
		const { container } = renderWithLiveStatus({ status: "connected" });
		const overlay = container.querySelector(
			'[data-animation-exiting="true"]',
		);
		expect(overlay).not.toBeNull();
		mockExitAnimation = false;
	});

	test("doesn't violate any accessibility rules", async () => {
		const { container } = renderWithLiveStatus({ status: "notStarted" });
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});

function renderWithLiveStatus(liveStatus: LiveStatus) {
	const store = createGameStateStore({
		game: generateGame({ id: "test-game-id" }),
		currentParticipant: generateParticipant({ id: "participant-id" }),
	});
	store.getState().setLiveStatus(liveStatus);

	return render(<BadConnectionStatus />, {
		wrapper: GameRoomFakeProviderWrapper({ gameStateStore: store }),
	});
}
