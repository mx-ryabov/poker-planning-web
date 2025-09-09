"use server";
import { cookies } from "next/headers";
import { logger } from "../logger";
import { ProxyAgent, setGlobalDispatcher } from "undici";
import { ApiError, ServerError } from "../types";

if (process.env.USE_FIDDLER === "true") {
	console.log("SET GLOBAL DISPATCHER");

	setGlobalDispatcher(new ProxyAgent("http://127.0.0.1:8888"));
}

const HOST = process.env.NEXT_PUBLIC_HOST;

export const appFetchGet = async <
	TQuery extends Record<string, string>,
	TResponse,
>(
	path: string,
	query?: TQuery,
	options?: { tags?: string[] },
): ApiResponse<TResponse> => {
	const params = new URLSearchParams(query);
	const headers = await getHeaders();
	const res = await fetch(`${HOST}/api${path}?${params.toString()}`, {
		method: "GET",
		headers,
		next: {
			tags: options?.tags,
		},
	});
	return await responseHandler(res);
};

export const appFetchPost = async <TRequest, TResponse>(
	path: string,
	body: TRequest,
	query?: Record<string, string>,
): ApiResponse<TResponse> => {
	const params = new URLSearchParams(query);

	const res = await fetch(`${HOST}/api${path}?${params.toString()}`, {
		method: "POST",
		headers: await getHeaders(),
		body: JSON.stringify(body),
	});
	return await responseHandler(res);
};

export const appFetchPut = async <TRequest, TResponse>(
	path: string,
	body?: TRequest,
	query?: Record<string, string>,
): ApiResponse<TResponse> => {
	const params = new URLSearchParams(query);

	const res = await fetch(`${HOST}/api${path}?${params.toString()}`, {
		method: "PUT",
		headers: await getHeaders(),
		body: body ? JSON.stringify(body) : undefined,
	});
	return await responseHandler(res);
};

export const appFetchDelete = async (path: string) => {
	const res = await fetch(`${HOST}/api${path}`, {
		method: "DELETE",
		headers: await getHeaders(),
	});
	return await responseHandler(res);
};

async function getHeaders() {
	const cookieStore = await cookies();
	const token = cookieStore.get("token");
	return {
		"Content-Type": "application/json",
		Authorization: token?.value ? `Bearer ${token.value}` : "",
	};
}

export type ApiSucceedResponse<TResponse> = { ok: true; data: TResponse };
export type ApiFailedResponse = {
	ok: false;
	error: ApiError;
};
export type ApiResponse<TResponse> = Promise<
	ApiSucceedResponse<TResponse> | ApiFailedResponse
>;

async function responseHandler<TResponse>(
	res: Response,
): ApiResponse<TResponse> {
	const payload = await res.json().catch(() => undefined);

	if (!res.ok) {
		let error = ApiError.generateServerApiError();

		if (payload) {
			error = new ApiError(payload as ServerError);

			if ((error as ApiError).status !== 400) {
				logger.error(error);
			}
		}
		return { ok: false, error: error.toPlainObject() };
	}

	return { ok: true, data: payload as TResponse };
}
