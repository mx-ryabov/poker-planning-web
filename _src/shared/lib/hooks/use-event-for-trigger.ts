"use client";
import { ForwardedRef, useEffect } from "react";

export function useEventForTrigger<T extends HTMLElement>(
	event: keyof HTMLElementEventMap,
	triggerRef: ForwardedRef<T>,
	action: () => void,
) {
	useEffect(() => {
		if (typeof triggerRef !== "function" && triggerRef !== null) {
			triggerRef.current?.addEventListener(event, action);

			return () => {
				triggerRef.current?.removeEventListener(event, action);
			};
		}
	}, [event, triggerRef, action]);
}
