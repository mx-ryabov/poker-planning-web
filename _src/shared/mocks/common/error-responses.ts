import { ApiError } from "../../lib";
import { ApiFailedResponse } from "../../lib/utils/app-fetch";

export function generateValidationErrorRes(
	errorTitle: string,
	validationErrors: Record<string, string[]>,
): ApiFailedResponse {
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

export function generateUnknownErrorRes(errorTitle: string): ApiFailedResponse {
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
