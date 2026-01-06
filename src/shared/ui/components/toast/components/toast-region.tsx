import { useCallback, useEffect, useRef, useState } from "react";
import { mergeProps } from "react-aria";
import { ToastState } from "@react-stately/toast";
import { AriaToastRegionProps, useToastRegion } from "@react-aria/toast";

import { Toast } from "./toast";
import { ToastContent } from "../models/toast-content";
import { usePrevValueState } from "@/src/shared/lib";

type ToastRegionProps = {
	state: ToastState<ToastContent>;
} & AriaToastRegionProps;

export function ToastRegion(props: ToastRegionProps) {
	const { state, ...restProps } = props;
	const [isHovered, setHovered] = useState(false);

	const ref = useRef<HTMLDivElement | null>(null);
	const prevIsHoveredRef = useRef<boolean>(isHovered);
	const prevStackLengthRef = useRef<number>(state.visibleToasts.length);

	const { regionProps } = useToastRegion(restProps, state, ref);

	const toastsCountChanged = usePrevValueState(state.visibleToasts.length, 0);
	if (toastsCountChanged.isChanged && toastsCountChanged.value === 0) {
		setHovered(false);
	}

	const onPointerEnter = useCallback(() => setHovered(true), []);
	const onPointerLeave = useCallback(() => setHovered(false), []);

	useEffect(() => {
		const regionEl = ref.current;
		const prevIsHovered = prevIsHoveredRef.current;

		if (!regionEl) return;

		const toastElems = (
			Array.from(regionEl.children) as HTMLDivElement[]
		).toReversed();

		if (!isHovered) {
			if (prevIsHovered === isHovered) {
				/**
				 * Stack already collapsed
				 */
				animateAddingToastsInCollapsedReg(toastElems);
			} else {
				/**
				 * Stack is collapsing
				 */
				animateCollapsingToasts(toastElems);
			}
		} else {
			if (prevIsHovered) {
				/**
				 * Stack is already expanded
				 */
				const prevStackLength = prevStackLengthRef.current;
				const newStackLength = toastElems.length;
				const hasStackBeenIncreased = prevStackLength < newStackLength;

				animateAddingToastsInExpandedReg(
					toastElems,
					hasStackBeenIncreased,
				);
			} else {
				/**
				 * Stack is expanding
				 */
				animateExpandingToasts(toastElems);
			}
		}
		prevIsHoveredRef.current = isHovered;
		prevStackLengthRef.current = state.visibleToasts.length;
	}, [
		isHovered,
		prevIsHoveredRef,
		ref,
		state.visibleToasts,
		prevStackLengthRef,
	]);

	return (
		<div
			{...mergeProps(regionProps, { onPointerEnter, onPointerLeave })}
			ref={ref}
			data-testid="toasts-region"
			className="fixed bottom-6 left-6 max-h-[50vh] w-80"
		>
			{state.visibleToasts.toReversed().map((toast, index) => (
				<Toast
					key={toast.key}
					toast={toast}
					state={state}
					index={index}
				/>
			))}
		</div>
	);
}

function animateAddingToastsInCollapsedReg(toastElems: HTMLDivElement[]) {
	let bottomStart = 0;
	toastElems.forEach((toastEl, ind, elems) => {
		toastEl.style.opacity = "0";
		toastEl.style.bottom = ind === 0 ? "-30px" : "0px";

		requestAnimationFrame(() => {
			toastEl.style.bottom = `${bottomStart}px`;
			toastEl.style.opacity = "1";
			toastEl.style.transform = `scaleX(${100 - ind * 10}%)`;

			if (ind < elems.length - 1) {
				const curToastHeight = toastEl.getBoundingClientRect().height;
				const nextToastHeight =
					elems[ind + 1].getBoundingClientRect().height;

				bottomStart += curToastHeight - nextToastHeight + 10;
			}
		});
	});
}

function animateCollapsingToasts(toastElems: HTMLDivElement[]) {
	let bottomStart = 0;
	toastElems.forEach((toastEl, ind, elems) => {
		toastEl.style.bottom = `${bottomStart}px`;
		toastEl.style.transform = `scaleX(${100 - ind * 10}%)`;
		if (ind < elems.length - 1) {
			const curToastHeight = toastEl.getBoundingClientRect().height;
			const nextToastHeight =
				elems[ind + 1].getBoundingClientRect().height;

			bottomStart += curToastHeight - nextToastHeight + 10;
		}
	});
}

function animateAddingToastsInExpandedReg(
	toastElems: HTMLDivElement[],
	hasStackBeenIncreased: boolean,
) {
	let bottomStart = 0;
	toastElems.forEach((toastEl, ind, { length }) => {
		toastEl.style.bottom = `${bottomStart}px`;
		bottomStart += toastEl.getBoundingClientRect().height;

		/**
		 * If the stack has been increased then animate the last (just added) toast
		 */
		if (length - 1 === ind && hasStackBeenIncreased) {
			toastEl.animate(
				[
					{ transform: "translateY(-20%)", opacity: 0 },
					{ transform: "translateY(0)", opacity: 1 },
				],
				{
					duration: 200,
				},
			);
		}
	});
}

function animateExpandingToasts(toastElems: HTMLDivElement[]) {
	let bottomStart = 0;
	toastElems.forEach((toastEl) => {
		toastEl.style.bottom = `${bottomStart}px`;
		toastEl.style.transform = `scaleX(100%)`;
		bottomStart += toastEl.getBoundingClientRect().height;
	});
}
