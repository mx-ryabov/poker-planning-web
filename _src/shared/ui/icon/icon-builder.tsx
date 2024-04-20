import React from "react";
import { SvgProps } from "./types";
import { Color } from "../colors";

interface Props
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLElement>,
		HTMLElement
	> {
	thikness?: "bold" | "regular" | "light";
	color?: Color;
	size?: number;
}

const StrokeWidth = {
	bold: 2.5,
	regular: 1.5,
	light: 1,
};

export type IconType = (props: Props) => React.ReactNode;

export function iconBuilder(
	iconComponent: (svgProps: SvgProps) => React.ReactNode,
): IconType {
	return ({ color, size = 24, thikness = "regular" }) => {
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
			>
				{iconComponent(svgProps)}
			</i>
		);
	};
}
