import { NewButton } from "@/_src/shared/ui/components/button";
import { CloseIcon } from "@/_src/shared/ui/components/icon";
import { Modal } from "@/_src/shared/ui/components/modal";
import type { Meta } from "@storybook/nextjs";

const meta = {
	title: "Shared/Modal",
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	argTypes: {},
} satisfies Meta<typeof Modal>;

export default meta;

export const DialogDefault = () => {
	return (
		<Modal>
			<NewButton>Trigger</NewButton>
			<Modal.Dialog isDismissable>
				<Modal.Header>
					{({ close }) => (
						<>
							<Modal.Title>Modal Header</Modal.Title>
							<NewButton
								shape="square"
								variant="ghost"
								onPress={close}
							>
								<CloseIcon size={18} />
							</NewButton>
						</>
					)}
				</Modal.Header>
				<Modal.Body>Modal Body</Modal.Body>
				<Modal.Footer>
					{({ close }) => (
						<>
							<NewButton
								onPress={close}
								variant="ghost"
							>
								Cancel
							</NewButton>
							<NewButton
								onPress={close}
								appearance="danger"
							>
								Delete
							</NewButton>
						</>
					)}
				</Modal.Footer>
			</Modal.Dialog>
		</Modal>
	);
};
