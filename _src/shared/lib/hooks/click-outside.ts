"use client";

import { MutableRefObject, useEffect } from "react";

export function useClickOutside(
	refs: MutableRefObject<HTMLElement | null>[],
	cb: () => void,
) {
	useEffect(() => {
		const elements = refs.map((ref) => ref.current);
		if (!document || !elements.length) {
			return;
		}

		const clickHandler = (e: MouseEvent) => {
			console.log(elements);

			const isClickInsideElements = elements.find((element) => {
				return element?.contains(e.target as Node);
			});

			if (!isClickInsideElements) {
				cb();
			}
		};

		document.addEventListener("mousedown", clickHandler);

		return () => {
			document?.removeEventListener("mousedown", clickHandler);
		};
	}, [refs, cb]);
}
