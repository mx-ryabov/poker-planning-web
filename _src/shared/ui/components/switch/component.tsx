import { forwardRef, ForwardedRef } from "react";
import { useObjectRef } from "react-aria";
import { Checkbox, CheckboxProps } from "react-aria-components";

type Props = {
	label?: string;
	description?: string;
} & Omit<CheckboxProps, "children">;

export const Switch = forwardRef(
	(props: Props, ref: ForwardedRef<HTMLInputElement>) => {
		const { label, description, ...checkboxProps } = props;
		const inputRef = useObjectRef(ref);
		return (
			<Checkbox
				className="group flex cursor-pointer flex-row items-center gap-2"
				inputRef={inputRef}
				{...checkboxProps}
			>
				<div
					data-testid="switch-container"
					className="group-has-checked:bg-primary-500 group-has-[:checked]:checked-state group-data-[focused=true]:outline-primary-500 relative block h-[24px] min-h-[24px] w-[42px] min-w-[42px] shrink cursor-pointer rounded-[24px] bg-neutral-200 shadow-inner transition-all group-has-disabled:bg-neutral-100 group-data-[focused=true]:outline group-data-[focused=true]:outline-offset-2"
				>
					<div className="absolute top-1 flex h-[16px] w-[16px] translate-x-1 items-center justify-center rounded-[16px] bg-white drop-shadow-md transition-all group-active:w-[20px] group-has-checked:translate-x-[21px] group-active:group-has-checked:translate-x-[17px] group-has-disabled:bg-neutral-300"></div>
				</div>

				<div className="flex flex-col">
					<span className="text-sm text-neutral-900 group-has-disabled:text-neutral-200">
						{label}
					</span>
					<span className="text-xs text-neutral-300">
						{description}
					</span>
				</div>
			</Checkbox>
		);
	},
);
