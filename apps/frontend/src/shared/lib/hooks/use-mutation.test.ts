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
		expect(mutateFn).toHaveBeenNthCalledWith(
			1,
			{ argument: "anything" },
			expect.any(AbortSignal),
		);
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

	describe("onSettled callback", () => {
		test("invokes onSettled after onSuccess with data, null error, and variables", async () => {
			const mutateFn = vi.fn().mockResolvedValue({ data: "success" });
			const onSuccess = vi.fn();
			const onSettled = vi.fn();
			const { result } = renderHook(() =>
				useMutation({ mutateFn, onSuccess, onSettled }),
			);

			await act(() => result.current.mutate({ arg: "test" }));

			expect(onSuccess).toHaveBeenCalledOnce();
			expect(onSettled).toHaveBeenNthCalledWith(
				1,
				{ data: "success" },
				null,
				{ arg: "test" },
			);
		});

		test("invokes onSettled after onError with undefined data, error, and variables", async () => {
			const mutateFn = vi
				.fn()
				.mockRejectedValue(new Error("mutation failed"));
			const onError = vi.fn();
			const onSettled = vi.fn();
			const { result } = renderHook(() =>
				useMutation({ mutateFn, onError, onSettled }),
			);

			await act(() => result.current.mutate({ arg: "test" }));

			expect(onError).toHaveBeenCalledOnce();
			expect(onSettled).toHaveBeenNthCalledWith(
				1,
				undefined,
				expect.objectContaining({ message: "mutation failed" }),
				{ arg: "test" },
			);
		});

		test("invokes onSettled after validation error with undefined data, error, and variables", async () => {
			const mutateFn = vi.fn();
			const onSettled = vi.fn();
			const { result } = renderHook(() =>
				useMutation({
					mutateFn,
					onSettled,
					validationSchema: mockSchema,
				}),
			);

			await act(() => result.current.mutate({ title: "" }));

			expect(mutateFn).not.toHaveBeenCalled();
			expect(onSettled).toHaveBeenNthCalledWith(
				1,
				undefined,
				expect.objectContaining({
					message: expect.stringContaining("Title can't be empty"),
				}),
				{ title: "" },
			);
		});
	});

	describe("reset function", () => {
		test("clears the error state when reset is called", async () => {
			const mutateFn = vi.fn().mockRejectedValue(new Error("error"));
			const { result } = renderHook(() => useMutation({ mutateFn }));

			await act(() => result.current.mutate({ arg: "test" }));
			expect(result.current.error).not.toBeNull();

			act(() => result.current.reset());
			expect(result.current.error).toBeNull();
		});

		test("reset function is stable across renders", () => {
			const mutateFn = vi.fn();
			const { result, rerender } = renderHook(() =>
				useMutation({ mutateFn }),
			);

			const resetFn = result.current.reset;
			rerender();
			expect(result.current.reset).toBe(resetFn);
		});
	});

	describe("AbortController support", () => {
		test("passes AbortSignal to mutateFn", async () => {
			const mutateFn = vi.fn().mockResolvedValue({ data: "test" });
			const { result } = renderHook(() => useMutation({ mutateFn }));

			await act(() => result.current.mutate({ arg: "test" }));

			expect(mutateFn).toHaveBeenCalledWith(
				{ arg: "test" },
				expect.any(AbortSignal),
			);
		});

		test("aborts previous mutation when new mutation starts", async () => {
			let capturedSignal1: AbortSignal | undefined;
			let capturedSignal2: AbortSignal | undefined;

			const mutateFn = vi
				.fn()
				.mockImplementationOnce(
					(_vars, signal) =>
						new Promise((resolve) => {
							capturedSignal1 = signal;
							setTimeout(() => resolve({ call: 1 }), 100);
						}),
				)
				.mockImplementationOnce(
					(_vars, signal) =>
						new Promise((resolve) => {
							capturedSignal2 = signal;
							setTimeout(() => resolve({ call: 2 }), 100);
						}),
				);

			const { result } = renderHook(() => useMutation({ mutateFn }));

			// Start first mutation
			act(() => {
				result.current.mutate({ arg: "first" });
			});

			// Start second mutation immediately (should abort first)
			act(() => {
				result.current.mutate({ arg: "second" });
			});

			expect(capturedSignal1?.aborted).toBe(true);
			expect(capturedSignal2?.aborted).toBe(false);
		});

		test("cancel function aborts the current mutation", async () => {
			let capturedSignal: AbortSignal | undefined;
			const mutateFn = vi.fn().mockImplementation(
				(_vars, signal) =>
					new Promise((resolve) => {
						capturedSignal = signal;
						setTimeout(() => resolve({ data: "test" }), 100);
					}),
			);

			const { result } = renderHook(() => useMutation({ mutateFn }));

			act(() => {
				result.current.mutate({ arg: "test" });
			});

			expect(capturedSignal?.aborted).toBe(false);

			act(() => {
				result.current.cancel();
			});

			expect(capturedSignal?.aborted).toBe(true);
		});

		test("does not call onSuccess when mutation is aborted", async () => {
			const abortError = new Error("Aborted");
			abortError.name = "AbortError";

			const mutateFn = vi.fn().mockRejectedValue(abortError);
			const onSuccess = vi.fn();
			const onError = vi.fn();
			const onSettled = vi.fn();

			const { result } = renderHook(() =>
				useMutation({ mutateFn, onSuccess, onError, onSettled }),
			);

			await act(() => result.current.mutate({ arg: "test" }));

			expect(onSuccess).not.toHaveBeenCalled();
			expect(onError).not.toHaveBeenCalled();
			expect(onSettled).not.toHaveBeenCalled();
		});

		test("aborts mutation on unmount", async () => {
			let capturedSignal: AbortSignal | undefined;
			const mutateFn = vi.fn().mockImplementation(
				(_vars, signal) =>
					new Promise((resolve) => {
						capturedSignal = signal;
						setTimeout(() => resolve({ data: "test" }), 100);
					}),
			);

			const { result, unmount } = renderHook(() =>
				useMutation({ mutateFn }),
			);

			act(() => {
				result.current.mutate({ arg: "test" });
			});

			expect(capturedSignal?.aborted).toBe(false);

			unmount();

			expect(capturedSignal?.aborted).toBe(true);
		});

		test("cancel function is stable across renders", () => {
			const mutateFn = vi.fn();
			const { result, rerender } = renderHook(() =>
				useMutation({ mutateFn }),
			);

			const cancelFn = result.current.cancel;
			rerender();
			expect(result.current.cancel).toBe(cancelFn);
		});
	});
});

const mockSchema = z.object({
	title: z.string().min(1, "Title can't be empty"),
});
