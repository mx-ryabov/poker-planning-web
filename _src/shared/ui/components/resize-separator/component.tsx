import { useLocalStorage } from "@/_src/shared/lib/hooks/local-storage";
import { cva } from "class-variance-authority";
import { RefObject, useEffect, useRef } from "react";

const separatorStyles = cva(
	[
		"relative transition-colors",
		"after:content-[''] after:flex",
		"after:absolute",

		"before:content-[''] before:flex before:transition-all",
		"before:absolute",
		"before:bg-opacity-0 hover:before:bg-primary-600 active:before:bg-primary-700",
	],
	{
		variants: {
			orientation: {
				vertical: [
					"h-full",
					"hover:cursor-col-resize",
					"after:h-full after:w-4",
					"after:top-0 after:-left-2",
					"before:h-full before:w-1",
					"before:top-0 before:-left-1/2",
				],
				horizontal: [
					"w-full",
					"hover:cursor-row-resize",
					"after:w-full after:h-4",
					"after:left-0 after:-top-2",
					"before:w-full before:h-1",
					"before:left-0 before:-top-1/2",
				],
			},
		},
	},
);

type Props = {
	orientation: "vertical" | "horizontal";
	direction: "left/top" | "right/bottom";
	resizableElementRef: RefObject<HTMLDivElement | null>;
	stateKey?: string;
	onChangeEnd?: (width: number) => void;
};

export function ResizeSeparator({
	orientation,
	direction,
	resizableElementRef,
	stateKey,
	onChangeEnd,
}: Props) {
	const localStorage = useLocalStorage();
	const separatorRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const resizableEl = resizableElementRef.current;
		if (!resizableEl || !stateKey) return;

		const initialWidthPx = localStorage.getItem(
			`resizable-element-state-${stateKey}`,
		);
		if (initialWidthPx) {
			resizableEl.style.width = initialWidthPx;
		}
	}, [stateKey, resizableElementRef, localStorage]);

	useEffect(() => {
		const separatorEl = separatorRef.current;
		const resizableEl = resizableElementRef.current;
		if (!separatorEl || !resizableEl) return;

		let isDragging = false;
		let startX = 0;
		let startY = 0;
		let startWidth = resizableEl.getBoundingClientRect().width;
		let startHeight = resizableEl.getBoundingClientRect().height;
		const directionCoef = direction === "right/bottom" ? -1 : 1;

		function onMouseDown(event: MouseEvent) {
			if (!resizableEl) return;

			isDragging = true;
			startX = event.clientX;
			startY = event.clientY;
			startWidth = resizableEl.getBoundingClientRect().width;
			startHeight = resizableEl.getBoundingClientRect().height;
		}
		function onMouseUp(event: MouseEvent) {
			if (!resizableEl) return;

			isDragging = false;
			startX = event.clientX;
			startY = event.clientY;
			startWidth = resizableEl.getBoundingClientRect().width;
			localStorage.setItem(
				`resizable-element-state-${stateKey}`,
				`${startWidth}px`,
			);
			if (onChangeEnd) {
				onChangeEnd(startWidth);
			}

			startHeight = resizableEl.getBoundingClientRect().height;
		}
		function onMouseMoveVertical(event: MouseEvent) {
			if (!isDragging || !resizableEl) return;

			resizableEl.style.width = `${startWidth + directionCoef * (startX - event.clientX)}px`;
		}
		function onMouseMoveHorizontal(event: MouseEvent) {
			if (!isDragging || !resizableEl) return;

			resizableEl.style.height = `${startHeight + directionCoef * (startY - event.clientY)}px`;
		}
		const onMouseMove =
			orientation === "vertical"
				? onMouseMoveVertical
				: onMouseMoveHorizontal;

		separatorEl.addEventListener("mousedown", onMouseDown);
		document.addEventListener("mouseup", onMouseUp);
		document.addEventListener("mousemove", onMouseMove);

		return () => {
			separatorEl.removeEventListener("mousedown", onMouseDown);
			document.removeEventListener("mouseup", onMouseUp);
			document.removeEventListener("mousemove", onMouseMove);
		};
	}, [
		separatorRef,
		resizableElementRef,
		orientation,
		direction,
		localStorage,
		stateKey,
		onChangeEnd,
	]);

	return (
		<div
			className={separatorStyles({ orientation })}
			ref={separatorRef}
		></div>
	);
}
