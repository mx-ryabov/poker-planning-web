"use client";

import { MutableRefObject, useEffect } from "react";

export function useClickOutside(
	refs: MutableRefObject<HTMLElement | null>[],
	cb: () => void,
	options: UseClickOutsideOptions = DEFAULT_OPTIONS,
) {
	useEffect(() => {
		const elements = refs.map((ref) => ref.current);
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

		if (!elements.includes(null) && options?.areAllElementsObservable) {
			document.addEventListener("mousedown", clickHandler);

			return () => {
				document?.removeEventListener("mousedown", clickHandler);
			};
		}
	}, [refs, cb]);
}

type UseClickOutsideOptions = {
	areAllElementsObservable?: boolean;
};

const DEFAULT_OPTIONS: UseClickOutsideOptions = {
	areAllElementsObservable: true,
};
