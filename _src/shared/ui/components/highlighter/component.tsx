"use client";
import { cva } from "class-variance-authority";
import React, {
	ReactElement,
	useCallback,
	useEffect,
	useRef,
	useState,
	KeyboardEvent,
} from "react";
import { PressEvents } from "react-aria";

type Props = {
	children: ReactElement<Pick<PressEvents, "onPress">>;
	id: string;
};

export function Highlighter({ children, id }: Props) {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [isActive, setActive] = useState(false);

	useEffect(() => {
		if (!localStorage) return;

		const wasClicked = localStorage.getItem(id);

		setActive(!wasClicked);
	}, [id]);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const childEl = container.children[1];
		const pingEl = container.children[0] as HTMLDivElement;
		if (!childEl || !pingEl) return;
		const childBorderRadius = getComputedStyle(childEl).borderRadius;
		if (!childBorderRadius) return;

		container.style.borderRadius = `calc(${childBorderRadius} + 2px)`;
		pingEl.style.borderRadius = `calc(${childBorderRadius} + 2px)`;
	}, [containerRef]);

	const onPress = useCallback(() => {
		setActive(false);
		localStorage.setItem(id, "true");
	}, [id]);

	const onKeyDownCapture = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === "Enter") {
				onPress();
			}
		},
		[onPress],
	);

	return (
		<div
			className={highlighterStyles({ isActive })}
			onKeyDownCapture={onKeyDownCapture}
			onClickCapture={onPress}
			ref={containerRef}
		>
			<div className={pingStyles({ isActive })}></div>
			{children}
		</div>
	);
}

const highlighterStyles = cva("relative w-max h-max", {
	variants: {
		isActive: {
			true: "z-10",
			false: "",
		},
	},
});

const pingStyles = cva("", {
	variants: {
		isActive: {
			true: "animate-simple-ping-small bg-linear-100 from-[#9e72e1] via-[#d972e1] to-[#72e1dc] absolute -inset-[2px] -z-[1]",
			false: "",
		},
	},
});
