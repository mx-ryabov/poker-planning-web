export type RequiredFields<T extends Object, F extends keyof T> = Omit<T, F> &
	Required<Pick<T, F>>;
