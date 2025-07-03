import { ReactElement, useCallback, useId, useMemo, useRef } from "react";
import { AriaListBoxProps, Key, useField, useOverlayTrigger } from "react-aria";
import { SelectionMode } from "react-aria-components";
import { ListState, useOverlayTriggerState } from "react-stately";
import { List } from "../../list";
import { SadManIcon } from "../../icon";
import { ListProps } from "../../list/components/list";
import { Separator } from "../../separator";

export type UseSelectProps<TItemData extends object> = {
	items?: Iterable<TItemData>;
	selectionMode?: Exclude<SelectionMode, "none">;
} & AriaListBoxProps<TItemData>;

export function useSelect<TItemData extends object>(
	props: UseSelectProps<TItemData>,
	listState: ListState<TItemData>,
) {
	const { selectionMode = "single", children, items, ...restProps } = props;
	const triggerRef = useRef(null);
	const listRef = useRef(null);

	const overlayTriggerState = useOverlayTriggerState({});
	const { triggerProps, overlayProps } = useOverlayTrigger(
		{ type: "menu" },
		overlayTriggerState,
		triggerRef,
	);

	const { labelProps, errorMessageProps, fieldProps } = useField(restProps);

	const onSelectionChange = useCallback(
		(keys: Iterable<Key>) => {
			listState.selectionManager.setSelectedKeys(keys);
			if (selectionMode === "single") {
				overlayTriggerState.close();
			}
		},
		[
			listState.selectionManager.setSelectedKeys,
			selectionMode,
			overlayTriggerState.close,
		],
	);

	const renderEmptyState = useCallback(
		() => (
			<div className="flex flex-row items-center gap-2 px-2 py-1 text-sm text-neutral-900">
				<SadManIcon size={16} />
				The list is empty.
			</div>
		),
		[],
	);

	const listProps: ListProps<TItemData> = {
		...restProps,
		ref: listRef,
		items,
		selectionMode,
		selectedKeys: listState.selectionManager.selectedKeys,
		renderEmptyState,
		onSelectionChange,
	};

	const childRenderer = useMemo(
		() =>
			[...listState.collection].map((item) => {
				const getChildren = listState.collection.getChildren?.bind(
					listState.collection,
				);
				if (item.type === "section" && getChildren) {
					return (
						<List.Section key={item.key} title={item.props.title}>
							{[...getChildren(item.key)].map((node) => {
								if (node.type === "item") {
									return (
										<List.Item
											key={node.key}
											id={node.key}
											{...node.props}
										>
											{node.rendered}
										</List.Item>
									);
								}
								return null;
							})}
						</List.Section>
					);
				}
				if (item.type === "item") {
					return (
						<List.Item key={item.key} id={item.key} {...item.props}>
							{item.rendered}
						</List.Item>
					);
				}
				if (item.type === "separator") {
					return <Separator key={item.key} {...item.props} />;
				}
				return null;
			}),
		[listState.collection],
	);

	triggerProps.id = useId();
	Object.assign(overlayProps, { "aria-labelledby": triggerProps.id });

	return {
		listProps,
		fieldProps,
		childRenderer,
		labelProps,
		errorMessageProps,
		triggerProps,
		overlayProps,
		triggerRef,
		overlayTriggerState,
	};
}
