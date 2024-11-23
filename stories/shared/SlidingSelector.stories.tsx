import {
	ListIcon,
	PeopleIcon,
	SettingsIcon,
} from "@/_src/shared/ui/components/icon";
import { ButtonSquare } from "@/_src/shared/ui/components/button";
import { SlidingSelector } from "@/_src/shared/ui/components/sliding-selector";
import type { Meta } from "@storybook/react";
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

export const SlidingSelectorRow = (args: any) => {
	return (
		<SlidingSelector
			{...args}
			containerClassName="flex flex-row gap-2"
			selectorClassName="bg-primary-100 rounded-lg mix-blend-multiply"
		>
			<ButtonSquare
				icon={ListIcon}
				variant="ghost"
				className="bg-opacity-0 data-[sliding-selector-element-active=true]:text-primary-500"
			/>
			<ButtonSquare
				icon={SettingsIcon}
				variant="ghost"
				className="bg-opacity-0 data-[sliding-selector-element-active=true]:text-primary-500"
			/>
			<ButtonSquare
				icon={PeopleIcon}
				variant="ghost"
				className="bg-opacity-0 data-[sliding-selector-element-active=true]:text-primary-500"
			/>
		</SlidingSelector>
	);
};

export const SlidingSelectorCol = (args: any) => {
	return (
		<SlidingSelector
			{...args}
			containerClassName="flex flex-col gap-2"
			selectorClassName="bg-primary-200/50 rounded-lg"
		>
			<ButtonSquare icon={ListIcon} variant="ghost" />
			<ButtonSquare icon={SettingsIcon} variant="ghost" />
			<ButtonSquare icon={PeopleIcon} variant="ghost" />
		</SlidingSelector>
	);
};

export const SlidingSelectorWithDifferentSizes = (args: any) => {
	return (
		<SlidingSelector
			{...args}
			containerClassName="flex flex-row gap-2"
			selectorClassName="bg-primary-200 rounded-lg"
		>
			<ButtonSquare icon={ListIcon} variant="ghost" size="small" />
			<ButtonSquare icon={SettingsIcon} variant="ghost" size="medium" />
			<ButtonSquare icon={PeopleIcon} variant="ghost" size="large" />
		</SlidingSelector>
	);
};

export const SlidingSelectorControllable = (args: any) => {
	const [activeElement, setActiveElement] = useState<number | null>(null);
	return (
		<SlidingSelector
			{...args}
			containerClassName="flex flex-row gap-2"
			activeIndex={activeElement}
			onSelectionReset={() => setActiveElement(null)}
			selectorClassName="bg-primary-100 rounded-lg mix-blend-multiply"
		>
			<ButtonSquare
				icon={ListIcon}
				variant="ghost"
				onPress={() =>
					setActiveElement((prev) => (prev === 0 ? null : 0))
				}
				className="bg-opacity-0 data-[sliding-selector-element-active=true]:text-primary-500"
			/>
			<ButtonSquare
				icon={SettingsIcon}
				variant="ghost"
				onPress={() =>
					setActiveElement((prev) => (prev === 1 ? null : 1))
				}
				className="bg-opacity-0 data-[sliding-selector-element-active=true]:text-primary-500"
			/>
			<ButtonSquare
				icon={PeopleIcon}
				variant="ghost"
				onPress={() =>
					setActiveElement((prev) => (prev === 2 ? null : 2))
				}
				className="bg-opacity-0 data-[sliding-selector-element-active=true]:text-primary-500"
			/>
		</SlidingSelector>
	);
};
