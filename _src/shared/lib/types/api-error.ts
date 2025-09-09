import { buildErrorMsgFrom } from "../utils/build-error-msg-from";

export type ServerError<T extends object | undefined> = {
	type: string;
	title: string;
	status: number;
	errors: T extends undefined
		? undefined
		: Partial<Record<keyof T, string[]>>;
	traceId: string;
};
export class ApiError<TRequest extends object | undefined>
	extends Error
	implements ServerError<TRequest>
{
	type: string;
	title: string;
	status: number;
	errors: TRequest extends undefined
		? undefined
		: Partial<Record<keyof TRequest, string[]>>;
	traceId: string;
	cause?: "validation" | "server";

	constructor(error: ServerError<TRequest>) {
		super(buildErrorMsgFrom(error.title, error.errors));
		this.cause = error.status === 400 ? "validation" : "server";
		this.type = error.type;
		this.title = error.title;
		this.status = error.status;
		this.errors = error.errors;
		this.traceId = error.traceId;
	}

	static generateServerApiError(): ApiError<undefined> {
		return new ApiError({
			status: 500,
			title: "Unhandled Server Error",
			traceId: "None",
			errors: undefined,
			type: "unhandled",
		});
	}

	toPlainObject() {
		return {
			...this,
			message: this.message,
			name: this.name,
		};
	}
}
