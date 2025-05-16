import { useCallback, useState } from "react";
import {
	editorViewStyles,
	InlineEditableFieldProps,
	ReadViewDefault,
} from "../shared";
import { EditRenderProps, InlineEdit } from "../../inline-edit";
import { Input, InputProps } from "../../input";

export type InlineEditableTextFieldProps = InlineEditableFieldProps & {
	validate?: InputProps["validate"];
	type?: InputProps["type"];
};

export function InlineEditableTextField(props: InlineEditableTextFieldProps) {
	const {
		label,
		value,
		placeholder,
		styles,
		error,
		isDisabled,
		id,
		containerClassName,
		type,
		validate,
		onConfirm,
		onEditorChange,
	} = props;

	const [isInvalidInner, setIsInvalidInner] = useState(false);

	const validateInner = useCallback(
		(value: string) => {
			if (!validate) return null;

			const err = validate(value);
			setIsInvalidInner(!!err);
			return err;
		},
		[validate],
	);

	const editView = useCallback(
		(renderProps: EditRenderProps) => {
			const EditorRender = (
				<Input
					label=""
					{...renderProps}
					defaultValue={value}
					onChange={(value) => {
						renderProps.onChange(value);
						onEditorChange && onEditorChange(value);
					}}
					placeholder={placeholder}
					className={editorViewStyles(styles.editorView)}
					autoFocus
					type={type}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							renderProps.confirm();
						}
					}}
					validate={validateInner}
					errors={error ? [error] : undefined}
					withErrorIcon
					data-testid={`${id}-editor`}
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
			onEditorChange,
			id,
			validateInner,
			type,
			value,
		],
	);

	return (
		<InlineEdit
			value={value}
			label={label}
			editView={editView}
			isInvalid={!!error || isInvalidInner}
			id={id}
			containerClassName={containerClassName}
			readView={() => (
				<ReadViewDefault
					value={value}
					fieldType="input"
					placeholder={placeholder}
					isDisabled={isDisabled || false}
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
