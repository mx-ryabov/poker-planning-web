import {
	ContentPosition,
	useCalcRelativePosition,
	useClickOutside,
	useElement,
} from "@/_src/shared/lib";
import { createPortal } from "react-dom";
import {
	usePopoverDispatch,
	usePopoverState,
} from "../providers/internal-popover-provider";
import {
	MutableRefObject,
	forwardRef,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { PopoverCompoundComponentType } from "./popover-wrapper";

type PopoverContentProps = {
	children: React.ReactNode;
};

const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
	(props, ref) => {
		const { children } = props;
		const { open } = usePopoverDispatch();
		const {
			isOpened,
			triggerRef,
			position: preferredPosition,
			contentWidth,
		} = usePopoverState();

		const [contentElement, setContentElement] =
			useElement<HTMLDivElement>();

		useContentWidth(contentWidth, triggerRef, contentElement);

		useEffect(() => {
			if (ref === null) return;

			if (typeof ref === "function") {
				ref(contentElement);
			} else {
				ref.current = contentElement;
			}
		}, [contentElement, ref]);

		const { isContentVisible, animatedContainerProps } =
			useContentAnimation(isOpened);

		const popoverElements = useMemo(() => {
			return [contentElement, triggerRef?.current || null];
		}, [contentElement, triggerRef?.current]);

		const clickOutsideCb = useCallback(() => {
			open(false);
		}, [open]);

		useClickOutside(popoverElements, clickOutsideCb);

		const calculatedPosition = useCalcRelativePosition(
			preferredPosition,
			contentElement,
			triggerRef,
		);

		if (!isContentVisible) {
			return null;
		}

		return createPortal(
			<div
				ref={setContentElement}
				className={`fixed top-0 left-0 z-50 ${getContentMarginClass(calculatedPosition)}`}
			>
				<div {...animatedContainerProps}>{children}</div>
			</div>,
			document.body,
		);
	},
);

export const PopoverContentDN: PopoverCompoundComponentType = "PopoverContent";
PopoverContent.displayName = PopoverContentDN;

function useContentWidth(
	contentWidth: "fit-content" | "equal-to-trigger" | undefined,
	triggerRef: MutableRefObject<HTMLElement | null> | null,
	contentElement: HTMLDivElement | null,
) {
	useEffect(() => {
		const triggerElement = triggerRef?.current;
		if (!contentElement || !triggerElement || !contentWidth) return;

		switch (contentWidth) {
			case "equal-to-trigger":
				contentElement.style.width = `${triggerElement.getBoundingClientRect().width}px`;
				break;
			case "fit-content":
				contentElement.style.width = "fit-content";
				break;

			default:
				break;
		}
	}, [contentWidth, triggerRef, contentElement]);
}

function useContentAnimation(isPopoverOpened: boolean) {
	const animatedContentRef = useRef<HTMLDivElement | null>(null);
	const [isContentVisible, setIsVisible] = useState(isPopoverOpened);

	useEffect(() => {
		if (isPopoverOpened) {
			setIsVisible(true);
		}

		animatedContentRef.current?.classList.add("animate-popup");
	}, [isPopoverOpened, animatedContentRef]);

	const onAnimationEnd = useCallback(() => {
		if (isPopoverOpened) {
			animatedContentRef.current?.classList.remove("animate-popup");
		}

		if (!isPopoverOpened) {
			setIsVisible(false);
		}
	}, [isPopoverOpened, animatedContentRef]);

	return {
		isContentVisible,
		animatedContainerProps: {
			className: "animate-popup",
			ref: animatedContentRef,
			style: isPopoverOpened
				? {
						animationDirection: "normal",
					}
				: {
						opacity: 0,
						animationDirection: "reverse",
					},
			onAnimationEnd,
		},
	};
}

function getContentMarginClass(position: ContentPosition) {
	switch (position) {
		case ContentPosition.LeftStart:
		case ContentPosition.Left:
		case ContentPosition.LeftEnd:
			return "pr-2";

		case ContentPosition.TopStart:
		case ContentPosition.Top:
		case ContentPosition.TopEnd:
			return "pb-2";

		case ContentPosition.RightStart:
		case ContentPosition.Right:
		case ContentPosition.RightEnd:
			return "pl-2";

		case ContentPosition.BottomStart:
		case ContentPosition.Bottom:
		case ContentPosition.BottomEnd:
			return "pt-2";

		default:
			return null;
	}
}

export default PopoverContent;
