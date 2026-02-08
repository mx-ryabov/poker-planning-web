import { ForwardedRef, RefObject } from "react";

export function setRefs<ElementType extends HTMLElement>(
	localRef: RefObject<ElementType | null>,
	forwardRef?: ForwardedRef<ElementType>,
) {
	return (element: ElementType | null) => {
		localRef.current = element;
		if (typeof forwardRef === "function") {
			forwardRef(element);
		} else if (forwardRef) {
			forwardRef.current = element;
		}
	};
}
