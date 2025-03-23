import React from "react";
import { SvgProps } from "./types";
import { Color } from "../../colors";

type Props = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLElement>,
	HTMLElement
> & {
	thikness?: "bold" | "regular" | "light";
	color?: Color;
	size?: number;
};

const StrokeWidth = {
	bold: 2.5,
	regular: 1.5,
	light: 1,
};

export type IconType = (props: Props) => React.ReactNode;

export function iconBuilder(
	iconComponent: (svgProps: SvgProps) => React.ReactNode,
	iconName: string,
): IconType {
	return ({
		color,
		size = 24,
		thikness = "regular",
		...restHtmlProps
	}: Props) => {
		const svgProps: SvgProps = {
			color: color,
			width: size,
			height: size,
			strokeWidth: StrokeWidth[thikness],
		};

		return (
			<i
				style={{
					display: "block",
					width: `${svgProps.width}px`,
					height: `${svgProps.height}px`,
				}}
				data-testid={
					(restHtmlProps as any)["data-testid"] || `icon-${iconName}`
				}
				{...restHtmlProps}
			>
				{iconComponent(svgProps)}
			</i>
		);
	};
}
