import { ReactNode, useContext, useMemo } from "react";
import { Header, ListStateContext } from "react-aria-components";
import { Node } from "react-stately";
import { AutocompleteListOption } from "./autocomplete-list-option";

type AutocompleteListSectionProps<TItemData extends object> = {
	item: Node<TItemData>;
};

export const AutocompleteListSection = <TItemData extends object>(
	props: AutocompleteListSectionProps<TItemData>,
) => {
	const { item } = props;
	const listState = useContext(ListStateContext);

	if (!listState.collection.getChildren) {
		return null;
	}

	const title: ReactNode = useMemo(() => item.props.title, [item]);

	return (
		<div className="flex flex-col">
			{title && (
				<Header
					className={"pl-3 p-1 text-xs text-neutral-500 font-medium"}
				>
					{title}
				</Header>
			)}
			{[...listState.collection.getChildren(item.key)].map((node) => {
				if (node.type === "item") {
					return (
						<AutocompleteListOption key={node.key} item={node} />
					);
				}
				return null;
			})}
		</div>
	);
};
