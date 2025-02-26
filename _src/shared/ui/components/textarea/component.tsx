import { forwardRef, RefObject, useRef } from "react";
import {
	FieldError,
	Group,
	Label,
	TextField,
	TextFieldProps,
	TextArea as AriaTextArea,
} from "react-aria-components";
import { FieldErrorIcon } from "../field-error-icon";
import { WarningIcon } from "../icon/svg/warning.icon";
import { twMerge } from "tailwind-merge";
import { setRefs } from "@/_src/shared/lib/utils";
import { cva } from "class-variance-authority";

type TextAreaProps = {
	label?: string;
	error?: string;
	withErrorIcon?: boolean;
	placeholder?: string;
	isPending?: boolean;
} & TextFieldProps;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	function (props, ref) {
		const {
			label,
			error,
			withErrorIcon,
			className,
			isPending,
			...restProps
		} = props;

		const textAreaRef = useRef<HTMLTextAreaElement>(null);

		return (
			<TextField
				className="group flex flex-col w-full"
				{...restProps}
				isDisabled={restProps.isDisabled || isPending}
				data-testid="text-field-container"
				isInvalid={!!error || restProps.isInvalid}
			>
				<Label aria-label="Label">
					<span
						className={labelStyles({
							isDisabled: !!restProps.isDisabled || !!isPending,
							hasContent: !!label,
						})}
					>
						{label}
					</span>

					<Group
						className={twMerge(
							textAreaStyles({
								hasError: !!error?.length,
								isDisabled:
									!!restProps.isDisabled || !!isPending,
							}),
							className as string,
						)}
						onClick={() => {
							textAreaRef.current?.focus();
						}}
					>
						<AriaTextArea
							className="outline-hidden w-full h-full placeholder:text-neutral-200 bg-white/0"
							aria-label="textarea"
							rows={4}
							ref={setRefs(textAreaRef, ref)}
						/>
						<div className="flex flex-col items-center gap-1 absolute top-2 right-2">
							{withErrorIcon && (
								<FieldErrorIcon
									errorMsg={error}
									placement="top end"
									size={16}
								/>
							)}
							{isPending && (
								<div className="rounded-full w-4 aspect-square border-2 border-neutral-200 border-r-primary-500 animate-rotation-linear" />
							)}
						</div>
					</Group>
				</Label>

				{!withErrorIcon && (
					<FieldError className="w-full text-xs font-medium p-1 text-error-600 flex flex-row items-center gap-1">
						<WarningIcon size={12} thikness="bold" />
						{error}
					</FieldError>
				)}
			</TextField>
		);
	},
);

const textAreaStyles = cva(
	[
		"peer flex items-center gap-2 relative overflow-hidden",
		"w-full px-3 py-2",
		"rounded-lg box-border",
		"text-sm transition-colors transition-[border-color] cursor-text",
	],
	{
		variants: {
			hasError: {
				true: ["border-2 border-error-500"],
				false: [],
			},
			hasEndContent: {
				true: ["pr-1"],
				false: [],
			},
			isDisabled: {
				true: ["bg-neutral-100"],
				false: [],
			},
		},
		compoundVariants: [
			{
				hasError: false,
				isDisabled: false,
				className: [
					"border-2 border-neutral-100",
					"group-hover:border-primary-400",
					"focus-within:border-primary-500 group-hover:focus-within:border-primary-500",
				],
			},
		],
	},
);

const labelStyles = cva(["w-full text-xs font-medium block"], {
	variants: {
		isDisabled: {
			true: ["text-neutral-300"],
			false: [],
		},
		hasContent: {
			true: ["p-1"],
		},
	},
	compoundVariants: [
		{
			isDisabled: false,
			class: ["text-neutral-500"],
		},
	],
});
