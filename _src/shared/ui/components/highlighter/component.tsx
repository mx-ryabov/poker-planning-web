"use client";
import { cva } from "class-variance-authority";
import React, {
	ReactElement,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { mergeProps, PressEvents } from "react-aria";

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

		const childEl = container.children[0];
		const pingEl = container.children[1] as HTMLDivElement;
		if (!childEl || !pingEl) return;
		const childBorderRadius = childEl
			.computedStyleMap()
			.get("border-radius");
		if (!childBorderRadius) return;

		container.style.borderRadius = childBorderRadius.toString();
		pingEl.style.borderRadius = childBorderRadius.toString();
	}, [containerRef]);

	const onPress = useCallback(() => {
		setActive(false);
		localStorage.setItem(id, "true");
	}, [id]);

	const mergedProps = useMemo(
		() => mergeProps(children.props, { onPress }),
		[children.props, onPress],
	);

	return (
		<div className={highlighterStyles({ isActive })} ref={containerRef}>
			{React.cloneElement(children, mergedProps)}
			<div className={pingStyles({ isActive })}></div>
		</div>
	);
}

const highlighterStyles = cva("relative", {
	variants: {
		isActive: {
			true: "shadow-primary-600 shadow-[0_0_0_2px]",
			false: "",
		},
	},
});

const pingStyles = cva("", {
	variants: {
		isActive: {
			true: "animate-simple-ping-small bg-primary-600 -z-10 absolute inset-0",
			false: "",
		},
	},
});
