import { StringHelper } from "@/src/shared/lib/utils/string-helper";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { Color } from "../../colors";

type AvatarProps = {
	imgSrc?: string;
	altText: string;
	className?: string;
	online?: boolean;
};

export function Avatar({ altText, className, online }: AvatarProps) {
	const ref = useRef<HTMLDivElement | null>(null);
	const initials = StringHelper.getFirstLetters(altText, 2).toUpperCase();

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		el.style.backgroundColor = letterToColor(initials, true);
		el.style.color = letterToColor(initials, false);
	}, [ref, initials]);

	return (
		<div
			className={twMerge(
				"relative rounded-full flex justify-center items-center uppercase text-white",
				className,
			)}
			ref={ref}
			data-testid="avatar"
			aria-label={`Avatar for ${altText}`}
			role="img"
		>
			{initials}
			{online && (
				<div
					className="absolute w-3 h-3 border-2 border-white rounded-full bg-success-500 left-[70%] top-[70%]"
					data-testid="online-badge"
				></div>
			)}
		</div>
	);
}
function letterToColor(letter: string, isBG: boolean) {
	if (letter.charCodeAt(0) % 2) {
		if (isBG) {
			return Color.Error100;
		}
		return Color.Error500;
	}
	if (letter.charCodeAt(0) % 3) {
		if (isBG) {
			return Color.Info100;
		}
		return Color.Info500;
	}
	if (letter.charCodeAt(0) % 5) {
		if (isBG) {
			return Color.Warning100;
		}
		return Color.Warning500;
	}
	if (letter.charCodeAt(0) % 7) {
		if (isBG) {
			return Color.Primary100;
		}
		return Color.Primary500;
	}
	if (isBG) {
		return Color.Neutral100;
	}
	return Color.Neutral500;
}
