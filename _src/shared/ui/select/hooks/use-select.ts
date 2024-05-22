import { RenderFnType, useControlledState } from "@/_src/shared/lib";
import { useMemo } from "react";
import { SelectItemProps } from "../components/select-item";

type Props<TItem> = {
	children:
		| React.ReactElement<SelectItemProps>[]
		| RenderFnType<TItem, SelectItemProps>;
	items?: TItem[];
	selectedItems?: React.Key[];
	defaultSelectedItems?: React.Key[];
	onSelectionChange?: (ids: React.Key[]) => void;
};

export function useSelect<TItem>(props: Props<TItem>) {
	const {
		children,
		items,
		selectedItems,
		defaultSelectedItems,
		onSelectionChange,
	} = props;

	const [controlledSelectedIds, onControlledSelectionChange] =
		useControlledState(
			selectedItems,
			defaultSelectedItems || [],
			onSelectionChange,
		);

	const itemsCollection = useMemo(() => {
		if (typeof children === "function") {
			if (!items?.length)
				return new Map<
					React.Key,
					React.ReactElement<SelectItemProps>
				>();

			return items.reduce((result, item) => {
				const renderedItem = children(item);
				return result.set(renderedItem.props.id, renderedItem);
			}, new Map<React.Key, React.ReactElement<SelectItemProps>>());
		}
		return children.reduce((result, item) => {
			return result.set(item.props.id, item);
		}, new Map<React.Key, React.ReactElement<SelectItemProps>>());
	}, [children, items]);

	const itemsWithText = useMemo(() => {
		return controlledSelectedIds.map((id) => {
			const item = itemsCollection.get(id);
			return { id, textValue: item?.props.textValue };
		});
	}, [controlledSelectedIds, itemsCollection]);

	return {
		itemsWithText,
		controlledSelectedIds,
		onControlledSelectionChange,
	};
}
