import { RenderFnType } from "@/_src/shared/lib";
import { List } from "../../list";

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
	return (
		<List.Section
			title={title}
			items={items}
			showDivider={showDivider}
			className={{
				wrapper: "flex flex-col",
				title: "text-neutral-500 text-xs font-medium px-3 py-1 scale-100",
			}}
		>
			{children}
		</List.Section>
	);
}
