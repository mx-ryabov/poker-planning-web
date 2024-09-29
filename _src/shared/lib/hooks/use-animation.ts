"use client";
import {
	RefObject,
	useCallback,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import ReactDOM from "react-dom";

export function useEnterAnimation(
	ref: RefObject<HTMLElement>,
	isReady: boolean = true,
) {
	let [isStarting, setStarting] = useState(true);

	useAnimation(
		ref,
		isStarting && isReady,
		useCallback(() => {
			setStarting(false);
		}, []),
	);
	return isStarting && isReady;
}

export function useExitAnimation(ref: RefObject<HTMLElement>, isOpen: boolean) {
	let [isFinishing, setIsFinishing] = useState(false);
	let [exitState, setExitState] = useState("not-started");

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
	ref: RefObject<HTMLElement>,
	isActive: boolean,
	onEnd: () => void,
) {
	let prevAnimation = useRef<string | null>(null);

	if (isActive && ref.current) {
		prevAnimation.current = window.getComputedStyle(ref.current).animation;
	}

	useLayoutEffect(() => {
		if (isActive && ref.current) {
			let computedStyle = window.getComputedStyle(ref.current);

			if (
				computedStyle.animationName &&
				computedStyle.animationName !== "none" &&
				computedStyle.animation !== prevAnimation.current
			) {
				let onAnimationEnd = (e: AnimationEvent) => {
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

				let element = ref.current;
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
