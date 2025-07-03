"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Children, cloneElement, ReactElement, RefObject, useRef } from "react";
import { twMerge } from "tailwind-merge";

gsap.registerPlugin(ScrollTrigger);

type ChildProps = {
	ref: RefObject<HTMLElement | null>;
	className?: string;
};

type AnimatedFadeInProps = {
	children: ReactElement<ChildProps> | ReactElement<ChildProps>[];
	animateOnScroll?: boolean;
	delay?: number;
};

export function AnimatedFadeIn({
	children,
	animateOnScroll = true,
	delay = 0,
}: AnimatedFadeInProps) {
	const containerRef = useRef<HTMLElement | null>(null);

	useGSAP(
		() => {
			if (!containerRef.current) return;

			containerRef.current.classList.remove("initially-hidden");

			let elements: Element[] = [];
			if (
				containerRef.current.hasAttribute("data-animated-text-wrapper")
			) {
				elements.push(...Array.from(containerRef.current.children));
			} else {
				elements.push(containerRef.current);
			}
		},
		{
			scope: containerRef,
			dependencies: [animateOnScroll, delay],
		},
	);

	if (Children.count(children) === 1) {
		return cloneElement(children as ReactElement<ChildProps>, {
			ref: containerRef,
			className: twMerge(
				(children as ReactElement<ChildProps>).props.className,
				"initially-hidden",
			),
		});
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
