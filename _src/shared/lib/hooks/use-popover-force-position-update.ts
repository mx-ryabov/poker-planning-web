"use client";
import { RefObject, useCallback } from "react";
import { useResizeObserver } from "./use-resize-observable";

// Hack. This will be fixed when this PR is released https://github.com/adobe/react-spectrum/pull/6396
export function usePopoverForcePositionUpdate(
	popoverRef: RefObject<HTMLElement> | undefined,
	triggerRef: RefObject<Element> | undefined,
) {
	const forcePositionUpdate = useCallback(() => {
		if (!popoverRef || !triggerRef) {
			return;
		}
		if (popoverRef.current) {
			const { bottom, top, left, right, height } =
				popoverRef.current?.getBoundingClientRect();

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
	}, [popoverRef]);

	useResizeObserver({
		ref: triggerRef,
		onResize: forcePositionUpdate,
	});
}
