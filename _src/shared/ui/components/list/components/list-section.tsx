import {
	Collection,
	Header,
	Section,
	SectionProps,
} from "react-aria-components";

export type ListSectionProps<TItemData> = {
	title?: string;
	className?: Partial<Record<"wrapper" | "title", string>>;
} & Omit<SectionProps<TItemData>, "className">;

export function ListSection<TItemData extends object>(
	props: ListSectionProps<TItemData>,
) {
	const { title, children, className, ...restProps } = props;

	const renderItems = () => {
		if (typeof children === "function" && !!restProps.items) {
			return (
				<Collection items={restProps.items}>
					{(item) => children(item)}
				</Collection>
			);
		}
		if (typeof children !== "function") {
			return children;
		}
		return null;
	};

	return (
		<Section {...restProps} className={className?.wrapper}>
			{title && (
				<Header
					className={`${DEFAULT_HEADER_CLASSNAME} ${className?.title || ""}`}
				>
					{title}
				</Header>
			)}
			{renderItems()}
		</Section>
	);
}

const DEFAULT_HEADER_CLASSNAME =
	"pl-3 p-1 text-xs text-neutral-500 font-medium";
