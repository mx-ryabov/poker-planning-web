"use client";
import { forwardRef, MutableRefObject, ReactNode, useRef } from "react";
import { IconType } from "../icon/icon-builder";
import { WarningIcon } from "../icon";
import { cva } from "class-variance-authority";
import {
	Input as AriaInput,
	FieldError,
	Group,
	InputProps as AriaInputProps,
	Label,
	TextField,
	TextFieldProps,
} from "react-aria-components";
import { setRefs } from "@/_src/shared/lib";

type _InputProps = {
	label: string;
	startIcon?: IconType;
	errors?: string[];
	endContent?: ReactNode;
} & TextFieldProps &
	Omit<AriaInputProps, "onChange" | "onKeyDown" | "onKeyUp">;

const inputStyles = cva(
	[
		"peer flex items-center gap-2 relative overflow-hidden",
		"w-full h-10 px-3",
		"rounded-lg box-border border-2",
		"text-sm transition-colors cursor-text",
		"focus-within:!border-primary-500",
		"border-neutral-100",
		"group-hover:border-primary-400",
	],
	{
		variants: {
			hasError: {
				true: ["!border-error-500"],
				false: [],
			},
			hasEndContent: {
				true: ["pr-1"],
				false: [],
			},
			isDisabled: {
				true: ["group-hover:!border-neutral-100", "bg-neutral-100"],
				false: [],
			},
		},
	},
);

const labelStyles = cva(["w-full text-xs font-medium p-1 block"], {
	variants: {
		isDisabled: {
			true: ["text-neutral-300"],
			false: [],
		},
	},
	compoundVariants: [
		{
			isDisabled: false,
			class: ["text-neutral-500"],
		},
	],
});

export const Input = forwardRef<HTMLInputElement, _InputProps>(
	function (props, ref) {
		const { label, startIcon, errors, endContent, ...restProps } = props;

		const inputRef: MutableRefObject<HTMLInputElement | null> =
			useRef<HTMLInputElement>(null);

		return (
			<TextField
				className="group flex flex-col w-full"
				{...restProps}
				data-testid="text-field-container"
				isInvalid={!!errors || restProps.isInvalid}
			>
				<Label aria-label="Label">
					<span
						className={labelStyles({
							isDisabled: restProps.isDisabled,
						})}
					>
						{label}
					</span>

					<Group
						className={inputStyles({
							hasError: !!errors?.length,
							hasEndContent: !!endContent,
							isDisabled: restProps.isDisabled,
						})}
						onClick={() => {
							inputRef.current?.focus();
						}}
					>
						{startIcon && (
							<span className="text-neutral-200">
								{startIcon({ size: 12, thikness: "bold" })}
							</span>
						)}
						<AriaInput
							className="outline-none w-full h-full placeholder:text-neutral-200 disabled:placeholder:text-neutral-300"
							aria-label="input"
							ref={setRefs(inputRef, ref)}
						/>
						{endContent}
					</Group>
				</Label>

				<FieldError className="w-full text-xs font-medium p-1 text-error-600 flex flex-row items-center gap-1">
					<WarningIcon size={12} thikness="bold" />
					{errors?.length ? errors[0] : null}
				</FieldError>
			</TextField>
		);
	},
);

export type InputProps = _InputProps & {
	ref?: MutableRefObject<HTMLInputElement>;
};
