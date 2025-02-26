import { EditorViewStyleProps, ReadViewStyleProps } from "./styles";

export type InlineEditableFieldProps = {
	label?: string;
	value: string;
	placeholder?: string;
	styles: {
		readView: ReadViewStyleProps;
		editorView: EditorViewStyleProps;
	};
	isDisabled?: boolean;
	error?: string;
	onConfirm: (value: string) => void;
	onEditorChange?: (value: string) => void;
};
