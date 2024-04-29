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
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { PopoverCompoundComponentType } from "./popover-wrapper";

type PopoverContentProps = {
	children: React.ReactNode;
};

const PopoverContent: FC<PopoverContentProps> = ({
	children,
}: PopoverContentProps) => {
	const { open } = usePopoverDispatch();
	const {
		isOpened,
		triggerRef,
		position: preferredPosition,
	} = usePopoverState();

	const [contentElement, setContentElement] = useElement<HTMLDivElement>();

	const { isContentVisible, animatedContainerProps } =
		useContentAnimation(isOpened);

	useClickOutside([contentElement, triggerRef?.current || null], () =>
		open(false),
	);
	const calculatedPosition = useCalcRelativePosition(
		preferredPosition,
		contentElement,
		triggerRef,
	);

	if (!isContentVisible) {
		return null;
	}

	return createPortal(
		<div>
			<div
				ref={setContentElement}
				className={`fixed top-0 left-0 z-10 ${getContentMarginClass(calculatedPosition)}`}
			>
				<div {...animatedContainerProps}>{children}</div>
			</div>
		</div>,
		document.body,
	);
};

export const PopoverContentDN: PopoverCompoundComponentType = "PopoverContent";
PopoverContent.displayName = PopoverContentDN;

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
