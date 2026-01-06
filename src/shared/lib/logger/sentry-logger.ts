import * as Sentry from "@sentry/nextjs";
import { Extras, ILogger } from "./types";

export class SentryLogger implements ILogger {
	info(): void {
		throw new Error("Method not implemented.");
	}
	error(error: Error, extra: Extras = {}): void {
		Sentry.captureException(error, {
			level: "error",
			extra: { ...extra, platform: "frontend" },
		});
	}
}
