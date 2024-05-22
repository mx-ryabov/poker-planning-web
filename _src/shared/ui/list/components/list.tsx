import { RenderFnType } from "@/_src/shared/lib";
import { ListProvider } from "../providers/list-provider";
import React, { useCallback, useMemo } from "react";
import { ListItemProps } from "./list-item";

export type ListProps<TItem> = {
	children:
		| React.ReactElement<ListItemProps>[]
		| RenderFnType<TItem, ListItemProps>;
	className?: string;
	items?: TItem[];
	selectionMode?: "single" | "multiple";
	selectedItems?: React.Key[];
	defaultSelectedItems?: React.Key[];
	onSelectionChange?: (itemIds: React.Key[]) => void;
	onAction?: (itemId: React.Key) => void;
};

export default function ListWrapper<TItem>(props: ListProps<TItem>) {
	const {
		children,
		className,
		items,
		selectionMode,
		selectedItems,
		defaultSelectedItems,
		onSelectionChange,
		onAction,
	} = props;

	const renderingItems: React.ReactElement[] = useMemo(() => {
		if (typeof children === "function") {
			if (!items) return [];

			return items.map((item) => children(item));
		} else {
			return children;
		}
	}, [children, items]);

	const onSelectionChangeHandler = useCallback(
		(itemsSet: Set<React.Key>) => {
			onSelectionChange && onSelectionChange(Array.from(itemsSet));
		},
		[onSelectionChange],
	);

	return (
		<ListProvider
			onAction={onAction}
			onSelectionChange={onSelectionChangeHandler}
			selectionMode={selectionMode}
			selectedItems={selectedItems}
			defaultSelectedItems={defaultSelectedItems}
		>
			<div
				className={
					"flex flex-col scale-100 max-h-64 overflow-auto " +
					className
				}
			>
				{renderingItems}
			</div>
		</ListProvider>
	);
}
