import { ApiError } from "../../lib";
import { ApiFailedResponse } from "../../lib/utils/app-fetch";

export function generateValidationErrorRes<TRequest extends object>(
	errorTitle: string,
	validationErrors: Partial<Record<keyof TRequest, string[]>>,
): ApiFailedResponse<TRequest> {
	return {
		ok: false,
		error: new ApiError({
			title: errorTitle,
			errors: validationErrors,
			status: 400,
			traceId: "test-trace-id",
			type: "test-type",
		}),
	};
}

export function generateUnknownErrorRes<TRequest extends object>(
	errorTitle: string,
): ApiFailedResponse<TRequest> {
	return {
		ok: false,
		error: new ApiError({
			title: errorTitle,
			errors: {},
			status: 500,
			traceId: "test-trace-id",
			type: "test-type",
		}),
	};
}
