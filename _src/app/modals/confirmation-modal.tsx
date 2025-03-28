import { Button, ButtonSquare } from "@/_src/shared/ui/components/button";
import { CloseIcon } from "@/_src/shared/ui/components/icon/svg/close.icon";
import { Modal } from "@/_src/shared/ui/components/modal";
import { useCallback, useTransition } from "react";

type SyncConfirm = () => void;
type AsyncConfirm = () => Promise<void>;
export type ConfirmationModalState = {
	title: string;
	contentMessage: string;
	confirmBtnText: string;
	onConfirm: AsyncConfirm | SyncConfirm;
};
export type ConfirmationModalProps = {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	state?: ConfirmationModalState;
};

export function ConfirmationModal({
	isOpen,
	onOpenChange,
	state,
}: ConfirmationModalProps) {
	const [isPending, startTransition] = useTransition();

	const confirm = useCallback(() => {
		startTransition(async () => {
			await state?.onConfirm();
			onOpenChange(false);
		});
	}, [state, onOpenChange]);

	return (
		<Modal.Dialog
			isDismissable
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			data-testid="confirmation-modal"
		>
			<Modal.Header>
				{({ close }) => (
					<>
						<Modal.Title>{state?.title}</Modal.Title>
						<ButtonSquare
							icon={CloseIcon}
							variant="ghost"
							size="small"
							data-testid="dismiss-button"
							onPress={close}
						/>
					</>
				)}
			</Modal.Header>
			<Modal.Body>{state?.contentMessage}</Modal.Body>
			<Modal.Footer>
				{({ close }) => (
					<>
						<Button
							title="Cancel"
							onPress={close}
							data-testid="cancel-button"
							variant="ghost"
						/>
						<Button
							title={state?.confirmBtnText || ""}
							isPending={isPending}
							onPress={confirm}
							data-testid="confirm-button"
							appearance="danger"
						/>
					</>
				)}
			</Modal.Footer>
		</Modal.Dialog>
	);
}
