"use client";
import {
	KeyboardEvent,
	InputHTMLAttributes,
	RefObject,
	useState,
	useMemo,
} from "react";
import {
	FieldError,
	Input,
	Label,
	TextField,
	TextFieldProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

type Props = InputHTMLAttributes<HTMLInputElement> & {
	label: string;
	error?: string;
	isInvalid?: boolean;
	shouldShowErrorAfterTouch?: boolean;
	onEnter?: () => void;
	validate?: TextFieldProps["validate"];
	ref?:
		| RefObject<HTMLInputElement | null>
		| ((instance: HTMLInputElement | null) => void);
};

export function FullSizeFormTextInput(props: Props) {
	const {
		onEnter,
		maxLength,
		error,
		label,
		isInvalid,
		validate,
		shouldShowErrorAfterTouch,
		ref,
		...inputProps
	} = props;

	const [isTouched, setIsTouched] = useState(false);
	const isInvalidFinal = useMemo(() => {
		const isInvalidFull = isInvalid || !!error;
		if (shouldShowErrorAfterTouch) {
			return isTouched ? isInvalidFull : false;
		}
		return isInvalidFull;
	}, [isTouched, isInvalid, shouldShowErrorAfterTouch, error]);

	const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (!isTouched) {
			setIsTouched(true);
		}
		if (e.key === "Enter" && onEnter) {
			onEnter();
			e.preventDefault();
		}
	};

	const onBlur = () => {
		if (!isTouched) {
			setIsTouched(true);
		}
	};

	const charsCount = inputProps.value?.toString().length || 0;

	return (
		<TextField
			className="relative flex flex-col"
			validate={validate}
			isInvalid={isInvalidFinal}
		>
			<Label className="label mb-4 text-lg text-neutral-900">
				{label}
			</Label>
			<div className="mb-2">
				<Input
					type="text"
					autoComplete="off"
					onKeyDown={onKeyDown}
					onBlur={onBlur}
					ref={ref}
					{...inputProps}
					className={twMerge(
						"h-20 min-w-[400px] text-6xl font-semibold text-neutral-900 outline-hidden placeholder:text-neutral-400",
						inputProps.className,
					)}
					data-testid={`${inputProps.name || ""}-text-field`}
				/>
			</div>

			<div className="flex h-5 flex-row gap-1">
				{maxLength && charsCount > 0 && (
					<span
						className={`text-sm ${charsCount > maxLength ? "text-error-600 font-semibold" : "text-neutral-700"}`}
						data-testid="length-state"
					>
						{charsCount}/{maxLength}
					</span>
				)}
				<FieldError
					className="text-error-600 text-sm"
					data-testid={`${inputProps.name || ""}-error-msg`}
				>
					{(renderProps) => {
						if (error) return error;
						return renderProps.validationErrors[0];
					}}
				</FieldError>
			</div>

			{charsCount > 0 && (
				<div
					className="absolute -bottom-3 left-0 translate-y-full flex flex-row items-center gap-2 text-sm text-neutral-700"
					data-testid="enter-shortcut"
				>
					Press
					<div className="animate-downOut rounded-sm border border-neutral-600 px-2 py-1 text-sm text-neutral-700">
						↵ Enter
					</div>
					to continue
				</div>
			)}
		</TextField>
	);
}
