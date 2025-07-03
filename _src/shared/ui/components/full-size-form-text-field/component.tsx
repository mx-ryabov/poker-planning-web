"use client";
import {
	useCallback,
	KeyboardEvent,
	InputHTMLAttributes,
	forwardRef,
	ForwardedRef,
	useMemo,
} from "react";
import { twMerge } from "tailwind-merge";

type Props = InputHTMLAttributes<HTMLInputElement> & {
	label: string;
	error?: string;
	onEnter?: () => void;
};

export const FullSizeFormTextInput = forwardRef(
	(props: Props, ref: ForwardedRef<HTMLInputElement>) => {
		const { onEnter, maxLength, error, label, ...inputProps } = props;

		const onKeyDown = useCallback(
			(e: KeyboardEvent<HTMLInputElement>) => {
				if (e.key === "Enter" && onEnter) {
					onEnter();
					e.preventDefault();
				}
			},
			[onEnter],
		);

		const charsCount = useMemo(
			() => inputProps.value?.toString().length || 0,
			[inputProps.value],
		);

		return (
			<label
				className="relative flex flex-col"
				data-testid={`${inputProps.name || ""}-text-field-container`}
			>
				<span className="label mb-4 text-lg text-neutral-900">
					{label}
				</span>
				<div className="mb-2">
					<input
						type="text"
						autoComplete="off"
						onKeyDown={onKeyDown}
						ref={ref}
						{...inputProps}
						className={twMerge(
							"h-20 min-w-[400px] text-6xl font-semibold text-neutral-900 outline-hidden placeholder:text-neutral-400",
							inputProps.className,
						)}
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
					<span
						className="text-error-600 text-sm"
						data-testid="error-msg"
					>
						{error}
					</span>
				</div>

				{charsCount > 0 && (
					<div
						className="absolute -bottom-3 left-0 translate-y-full"
						data-testid="enter-shortcut"
					>
						<div className="animate-downOut rounded-sm border border-neutral-600 px-2 py-1 text-sm text-neutral-700">
							↵ Enter
						</div>
					</div>
				)}
			</label>
		);
	},
);
