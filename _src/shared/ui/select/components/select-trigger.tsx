import { forwardRef } from "react";
import { ArrowDownIcon, WarningIcon } from "../../icon";
import { cva } from "class-variance-authority";
import { Chip } from "../../chip";
import { usePopover } from "../../popover";

export type SelectTriggerProps = {
	selectionMode?: "single" | "multiple";
	placeholder?: string;
	label?: string;
	errorMessage?: string;
	disabled?: boolean;
	isInvalid?: boolean;
	value?: { id: React.Key; textValue?: string }[];
	onUnselect?: (id: React.Key) => void;
	onClearSelection?: () => void;
	onClick?: () => void;
};

const trigger = cva(
	[
		"peer flex flex-row items-center min-h-10 w-full border-2 text-sm rounded-lg box-border transition-colors outline-none px-3",
	],
	{
		variants: {
			hasError: {
				true: ["border-error-500"],
				false: ["border-neutral-100"],
			},
			disabled: {
				true: ["opacity-50"],
				false: [],
			},
		},
		compoundVariants: [
			{
				hasError: false,
				disabled: false,
				className: [
					"hover:border-primary-400",
					"focus:border-2 focus:border-primary-400",
					"focus-visible:border-primary-400 focus-visible:border-2",
				],
			},
		],
	},
);

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
	function (props, ref) {
		const {
			label,
			errorMessage,
			disabled,
			placeholder,
			value,
			selectionMode,
			onClearSelection,
			onUnselect,
			onClick,
		} = props;

		const { isOpened } = usePopover();

		const renderSelectionCount = () => {
			return value?.length ? (
				<Chip
					text={`${value?.length} selected`}
					onClose={onClearSelection}
				/>
			) : null;
		};

		const renderCurrentValue = () => {
			if (!value?.length) {
				return null;
			}
			if (selectionMode === "single") {
				return value[0].textValue || `${value[0].id}`;
			} else {
				return value.map((item, ind) => (
					<Chip
						key={ind}
						text={item.textValue || `${item.id}`}
						disabled={disabled}
						onClose={() => {
							onUnselect && onUnselect(item.id);
						}}
					/>
				));
			}
		};

		const renderArrow = () => {
			return (
				<span
					className={`block text-neutral-200 transition-transform rotate-${isOpened ? 180 : 0}`}
				>
					<ArrowDownIcon size={16} />
				</span>
			);
		};

		const renderPlaceholder = () => {
			return (
				placeholder &&
				(!value || value.length === 0) && (
					<span
						className="flex items-center gap-1 absolute top-0 px-3 h-full text-neutral-200 text-sm font-light transition-all 
							peer-focus-visible:translate-y-full peer-focus-visible:opacity-0"
					>
						<span className="select-none">{placeholder}</span>
					</span>
				)
			);
		};

		const renderError = () => {
			return (
				errorMessage && (
					<span className="w-full text-xs font-normal p-1 text-error-500 flex flex-row items-center gap-1">
						<WarningIcon size={12} thikness="regular" />
						{errorMessage}
					</span>
				)
			);
		};

		return (
			<div
				className="group flex flex-col cursor-pointer w-full aria-disabled:cursor-default"
				aria-disabled={disabled}
			>
				<span
					className="w-full text-xs text-start font-normal p-1 block text-neutral-500
								group-aria-disabled:text-neutral-200"
				>
					{label}
				</span>
				<button
					className="relative w-full flex flex-row items-center"
					disabled={disabled}
					onClick={onClick}
					ref={ref}
				>
					<div
						className={trigger({
							hasError: !!errorMessage,
							disabled: !!disabled,
						})}
					>
						<div className="flex flex-row gap-2 overflow-hidden">
							{selectionMode === "single"
								? renderCurrentValue()
								: renderSelectionCount()}
						</div>
						<div className="ml-auto flex flex-row gap-1 pl-1">
							{renderArrow()}
						</div>
					</div>
					{renderPlaceholder()}
				</button>
				{renderError()}
				{selectionMode === "multiple" ? (
					<div className="flex flex-row flex-wrap px-3 pt-2 gap-2 overflow-hidden">
						{renderCurrentValue()}
					</div>
				) : null}
			</div>
		);
	},
);
