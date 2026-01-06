import { test, describe, expect, vi } from "vitest";
import { act, renderHook } from "@/test/utilities";
import { useMutation } from "./use-mutation";
import { z } from "zod";

describe("useMutation", () => {
	test("renders correctly", async () => {
		const { unmount } = renderHook(() =>
			useMutation({ mutateFn: () => Promise.resolve(true) }),
		);
		expect(() => unmount()).not.toThrow();
	});

	test("invokes provided mutateFn when mutate is invoked with the same provided variables", async () => {
		const mutateFn = vi.fn();
		const { result } = renderHook(() => useMutation({ mutateFn }));

		result.current.mutate({ argument: "anything" });
		expect(mutateFn).toHaveBeenNthCalledWith(1, { argument: "anything" });
	});

	test("invokes provided onMutate right before mutateFn when mutate is invoked with the same provided variables", async () => {
		const mutateFn = vi.fn();
		const onMutate = vi.fn();
		const { result } = renderHook(() =>
			useMutation({ mutateFn, onMutate }),
		);

		result.current.mutate({ argument: "anything" });
		expect(onMutate).toHaveBeenNthCalledWith(1, { argument: "anything" });
	});

	test("invokes provided onSuccess after successful mutateFn execution with returned data and with the same provided variables", async () => {
		const mutateFn = vi.fn().mockResolvedValue({ returnedData: "data" });
		const onSuccess = vi.fn();
		const { result } = renderHook(() =>
			useMutation({ mutateFn, onSuccess }),
		);

		await result.current.mutate({ argument: "anything" });
		expect(onSuccess).toHaveBeenNthCalledWith(
			1,
			{ returnedData: "data" },
			{ argument: "anything" },
		);
	});

	test("invokes provided onError when mutateFn thrown an error with the error and the same provided variables", async () => {
		const mutateFn = vi.fn().mockRejectedValue(new Error("error"));
		const onError = vi.fn();
		const { result } = renderHook(() => useMutation({ mutateFn, onError }));

		await act(() => result.current.mutate({ argument: "anything" }));
		expect(onError).toHaveBeenNthCalledWith(1, new Error("error"), {
			argument: "anything",
		});
		expect(result.current.error).toEqual(
			expect.objectContaining({
				message: expect.stringContaining("error"),
			}),
		);
	});

	test("uses provided validationSchema and doesn't thow an error if provided data are valid", async () => {
		const mutateFn = vi.fn();
		const onError = vi.fn();
		const onSuccess = vi.fn();
		const { result } = renderHook(() =>
			useMutation({
				mutateFn,
				onError,
				validationSchema: mockSchema,
				onSuccess,
			}),
		);

		await act(() => result.current.mutate({ title: "123" }));

		expect(onError).not.toHaveBeenCalled();
		expect(result.current.error).toBeNull();
		expect(onSuccess).toHaveBeenCalledOnce();
	});

	test("uses provided validationSchema and thows an error if provided data are invalid", async () => {
		const mutateFn = vi.fn();
		const onError = vi.fn();
		const { result } = renderHook(() =>
			useMutation({ mutateFn, onError, validationSchema: mockSchema }),
		);

		await act(() => result.current.mutate({ title: "" }));

		expect(onError).toHaveBeenNthCalledWith(
			1,
			expect.objectContaining({
				message: expect.stringContaining("Title can't be empty"),
			}),
			{
				title: "",
			},
		);
		expect(result.current.error).toEqual(
			expect.objectContaining({
				message: expect.stringContaining("Title can't be empty"),
			}),
		);
	});
});

const mockSchema = z.object({
	title: z.string().min(1, "Title can't be empty"),
});
