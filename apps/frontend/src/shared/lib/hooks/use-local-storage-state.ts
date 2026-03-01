"use client";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { ZodSchema } from "zod";

type Options<
	TValue,
	TDefaultValue extends TValue | undefined = TValue | undefined,
> = {
	/** A function that is used to parse the value from a string.
	 *
	 * @param value - The value to parse (taken from localStorage).
	 * @returns The parsed value.
	 *
	 */
	parse?: (value: string) => TValue;
	// TODO: Add serialize function
	/** A function that is used to serialize the value to a string.
	 *
	 * @param value - The value to serialize.
	 * @returns The serialized value.
	 *
	 */
	//serialize?: (value: TValue) => string;
	/** The default value to use if the value is not found in localStorage. */
	defaultValue?: TDefaultValue;
	/** The default value to use if the value is not found in localStorage on the server. */
	defaultServerValue?: TDefaultValue;
	/** Whether to sync the value with localStorage. If true, the value will be synced with localStorage and updated when localStorage changes on another tab. */
	syncWithStorage?: boolean;
	schema?: ZodSchema<TValue>;
};

type JsonPrimitive = string | number | boolean | null | Date;
type JsonValue = JsonPrimitive | JsonObject | JsonArray;
type JsonObject = { readonly [key: string]: JsonValue };
type JsonArray = readonly JsonValue[];
type SetStateValue<TValue extends JsonValue> =
	| TValue
	| ((prevValue: TValue | undefined) => TValue);
export type SetLocalStorageStateFunction<TValue extends JsonValue> = (
	newValue: SetStateValue<TValue>,
) => void;

type UseLocalStorageStateResult<TValue extends JsonValue> = [
	TValue | undefined,
	SetLocalStorageStateFunction<TValue>,
	() => void,
];

// #1 Overloading: If the defaultValue is provided the value is always should be of type TValue
export function useLocalStorageState<TValue extends JsonValue>(
	fieldName: string,
	options?: Options<TValue, TValue> & { defaultValue: TValue },
): [TValue, SetLocalStorageStateFunction<TValue>, () => void];
// #2 Overloading: If the defaultValue is not provided the value should be of type TValue | undefined
export function useLocalStorageState<TValue extends JsonValue>(
	fieldName: string,
	options?: Options<TValue, undefined>,
): [TValue | undefined, SetLocalStorageStateFunction<TValue>, () => void];
/**
 * The hook to use localStorage state. It's a wrapper around the localStorage API that provides a more convenient way to use localStorage together with useState.
 * @param fieldName - The name of the key to store the value in localStorage.
 * @param options - The options for the hook.
 * @returns A tuple with the value, the setter function and the reset function.
 */
export function useLocalStorageState<TValue extends JsonValue>(
	fieldName: string,
	options: Options<TValue, TValue | undefined> = {},
): UseLocalStorageStateResult<TValue> {
	const [stableOptions] = useState(() => ({
		syncWithStorage: true,
		...options,
	}));
	const {
		subscribe,
		getSnapshot,
		getServerSnapshot,
		setState,
		resetState,
		subscribeOnStorageChange,
	} = useMemo(
		() => buildState<TValue>(fieldName, stableOptions),
		[fieldName, stableOptions],
	);

	useEffect(() => {
		if (stableOptions.syncWithStorage) {
			return subscribeOnStorageChange();
		}
	}, [stableOptions.syncWithStorage, subscribeOnStorageChange]);

	const value = useSyncExternalStore(
		subscribe,
		getSnapshot,
		getServerSnapshot,
	);

	return [value, setState, resetState];
}

class LocalStorageState<TValue extends JsonValue> {
	private fieldName: string;
	private value?: TValue;
	private options: Options<TValue>;
	private listeners: Set<() => void>;

	get storedOptions(): Options<TValue> {
		return this.options;
	}

	constructor(fieldName: string, options?: Options<TValue>) {
		this.fieldName = fieldName;
		this.options = options ?? { defaultValue: undefined };
		this.initializeValue();
		this.listeners = new Set();
	}

	setState(newValue: SetStateValue<TValue>, notifyListeners = true) {
		if (isSsr()) {
			return;
		}

		const valueToSet =
			typeof newValue === "function" ? newValue(this.value) : newValue;
		const valueToStorage = JSON.stringify(valueToSet);
		localStorage.setItem(this.fieldName, valueToStorage);
		this.value = valueToSet;
		if (notifyListeners) {
			this.notifyListeners();
		}
	}

