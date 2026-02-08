import { SentryLogger } from "./sentry-logger";

const isProd = process.env.NODE_ENV === "production";

const loggerImpl = isProd ? new SentryLogger() : console;

export { loggerImpl as logger };
