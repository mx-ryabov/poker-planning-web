"use client";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { twMerge } from "tailwind-merge";
import { Children, cloneElement, ReactElement, RefObject, useRef } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger);

type ChildProps = {
	ref: RefObject<HTMLElement | null>;
	className?: string;
};

type AnimatedTextProps = {
	children: ReactElement<ChildProps> | ReactElement<ChildProps>[];
	animateOnScroll?: boolean;
	delay?: number;
};

export function AnimatedText({
	children,
	animateOnScroll = false,
	delay = 0,
}: AnimatedTextProps) {
	const containerRef = useRef<HTMLElement | null>(null);
	const elementsRef = useRef<Element[]>([]);
	const splitsRef = useRef<SplitText[]>([]);
	const linesRef = useRef<Element[]>([]);

	useGSAP(
		() => {
			if (!containerRef.current) return;

			elementsRef.current = [];
			splitsRef.current = [];
			linesRef.current = [];

			containerRef.current.classList.remove("initially-hidden");

			const elements: Element[] = [];
			if (
				containerRef.current.hasAttribute("data-animated-text-wrapper")
			) {
				elements.push(...Array.from(containerRef.current.children));
			} else {
				elements.push(containerRef.current);
			}

			elements.forEach((el) => {
				elementsRef.current.push(el);

				const split = SplitText.create(el, {
					type: "lines",
					mask: "lines",
					linesClass: "line++",
				});

				splitsRef.current.push(split);
				linesRef.current.push(...split.lines);
			});

			gsap.set(linesRef.current, { y: "100%" });

			const animationProps: gsap.TweenVars = {
				y: "0%",
				stagger: 0.1,
				ease: "power4.out",
				duration: 1,
				delay,
			};

			if (animateOnScroll) {
				gsap.to(linesRef.current, {
					...animationProps,
					scrollTrigger: {
						trigger: containerRef.current,
						start: "top 75%",
						once: true,
						scroller:
							document.getElementsByClassName("scroller")[0],
					},
				});
			} else {
				gsap.to(linesRef.current, animationProps);
			}

			return () => {
				splitsRef.current.forEach((split) => {
					if (split) split.revert();
				});
			};
		},
		{
			scope: containerRef,
			dependencies: [animateOnScroll, delay],
			revertOnUpdate: true,
		},
	);

	if (Children.count(children) === 1) {
		// The reason of suppression - This is a workaround to pass the ref to the child component.
		/* eslint-disable react-hooks/refs */
		return cloneElement(children as ReactElement<ChildProps>, {
			ref: containerRef,
			className: twMerge(
				(children as ReactElement<ChildProps>).props.className,
				"initially-hidden",
			),
		});
		/* eslint-enable react-hooks/refs */
	}

	return (
		<div
			ref={containerRef as RefObject<HTMLDivElement>}
			data-animated-text-wrapper="true"
			className="initially-hidden"
		>
			{children}
		</div>
	);
}
