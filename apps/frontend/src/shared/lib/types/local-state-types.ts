export type Action<TType, TData> = { type: TType; data: TData };

type ActionsMap<M extends { [index: string]: unknown }> = {
	[Key in keyof M]: M[Key] extends undefined
		? {
				type: Key;
			}
		: {
				type: Key;
				payload: M[Key];
			};
};

export type ActionsSet<TPayload extends { [index: string]: unknown }> =
	ActionsMap<TPayload>[keyof ActionsMap<TPayload>];
