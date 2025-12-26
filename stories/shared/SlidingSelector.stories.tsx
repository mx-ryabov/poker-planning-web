import {
	ListIcon,
	PeopleIcon,
	SettingsIcon,
} from "@/_src/shared/ui/components/icon";
import { NewButton } from "@/_src/shared/ui/components/button";
import { SlidingSelector } from "@/_src/shared/ui/components/sliding-selector";
import type { Meta } from "@storybook/nextjs";
import { useState } from "react";

const meta = {
	title: "Shared/SlidingSelector",
	component: SlidingSelector,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {},
} satisfies Meta<typeof SlidingSelector>;

export default meta;

export const SlidingSelectorRow = () => {
	return (
		<SlidingSelector
			containerClassName="flex flex-row gap-2"
			selectorClassName="bg-primary-100 rounded-lg mix-blend-multiply"
		>
			<NewButton
				shape="square"
				variant="ghost"
				className="bg-opacity-0 data-[sliding-selector-element-active=true]:text-primary-500"
			>
				<ListIcon size={18} />
			</NewButton>
			<NewButton
				shape="square"
				variant="ghost"
				className="bg-opacity-0 data-[sliding-selector-element-active=true]:text-primary-500"
			>
				<SettingsIcon size={18} />
			</NewButton>
			<NewButton
				shape="square"
				variant="ghost"
				className="bg-opacity-0 data-[sliding-selector-element-active=true]:text-primary-500"
			>
				<PeopleIcon size={18} />
			</NewButton>
		</SlidingSelector>
	);
};

export const SlidingSelectorCol = () => {
	return (
		<SlidingSelector
			containerClassName="flex flex-col gap-2"
			selectorClassName="bg-primary-200/50 rounded-lg"
		>
			<NewButton shape="square" variant="ghost">
				<ListIcon size={18} />
			</NewButton>
			<NewButton shape="square" variant="ghost">
				<SettingsIcon size={18} />
			</NewButton>
			<NewButton shape="square" variant="ghost">
				<PeopleIcon size={18} />
			</NewButton>
		</SlidingSelector>
	);
};

export const SlidingSelectorWithDifferentSizes = () => {
	return (
		<SlidingSelector
			containerClassName="flex flex-row gap-2"
			selectorClassName="bg-primary-200 rounded-lg"
		>
			<NewButton shape="square" variant="ghost" size="small">
				<ListIcon size={16} />
			</NewButton>
			<NewButton shape="square" variant="ghost" size="medium">
				<SettingsIcon size={18} />
			</NewButton>
			<NewButton shape="square" variant="ghost" size="large">
				<PeopleIcon size={24} />
			</NewButton>
		</SlidingSelector>
	);
};

export const SlidingSelectorControllable = () => {
	const [activeElement, setActiveElement] = useState<number | null>(null);
	return (
		<SlidingSelector
			containerClassName="flex flex-row gap-2"
			activeIndex={activeElement}
			onSelectionReset={() => setActiveElement(null)}
			selectorClassName="bg-primary-100 rounded-lg mix-blend-multiply"
		>
			<NewButton
				shape="square"
				variant="ghost"
				onPress={() =>
					setActiveElement((prev) => (prev === 0 ? null : 0))
				}
				className="bg-opacity-0 data-[sliding-selector-element-active=true]:text-primary-500"
			>
				<ListIcon size={18} />
			</NewButton>
			<NewButton
				shape="square"
				variant="ghost"
				onPress={() =>
					setActiveElement((prev) => (prev === 1 ? null : 1))
				}
				className="bg-opacity-0 data-[sliding-selector-element-active=true]:text-primary-500"
			>
				<SettingsIcon size={18} />
			</NewButton>
			<NewButton
				shape="square"
				variant="ghost"
				onPress={() =>
					setActiveElement((prev) => (prev === 2 ? null : 2))
				}
				className="bg-opacity-0 data-[sliding-selector-element-active=true]:text-primary-500"
			>
				<PeopleIcon size={18} />
			</NewButton>
		</SlidingSelector>
	);
};
