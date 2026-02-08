"use client";

import { RefObject, useEffect } from "react";

export function useClickOutside(
	refs: RefObject<HTMLElement | null>[],
	cb: () => void,
	options: UseClickOutsideOptions = DEFAULT_OPTIONS,
) {
	useEffect(() => {
		const elements = refs.map((ref) => ref.current);
		if (!document || !elements.length) {
			return;
		}

		if (elements.includes(null) || !options?.areAllElementsObservable) {
			return;
		}
		const abortController = new AbortController();
		document.addEventListener(
			"mouseup",
			(e) => {
				const isClickInsideElements = elements.find((element) => {
					return element?.contains(e.target as Node);
				});

				if (!isClickInsideElements) {
					cb();
				}
			},
			{ capture: true, signal: abortController.signal },
		);

		return () => {
			abortController.abort();
		};
	}, [refs, cb, options?.areAllElementsObservable]);
}

type UseClickOutsideOptions = {
	areAllElementsObservable?: boolean;
};

const DEFAULT_OPTIONS: UseClickOutsideOptions = {
	areAllElementsObservable: true,
};
