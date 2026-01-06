import { ReactNode, useRef } from "react";
import { Dialog, Modal, ModalOverlay } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import {
	contentDefaultStyles,
	dialogStyles,
	modalStyles,
	overlayStyles,
} from "./drawer-content.styles";

export type ModalBaseProps = {
	children: ReactNode;
	position?: "start" | "end" /* | "bottom"*/;
	isOpen?: boolean;
	onOpenChange?: (_isOpen: boolean) => void;
	className?: string;
};

type ModalProps = {
	portal?: Element | "in-same-place";
} & ModalBaseProps;

export function DrawerModal(props: ModalProps) {
	const {
		children,
		position = "start",
		isOpen,
		onOpenChange,
		className,
	} = props;
	const contentRef = useRef<HTMLDivElement | null>(null);
	const orientation = "vertical";

	return (
		<>
			<ModalOverlay
				className={overlayStyles({ type: "overlay", position })}
				isDismissable
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				shouldCloseOnInteractOutside={() => true}
			>
				<Modal className={modalStyles({ type: "overlay", position })}>
					<Dialog
						className={dialogStyles({ orientation })}
						aria-label="Drawer Dialog"
					>
						<div
							className={twMerge(
								contentDefaultStyles({ position }),
								className,
							)}
							ref={contentRef}
						>
							{children}
						</div>
					</Dialog>
				</Modal>
			</ModalOverlay>
		</>
	);
}
