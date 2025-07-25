import {
	Button,
	ButtonSquare,
	LabeledButtonProps,
	NewButton,
} from "@/_src/shared/ui/components/button";
import { CloseIcon } from "@/_src/shared/ui/components/icon/svg/close.icon";
import { Modal } from "@/_src/shared/ui/components/modal";
import { useCallback, useTransition } from "react";

type SyncConfirm = () => void;
type AsyncConfirm = () => Promise<void>;
export type ConfirmationModalState = {
	title: string;
	contentMessage: string;
	confirmBtnText: string;
	confirmBtnAppearence?: LabeledButtonProps["appearance"];
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
						<NewButton
							variant="ghost"
							shape="square"
							data-testid="dismiss-button"
							onPress={close}
						>
							<CloseIcon className="w-8 h-8" />
						</NewButton>
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
							appearance={state?.confirmBtnAppearence}
						/>
					</>
				)}
			</Modal.Footer>
		</Modal.Dialog>
	);
}
