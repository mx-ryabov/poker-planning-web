import { RenderFnType } from "@/_src/shared/lib";

type DropdownMenuSectionProps<TItem> = {
	title?: string;
	children: React.ReactNode | RenderFnType<TItem>;
	items?: TItem[];
	showDivider?: boolean;
};

export function DropdownMenuSection<TItem>({
	children,
	title,
	items,
	showDivider = false,
}: DropdownMenuSectionProps<TItem>) {
	const renderTitle = () => {
		return title ? (
			<div className="text-neutral-500 text-xs font-medium px-3 py-1 scale-100">
				{title}
			</div>
		) : null;
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
		<div className="flex flex-col">
			{renderTitle()}
			{renderContent()}
			{renderDivider()}
		</div>
	);
}
