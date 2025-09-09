import * as Sentry from "@sentry/nextjs";

const isProd = process.env.NODE_ENV === "production";

export async function register() {
	if (!isProd) return;

	if (process.env.NEXT_RUNTIME === "nodejs") {
		await import("./sentry.server.config");
	}

	if (process.env.NEXT_RUNTIME === "edge") {
		await import("./sentry.edge.config");
	}
}

export const onRequestError = Sentry.captureRequestError;
