import { Button } from "@/_src/shared/ui/components/button";
import {
	ToastProvider,
	useGlobalToast,
} from "@/_src/shared/ui/components/toast";
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
		<div className="grid grid-flow-row grid-cols-3 gap-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
			<Button
				title="Toast Neutral!"
				className="bg-neutral-500"
				onPress={() => {
					toastState?.add({
						title: `Title loooong very very long #${increment}`,
						description:
							"Lorem ipsum description.Lorem ipsum description.Lorem ipsum description.Lorem ipsum description..",
						variant: "neutral",
					});
					setIncrement((prev) => prev + 1);
				}}
			/>
			<Button
				title="Toast Info!"
				className="bg-info-500"
				onPress={() => {
					toastState?.add({
						title: `Title loooong very very long #${increment}`,
						description:
							"Lorem ipsum description.Lorem ipsum description.Lorem ipsum description.Lorem ipsum description..",
						variant: "info",
					});
					setIncrement((prev) => prev + 1);
				}}
			/>
			<Button
				title="Toast Warning!"
				className="bg-warning-500"
				onPress={() => {
					toastState?.add({
						title: `Title loooong very very long #${increment}`,
						description:
							"Lorem ipsum description.Lorem ipsum description.Lorem ipsum description.Lorem ipsum description..",
						variant: "warning",
					});
					setIncrement((prev) => prev + 1);
				}}
			/>
			<Button
				title="Toast Error!"
				className="bg-error-500"
				onPress={() => {
					toastState?.add({
						title: `Title loooong very very long #${increment}`,
						description:
							"Lorem ipsum description.Lorem ipsum description.Lorem ipsum description.Lorem ipsum description..",
						variant: "error",
					});
					setIncrement((prev) => prev + 1);
				}}
			/>
			<Button
				title="Toast Success!"
				className="bg-success-500"
				onPress={() => {
					toastState?.add({
						title: `Title loooong very very long #${increment}`,
						description:
							"Lorem ipsum description.Lorem ipsum description.Lorem ipsum description.Lorem ipsum description..",
						variant: "success",
					});
					setIncrement((prev) => prev + 1);
				}}
			/>
			<Button
				title="Toast Dismissable!"
				onPress={() => {
					toastState?.add(
						{
							title: `Title loooong very very long #${increment}`,
							description:
								"Lorem ipsum description.Lorem ipsum description.Lorem ipsum description.Lorem ipsum description..",
							variant: "error",
						},
						{ timeout: 3000 },
					);
					setIncrement((prev) => prev + 1);
				}}
			/>
			<Button
				title="Toast with timeout"
				variant="outline"
				onPress={() => {
					setTimeout(() => {
						toastState?.add({
							title: `Title #${increment}`,
							description: "Lorem ipsum description.",
							variant: "warning",
						});
						setIncrement((prev) => prev + 1);
					}, 2000);
				}}
			/>
		</div>
	);
}
