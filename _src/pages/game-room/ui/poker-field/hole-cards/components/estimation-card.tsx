import { cva } from "class-variance-authority";

type Props = {
	rank: string;
	suit: string;
	isSelected: boolean;
	isHovered: boolean;
	isFocusVisible: boolean;
};
export function EstimationCard(props: Props) {
	const { rank, suit, isSelected, isHovered, isFocusVisible } = props;
	return (
		<div className={styles({ isSelected, isHovered, isFocusVisible })}>
			<div className="absolute top-1 left-1 w-14">{rank}</div>
			<div className="absolute top-1/2 left-1/2 -translate-1/2">
				{suit}
			</div>
			<div className="absolute right-1 bottom-1">{rank}</div>
		</div>
	);
}

const styles = cva(
	[
		"h-19 w-15 relative",
		"rounded-lg border-2 border-neutral-100",
		"text-base text-neutral-500",
		"cursor-pointer transition-all",
	],
	{
		variants: {
			isSelected: {
				true: "-translate-y-2 border-primary-500",
				false: "",
			},
			isHovered: {
				true: "border-primary-300 -translate-y-1",
				false: "",
			},
			isFocusVisible: {
				true: "border-primary-300 -translate-y-1",
				false: "",
			},
		},
	},
);
