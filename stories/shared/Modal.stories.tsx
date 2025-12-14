import { Button, ButtonSquare } from "@/_src/shared/ui/components/button";
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
			<Button title="Trigger" />
			<Modal.Dialog isDismissable>
				<Modal.Header>
					{({ close }) => (
						<>
							<Modal.Title>Modal Header</Modal.Title>
							<ButtonSquare
								icon={CloseIcon}
								variant="ghost"
								onPress={close}
							/>
						</>
					)}
				</Modal.Header>
				<Modal.Body>Modal Body</Modal.Body>
				<Modal.Footer>
					{({ close }) => (
						<>
							<Button
								title="Cancel"
								onPress={close}
								variant="ghost"
							/>
							<Button
								title="Delete"
								onPress={close}
								appearance="danger"
							/>
						</>
					)}
				</Modal.Footer>
			</Modal.Dialog>
		</Modal>
	);
};
