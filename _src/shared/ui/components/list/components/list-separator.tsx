import { cva } from "class-variance-authority";
import { useSeparator } from "react-aria";
import { SeparatorProps, Separator } from "react-aria-components";

const separatorStyles = cva(["bg-neutral-100"], {
	variants: {
		orientation: {
			vertical: ["h-full w-[1px] mx-1"],
			horizontal: ["w-full h-[1px] my-1"],
		},
	},
});

function ListSeparator(props: SeparatorProps) {
	const { orientation = "horizontal" } = props;
	const { separatorProps } = useSeparator(props);
	return (
		<Separator
			{...separatorProps}
			className={separatorStyles({ orientation })}
		/>
	);
}

ListSeparator.getCollectionNode = function* getCollectionNode(
	props: SeparatorProps,
): Generator {
	yield {
		type: "separator",
		props: props,
		rendered: <ListSeparator {...props} />,
		textValue: undefined,
		"aria-label": props["aria-label"],
		hasChildNodes: false,
	};
};

const _ListSeparator = ListSeparator as (props: SeparatorProps) => JSX.Element;

export { _ListSeparator as ListSeparator };
