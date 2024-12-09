import { twMerge } from "tailwind-merge";

type AvatarProps = {
	imgSrc?: string;
	altText: string;
	className?: string;
};

export function Avatar({ altText, className }: AvatarProps) {
	const initials = altText
		.split(" ")
		.map((word) => word[0].toUpperCase())
		.join("")
		.slice(0, 2);
	return (
		<div
			className={twMerge(
				"rounded-full flex justify-center items-center uppercase",
				className,
			)}
			data-testid="avatar"
			aria-label={`Avatar for ${altText}`}
		>
			{initials}
		</div>
	);
}
