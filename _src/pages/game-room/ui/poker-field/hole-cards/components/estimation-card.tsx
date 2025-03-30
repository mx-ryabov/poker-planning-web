import { cva } from "class-variance-authority";

type Props = {
	rank: string;
	suit: string;
	isActive: boolean;
};
export function EstimationCard(props: Props) {
	const { rank, suit, isActive } = props;
	return (
		<div className={styles({ isActive })}>
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
		"rounded-lg border border-neutral-100",
		"hover:border-primary-300 hover:-translate-y-1",
		"text-base text-neutral-500",
		"cursor-pointer transition-all",
	],
	{
		variants: {
			isActive: {
				true: "",
				false: "",
			},
		},
	},
);
