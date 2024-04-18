import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";

interface Props
	extends DetailedHTMLProps<
		AnchorHTMLAttributes<HTMLAnchorElement>,
		HTMLAnchorElement
	> {
	children: React.ReactNode;
}

export function Link(props: Props) {
	const { children, ...htmlAnchorProps } = props;
	return (
		<a
			{...htmlAnchorProps}
			className={`${htmlAnchorProps.className} underline underline-offset-2 decoration-from-font hover:text-primary-500 transition-colors cursor-pointer`}
		>
			{props.children}
		</a>
	);
}
