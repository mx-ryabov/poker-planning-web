"use client";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";

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
};

type UseLocalStorageStateResult<TValue> = [
	TValue | undefined,
	(newValue: TValue) => void,
	() => void,
];

// #1 Overloading: If the defaultValue is provided the value is always should be of type TValue
export function useLocalStorageState<TValue>(
	fieldName: string,
	options?: Options<TValue, TValue> & { defaultValue: TValue },
): [TValue, (newValue: TValue) => void, () => void];
// #2 Overloading: If the defaultValue is not provided the value should be of type TValue | undefined
export function useLocalStorageState<TValue>(
	fieldName: string,
	options?: Options<TValue, undefined>,
): [TValue | undefined, (newValue: TValue) => void, () => void];
/**
 * The hook to use localStorage state. It's a wrapper around the localStorage API that provides a more convenient way to use localStorage together with useState.
 * @param fieldName - The name of the key to store the value in localStorage.
 * @param options - The options for the hook.
 * @returns A tuple with the value, the setter function and the reset function.
 */
export function useLocalStorageState<TValue>(
	fieldName: string,
	options: Options<TValue, TValue | undefined> = { syncWithStorage: true },
): UseLocalStorageStateResult<TValue> {
	const [stableOptions] = useState(options);
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

class LocalStorageState<TValue> {
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

	setState(newValue: TValue) {
		if (isSsr()) {
			return;
		}
		const valueToSet =
			typeof newValue === "string" ? newValue : JSON.stringify(newValue);
		localStorage.setItem(this.fieldName, valueToSet);
		this.value = newValue;
		this.notifyListeners();
	}

	resetState() {
		if (isSsr()) {
			return;
		}
		localStorage.removeItem(this.fieldName);
		this.value = this.options.defaultValue;
		this.notifyListeners();
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
		if (this.options.parse) {
			this.value = this.options.parse(value);
		} else {
			try {
				const parsedValue = JSON.parse(value) as TValue;
				this.value = parsedValue;
			} catch {
				this.value = value as TValue;
			}
		}
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

const statesCache = new Map<string, LocalStorageState<unknown>>();

function buildState<TValue>(fieldName: string, options?: Options<TValue>) {
	let state = statesCache.get(fieldName) as
		| LocalStorageState<TValue>
		| undefined;
	if (!state) {
		state = new LocalStorageState<TValue>(fieldName, options);
		statesCache.set(fieldName, state);
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
