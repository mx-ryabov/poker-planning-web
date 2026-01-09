"use client";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { z } from "zod";

type UseMutateProps<TVariables = void, TData = unknown> = {
	mutateFn: (variables: TVariables, signal?: AbortSignal) => Promise<TData>;
	onMutate?: (variables: TVariables) => void;
	onSuccess?: (data: TData, variables: TVariables) => void;
	onError?: (error: Error, variables: TVariables) => void;
	onSettled?: (
		data: TData | undefined,
		error: Error | null,
		variables: TVariables,
	) => void;
	validationSchema?: z.ZodSchema<TVariables>;
};

/**
 * A custom mutation hook that provides:
 * - Zod validation before request
 * - useTransition for non-blocking updates
 * - AbortController support for cancellation
 * - Callbacks: onMutate, onSuccess, onError, onSettled
 *
 * @example
 * ```tsx
 * const { mutate, isPending, error, reset, cancel } = useMutation({
 *   mutateFn: (data, signal) => fetch('/api', { signal, body: data }),
 *   onSuccess: (data) => updateStore(data),
 *   onError: (error) => showToast(error.message),
 *   onSettled: () => closeModal(),
 * });
 * ```
 */
export function useMutation<TVariables = void, TData = unknown>(
	props: UseMutateProps<TVariables, TData>,
) {
	const {
		validationSchema,
		mutateFn,
		onMutate,
		onError,
		onSuccess,
		onSettled,
	} = props;

	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<Error | null>(null);

	const abortControllerRef = useRef<AbortController | null>(null);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			abortControllerRef.current?.abort();
		};
	}, []);

	const cancel = useCallback(() => {
		abortControllerRef.current?.abort();
		abortControllerRef.current = null;
	}, []);

	const reset = useCallback(() => {
		setError(null);
	}, []);

	const mutate = useCallback(
		async (variables: TVariables) => {
			setError(null);

			// Abort any in-flight mutation
			abortControllerRef.current?.abort();
			abortControllerRef.current = new AbortController();
			const signal = abortControllerRef.current.signal;

			let isVarsValid = true;
			let parsedData = variables;
			let parsedError: Error = new Error("Unparsed error");

			if (validationSchema) {
				const parsed = validationSchema.safeParse(variables);
				isVarsValid = parsed.success;
				if (parsed.success) parsedData = parsed.data;
				if (!parsed.success) {
					parsedError = new Error(parsed.error.errors[0].message);
				}
			}

			if (isVarsValid) {
				startTransition(async () => {
					try {
						onMutate?.(parsedData);
						const mutatedData = await mutateFn(parsedData, signal);

						// Don't call callbacks if aborted
						if (signal.aborted) return;

						onSuccess?.(mutatedData, variables);
						onSettled?.(mutatedData, null, variables);
					} catch (e: unknown) {
						// Don't handle abort errors
						if (e instanceof Error && e.name === "AbortError") {
							return;
						}

						const error =
							e instanceof Error ? e : new Error(String(e));
						setError(error);
						onError?.(error, variables);
						onSettled?.(undefined, error, variables);
					}
				});
			} else {
				setError(parsedError);
				onError?.(parsedError, variables);
				onSettled?.(undefined, parsedError, variables);
			}
		},
		[validationSchema, mutateFn, onError, onSuccess, onMutate, onSettled],
	);

	return { isPending, error, mutate, reset, cancel };
}
