"use client";
import {
	ReactNode,
	RefObject,
	useCallback,
	useMemo,
	useRef,
	useState,
} from "react";
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
import { setRefs } from "@/src/shared/lib";
import { FieldErrorIcon } from "../field-error-icon";
import { twMerge } from "tailwind-merge";
import { mergeProps } from "react-aria";

type _InputProps = {
	label: string;
	startIcon?: IconType;
	errors?: string[] | string;
	withErrorIcon?: boolean;
	errorDefaultOpen?: boolean;
	endContent?: ReactNode;
	isPending?: boolean;
	"data-testid"?: string;
	ref?:
		| RefObject<HTMLInputElement | null>
		| ((instance: HTMLInputElement | null) => void);
} & TextFieldProps &
	Omit<AriaInputProps, "onChange" | "onKeyDown" | "onKeyUp" | "disabled">;

export function Input(props: _InputProps) {
	const {
		label,
		startIcon,
		errors,
		withErrorIcon,
		endContent,
		className,
		isPending,
		errorDefaultOpen,
		validate,
		ref,
		...restProps
	} = props;

	const inputRef: RefObject<HTMLInputElement | null> =
		useRef<HTMLInputElement>(null);

	const [innerError, setInnerError] = useState<string | true | null>(null);
	const onValidationCheck = useCallback(
		(value: string) => {
			if (!validate) return;
			const error = validate(value) || null;
			setInnerError(Array.isArray(error) ? error[0] : error);
		},
		[validate],
	);

	const error = useMemo(() => {
		const outerError =
			typeof errors === "string"
				? errors
				: Array.isArray(errors)
					? errors[0]
					: undefined;

		return outerError || innerError;
	}, [errors, innerError]);

	const mergedProps = mergeProps(restProps, {
		onChange: onValidationCheck,
	});

	return (
		<TextField
			className="group flex w-full flex-col"
			{...mergedProps}
			isDisabled={restProps.isDisabled || isPending}
			data-testid="text-field-container"
			validationBehavior="aria"
			isInvalid={!!errors || restProps.isInvalid}
		>
			<Label aria-label={`${label} label`}>
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
						inputStyles({
							hasError: !!errors?.length,
							hasEndContent: !!endContent,
							isDisabled: !!restProps.isDisabled || !!isPending,
						}),
						className as string,
					)}
				>
					{startIcon && (
						<span className="text-neutral-500">
							{startIcon({ size: 12, thikness: "bold" })}
						</span>
					)}
					<AriaInput
						className="h-full w-full bg-white/0 outline-hidden placeholder:text-neutral-600"
						aria-label={label || undefined}
						data-testid={restProps["data-testid"]}
						ref={setRefs(inputRef, ref)}
					/>
					{endContent}
					{withErrorIcon && typeof error === "string" && (
						<FieldErrorIcon
							errorMsg={error}
							placement="top end"
							defaultOpen={errorDefaultOpen}
						/>
					)}
					{isPending && (
						<div className="border-r-primary-500 animate-rotation-linear aspect-square w-4 rounded-full border-2 border-y-neutral-200 border-l-neutral-200" />
					)}
				</Group>
			</Label>

			{!withErrorIcon && (
				<FieldError className="text-error-700 flex w-full flex-row items-center gap-2 p-1 text-start text-xs font-medium">
					{(renderProps) => {
						if (!error && !renderProps.isInvalid) return null;

						return (
							<>
								<WarningIcon size={14} thikness="bold" />
								{error || renderProps.validationErrors[0]}
							</>
						);
					}}
				</FieldError>
			)}
		</TextField>
	);
}

export type InputProps = _InputProps;

const inputStyles = cva(
	[
		"peer flex items-center gap-2 relative overflow-hidden",
		"w-full h-10 px-3",
		"rounded-lg box-border border border-neutral-300",
		"text-sm transition-colors transition-[border-color] cursor-text",
		"focus-within:border-primary-500!",
		"border-2",
		"group-hover:border-primary-400",
	],
	{
		variants: {
			hasError: {
				true: ["border-error-700!"],
				false: [],
			},
			hasEndContent: {
				true: ["pr-1"],
				false: [],
			},
			isDisabled: {
				true: [
					"group-hover:border-neutral-300!",
					"bg-neutral-200",
					"group-hover:cursor-not-allowed",
				],
				false: [],
			},
		},
	},
);

const labelStyles = cva(["w-full text-xs font-medium block"], {
	variants: {
		isDisabled: {
			true: ["text-neutral-900"],
			false: [],
		},
		hasContent: {
			true: ["p-1"],
		},
	},
	compoundVariants: [
		{
			isDisabled: false,
			class: ["text-neutral-900"],
		},
	],
});
