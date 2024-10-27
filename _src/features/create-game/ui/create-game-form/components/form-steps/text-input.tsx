import {
	useCallback,
	KeyboardEvent,
	InputHTMLAttributes,
	forwardRef,
	ForwardedRef,
} from "react";
import { twMerge } from "tailwind-merge";

type Props = InputHTMLAttributes<HTMLInputElement> & {
	label: string;
	lengthState?: {
		current: number;
		total: number;
	};
	error?: string;
	onEnter: () => void;
};

const _TextInput = (props: Props, ref: ForwardedRef<HTMLInputElement>) => {
	const { onEnter, lengthState, error, label, ...inputProps } = props;

	const onKeyDown = useCallback(
		(e: KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Enter") {
				onEnter();
				e.preventDefault();
			}
		},
		[onEnter],
	);

	return (
		<label className="flex flex-col relative">
			<span className="label mb-4 text-lg text-neutral-900">{label}</span>
			<div className="mb-2">
				<input
					type="text"
					autoComplete="off"
					onKeyDown={onKeyDown}
					ref={ref}
					{...inputProps}
					className={twMerge(
						"min-w-[400px] h-20 text-6xl outline-none font-semibold text-neutral-500 placeholder:text-neutral-200",
						inputProps.className,
					)}
				/>
			</div>

			<div className="flex flex-row gap-1 h-5">
				{lengthState && (
					<span
						className={`text-sm ${lengthState.current > lengthState.total ? "text-error-600 font-semibold" : "text-neutral-300"}`}
					>
						{lengthState.current}/{lengthState.total}
					</span>
				)}
				<span className="text-error-600 text-sm">{error}</span>
			</div>

			{lengthState && lengthState.current > 0 && (
				<div className="absolute left-0 -bottom-3 translate-y-full">
					<div className="py-1 px-2 border border-neutral-200 rounded text-sm text-neutral-300 animate-downOut">
						↵ Enter
					</div>
				</div>
			)}
		</label>
	);
};

export const TextInput = forwardRef(_TextInput);
