import { JSX, RefObject } from "react";
import { AriaListBoxOptions } from "react-aria";
import { ListBox, ListBoxProps } from "react-aria-components";

export type ListProps<TItemData extends object> = ListBoxProps<TItemData> &
	AriaListBoxOptions<TItemData> & {
		ref?: RefObject<HTMLDivElement | null>;
	};

function _ListWrapper(
	props: ListBoxProps<object> &
		AriaListBoxOptions<object> & { ref?: RefObject<HTMLDivElement | null> },
) {
	const { children, className, renderEmptyState, ref, ...restProps } = props;
	const defaultEmptyState = () => (
		<span className="text-sm text-neutral-800">No results found.</span>
	);

	return (
		<ListBox
			{...restProps}
			ref={ref}
			className={className}
			renderEmptyState={renderEmptyState || defaultEmptyState}
		>
			{children}
		</ListBox>
	);
}

export const ListWrapper = _ListWrapper as <TItemData extends object>(
	props: ListProps<TItemData>,
) => JSX.Element;
