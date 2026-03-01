import { radioStyles } from "./radio-group";

type Props = {
	count: number;
	size?: "default" | "large";
	variant?: "default" | "content-inside";
};

export function RadioGroupSkeleton({
	count = 2,
	size = "default",
	variant = "default",
}: Props) {
	return (
		<div className="flex flex-col">
			{Array.from(Array(count).keys()).map((ind) => (
				<div
					key={ind}
					className={radioStyles({
						isSelected: false,
						isFocused: false,
						isHovered: false,
						variant,
						size,
						isSkeleton: true,
					})}
					style={{
						minWidth: `${300 + ind * 50}px`,
					}}
				></div>
			))}
		</div>
	);
}
