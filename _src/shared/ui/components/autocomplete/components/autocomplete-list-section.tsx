import { ReactNode, useContext, useMemo } from "react";
import { Header, ListStateContext } from "react-aria-components";
import { Node } from "react-stately";
import { AutocompleteListOption } from "./autocomplete-list-option";

type AutocompleteListSectionProps<TReutrnData extends object> = {
	item: Node<TReutrnData>;
};

export const AutocompleteListSection = <TReutrnData extends object>(
	props: AutocompleteListSectionProps<TReutrnData>,
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
					className={
						"pl-3 p-2 text-xs text-neutral-500 font-medium border-b border-neutral-100"
					}
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
