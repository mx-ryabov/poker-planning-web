import { useRef } from "react";

/**
 * Hook that returns whether the value has changed since the last render
 * and the previous value.
 * @param value - current value
 * @param defaultValue - default value for the previous value. If not provided (i.e. is undefined), the current value is used.
 * @returns - { isChanged: boolean, value: T | null }
 */
export function useValueChanged<T>(value: T, defaultValue: T | null = value) {
	const prevValueRef = useRef(defaultValue);
	const prevValue = prevValueRef.current;
	const isChanged = prevValue !== value;
	prevValueRef.current = value;
	return {
		isChanged,
		value: prevValue,
	};
}
