import { ReadViewStyleProps, readViewStyles } from "./styles";

type ReadViewDefaultProps = {
	styles: ReadViewStyleProps;
	value: string;
	fieldType: "input" | "textarea";
	placeholder?: string;
};

export function ReadViewDefault(props: ReadViewDefaultProps) {
	const { styles, value, placeholder, fieldType } = props;

	return (
		<div
			className={readViewStyles({
				...styles,
				compensatedOffset: !!styles.compensatedOffset,
				hasValue: !!value,
				fieldType,
			})}
		>
			{value || placeholder}
		</div>
	);
}
