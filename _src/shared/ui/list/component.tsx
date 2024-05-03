import { DetailedHTMLProps, HTMLAttributes, useState } from "react";

type ListItemHTMLElementProps = DetailedHTMLProps<
	HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
>;

export type ListItemProps = {
	children: React.ReactElement;
} & ListItemHTMLElementProps;

export function ListItem({ children, ...divProps }: ListItemProps) {
	return <div {...divProps}>{children}</div>;
}

type ListHTMLElementProps = DetailedHTMLProps<
	HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
>;

export type ListProps = {
	children: JSX.Element[];
	//items: ListDataItem[];
} & ListHTMLElementProps;

export function List({ children, ...divProps }: ListProps) {
	return <div {...divProps}>{children}</div>;
}

export type ListOptions<TData> = {
	initialItems: TData[];
	getKey: (item: TData) => string | number;
};

export type ListData<TData> = {
	items: TData[];
};

export function useListData<TData>(
	options: ListOptions<TData>,
): ListData<TData> {
	const [items, setItems] = useState(options.initialItems);

	return {
		items: items,
	};
}
