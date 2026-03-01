import { setRefs } from "@/src/shared/lib";
import { cva } from "class-variance-authority";
import { Ref, ReactNode, useEffect, useRef } from "react";
import { twJoin } from "tailwind-merge";

type Props = {
	children: ReactNode;
	className?: string;
	orientation?: "horizontal" | "vertical";
	ref?: Ref<HTMLDivElement | null>;
};

const styles = cva("overflow-y-auto [--scroll-shadow-size:40px]", {
	variants: {
		orientation: {
			horizontal: [],
			vertical: [
				"data-[top-shadow=true]:[mask-image:linear-gradient(0deg,#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]",
				"data-[bottom-shadow=true]:[mask-image:linear-gradient(180deg,#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]",
				"data-[top-bottom-shadow=true]:[mask-image:linear-gradient(#000,#000,transparent_0,#000_var(--scroll-shadow-size),#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]",
			],
		},
	},
});

export function ScrollShadow({
	children,
	className,
	orientation = "vertical",
	ref,
}: Props) {
	const topRef = useRef<HTMLDivElement | null>(null);
	const bottomRef = useRef<HTMLDivElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const container = containerRef.current;
		const topEl = topRef.current;
		const bottomEl = bottomRef.current;
		if (!container || !topEl || !bottomEl) return;

		const intersected = { top: false, bottom: false };

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.target === topEl) {
						intersected.top = entry.isIntersecting;
					}
					if (entry.target === bottomEl) {
						intersected.bottom = entry.isIntersecting;
					}
				});

				if (!intersected.top && !intersected.bottom) {
					container.setAttribute("data-top-bottom-shadow", "true");
					container.removeAttribute("data-top-shadow");
					container.removeAttribute("data-bottom-shadow");
				} else if (!intersected.top) {
					container.setAttribute("data-top-shadow", "true");
					container.removeAttribute("data-top-bottom-shadow");
					container.removeAttribute("data-bottom-shadow");
				} else if (!intersected.bottom) {
					container.setAttribute("data-bottom-shadow", "true");
					container.removeAttribute("data-top-bottom-shadow");
					container.removeAttribute("data-top-shadow");
				}
			},
			{
				root: container,
				rootMargin: "0px",
				threshold: 0,
			},
		);

		observer.observe(topEl);
		observer.observe(bottomEl);

		return () => {
			observer.disconnect();
		};
	}, [containerRef, topRef, bottomRef]);

	return (
		<div
			ref={setRefs(containerRef, ref)}
			className={twJoin(styles({ orientation }), className)}
		>
			<div className="min-h-[1px]" ref={topRef} />
			{children}
			<div className="min-h-[1px]" ref={bottomRef} />
		</div>
	);
}
