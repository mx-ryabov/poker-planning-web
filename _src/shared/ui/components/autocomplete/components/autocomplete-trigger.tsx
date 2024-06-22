import { Key, forwardRef } from "react";
import { Input } from "../../input";

type Props = {
	label?: string;
	placeholder?: string;
	selectionMode: "single" | "multiple";
	itemsWithText?: {
		id: Key;
		textValue: string | undefined;
	}[];
	onChange?: (value: string) => void;
};

export const AutocompleteTrigger = forwardRef<HTMLInputElement, Props>(
	function (props, ref) {
		const { label, placeholder, itemsWithText, onChange } = props;
		console.log(itemsWithText);

		return (
			<div>
				<Input
					ref={ref}
					label={label}
					placeholder={placeholder}
					onChange={(e) =>
						onChange && onChange(e.currentTarget.value)
					}
				/>
			</div>
		);
	},
);
