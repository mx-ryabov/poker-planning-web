"use client";
import { useEffect } from "react";

// This hook prevents the scrollbar gutter from being stable when the scrollbar is hidden
// It should be used only if the scrollbar is hidden on the page
// It's a workaround for the default behavior of ModalOverlay component of react-aria-components library where the scrollbar gutter becomes stable when ModalOverlay is opened
export function usePreventScrollbarGutterStable() {
	useEffect(() => {
		const observer = new MutationObserver(() => {
			document.documentElement.style.scrollbarGutter = "auto";
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["style"],
		});

		return () => observer.disconnect();
	}, []);
}
