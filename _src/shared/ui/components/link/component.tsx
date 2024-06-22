import { LinkProps, Link as LinkAria } from "react-aria-components";

type Props = LinkProps & {
	children: React.ReactNode;
};

export function Link(props: Props) {
	const { children, ...htmlAnchorProps } = props;
	return (
		<LinkAria
			{...htmlAnchorProps}
			className={`${htmlAnchorProps.className} underline underline-offset-2 decoration-from-font hover:text-primary-500 transition-colors cursor-pointer`}
		>
			{props.children}
		</LinkAria>
	);
}
