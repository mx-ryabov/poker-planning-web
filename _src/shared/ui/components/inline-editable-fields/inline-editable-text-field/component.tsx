import { useCallback } from "react";
import {
	editorViewStyles,
	InlineEditableFieldProps,
	ReadViewDefault,
} from "../shared";
import { EditRenderProps, InlineEdit } from "../../inline-edit";
import { Input } from "../../input";

type InlineEditableTextFieldProps = InlineEditableFieldProps;

export function InlineEditableTextField(props: InlineEditableTextFieldProps) {
	const {
		label,
		value,
		placeholder,
		styles,
		error,
		isDisabled,
		onConfirm,
		onEditorChange,
	} = props;

	const editView = useCallback(
		(renderProps: EditRenderProps) => {
			const EditorRender = (
				<Input
					label=""
					{...renderProps}
					onChange={(value) => {
						renderProps.onChange(value);
						onEditorChange && onEditorChange(value);
					}}
					placeholder={placeholder}
					className={editorViewStyles(styles.editorView)}
					autoFocus
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							renderProps.confirm();
						}
					}}
					errors={error ? [error] : undefined}
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
			isInvalid={!!error}
			readView={() => (
				<ReadViewDefault
					value={value}
					fieldType="input"
					placeholder={placeholder}
					isDisabled={isDisabled}
					styles={styles.readView}
				/>
			)}
			isDisabled={isDisabled}
			onConfirm={onConfirm}
			onCancel={() => {
				onEditorChange && onEditorChange(value);
			}}
		/>
	);
}
