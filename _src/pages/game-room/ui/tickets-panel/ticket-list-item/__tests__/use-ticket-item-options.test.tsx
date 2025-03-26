import { test, describe, expect, vi, beforeEach } from "vitest";
import { act, renderHook } from "@/test/utilities";
import { ParticipantRole } from "@/_src/shared/api";
import { useTicketItemOptions } from "../state/use-ticket-item-options";
import { buildTicketItemWrapper, TicketItemWrapperProps } from "./utility";

describe("Use Ticket Item Options hook", () => {
	beforeEach(() => {
		openModalFn.mockClear();
		deleteTicket.mockClear();
	});

	test("renders correctly", async () => {
		const { unmount } = renderHookWithWrapper({});
		expect(() => unmount()).not.toThrow();
	});

	describe("when the current role is Master", () => {
		test("returns only 1 option", async () => {
			const { result } = renderHookWithWrapper({
				currentRole: ParticipantRole.Master,
			});
			expect(result.current).toHaveLength(1);
		});

		test("returns DeleteTicket option", async () => {
			const { result } = renderHookWithWrapper({
				currentRole: ParticipantRole.Master,
			});
			expect(result.current[0].title).toBe("Delete");
		});

		test("has DeleteTicket option with the action that opens the confimation modal", async () => {
			const { result } = renderHookWithWrapper({
				currentRole: ParticipantRole.Master,
			});
			act(() => {
				result.current[0].action();
			});
			expect(openModalFn).toHaveBeenCalledTimes(1);
			expect(openModalFn).toHaveBeenCalledWith(
				expect.objectContaining({
					onConfirm: deleteTicket,
				}),
			);
		});
	});

	describe("when the current role is Manager", () => {
		test("returns only 1 option", async () => {
			const { result } = renderHookWithWrapper({
				currentRole: ParticipantRole.Manager,
			});
			expect(result.current).toHaveLength(1);
		});

		test("returns DeleteTicket option", async () => {
			const { result } = renderHookWithWrapper({
				currentRole: ParticipantRole.Manager,
			});
			expect(result.current[0].title).toBe("Delete");
		});

		test("has DeleteTicket option with the action that opens the confimation modal", async () => {
			const { result } = renderHookWithWrapper({
				currentRole: ParticipantRole.Manager,
			});
			act(() => {
				result.current[0].action();
			});
			expect(openModalFn).toHaveBeenCalledTimes(1);
			expect(openModalFn).toHaveBeenCalledWith(
				expect.objectContaining({
					onConfirm: deleteTicket,
				}),
			);
		});
	});

	describe("when the current role is VotingMember", () => {
		test("returns no options", async () => {
			const { result } = renderHookWithWrapper({
				currentRole: ParticipantRole.VotingMember,
			});
			expect(result.current).toHaveLength(0);
		});
	});

	describe("when the current role is Spectator", () => {
		test("returns no options", async () => {
			const { result } = renderHookWithWrapper({
				currentRole: ParticipantRole.Spectator,
			});
			expect(result.current).toHaveLength(0);
		});
	});
});

const openModalFn = vi.fn();
const deleteTicket = vi.fn();

const renderHookWithWrapper = (props: TicketItemWrapperProps) => {
	return renderHook(() => useTicketItemOptions({ deleteTicket }), {
		wrapper: buildTicketItemWrapper({ ...props, openModalFn }),
	});
};
