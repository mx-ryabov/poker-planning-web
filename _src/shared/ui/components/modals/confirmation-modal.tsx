import { Button } from "@/_src/shared/ui/components/button";
import { CloseIcon } from "@/_src/shared/ui/components/icon/svg/close.icon";
import { Modal } from "@/_src/shared/ui/components/modal";
import { useCallback, useTransition } from "react";
import type { ButtonStylesProps } from "@/_src/shared/ui/styles/button.styles";

type SyncConfirm = () => void;
type AsyncConfirm = () => Promise<void>;
export type ConfirmationModalState = {
	title: string;
	contentMessage: string;
	confirmBtnText: string;
	confirmBtnAppearence?: ButtonStylesProps["appearance"];
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
			isDismissable={true}
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			data-testid="confirmation-modal"
		>
			<Modal.Header>
				{({ close }) => (
					<>
						<Modal.Title>{state?.title}</Modal.Title>
						<Button
							variant="ghost"
							shape="square"
							data-testid="dismiss-button"
							onPress={close}
						>
							<CloseIcon className="w-8 h-8" />
						</Button>
					</>
				)}
			</Modal.Header>
			<Modal.Body>{state?.contentMessage}</Modal.Body>
			<Modal.Footer>
				{({ close }) => (
					<>
						<Button
							onPress={close}
							data-testid="cancel-button"
							variant="ghost"
						>
							Cancel
						</Button>
						<Button
							isPending={isPending}
							onPress={confirm}
							data-testid="confirm-button"
							appearance={state?.confirmBtnAppearence}
						>
							{state?.confirmBtnText || ""}
						</Button>
					</>
				)}
			</Modal.Footer>
		</Modal.Dialog>
	);
}
