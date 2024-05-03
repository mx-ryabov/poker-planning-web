import { ChangeEventHandler } from "react";
import { Popover } from "../../popover";

type Props = {
	children: React.ReactNode[];
	selectionMode?: "single" | "multiple";
	placeholder?: string;
	label?: string;
	errorMessage?: string;
	disabled?: boolean;
	isInvalid?: boolean;
	onChange?: ChangeEventHandler<HTMLSelectElement>;
};

export default function SelectWrapper(props: Props) {
	const { children, onChange } = props;

	return (
		<div>
			<select onChange={onChange} className="hidden"></select>
			<Popover>
				<Popover.Trigger>
					<div>Selector</div>
				</Popover.Trigger>
				<Popover.Content>{children}</Popover.Content>
			</Popover>
		</div>
	);
}
