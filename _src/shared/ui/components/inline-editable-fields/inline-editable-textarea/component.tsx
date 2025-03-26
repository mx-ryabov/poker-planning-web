import { useCallback } from "react";
import { EditRenderProps, InlineEdit } from "../../inline-edit";
import { TextArea } from "../../textarea";
import {
	editorViewStyles,
	InlineEditableFieldProps,
	ReadViewDefault,
} from "../shared";

type InlineEditableTextareaProps = {
	shouldConfirmOnEnter?: boolean;
	keepEditViewOpenOnBlur?: boolean;
	rows?: number;
} & InlineEditableFieldProps;

export function InlineEditableTextarea(props: InlineEditableTextareaProps) {
	const {
		label,
		value,
		placeholder,
		styles,
		error,
		shouldConfirmOnEnter = false,
		keepEditViewOpenOnBlur = true,
		rows,
		isDisabled,
		id,
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
					onKeyDown={
						shouldConfirmOnEnter
							? (e) => {
									if (e.key === "Enter") {
										renderProps.confirm();
									}
								}
							: undefined
					}
					placeholder={placeholder}
					className={editorViewStyles(styles.editorView)}
					maxHeight={styles.editorView.maxHeight}
					autoFocus
					error={error}
					rows={rows}
					withErrorIcon
				/>
			);

			if (styles.editorView.compensatedOffset) {
				return <div className="-mx-2">{EditorRender}</div>;
			}
			return EditorRender;
		},
		[
			styles.editorView,
			placeholder,
			error,
			rows,
			shouldConfirmOnEnter,
			onEditorChange,
		],
	);

	return (
		<InlineEdit
			value={value}
			label={label}
			editView={editView}
			keepEditViewOpenOnBlur={keepEditViewOpenOnBlur}
			isInvalid={!!error}
			isDisabled={isDisabled}
			id={id}
			readView={() => (
				<ReadViewDefault
					value={value}
					fieldType="textarea"
					placeholder={placeholder}
					isDisabled={isDisabled}
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
