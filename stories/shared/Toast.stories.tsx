import { Button } from "@/_src/shared/ui/components/button";
import {
	ToastProvider,
	useGlobalToast,
} from "@/_src/shared/ui/components/toast/component";
import type { Meta } from "@storybook/react";
import { useState } from "react";

const meta = {
	title: "Shared/Toast",
	component: ToastProvider,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	argTypes: {},
} satisfies Meta<typeof ToastProvider>;

export default meta;

export const ToastDefault = (args: any) => {
	return (
		<div className="w-full h-screen">
			<ToastProvider {...args}>
				<div className="w-full h-full">
					<ToastTrigger />
				</div>
			</ToastProvider>
		</div>
	);
};

function ToastTrigger() {
	const [increment, setIncrement] = useState(1);
	const toastState = useGlobalToast();

	return (
		<Button
			title="Toast!"
			className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
			onPress={() => {
				toastState?.add({
					title: `Title #${increment}`,
					description: "Lorem ipsum description.",
				});
				setIncrement((prev) => prev + 1);
			}}
		/>
	);
}
