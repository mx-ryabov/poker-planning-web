import { Button, ButtonSquare } from "@/_src/shared/ui/components/button";
import { CloseIcon } from "@/_src/shared/ui/components/icon";
import { Modal } from "@/_src/shared/ui/components/modal";
import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useState,
	useTransition,
} from "react";

type SyncConfirm = () => void;
type AsyncConfirm = () => Promise<void>;
type ConfirmationModalState = {
	title: string;
	contentMessage: string;
	confirmBtnText: string;
	confirm: AsyncConfirm | SyncConfirm;
};

type ConfirmationModalContextProps = {
	open: (modalState: ConfirmationModalState) => void;
};

const ConfirmationModalContext = createContext<ConfirmationModalContextProps>(
	null!,
);

type Props = {
	children: ReactNode;
};

export function ConfirmationModalProvider({ children }: Props) {
	const [isPending, startTransition] = useTransition();
	const [isOpen, setOpen] = useState(false);
	const [modalState, setModalState] = useState<ConfirmationModalState | null>(
		null,
	);

	const openModal = useCallback((modalState: ConfirmationModalState) => {
		setOpen(true);
		setModalState(modalState);
	}, []);

	const confirm = useCallback(() => {
		startTransition(async () => {
			await modalState?.confirm();
			setOpen(false);
		});
	}, [modalState]);

	return (
		<ConfirmationModalContext.Provider value={{ open: openModal }}>
			{children}
			<Modal.Dialog isDismissable isOpen={isOpen} onOpenChange={setOpen}>
				<Modal.Header>
					{({ close }) => (
						<>
							<Modal.Title>{modalState?.title}</Modal.Title>
							<ButtonSquare
								icon={CloseIcon}
								variant="ghost"
								size="small"
								onPress={close}
							/>
						</>
					)}
				</Modal.Header>
				<Modal.Body>{modalState?.contentMessage}</Modal.Body>
				<Modal.Footer>
					{({ close }) => (
						<>
							<Button
								title="Cancel"
								onPress={close}
								variant="ghost"
							/>
							<Button
								title={modalState?.confirmBtnText || ""}
								isPending={isPending}
								onPress={confirm}
								appearance="danger"
							/>
						</>
					)}
				</Modal.Footer>
			</Modal.Dialog>
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
