import { List } from "../../list";
import { ListSectionProps } from "../../list/components/list-section";

export type AutocompleteSectionProps<TItem> = ListSectionProps<TItem>;

function AutocompleteSection<TItem>(props: AutocompleteSectionProps<TItem>) {
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

const _AutocompleteSection = Object.assign(AutocompleteSection, {
	__collectionType__: "section",
});
export { _AutocompleteSection as AutocompleteSection };
