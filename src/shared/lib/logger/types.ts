export type Extras = Record<string, unknown>;

export interface ILogger {
	info(...data: unknown[]): void;
	error(error: Error, extra?: Extras): void;
}
