import { Heading, HeadingProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";

type Props = HeadingProps;

export function DrawerHeading({ children, className, ...restProps }: Props) {
	return (
		<Heading
			{...restProps}
			slot="title"
			className={twMerge("text-lg text-neutral-700", className)}
		>
			{children}
		</Heading>
	);
}
