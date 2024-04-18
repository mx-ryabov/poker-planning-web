import React from "react";
import { SvgProps } from "./types";
import { Color } from "../colors";

interface Props {
	thikness?: "regular" | "light";
	color?: Color;
	size?: number;
}

export type IconType = (props: Props) => React.ReactNode;

export function iconBuilder(
	iconComponent: (svgProps: SvgProps) => React.ReactNode,
): IconType {
	return ({ color, size = 24, thikness = "regular" }) => {
		const svgProps: SvgProps = {
			color: color,
			width: size,
			height: size,
			strokeWidth: thikness === "regular" ? 1.5 : 1,
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
