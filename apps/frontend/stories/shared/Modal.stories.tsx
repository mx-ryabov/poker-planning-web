import { Button } from "@/src/shared/ui/components/button";
import { CloseIcon } from "@/src/shared/ui/components/icon";
import { Modal } from "@/src/shared/ui/components/modal";
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
			<Button>Trigger</Button>
			<Modal.Dialog isDismissable>
				<Modal.Header>
					{({ close }) => (
						<>
							<Modal.Title>Modal Header</Modal.Title>
							<Button
								shape="square"
								variant="ghost"
								onPress={close}
							>
								<CloseIcon size={18} />
							</Button>
						</>
					)}
				</Modal.Header>
				<Modal.Body>Modal Body</Modal.Body>
				<Modal.Footer>
					{({ close }) => (
						<>
							<Button onPress={close} variant="ghost">
								Cancel
							</Button>
							<Button onPress={close} appearance="danger">
								Delete
							</Button>
						</>
					)}
				</Modal.Footer>
			</Modal.Dialog>
		</Modal>
	);
};
