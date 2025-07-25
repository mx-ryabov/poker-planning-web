import { useCallback, useEffect, useRef, useState } from "react";
import { ModalBaseProps } from "./drawer-content";
import { Separator } from "./drawer-separator";
import { twMerge } from "tailwind-merge";
import { contentDefaultStyles } from "./drawer-content.styles";
import { cva } from "class-variance-authority";

type ModalPropsWithSeparator = {
	stateKey?: string;
	minWidth?: number;
	maxWidth?: number;
} & ModalBaseProps;

export function DrawerModalWithSeparator(props: ModalPropsWithSeparator) {
	const {
		children,
		position = "start",
		isOpen: isOpenControlled,
		onOpenChange,
		className,
		stateKey,
		minWidth,
		maxWidth,
	} = props;
	const contentRef = useRef<HTMLDivElement | null>(null);
	const orientation = "vertical";

	let [isOpenInternal, setIsOpenInternal] = useState(false);
	let [isAnimating, setIsAnimating] = useState(false);

	useEffect(() => {
		if (isOpenControlled) {
			setIsOpenInternal(true);
		}
	}, [isOpenControlled]);

	useEffect(() => {
		const content = contentRef.current;
		if (!content) return;

		if (isOpenInternal && isOpenControlled) {
			setIsAnimating(true);
			const timer = setTimeout(() => {
				setIsAnimating(false);
			}, 300);

			return () => clearTimeout(timer);
		}

		if (!isOpenControlled && isOpenInternal) {
			setIsAnimating(true);

			const timer = setTimeout(() => {
				setIsOpenInternal(false);
				setIsAnimating(false);
			}, 300);

			return () => clearTimeout(timer);
		}
	}, [isOpenControlled, isOpenInternal, contentRef]);

	useEffect(() => {
		const content = contentRef.current;
		if (!content) return;

		if (isAnimating) {
			content.style.minWidth = "0px";
			content.style.maxWidth = "100%";
			if (isOpenControlled) {
				const targetWidth =
					localStorage.getItem(`drawer-inline-state-${stateKey}`) ||
					"300px";
				content.style.width = "0px";
				requestAnimationFrame(() => {
					content.style.width = targetWidth;
				});
			} else {
				content.style.width = "0px";
			}
		} else {
			if (minWidth) content.style.minWidth = `${minWidth}px`;
			if (maxWidth) content.style.maxWidth = `${maxWidth}px`;
		}
	}, [
		isOpenControlled,
		contentRef,
		isAnimating,
		stateKey,
		minWidth,
		maxWidth,
	]);

	const closeDrawer = () => {
		if (onOpenChange) onOpenChange(false);
		setIsAnimating(true);
		setTimeout(() => {
			setIsOpenInternal(false);
			setIsAnimating(false);
		}, 300);
	};

	const onResizeEnd = useCallback(
		(width: number) => {
			localStorage.setItem(
				`drawer-inline-state-${stateKey}`,
				`${width}px`,
			);
		},
		[stateKey],
	);

	if (!isOpenInternal) return null;

	return (
		<div
			className={inlineDrawerStyles({ orientation })}
			aria-label="Drawer Dialog"
		>
			<Separator
				contentRef={contentRef}
				position={position}
				onResizeEnd={onResizeEnd}
				onCollapse={closeDrawer}
			/>
			<div
				className={twMerge(
					contentDefaultStyles({ position }),
					inlineContentStyles({ isAnimating }),
					className,
				)}
				ref={contentRef}
			>
				{children}
			</div>
		</div>
	);
}

const inlineContentStyles = cva("", {
	variants: {
		isAnimating: {
			true: ["transition-[width] duration-300 ease-in-out"],
			false: [],
		},
	},
});

const inlineDrawerStyles = cva("flex", {
	variants: {
		orientation: {
			vertical: ["flex-row"],
			horizontal: ["flex-col"],
		},
	},
});
