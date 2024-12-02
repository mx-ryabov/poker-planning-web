import {
	cloneElement,
	ReactElement,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { mergeProps } from "react-aria";
import { twJoin } from "tailwind-merge";

type ContainerProps = {
	children: ReactElement[];
	containerClassName?: string;
	selectorClassName: string;

	activeIndex?: number | null;
	onSelectionReset?: () => void;
};

function SlidingSelectorContainer(props: ContainerProps) {
	const {
		children,
		containerClassName,
		selectorClassName,
		activeIndex,
		onSelectionReset,
	} = props;
	const [activeElement, setActiveElement] = useState<number | null>(null);
	const activeElementFinal =
		activeIndex !== undefined ? activeIndex : activeElement;

	const containerRef = useRef<HTMLDivElement>(null);
	const activeFloatingElRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = containerRef.current;
		const activeFloatingEl = activeFloatingElRef.current;
		if (!container || !activeFloatingEl) return;

		if (activeElementFinal === null) {
			activeFloatingEl.style.display = "none";
			return;
		}

		const staticChildren = container.querySelectorAll(
			"[data-sliding-selector-element-type='static']",
		);
		const firstStaticChild = staticChildren[0];
		const activeStaticChild = staticChildren[activeElementFinal];
		const firstClientRect = firstStaticChild.getBoundingClientRect();
		const activeClientRect = activeStaticChild.getBoundingClientRect();

		activeFloatingEl.style.display = "block";
		activeFloatingEl.style.width = `${activeClientRect.width}px`;
		activeFloatingEl.style.height = `${activeClientRect.height}px`;

		activeFloatingEl.style.transform = `translate(${activeClientRect.left - firstClientRect.left}px, ${activeClientRect.top - firstClientRect.top}px)`;
	}, [children, containerRef, activeElementFinal, activeFloatingElRef]);

	return (
		<div
			className={twJoin("relative", containerClassName)}
			ref={containerRef}
		>
			{children.map((child, ind) =>
				cloneElement(child, {
					"data-sliding-selector-element-type": "static",
					"data-sliding-selector-element-active":
						ind === activeElementFinal,
					...mergeProps(child.props, {
						onPress: () =>
							setActiveElement((prev) =>
								prev === ind ? null : ind,
							),
					}),
					key: ind,
				}),
			)}
			<div
				className={twJoin("absolute transition-all", selectorClassName)}
				onClick={() => {
					setActiveElement(null);
					onSelectionReset && onSelectionReset();
				}}
				data-testid="sliding-selector"
				ref={activeFloatingElRef}
			></div>
		</div>
	);
}

export const SlidingSelector = Object.assign(SlidingSelectorContainer, {});