	resetState(notifyListeners = true) {
		if (isSsr()) {
			return;
		}
		localStorage.removeItem(this.fieldName);
		this.value = this.options.defaultValue;
		if (notifyListeners) {
			this.notifyListeners();
		}
	}

	subscribe(callback: () => void) {
		this.listeners.add(callback);
		return () => this.listeners.delete(callback);
	}

	getSnapshot(): TValue | undefined {
		return this.value;
	}

	getServerSnapshot(): TValue | undefined {
		return this.options.defaultServerValue;
	}

	private boundOnStorageChange?: (event: StorageEvent) => void;
	subscribeOnStorageChange() {
		if (isSsr()) {
			return;
		}
		if (!this.boundOnStorageChange) {
			this.boundOnStorageChange = this.onStorageChange.bind(this);
		}
		window.addEventListener("storage", this.boundOnStorageChange);
		return () => {
			if (this.boundOnStorageChange) {
				window.removeEventListener(
					"storage",
					this.boundOnStorageChange,
				);
			}
		};
	}

	private initializeValue() {
		if (isSsr()) {
			this.value =
				this.options.defaultServerValue || this.options.defaultValue;
			return;
		}
		this.updateValueFromStorage();
	}

	private updateValueFromStorage() {
		const value = localStorage.getItem(this.fieldName);
		if (value === null) {
			this.value = this.options.defaultValue;
			return;
		}

		let parseResult: { ok: true } | { ok: false; error: string } = {
			ok: true,
		};
		let parsedValue: TValue | undefined = this.options.defaultValue;

		if (this.options.parse) {
			parsedValue = this.options.parse(value);
		} else {
			try {
				parsedValue = JSON.parse(value) as TValue;
			} catch (e) {
				parseResult = { ok: false, error: String(e) };
			}
		}
		// if (this.options.schema) {
		// 	const result = this.options.schema.safeParse(parsedValue);
		// 	if (!result.success) {
		// 		parseResult = { ok: false, error: result.error.message };
		// 	}
		// }
		if (!parseResult.ok) {
			console.warn(
				`useLocalStorageState: Failed to parse value "${value}" for key "${this.fieldName}": ${parseResult.error}`,
			);
			parsedValue = this.options.defaultValue;
			if (parsedValue !== undefined) {
				this.setState(parsedValue, false);
			} else {
				this.resetState(false);
			}
		}
		this.value = parsedValue;
	}

	private onStorageChange(event: StorageEvent) {
		if (event.key === this.fieldName) {
			this.updateValueFromStorage();
			this.notifyListeners();
		}
	}

	private notifyListeners() {
		for (const listener of this.listeners) {
			listener();
		}
	}
}

class LocalStorageStateCacheManager<TValue extends JsonValue> {
	private statesCache = new Map<string, LocalStorageState<TValue>>();

	getState(fieldName: string) {
		return this.statesCache.get(fieldName);
	}

	setState(fieldName: string, state: LocalStorageState<TValue>) {
		this.statesCache.set(fieldName, state);
	}

	clearCache() {
		this.statesCache.clear();
	}
}

const cacheManager = new LocalStorageStateCacheManager();
export const __clearStorageCache__TestOnly =
	cacheManager.clearCache.bind(cacheManager);

function buildState<TValue extends JsonValue>(
	fieldName: string,
	options?: Options<TValue>,
) {
	let state = cacheManager.getState(fieldName) as
		| LocalStorageState<TValue>
		| undefined;

	if (state === undefined) {
		state = new LocalStorageState<TValue>(fieldName, options);
		cacheManager.setState(
			fieldName,
			state as unknown as LocalStorageState<JsonValue>,
		);
	} else {
		if (JSON.stringify(state.storedOptions) !== JSON.stringify(options)) {
			console.warn(
				`useLocalStorageState: Key "${fieldName}" is already cached with different options. First options will be used.\n`,
				`First options: ${JSON.stringify(state.storedOptions)}\n`,
				`Second options: ${JSON.stringify(options)}\n`,
				"If it's expected to get the same value from different places, consider using this hook inside your custom hook where you can provide the options once.\n",
				"Otherwise, it's possible that the key is already taken and you need consider using another one.",
			);
		}
	}

	return {
		subscribe: state.subscribe.bind(state),
		getSnapshot: state.getSnapshot.bind(state),
		getServerSnapshot: state.getServerSnapshot.bind(state),
		setState: state.setState.bind(state),
		resetState: state.resetState.bind(state),
		subscribeOnStorageChange: state.subscribeOnStorageChange.bind(state),
	};
}

function isSsr() {
	return typeof localStorage === "undefined";
}
