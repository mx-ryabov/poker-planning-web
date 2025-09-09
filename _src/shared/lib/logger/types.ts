export type Extras = Record<string, unknown>;

export interface ILogger {
	info(...data: any[]): void;
	error(error: Error, extra?: Extras): void;
}
