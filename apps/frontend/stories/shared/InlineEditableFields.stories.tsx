import {
	InlineEditableTextarea,
	InlineEditableTextField,
} from "@/src/shared/ui/components/inline-editable-fields";
import { useState } from "react";

const meta = {
	title: "Shared/InlineEditableField",
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {},
	args: {},
};

export default meta;

export const InlineEditableTextareaDefault = () => {
	const [value, setValue] = useState(`Description:
1. It's important to do this
2. And this
3. And please don't forget about THIS
4. Especially when it comes to the auto-resizing`);

	return (
		<div className="w-[300px]">
			<InlineEditableTextarea
				value={value}
				onConfirm={setValue}
				label="Textarea Default"
				placeholder="Edit textarea"
				styles={{
					readView: {
						textSize: "medium",
						compensatedOffset: true,
					},
					editorView: {
						textSize: "medium",
						compensatedOffset: true,
					},
				}}
			/>
		</div>
	);
};

export const InlineEditableTextfieldMedium = () => {
	const [value, setValue] = useState("");

	return (
		<div className="w-[300px]">
			<InlineEditableTextField
				value={value}
				onConfirm={setValue}
				placeholder="Edit textarea"
				error="This is an error"
				isDisabled={false}
				styles={{
					readView: {
						textSize: "medium",
						size: "medium",
					},
					editorView: {
						textSize: "medium",
						size: "medium",
					},
				}}
			/>
		</div>
	);
};

export const InlineEditableTextfieldMediumWithLabel = () => {
	const [value, setValue] = useState("");

	return (
		<div className="w-[300px]">
			<InlineEditableTextField
				value={value}
				label="Input with label"
				onConfirm={setValue}
				placeholder="Edit textarea"
				error="This is an error"
				isDisabled={false}
				styles={{
					readView: {
						textSize: "medium",
						size: "medium",
					},
					editorView: {
						textSize: "medium",
						size: "medium",
					},
				}}
			/>
		</div>
	);
};

export const InlineEditableTextfieldLarge = () => {
	const [value, setValue] = useState("");

	return (
		<div className="w-[300px]">
			<InlineEditableTextField
				value={value}
				onConfirm={setValue}
				placeholder="Edit textarea"
				error="This is an error"
				isDisabled={false}
				styles={{
					readView: {
						textSize: "large",
						size: "large",
					},
					editorView: {
						textSize: "large",
						size: "large",
					},
				}}
			/>
		</div>
	);
};

export const InlineEditableTextfieldLargeWithLabel = () => {
	const [value, setValue] = useState("");

	return (
		<div className="w-[300px]">
			<InlineEditableTextField
				value={value}
				label="Input with label"
				onConfirm={setValue}
				placeholder="Edit textarea"
				error="This is an error"
				isDisabled={false}
				styles={{
					readView: {
						textSize: "large",
						size: "large",
					},
					editorView: {
						textSize: "large",
						size: "large",
					},
				}}
			/>
		</div>
	);
};
