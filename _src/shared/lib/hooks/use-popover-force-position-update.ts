"use client";
import { RefObject, useCallback } from "react";
import { useResizeObserver } from "./use-resize-observable";

// Hack. This will be fixed when this PR is released https://github.com/adobe/react-spectrum/pull/6396
export function usePopoverForcePositionUpdate(
	popoverRef: RefObject<HTMLElement | null> | undefined,
	triggerRef: RefObject<Element | null> | undefined,
) {
	const forcePositionUpdate = useCallback(() => {
		if (!popoverRef || !triggerRef) {
			return;
		}
		const popoverEl = popoverRef.current;
		if (popoverEl) {
			const { bottom, top, left, right, height } =
				popoverEl.getBoundingClientRect();

			requestAnimationFrame(() => {
				bottom &&
					popoverRef.current?.style.setProperty(
						"bottom",
						`${bottom}px`,
					);
				top && popoverRef.current?.style.setProperty("top", `${top}px`);
				left &&
					popoverRef.current?.style.setProperty("left", `${left}px`);
				right &&
					popoverRef.current?.style.setProperty(
						"right",
						`${right}px`,
					);
				height &&
					popoverRef.current?.style.setProperty("max-height", ``);
			});
		}
	}, [popoverRef, triggerRef]);

	useResizeObserver({
		ref: triggerRef,
		onResize: forcePositionUpdate,
	});
}
