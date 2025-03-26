"use client";
import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useState,
} from "react";
import { ConfirmationModal, ConfirmationModalState } from "../modals";

type ConfirmationModalContextProps = {
	open: (modalState: ConfirmationModalState) => void;
};

export const ConfirmationModalContext =
	createContext<ConfirmationModalContextProps>(null!);

type Props = {
	children: ReactNode;
};

export function ConfirmationModalProvider({ children }: Props) {
	const [isOpen, setOpen] = useState(false);
	const [modalState, setModalState] = useState<
		ConfirmationModalState | undefined
	>();

	const openModal = useCallback((modalState: ConfirmationModalState) => {
		setOpen(true);
		setModalState(modalState);
	}, []);

	return (
		<ConfirmationModalContext.Provider value={{ open: openModal }}>
			{children}
			<ConfirmationModal
				isOpen={isOpen}
				onOpenChange={setOpen}
				state={modalState}
			/>
		</ConfirmationModalContext.Provider>
	);
}

export function useConfirmationModal() {
	const modalContext = useContext(ConfirmationModalContext);

	if (!modalContext) {
		throw new Error(
			"useConfirmationModal must be within ConfirmationModalProvider",
		);
	}

	return modalContext;
}
