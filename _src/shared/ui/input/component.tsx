import {
	ChangeEvent,
	DetailedHTMLProps,
	InputHTMLAttributes,
	useCallback,
	useState,
} from "react";
import { IconType } from "../icon/icon-builder";
import { WarningIcon } from "../icon";
import { cva } from "class-variance-authority";

type HtmlInputProps = DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

type InputProps = {
	type?: "text" | "number";
	label?: string;
	placeholderIcon?: IconType;
	errors?: string[];
};

type Props = HtmlInputProps & InputProps;

const input = cva(
	[
		"peer h-10 w-full border-2 text-sm rounded-lg box-border transition-colors outline-none px-3",
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

export function Input(props: Props) {
	const {
		label,
		placeholderIcon,
		placeholder,
		errors,
		onChange,
		type = "text",
		...htmlAnchorProps
	} = props;

	const [isFilled, setIsFilled] = useState(
		!!htmlAnchorProps.value || !!htmlAnchorProps.defaultValue,
	);

	const onChangeHandler = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			setIsFilled(event.currentTarget.value !== "");

			onChange && onChange(event);
		},
		[onChange],
	);

	return (
		<label className="group flex flex-col w-full">
			<span className="w-full text-xs font-normal p-1 block text-neutral-500">
				{label}
			</span>
			<div className="relative w-full overflow-hidden">
				<input
					{...htmlAnchorProps}
					className={input({ hasError: !!errors?.length })}
					type={type}
					onChange={onChangeHandler}
				/>
				{placeholder && !isFilled && (
					<span
						className="flex items-center gap-1 absolute top-0 px-3 h-full w-full text-neutral-200 text-sm font-light cursor-text transition-all 
									peer-focus-visible:translate-y-full peer-focus-visible:opacity-0"
					>
						{placeholderIcon &&
							placeholderIcon({ size: 12, thikness: "regular" })}
						<span className="select-none">{placeholder}</span>
					</span>
				)}
			</div>
			{errors && (
				<span className="w-full text-xs font-normal p-1 text-error-500 flex flex-row items-center gap-1">
					<WarningIcon size={12} thikness="regular" />
					{errors.length ? errors[0] : null}
				</span>
			)}
		</label>
	);
}
