"use server";
import { cookies } from "next/headers";

const HOST = process.env.BE_HTTP_HOST;

export const appFetchGet = async <TQuery extends Record<string, string>>(
	path: string,
	query?: TQuery,
): Promise<Response> => {
	const params = new URLSearchParams(query);

	return await fetch(`${HOST}/api${path}?${params.toString()}`, {
		method: "GET",
		headers: await getHeaders(),
	});
};

export const appFetchPost = async <TRequest extends object>(
	path: string,
	body: TRequest,
	query?: Record<string, string>,
): Promise<Response> => {
	const params = new URLSearchParams(query);

	return await fetch(`${HOST}/api${path}?${params.toString()}`, {
		method: "POST",
		headers: await getHeaders(),
		body: JSON.stringify(body),
	});
};

export const appFetchPut = async <TRequest extends object>(
	path: string,
	body: TRequest,
	query?: Record<string, string>,
): Promise<Response> => {
	const params = new URLSearchParams(query);

	return await fetch(`${HOST}/api${path}?${params.toString()}`, {
		method: "PUT",
		headers: await getHeaders(),
		body: JSON.stringify(body),
	});
};

export const appFetchDelete = async (path: string): Promise<Response> => {
	return await fetch(`${HOST}/api${path}`, {
		method: "DELETE",
		headers: await getHeaders(),
	});
};

async function getHeaders() {
	const cookieStore = await cookies();
	const token = cookieStore.get("token");
	return {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	};
}
