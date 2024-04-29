import { useCallback, useState } from "react";

export function useElement<TElement extends HTMLElement>(): [
	TElement | null,
	(element: TElement | null) => void,
] {
	const [contentElement, setContentElement] = useState<TElement | null>(null);
	const setElement = useCallback(
		(element: TElement | null) => {
			if (contentElement !== element) {
				setContentElement(element);
			}
		},
		[contentElement],
	);

	return [contentElement, setElement];
}
