import { Button } from "@/_src/shared/ui/components/button";
import {
	ToastProvider,
	useGlobalToast,
} from "@/_src/shared/ui/components/toast";
import type { Meta } from "@storybook/nextjs";
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

export const ToastDefault = () => {
	return (
		<div className="h-screen w-full">
			<ToastProvider>
				<div className="h-full w-full">
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
		<div className="absolute top-1/2 left-1/2 grid -translate-x-1/2 -translate-y-1/2 grid-flow-row grid-cols-3 gap-2">
			<Button
				title="Neutral!"
				appearance="neutral"
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
				title="Info!"
				appearance="info"
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
				title="Warning!"
				appearance="warning"
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
				title="Error!"
				appearance="danger"
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
				title="Success!"
				appearance="success"
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
				title="Dismissable!"
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
