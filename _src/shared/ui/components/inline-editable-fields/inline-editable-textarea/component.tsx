import { useCallback } from "react";
import { EditRenderProps, InlineEdit } from "../../inline-edit";
import { TextArea } from "../../textarea";
import {
	editorViewStyles,
	InlineEditableFieldProps,
	ReadViewDefault,
} from "../shared";

type InlineEditableTextareaProps = InlineEditableFieldProps;

export function InlineEditableTextarea(props: InlineEditableTextareaProps) {
	const {
		label,
		value,
		placeholder,
		styles,
		error,
		onConfirm,
		onEditorChange,
	} = props;

	const editView = useCallback(
		(renderProps: EditRenderProps) => {
			const EditorRender = (
				<TextArea
					label=""
					{...renderProps}
					onChange={(value) => {
						renderProps.onChange(value);
						onEditorChange && onEditorChange(value);
					}}
					placeholder={placeholder}
					className={editorViewStyles(styles.editorView)}
					maxHeight={styles.editorView.maxHeight}
					autoFocus
					error={error}
					withErrorIcon
				/>
			);

			if (styles.editorView.compensatedOffset) {
				return <div className="-mx-2">{EditorRender}</div>;
			}
			return EditorRender;
		},
		[styles.editorView, placeholder, error, onEditorChange],
	);

	return (
		<InlineEdit
			value={value}
			label={label}
			editView={editView}
			keepEditViewOpenOnBlur
			isInvalid={!!error}
			readView={() => (
				<ReadViewDefault
					value={value}
					fieldType="textarea"
					placeholder={placeholder}
					styles={styles.readView}
				/>
			)}
			onConfirm={onConfirm}
			onCancel={() => {
				onEditorChange && onEditorChange(value);
			}}
		/>
	);
}
