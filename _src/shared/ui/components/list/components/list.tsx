import { ForwardedRef, forwardRef, JSX } from "react";
import { AriaListBoxOptions } from "react-aria";
import { ListBox, ListBoxProps } from "react-aria-components";

export const ListWrapper = forwardRef<
	HTMLDivElement,
	ListBoxProps<object> & AriaListBoxOptions<object>
>(({ children, className, renderEmptyState, ...restProps }, ref) => {
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
}) as unknown as <TItemData extends object>(
	props: ListProps<TItemData>,
) => JSX.Element;

export type ListProps<TItemData extends object> = ListBoxProps<TItemData> &
	AriaListBoxOptions<TItemData> & {
		ref?: ForwardedRef<HTMLDivElement>;
	};
