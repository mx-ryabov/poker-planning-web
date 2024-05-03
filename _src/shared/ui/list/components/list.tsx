import { RenderFnType } from "@/_src/shared/lib";
import { ListProvider } from "../providers/list-provider";

export type ListProps<TItem> = {
	children: React.ReactNode | RenderFnType<TItem>;
	className?: string;
	items?: TItem[];
	onAction?: (itemId: string | number) => void;
};

export default function List<TItem>(props: ListProps<TItem>) {
	const { children, className, items, onAction } = props;

	const renderContent = () => {
		if (typeof children === "function") {
			if (!items) return null;

			return items.map((item) => children(item));
		} else {
			return children;
		}
	};

	return (
		<ListProvider onAction={onAction}>
			<div className={"flex flex-col " + className}>
				{renderContent()}
			</div>
		</ListProvider>
	);
}
