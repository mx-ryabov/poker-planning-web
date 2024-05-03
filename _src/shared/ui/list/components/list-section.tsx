import { RenderFnType } from "@/_src/shared/lib";

export type ListSectionProps<TItem> = {
	title?: string;
	children: React.ReactNode | RenderFnType<TItem>;
	className?: Partial<Record<"wrapper" | "title", string>>;
	items?: TItem[];
	showDivider?: boolean;
};

export default function ListSection<TItem>(props: ListSectionProps<TItem>) {
	const { children, className, items, title, showDivider = false } = props;

	const renderTitle = () => {
		return title ? <div className={className?.title}>{title}</div> : null;
	};

	const renderContent = () => {
		if (typeof children === "function") {
			if (!items) return null;

			return items.map((item) => children(item));
		} else {
			return children;
		}
	};

	const renderDivider = () => {
		return showDivider ? (
			<div className="w-full h-[1px] bg-neutral-100 my-[2px]"></div>
		) : null;
	};

	return (
		<div className={"flex flex-col " + className?.wrapper}>
			{renderTitle()}
			{renderContent()}
			{renderDivider()}
		</div>
	);
}
