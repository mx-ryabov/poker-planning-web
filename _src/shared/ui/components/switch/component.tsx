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
				className="group flex flex-row items-center gap-2 cursor-pointer"
				inputRef={inputRef}
				{...checkboxProps}
			>
				<div
					data-testid="switch-container"
					className="block h-[24px] w-[42px] rounded-[24px] bg-neutral-200 relative cursor-pointer transition-all shadow-inner
                group-has-[:checked]:bg-primary-500 group-has-[:checked]:checked-state
                group-has-[:disabled]:bg-neutral-100
				  group-data-[focused=true]:outline group-data-[focused=true]:outline-offset-2 group-data-[focused=true]:outline-primary-500"
				>
					<div
						className="w-[16px] h-[16px] rounded-[16px] bg-white absolute top-1 transition-all translate-x-1 flex items-center justify-center drop-shadow-md
                    group-has-[:checked]:translate-x-[21px]
                    group-active:w-[20px] group-has-[:checked]:group-active:translate-x-[17px]
                    group-has-[:disabled]:bg-neutral-300"
					></div>
				</div>

				<div className="flex flex-col">
					<span className="text-sm text-neutral-900 group-has-[:disabled]:text-neutral-200">
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
