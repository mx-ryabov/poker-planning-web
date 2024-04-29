"use client";
import { MutableRefObject, useEffect, useLayoutEffect, useState } from "react";

export enum ContentPosition {
	TopStart,
	Top,
	TopEnd,
	BottomStart,
	Bottom,
	BottomEnd,
	LeftStart,
	Left,
	LeftEnd,
	RightStart,
	Right,
	RightEnd,
}

export function useCalcRelativePosition(
	preferredPosition: ContentPosition,
	contentElement: HTMLElement | null,
	triggerRef: MutableRefObject<HTMLElement | null> | null,
) {
	const [calculatedPosition, setCalculatedPosition] =
		useState(preferredPosition);
	const contentElementForIntersection =
		useContentElementForIntersection(contentElement);

	useContentIntersection(
		contentElementForIntersection,
		preferredPosition,
		setCalculatedPosition,
	);

	useEffect(() => {
		const triggerElement = triggerRef?.current || null;
		if (
			contentElement === null ||
			triggerElement === null ||
			contentElementForIntersection === null
		) {
			return;
		}

		const calcAndSetNewTranslate = () => {
			calcAndSetNewTranslateFn(
				triggerElement,
				contentElement,
				calculatedPosition,
			);

			calcAndSetNewTranslateFn(
				triggerElement,
				contentElementForIntersection,
				preferredPosition,
			);
		};

		calcAndSetNewTranslate();

		document?.addEventListener("scroll", calcAndSetNewTranslate, true);
		// TODO: avoid recalc when resizing?
		//window?.addEventListener("resize", calcAndSetNewTranslate, true);

		return () => {
			document?.removeEventListener(
				"scroll",
				calcAndSetNewTranslate,
				true,
			);
			//window?.removeEventListener("resize", calcAndSetNewTranslate, true);
		};
	}, [
		contentElement,
		triggerRef,
		calculatedPosition,
		preferredPosition,
		contentElementForIntersection,
	]);

	return calculatedPosition;
}

function useContentElementForIntersection(
	contentElement: HTMLElement | null,
): HTMLElement | null {
	const [contentElementForIntersection, setContentElementForIntersection] =
		useState<HTMLDivElement | null>(null);

	useEffect(() => {
		if (contentElement === null) return;

		const contentElementStyles = window.getComputedStyle(contentElement);

		const elementForIntersection = document?.createElement("div");
		elementForIntersection.className = contentElement.className;
		elementForIntersection.style.opacity = "0";
		elementForIntersection.style.zIndex = `${+contentElementStyles.getPropertyValue("z-index") - 1}`;
		elementForIntersection.style.width = `${contentElement?.getBoundingClientRect().width}px`;
		elementForIntersection.style.height = `${contentElement?.getBoundingClientRect().height}px`;

		contentElement.parentElement?.appendChild(elementForIntersection);
		setContentElementForIntersection(elementForIntersection);
	}, [contentElement]);

	return contentElementForIntersection;
}

function useContentIntersection(
	contentElementForIntersection: HTMLElement | null,
	preferredPosition: ContentPosition,
	setCalculatedPosition: (position: ContentPosition) => void,
) {
	useEffect(() => {
		if (!contentElementForIntersection) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setCalculatedPosition(preferredPosition);
					} else {
						setCalculatedPosition(
							getPositionBasedOnIntersection(
								preferredPosition,
								entry,
							),
						);
					}
				});
			},
			{ threshold: 1, root: null, rootMargin: "0px" },
		);

		observer.observe(contentElementForIntersection);

		return () => {
			observer.disconnect();
		};
	}, [
		contentElementForIntersection,
		preferredPosition,
		setCalculatedPosition,
	]);
}

function calcAndSetNewTranslateFn(
	triggerElement: HTMLElement,
	contentElement: HTMLElement,
	position: ContentPosition,
) {
	const triggerRect = triggerElement.getBoundingClientRect();
	const contentRect = contentElement.getBoundingClientRect();

	const point = calculateTranslatePoint(position, triggerRect, contentRect);

	if (point) {
		contentElement.style.transform = `translate(${point.x}px, ${point.y}px)`;
	} else {
		console.error(
			`Position ${position} doesn't exist in calculateTranslatePoint`,
		);
	}
}

