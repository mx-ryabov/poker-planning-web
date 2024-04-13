import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface Props
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	title: string;
	size: "small" | "medium" | "large";
	disabled: boolean;
	styleType: "default" | "outline" | "ghost" | "grayed-out";
	form: "default" | "square";
}

export default function Button(props: Props) {
	return <button {...props}>{props.title}</button>;
}
