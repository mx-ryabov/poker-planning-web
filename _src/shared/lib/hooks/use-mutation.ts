import { useCallback, useState, useTransition } from "react";
import { z } from "zod";

type UseMutateProps<TVariables = void, TData = unknown> = {
	mutateFn: (variables: TVariables) => Promise<TData>;
	onMutate?: (variables: TVariables) => void;
	onSuccess?: (data: TData, variables: TVariables) => void;
	onError?: (error: Error, variables: TVariables) => void;
	validationSchema?: z.ZodSchema<TVariables>;
};
/**
 * TODO:
 * 1. Add Abort Controller
 * 2. Add Debounce
 */
/**
 * TODO: add some docs
 * @param props
 * @returns
 */
export function useMutation<TVariables = void, TData = unknown>(
	props: UseMutateProps<TVariables, TData>,
) {
	const { validationSchema, mutateFn, onMutate, onError, onSuccess } = props;

	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<Error | null>(null);

	const mutate = useCallback(
		async (variables: TVariables) => {
			setError(null);
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
						if (onMutate) onMutate(parsedData);
						const mutatedData = await mutateFn(parsedData);
						if (onSuccess) onSuccess(mutatedData, variables);
					} catch (e: unknown) {
						const error =
							e instanceof Error ? e : new Error(String(e));
						setError(error);
						if (onError) onError(error, variables);
					}
				});
			} else {
				setError(parsedError);
				if (onError) onError(parsedError, variables);
			}
		},
		[validationSchema, mutateFn, onError, onSuccess, onMutate],
	);

	return { isPending, error, mutate };
}
