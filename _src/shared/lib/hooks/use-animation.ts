"use client";
import {
	RefObject,
	useCallback,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import ReactDOM from "react-dom";

// The reason of suppression - These hooks are taken from react-aria/utils since they're not exposed to public api.
/* eslint-disable react-hooks/refs */
export function useEnterAnimation(
	ref: RefObject<HTMLElement | null>,
	isReady: boolean = true,
) {
	const [isStarting, setStarting] = useState(true);

	useAnimation(
		ref,
		isStarting && isReady,
		useCallback(() => {
			setStarting(false);
		}, []),
	);
	return isStarting && isReady;
}

export function useExitAnimation(
	ref: RefObject<HTMLElement | null>,
	isOpen: boolean,
) {
	// The reason of suppression -These hooks are taken from react-aria/utils since they're not exposed to public api.
	// eslint-disable-next-line prefer-const
	let [isFinishing, setIsFinishing] = useState(false);
	const [exitState, setExitState] = useState("not-started");

	if (!isOpen && ref.current && exitState === "not-started") {
		isFinishing = true;
		setIsFinishing(true);
		setExitState("exiting");
	}

	if (!ref.current && exitState === "exited") {
		setExitState("not-started");
	}

	useAnimation(
		ref,
		isFinishing,
		useCallback(() => {
			setExitState("exited");
			setIsFinishing(false);
		}, []),
	);

	return isFinishing;
}

function useAnimation(
	ref: RefObject<HTMLElement | null>,
	isActive: boolean,
	onEnd: () => void,
) {
	const prevAnimation = useRef<string | null>(null);

	if (isActive && ref.current) {
		prevAnimation.current = window.getComputedStyle(ref.current).animation;
	}

	useLayoutEffect(() => {
		if (isActive && ref.current) {
			const computedStyle = window.getComputedStyle(ref.current);

			if (
				computedStyle.animationName &&
				computedStyle.animationName !== "none" &&
				computedStyle.animation !== prevAnimation.current
			) {
				const onAnimationEnd = (e: AnimationEvent) => {
					if (e.target === ref.current) {
						element.removeEventListener(
							"animationend",
							onAnimationEnd,
						);
						ReactDOM.flushSync(() => {
							onEnd();
						});
					}
				};

				const element = ref.current;
				element.addEventListener("animationend", onAnimationEnd);
				return () => {
					element.removeEventListener("animationend", onAnimationEnd);
				};
			} else {
				onEnd();
			}
		}
	}, [ref, isActive, onEnd]);
}
