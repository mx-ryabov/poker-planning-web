import { AriaMenuProps } from "react-aria";
import {
	MenuTrigger,
	Popover,
	PopoverProps,
	SubmenuTrigger,
	Menu as AriaMenu,
	MenuItem as AriaMenuItem,
	MenuSection as AriaMenuSection,
	MenuSectionProps as AriaMenuSectionProps,
	MenuItemProps,
	composeRenderProps,
	Separator,
	Header,
	Collection,
} from "react-aria-components";
import { ArrowRightSimpleIcon, CheckIcon } from "../icon";
import { listItemStyles } from "../list/components/list-item";
import { twMerge } from "tailwind-merge";

type MenuContentProps<T> = AriaMenuProps<T> & Pick<PopoverProps, "placement">;

export function MenuContent<TDataItem extends object>(
	props: MenuContentProps<TDataItem>,
) {
	return (
		<Popover
			placement={props.placement}
			className="min-w-[150px] data-entering:animate-popup data-exiting:animate-popup-reverse"
		>
			<AriaMenu
				{...props}
				className="py-2 px-1 max-w-[180px] bg-white rounded-lg border border-neutral-100 drop-shadow-sm outline outline-0 max-h-[inherit] overflow-auto no-scrollbar"
			/>
		</Popover>
	);
}

type MenuSectionProps<TItemData extends object> =
	AriaMenuSectionProps<TItemData> & {
		title?: string;
		className?: Partial<Record<"wrapper" | "title", string>>;
	};

export function MenuSection<TItemData extends object>(
	props: MenuSectionProps<TItemData>,
) {
	const { children, title, className, ...restProps } = props;

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
		<AriaMenuSection {...restProps}>
			{title && (
				<Header
					className={twMerge(
						"px-2 py-1 text-xs text-neutral-500 font-medium",
						className?.title,
					)}
				>
					{title}
				</Header>
			)}
			{renderItems()}
		</AriaMenuSection>
	);
}

export function MenuItem(props: MenuItemProps) {
	return (
		<AriaMenuItem
			{...props}
			className={(renderProps) =>
				listItemStyles({
					...renderProps,
					isFocused: renderProps.isFocusVisible,
				})
			}
		>
			{composeRenderProps(
				props.children,
				(children, { selectionMode, isSelected, hasSubmenu }) => (
					<>
						{children}
						{selectionMode !== "none" && (
							<span className="flex items-center w-4 ml-auto">
								{isSelected && <CheckIcon size={20} />}
							</span>
						)}
						{hasSubmenu && <ArrowRightSimpleIcon size={20} />}
					</>
				),
			)}
		</AriaMenuItem>
	);
}

const _Menu = Object.assign(MenuTrigger, {
	Content: MenuContent,
	Item: MenuItem,
	Section: MenuSection,
	Separator,
	SubmenuTrigger,
});

export { _Menu as Menu };
