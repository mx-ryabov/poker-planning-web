import { InlineEdit } from "@/_src/shared/ui/components/inline-edit/component";
import { Input } from "@/_src/shared/ui/components/input";
import { TextArea } from "@/_src/shared/ui/components/textarea";
import type { Meta } from "@storybook/react";
import { useState } from "react";

const meta = {
	title: "Shared/InlineEdit",
	component: InlineEdit,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {},
	args: {},
} satisfies Meta<typeof InlineEdit>;

export default meta;

export const InlineEditWithInput = (args: any) => {
	const [value, setValue] = useState("");

	return (
		<div>
			<InlineEdit
				label="Inline Edit Label"
				value={value}
				editView={(renderProps) => (
					<Input label="" {...renderProps} autoFocus />
				)}
				readView={() => <p className="border p-2">Value: {value}</p>}
				onConfirm={setValue}
			/>
		</div>
	);
};

export const InlineEditWithTextArea = (args: any) => {
	const [value, setValue] = useState("");

	return (
		<div>
			<InlineEdit
				label="Inline Edit Label"
				value={value}
				editView={(renderProps) => (
					<TextArea label="" {...renderProps} />
				)}
				keepEditViewOpenOnBlur
				readView={() => <p className="border p-2">Value: {value}</p>}
				onConfirm={setValue}
			/>
		</div>
	);
};
