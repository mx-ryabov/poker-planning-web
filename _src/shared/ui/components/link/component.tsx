import { LinkProps, Link as LinkAria } from "react-aria-components";
import { twMerge } from "tailwind-merge";

type Props = LinkProps & {
	children: React.ReactNode;
};

export function Link(props: Props) {
	const { children, className, ...htmlAnchorProps } = props;
	return (
		<LinkAria
			{...htmlAnchorProps}
			className={(renderProps) =>
				twMerge(
					"underline underline-offset-2 decoration-from-font hover:text-primary-500 transition-colors cursor-pointer outline-none",
					typeof className === "function"
						? className(renderProps)
						: className,
				)
			}
		>
			{props.children}
		</LinkAria>
	);
}
