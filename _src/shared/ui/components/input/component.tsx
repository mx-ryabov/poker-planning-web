"use client";
import { forwardRef, ReactNode, RefObject, useMemo, useRef } from "react";
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
import { FieldErrorIcon } from "../field-error-icon";
import { twMerge } from "tailwind-merge";

type _InputProps = {
	label: string;
	startIcon?: IconType;
	errors?: string[] | string;
	withErrorIcon?: boolean;
	endContent?: ReactNode;
	isPending?: boolean;
	"data-testid"?: string;
} & TextFieldProps &
	Omit<AriaInputProps, "onChange" | "onKeyDown" | "onKeyUp" | "disabled">;

export const Input = forwardRef<HTMLInputElement, _InputProps>(
	function (props, ref) {
		const {
			label,
			startIcon,
			errors,
			withErrorIcon,
			endContent,
			className,
			isPending,
			...restProps
		} = props;

		const inputRef: RefObject<HTMLInputElement | null> =
			useRef<HTMLInputElement>(null);

		const error = useMemo(
			() =>
				typeof errors === "string"
					? errors
					: errors?.length
						? errors[0]
						: undefined,
			[errors],
		);

		return (
			<TextField
				className="group flex w-full flex-col"
				{...restProps}
				isDisabled={restProps.isDisabled || isPending}
				data-testid="text-field-container"
				isInvalid={!!errors || restProps.isInvalid}
			>
				<Label aria-label="Label">
					<span
						className={labelStyles({
							isDisabled: restProps.isDisabled || isPending,
							hasContent: !!label,
						})}
					>
						{label}
					</span>

					<Group
						className={twMerge(
							inputStyles({
								hasError: !!errors?.length,
								hasEndContent: !!endContent,
								isDisabled: restProps.isDisabled || isPending,
							}),
							className as string,
						)}
					>
						{startIcon && (
							<span className="text-neutral-200">
								{startIcon({ size: 12, thikness: "bold" })}
							</span>
						)}
						<AriaInput
							className="h-full w-full bg-white/0 outline-hidden placeholder:text-neutral-200"
							aria-label="input"
							data-testid={restProps["data-testid"]}
							ref={setRefs(inputRef, ref)}
						/>
						{endContent}
						{withErrorIcon && (
							<FieldErrorIcon
								errorMsg={error}
								placement="top end"
							/>
						)}
						{isPending && (
							<div className="border-r-primary-500 animate-rotation-linear aspect-square w-4 rounded-full border-2 border-neutral-200" />
						)}
					</Group>
				</Label>

				{!withErrorIcon && (
					<FieldError className="text-error-600 flex w-full flex-row items-center gap-1 p-1 text-xs font-medium">
						<WarningIcon size={12} thikness="bold" />
						{error}
					</FieldError>
				)}
			</TextField>
		);
	},
);

export type InputProps = _InputProps & {
	ref?: RefObject<HTMLInputElement>;
};

const inputStyles = cva(
	[
		"peer flex items-center gap-2 relative overflow-hidden",
		"w-full h-10 px-3",
		"rounded-lg box-border border-2",
		"text-sm transition-colors transition-[border-color] cursor-text",
		"focus-within:border-primary-500!",
		"border-neutral-100",
		"group-hover:border-primary-400",
	],
	{
		variants: {
			hasError: {
				true: ["border-error-500!"],
				false: [],
			},
			hasEndContent: {
				true: ["pr-1"],
				false: [],
			},
			isDisabled: {
				true: ["group-hover:border-neutral-100!", "bg-neutral-100"],
				false: [],
			},
		},
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
