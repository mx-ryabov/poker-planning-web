import { useCallback, useMemo, useState } from "react";
import {
	editorViewStyles,
	InlineEditableFieldProps,
	ReadViewDefault,
} from "../shared";
import { EditRenderProps, InlineEdit } from "../../inline-edit";
import { Input, InputProps } from "../../input";
import { Tooltip } from "../../tooltip";

export type InlineEditableTextFieldProps = InlineEditableFieldProps & {
	withTooltipError?: boolean;
	validate?: InputProps["validate"];
	type?: InputProps["type"];
};

export function InlineEditableTextField(props: InlineEditableTextFieldProps) {
	const {
		label,
		value,
		placeholder,
		styles,
		error: errorControlled,
		isDisabled,
		id,
		containerClassName,
		type,
		withTooltipError,
		withErrorIcon = true,
		validate,
		onConfirm,
		onEditorChange,
	} = props;

	const [errorInner, setErrorInner] = useState<string | null>(null);
	const error = useMemo(
		() => errorControlled || errorInner,
		[errorControlled, errorInner],
	);

	const validateInner = useCallback(
		(value: string) => {
			if (!validate) return null;

			const err = validate(value);
			if (typeof err === "string") {
				setErrorInner(err);
			}
			if (!err) setErrorInner(null);
			return err;
		},
		[validate],
	);

	const editView = useCallback(
		(renderProps: EditRenderProps) => {
			const EditorRender = (
				<Tooltip isOpen={withTooltipError && !!error}>
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
						errors={
							errorControlled && !withTooltipError
								? [errorControlled]
								: undefined
						}
						withErrorIcon={withErrorIcon}
						data-testid={`${id}-editor`}
					/>
					{!!error && (
						<Tooltip.Content placement="top">
							{error}
						</Tooltip.Content>
					)}
				</Tooltip>
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
			isInvalid={!!error || !!errorInner}
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
