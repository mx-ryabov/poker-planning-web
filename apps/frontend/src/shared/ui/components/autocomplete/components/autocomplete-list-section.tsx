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

	const title: ReactNode = useMemo(() => item.props.title, [item]);
	const listState = useContext(ListStateContext);

	if (listState && !listState.collection.getChildren) {
		return null;
	}

	return (
		<div className="flex flex-col">
			{title && (
				<Header
					className={
						"pl-3 p-2 text-xs text-neutral-900 font-medium border-b border-neutral-200"
					}
				>
					{title}
				</Header>
			)}
			{listState &&
				listState.collection.getChildren &&
				[...listState.collection.getChildren(item.key)].map((node) => {
					if (node.type === "item") {
						return (
							<AutocompleteListOption
								key={node.key}
								item={node}
							/>
						);
					}
					return null;
				})}
		</div>
	);
};
