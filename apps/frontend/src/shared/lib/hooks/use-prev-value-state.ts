"use client";
import { useState } from "react";

type PrevValueState<T> = {
	isChanged: boolean;
	value: T;
};

/**
 * This hook returns the previous value of a given value ONLY during the current render.
 * This hook is an abstraction for the render optimization pattern suggested by React team.
 * * @see https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
 *
 * @example
 * const prevCount = usePrevValueState(count);
 * if (prevCount.isChanged) {
 *   // Handle the change during render
 *   setOtherState(count);
 * }
 *
 * @warning This hook should only be used when you need to synchronize state based on prop changes.
 * Consider if useEffect or derived state might be more appropriate for your use case.
 *
 * @param value - current value
 * @param defaultValue - default value for the previous value. If not provided, the current value is used.
 * @returns { isChanged: boolean, value: T }
 */
export function usePrevValueState<T>(
	value: T,
	defaultValue: T = value,
): PrevValueState<T> {
	const [prevValue, setPrevValue] = useState(defaultValue);
	if (prevValue !== value) {
		setPrevValue(value);
	}

	return {
		isChanged: prevValue !== value,
		value: prevValue,
	};
}
