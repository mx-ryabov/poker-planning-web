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
	confirm: AsyncConfirm | SyncConfirm;
};
type Props = {
	isOpen: boolean;
	toggle: (isOpen: boolean) => void;
	state?: ConfirmationModalState;
};

export function ConfirmationModal({ isOpen, toggle, state }: Props) {
	const [isPending, startTransition] = useTransition();

	const confirm = useCallback(() => {
		startTransition(async () => {
			await state?.confirm();
			toggle(false);
		});
	}, [state, toggle]);

	return (
		<Modal.Dialog isDismissable isOpen={isOpen} onOpenChange={toggle}>
			<Modal.Header>
				{({ close }) => (
					<>
						<Modal.Title>{state?.title}</Modal.Title>
						<ButtonSquare
							icon={CloseIcon}
							variant="ghost"
							size="small"
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
							variant="ghost"
						/>
						<Button
							title={state?.confirmBtnText || ""}
							isPending={isPending}
							onPress={confirm}
							appearance="danger"
						/>
					</>
				)}
			</Modal.Footer>
		</Modal.Dialog>
	);
}
