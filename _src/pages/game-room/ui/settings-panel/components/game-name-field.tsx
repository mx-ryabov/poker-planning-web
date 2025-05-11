import { InlineEditableTextField } from "@/_src/shared/ui/components/inline-editable-fields";
import { InlineEditableTextFieldProps } from "@/_src/shared/ui/components/inline-editable-fields/inline-editable-text-field/component";

type Props = {
	isReadonly: boolean;
	value: string;
	onConfirm: (value: string) => void;
	validate: InlineEditableTextFieldProps["validate"];
};

export function GameNameField({
	value,
	onConfirm,
	validate,
	isReadonly,
}: Props) {
	return (
		<InlineEditableTextField
			value={value}
			label="Game's name"
			styles={{
				readView: {
					variant: "bordered",
					textSize: "medium",
					size: "large",
				},
				editorView: {
					textSize: "medium",
				},
			}}
			isDisabled={isReadonly}
			id="ticket-title"
			validate={validate}
			onConfirm={onConfirm}
		/>
	);
}
