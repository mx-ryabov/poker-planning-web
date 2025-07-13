import {
	FormEvent,
	FormEventHandler,
	forwardRef,
	useCallback,
	useEffect,
	useRef,
} from "react";
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
import { mergeProps } from "react-aria";

type TextAreaProps = {
	label?: string;
	error?: string;
	withErrorIcon?: boolean;
	placeholder?: string;
	isPending?: boolean;
	maxHeight?: number;
	rows?: number;
} & TextFieldProps;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	function (props, ref) {
		const {
			label,
			error,
			withErrorIcon,
			className,
			isPending,
			maxHeight,
			rows = 4,
			...restProps
		} = props;

		const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

		useEffect(() => {
			const textAreaEl = textAreaRef.current;
			if (!textAreaEl) return;

			textAreaEl.style.height = "auto";
			textAreaEl.style.height = `${textAreaEl.scrollHeight}px`;
		}, [textAreaRef]);

		const onInternalInput: FormEventHandler<HTMLTextAreaElement> =
			useCallback((ev: FormEvent<HTMLTextAreaElement>) => {
				const el = ev.currentTarget;
				el.style.height = "auto";
				el.style.height = `${el.scrollHeight}px`;
			}, []);

		return (
			<TextField
				className="group flex w-full flex-col"
				{...mergeProps(restProps, { onInput: onInternalInput })}
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
							className="h-full w-full overflow-hidden bg-white/0 outline-hidden placeholder:text-neutral-600"
							aria-label="textarea"
							rows={rows}
							ref={setRefs(textAreaRef, ref)}
							style={{
								maxHeight: maxHeight
									? `${maxHeight}px`
									: "inherit",
							}}
						/>
						<div className="absolute top-2 right-2 flex flex-col items-center gap-1">
							{withErrorIcon && (
								<FieldErrorIcon
									errorMsg={error}
									placement="top end"
									size={16}
								/>
							)}
							{isPending && (
								<div className="border-r-primary-500 animate-rotation-linear aspect-square w-4 rounded-full border-2 border-neutral-500" />
							)}
						</div>
					</Group>
				</Label>

				{!withErrorIcon && (
					<FieldError className="text-error-700 flex w-full flex-row items-center gap-1 p-1 text-xs font-medium">
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
					"border-2 border-neutral-300",
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
			true: ["text-neutral-600"],
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
