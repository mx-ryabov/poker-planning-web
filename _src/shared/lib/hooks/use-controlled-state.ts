"use client";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

/**
 *
 * @param value controlled value
 * @param defaultValue in case the state is uncotrolled
 * @param onChange fired when state is controlled and setValue invoked
 * @returns
 */
export function useControlledState<TValue>(
	value: Exclude<TValue, undefined>,
	defaultValue: Exclude<TValue, undefined> | undefined,
	onChange?: (value: TValue) => void,
): [TValue, Dispatch<SetStateAction<TValue>>];
export function useControlledState<TValue>(
	value: Exclude<TValue, undefined> | undefined,
	defaultValue: Exclude<TValue, undefined>,
	onChange?: (value: TValue) => void,
): [TValue, Dispatch<SetStateAction<TValue>>];
export function useControlledState<TValue>(
	value: TValue,
	defaultValue: TValue,
	onChange?: (value: TValue) => void,
): [TValue, Dispatch<SetStateAction<TValue>>] {
	const [stateValue, setStateValue] = useState<TValue>(value || defaultValue);

	const isControlled = value !== undefined;
	let currentValue = isControlled ? value : stateValue;

	const setValue: Dispatch<SetStateAction<TValue>> = useCallback(
		(newValue) => {
			if (isFunction(newValue)) {
				if (isControlled && onChange) {
					onChange(newValue(currentValue));
				} else if (!isControlled) {
					setStateValue(newValue(currentValue));
				}
			} else {
				if (isControlled && onChange) {
					onChange(newValue);
				} else if (!isControlled) {
					setStateValue(newValue);
				}
			}
		},
		[isControlled, currentValue, onChange],
	);

	return [currentValue, setValue];
}

function isFunction(value: unknown): value is Function {
	return typeof value === "function";
}
