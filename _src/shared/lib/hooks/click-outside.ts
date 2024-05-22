"use client";

import { useEffect } from "react";

export function useClickOutside(
	elements: (HTMLElement | null)[],
	cb: () => void,
) {
	useEffect(() => {
		if (!document || !elements.length) {
			return;
		}

		const clickHandler = (e: MouseEvent) => {
			const isClickInsideElements = elements.find((element) => {
				return element?.contains(e.target as Node);
			});

			if (!isClickInsideElements) {
				cb();
			}
		};

		document.addEventListener("click", clickHandler);

		return () => {
			document?.removeEventListener("click", clickHandler);
		};
	}, [elements, cb]);
}
