import { cva } from "class-variance-authority";
import {
	SeparatorProps,
	Separator as AriaSeparator,
} from "react-aria-components";

const separatorStyles = cva(["bg-neutral-100 content-none"], {
	variants: {
		orientation: {
			vertical: ["h-full w-[1px] mx-1"],
			horizontal: ["w-full h-[1px] my-1"],
		},
	},
});

function Separator(props: SeparatorProps) {
	const { orientation = "horizontal" } = props;
	return (
		<AriaSeparator
			{...props}
			orientation={orientation}
			className={separatorStyles({ orientation })}
		/>
	);
}

Separator.getCollectionNode = function* getCollectionNode(
	props: SeparatorProps,
): Generator {
	yield {
		type: "separator",
		props: props,
		rendered: <Separator {...props} />,
		textValue: undefined,
		"aria-label": props["aria-label"],
		hasChildNodes: false,
	};
};

const _Separator = Separator as (props: SeparatorProps) => JSX.Element;

export { _Separator as Separator };
