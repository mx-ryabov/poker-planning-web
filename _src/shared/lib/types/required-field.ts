export type RequiredFields<T extends object, F extends keyof T> = Omit<T, F> &
	Required<Pick<T, F>>;
