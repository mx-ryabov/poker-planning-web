import { ReactNode, useMemo, useRef, useState } from "react";
import { Dialog, Modal, ModalOverlay } from "react-aria-components";
import { Separator } from "./drawer-separator";
import { twMerge } from "tailwind-merge";
import {
	contentDefaultStyles,
	dialogStyles,
	modalStyles,
	overlayStyles,
} from "./drawer-content.styles";

type ModalProps = {
	children: ReactNode;
	/**Be careful with type=inline.
	 * It's better to use it with the portal prop
	 * and adjust parent elements styles considering that the drawer is pasted into the body bottom
	 * (or into the place of the portal) */
	type?: "overlay" | "inline";
	position?: "start" | "end" /* | "bottom"*/;
	withSeparator?: boolean;
	isOpen?: boolean;
	onOpenChange?: (_isOpen: boolean) => void;
	className?: string;
	portal?: Element | "in-same-place";
	stateKey?: string;
};

export function DrawerModal(props: ModalProps) {
	const {
		children,
		type = "overlay",
		position = "start",
		withSeparator = false,
		isOpen,
		onOpenChange,
		className,
		portal,
		stateKey,
	} = props;
	const contentRef = useRef<HTMLDivElement>(null);

	// It's a hack because react aria doesn't expose PortalProvider
	// useLayoutEffect(() => {
	// 	if (type === "inline" && position === "bottom") {
	// 		document.body.style.display = "flex";
	// 		document.body.style.flexDirection = "column";
	// 	} else {
	// 		document.body.style.display = "flex";
	// 		document.body.style.flexDirection = "row";
	// 	}
	// }, [type, position]);

	//const orientation = position === "bottom" ? "horizontal" : "vertical";
	const orientation = "vertical";

	const [inSamePlacePortal, setInSamePlacePortal] =
		useState<HTMLDivElement | null>(null);
	const modalPortal = useMemo(() => {
		if (portal === "in-same-place") {
			return inSamePlacePortal;
		}
		return portal;
	}, [portal, inSamePlacePortal]);

	return (
		<>
			<ModalOverlay
				className={overlayStyles({ type, position })}
				isDismissable
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				shouldCloseOnInteractOutside={() => type === "overlay"}
				UNSTABLE_portalContainer={modalPortal || undefined}
			>
				<Modal className={modalStyles({ type, position })}>
					<Dialog className={dialogStyles({ orientation })}>
						{({ close }) => (
							<>
								{withSeparator && (
									<Separator
										contentRef={contentRef}
										position={position}
										stateKey={stateKey}
										onCollapse={close}
									/>
								)}
								<div
									className={twMerge(
										contentDefaultStyles({ position }),
										className,
									)}
									ref={contentRef}
								>
									{children}
								</div>
							</>
						)}
					</Dialog>
				</Modal>
			</ModalOverlay>
			{type === "inline" && portal === "in-same-place" && (
				<div ref={setInSamePlacePortal}></div>
			)}
		</>
	);
}
