import { Button } from "@/_src/shared/ui/components/button";
import { Drawer } from "@/_src/shared/ui/components/drawer";
import type { Meta } from "@storybook/nextjs";
import { useState } from "react";

const meta = {
	title: "Shared/Drawer",
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	argTypes: {},
} satisfies Meta<typeof Drawer>;

export default meta;

export const DrawerOverlay = () => {
	return (
		<div className="min-w-[500px] min-h-[300px]">
			<Drawer.Trigger>
				<Button title="Trigger" />
				<Drawer.Modal position="end">
					<Drawer.Heading>Drawer Heading</Drawer.Heading>
				</Drawer.Modal>
			</Drawer.Trigger>

			<p>Some content</p>
		</div>
	);
};

export const DrawerInlineWithPortal = () => {
	const [isOpen, setOpen] = useState(false);

	return (
		<div className="flex flex-row w-full min-w-[500px] min-h-[300px] bg-neutral-100">
			<div className="w-full">
				<p>Some content</p>
				<Button
					title="Trigger"
					onPress={() => setOpen((prev) => !prev)}
				/>
				<p>Some content</p>
			</div>
			<Drawer.Modal position="end" portal="in-same-place" isOpen={isOpen}>
				<Drawer.Heading>Drawer Heading</Drawer.Heading>
			</Drawer.Modal>
		</div>
	);
};

export const DrawerInlineResizible = () => {
	const [isOpen, setOpen] = useState(false);

	return (
		<div className="flex flex-row w-full min-w-[500px] h-[300px] bg-neutral-100">
			<div className="w-full">
				<p>Some content</p>
				<Button
					title="Trigger"
					onPress={() => setOpen((prev) => !prev)}
				/>
				<p>Some content</p>
			</div>
			<Drawer.ModalWithSeparator
				position="end"
				onOpenChange={setOpen}
				stateKey="drawer-inline-resizable"
				isOpen={isOpen}
			>
				<Drawer.Heading>Drawer Heading</Drawer.Heading>
			</Drawer.ModalWithSeparator>
		</div>
	);
};

// TODO: Implement bottom later
// export const DrawerInlineResizibleBottom = (args: any) => {
// 	return (
// 		<div>
// 			<Drawer>
// 				<div className="w-full">
// 					<Button title="Trigger" />
// 				</div>
// 				<Drawer.Content
// 					{...args}
// 					type="inline"
// 					withSeparator
// 					position="bottom"
// 				>
// 					<div className="w-24 border border-neutral-300">
// 						Content
// 					</div>
// 				</Drawer.Content>
// 			</Drawer>

// 			<Button title="Click to interact" />
// 		</div>
// 	);
// };
