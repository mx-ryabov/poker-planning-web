import { ReadViewStyleProps, readViewStyles } from "./styles";

type ReadViewDefaultProps = {
	styles: ReadViewStyleProps;
	value: string;
	fieldType: "input" | "textarea";
	isDisabled?: boolean;
	placeholder?: string;
};

export function ReadViewDefault(props: ReadViewDefaultProps) {
	const { styles, value, placeholder, isDisabled, fieldType } = props;

	return (
		<div
			className={readViewStyles({
				...styles,
				variant: styles.variant || "ghost",
				compensatedOffset: !!styles.compensatedOffset,
				hasValue: !!value,
				fieldType,
				isDisabled,
			})}
			style={{
				maxHeight: styles.maxHeight
					? `${styles.maxHeight}px`
					: "inherit",
			}}
		>
			{value || placeholder}
		</div>
	);
}
