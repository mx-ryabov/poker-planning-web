"use client";
import { RefObject, useEffect } from "react";

function hasResizeObserver() {
	return typeof window.ResizeObserver !== "undefined";
}

type ResizeObserverOptionsType<T> = {
	ref: RefObject<T | null> | undefined;
	onResize: () => void;
};

export function useResizeObserver<T extends Element>(
	options: ResizeObserverOptionsType<T>,
) {
	const { ref, onResize } = options;

	useEffect(() => {
		let element = ref?.current;
		if (!element) {
			return;
		}

		if (!hasResizeObserver()) {
			window.addEventListener("resize", onResize, false);
			return () => {
				window.removeEventListener("resize", onResize, false);
			};
		} else {
			const resizeObserverInstance = new window.ResizeObserver(
				(entries) => {
					if (!entries.length) {
						return;
					}

					onResize();
				},
			);
			resizeObserverInstance.observe(element);

			return () => {
				if (element) {
					resizeObserverInstance.unobserve(element);
				}
			};
		}
	}, [onResize, ref]);
}
