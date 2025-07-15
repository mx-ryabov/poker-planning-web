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
	className?: string;
};

export function AnimatedFadeIn({
	children,
	animateOnScroll = false,
	delay = 0,
	className,
}: AnimatedFadeInProps) {
	const containerRef = useRef<HTMLElement | null>(null);

	useGSAP(
		() => {
			if (!containerRef.current) return;

			setTimeout(
				() =>
					containerRef.current?.classList.remove("initially-hidden"),
				(delay || 0) * 1000,
			);

			let elements: Element[] = [];
			if (
				containerRef.current.hasAttribute("data-animated-text-wrapper")
			) {
				elements.push(...Array.from(containerRef.current.children));
			} else {
				elements.push(containerRef.current);
			}

			const animationFromProps: gsap.TweenVars = {
				y: 50,
				opacity: 0,
			};
			const animationToProps: gsap.TweenVars = {
				y: 0,
				opacity: 1,
				stagger: 0.1,
				duration: 0.5,
				delay,
				ease: "sine.inOut",
			};

			if (animateOnScroll) {
				gsap.fromTo(elements, animationFromProps, {
					...animationToProps,
					scrollTrigger: {
						trigger: containerRef.current,
						start: "top 80%",
						once: true,
						scroller:
							document.getElementsByClassName("scroller")[0],
					},
				});
			} else {
				gsap.fromTo(elements, animationFromProps, animationToProps);
			}
		},
		{
			scope: containerRef,
			dependencies: [animateOnScroll, delay],
			revertOnUpdate: true,
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
			className={twMerge("initially-hidden", className)}
		>
			{children}
		</div>
	);
}
