"use client";
import { forwardRef, useEffect, useRef } from "react";
import { IconType } from "../icon/icon-builder";
import { WarningIcon } from "../icon";
import { cva } from "class-variance-authority";
import {
	Input as AriaInput,
	FieldError,
	InputProps,
	Label,
	TextField,
	TextFieldProps,
} from "react-aria-components";

type Props = {
	label?: string;
	startIcon?: IconType;
	errors?: string[];
} & TextFieldProps &
	InputProps;

export const inputStyles = cva(
	[
		"relative w-full overflow-hidden flex items-center peer h-10 px-3 gap-2 border-2 text-sm rounded-lg box-border transition-colors cursor-text",
	],
	{
		variants: {
			hasError: {
				true: ["border-error-500"],
				false: [
					"border-neutral-100",
					"group-hover:border-primary-400",
					"focus:border-2 focus:border-primary-400",
					"focus-visible:border-primary-400 focus-visible:border-2",
				],
			},
		},
	},
);

export const Input = forwardRef<HTMLInputElement, Props>(function (props, ref) {
	const { label, startIcon, errors, ...restProps } = props;

	const inputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		ref = inputRef;
	}, [inputRef, ref]);

	return (
		<TextField
			className="group flex flex-col w-full"
			{...restProps}
			isInvalid={!!errors || restProps.isInvalid}
		>
			<Label className="w-full text-xs font-medium p-1 block text-neutral-500">
				{label}
			</Label>
			<div
				className={
					inputStyles({ hasError: !!errors?.length }) +
					" has-[data-[focused]]:outline-2 outline-primary-500"
				}
				onClick={() => inputRef.current?.focus()}
			>
				{startIcon && (
					<span className="text-neutral-200">
						{startIcon({ size: 12, thikness: "bold" })}
					</span>
				)}
				<AriaInput className="outline-none" ref={inputRef} />
			</div>

			<FieldError className="w-full text-xs font-medium p-1 text-error-500 flex flex-row items-center gap-1">
				<WarningIcon size={12} thikness="bold" />
				{errors?.length ? errors[0] : null}
			</FieldError>
		</TextField>
	);
});
