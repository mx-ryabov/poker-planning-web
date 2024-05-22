import { List } from "../../list";
import { ListSectionProps } from "../../list/components/list-section";

type Props<TItem> = ListSectionProps<TItem>;

export default function SelectSection<TItem>(props: Props<TItem>) {
	const { children, ...restProps } = props;
	return (
		<List.Section
			{...restProps}
			className={{
				wrapper: "flex flex-col",
				title: "text-neutral-500 text-xs font-medium px-3 py-1 scale-100",
			}}
		>
			{children}
		</List.Section>
	);
}
