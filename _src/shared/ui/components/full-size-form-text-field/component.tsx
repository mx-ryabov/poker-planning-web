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
				className="flex flex-col relative"
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
							"min-w-[400px] h-20 text-6xl outline-hidden font-semibold text-neutral-500 placeholder:text-neutral-200",
							inputProps.className,
						)}
					/>
				</div>

				<div className="flex flex-row gap-1 h-5">
					{maxLength && charsCount > 0 && (
						<span
							className={`text-sm ${charsCount > maxLength ? "text-error-600 font-semibold" : "text-neutral-300"}`}
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
						className="absolute left-0 -bottom-3 translate-y-full"
						data-testid="enter-shortcut"
					>
						<div className="py-1 px-2 border border-neutral-200 rounded-sm text-sm text-neutral-300 animate-downOut">
							↵ Enter
						</div>
					</div>
				)}
			</label>
		);
	},
);