function calculateTranslatePoint(
	position: ContentPosition,
	triggerRect: DOMRect,
	contentRect: DOMRect,
): { x: number; y: number } | undefined {
	switch (position) {
		case ContentPosition.BottomStart:
			return { x: triggerRect.x, y: triggerRect.bottom };

		case ContentPosition.Bottom:
			return {
				x:
					triggerRect.x +
					triggerRect.width / 2 -
					contentRect.width / 2,
				y: triggerRect.bottom,
			};

		case ContentPosition.BottomEnd:
			return {
				x: triggerRect.right - contentRect.width,
				y: triggerRect.bottom,
			};

		case ContentPosition.TopStart:
			return { x: triggerRect.x, y: triggerRect.y - contentRect.height };

		case ContentPosition.Top:
			return {
				x:
					triggerRect.right -
					triggerRect.width / 2 -
					contentRect.width / 2,
				y: triggerRect.y - contentRect.height,
			};

		case ContentPosition.TopEnd:
			return {
				x: triggerRect.right - contentRect.width,
				y: triggerRect.y - contentRect.height,
			};

		case ContentPosition.LeftStart:
			return { x: triggerRect.x - contentRect.width, y: triggerRect.y };

		case ContentPosition.Left:
			return {
				x: triggerRect.x - contentRect.width,
				y:
					triggerRect.y +
					triggerRect.height / 2 -
					contentRect.height / 2,
			};

		case ContentPosition.LeftEnd:
			return {
				x: triggerRect.x - contentRect.width,
				y: triggerRect.bottom - contentRect.height,
			};

		case ContentPosition.RightStart:
			return { x: triggerRect.right, y: triggerRect.y };

		case ContentPosition.Right:
			return {
				x: triggerRect.right,
				y:
					triggerRect.y +
					triggerRect.height / 2 -
					contentRect.height / 2,
			};

		case ContentPosition.RightEnd:
			return {
				x: triggerRect.right,
				y: triggerRect.bottom - contentRect.height,
			};

		default:
			return undefined;
	}
}

type RectSide = keyof Pick<
	DOMRectReadOnly,
	"left" | "top" | "right" | "bottom"
>;
function getPositionBasedOnIntersection(
	preferedPosition: ContentPosition,
	intersectionEntry: IntersectionObserverEntry,
): ContentPosition {
	const { boundingClientRect, intersectionRect } = intersectionEntry;
	let intersectionSide: RectSide | null = null;

	(["left", "top", "right", "bottom"] satisfies RectSide[]).forEach(
		(side) => {
			intersectionSide =
				boundingClientRect[side] !== intersectionRect[side]
					? side
					: intersectionSide;
		},
	);

	if (intersectionSide === null) {
		return preferedPosition;
	}

	return (
		PositionBasedOnIntersection[intersectionSide][preferedPosition] ||
		preferedPosition
	);
}

const PositionBasedOnIntersection = {
	left: {
		[ContentPosition.LeftStart]: ContentPosition.RightStart,
		[ContentPosition.Left]: ContentPosition.Right,
		[ContentPosition.LeftEnd]: ContentPosition.RightEnd,
	},
	top: {
		[ContentPosition.TopStart]: ContentPosition.BottomStart,
		[ContentPosition.Top]: ContentPosition.Bottom,
		[ContentPosition.TopEnd]: ContentPosition.BottomEnd,
	},
	right: {
		[ContentPosition.RightStart]: ContentPosition.LeftStart,
		[ContentPosition.Right]: ContentPosition.Left,
		[ContentPosition.RightEnd]: ContentPosition.LeftEnd,
	},
	bottom: {
		[ContentPosition.BottomStart]: ContentPosition.TopStart,
		[ContentPosition.Bottom]: ContentPosition.Top,
		[ContentPosition.BottomEnd]: ContentPosition.TopEnd,
	},
};
