import { AriaMenuProps } from "react-aria";
import {
	MenuTrigger,
	Popover,
	PopoverProps,
	SubmenuTrigger,
	Menu as AriaMenu,
	MenuItem as AriaMenuItem,
	MenuItemProps,
	composeRenderProps,
	Separator,
} from "react-aria-components";
import { ArrowRightSimpleIcon, CheckIcon } from "../icon";
import { List } from "../list";
import { ListSectionProps } from "../list/components/list-section";
import { listItemStyles } from "../list/components/list-item";

type MenuContentProps<T> = AriaMenuProps<T> & Pick<PopoverProps, "placement">;

export function MenuContent<TDataItem extends object>(
	props: MenuContentProps<TDataItem>,
) {
	return (
		<Popover
			placement={props.placement}
			className="min-w-[150px] data-[entering]:animate-popup data-[exiting]:animate-popup-reverse"
		>
			<AriaMenu
				{...props}
				className="py-2 px-1 max-w-[180px] bg-white rounded-lg border border-neutral-100 drop-shadow outline outline-0 max-h-[inherit] overflow-auto no-scrollbar"
			/>
		</Popover>
	);
}

export function MenuSection<TItemData extends object>(
	props: ListSectionProps<TItemData>,
) {
	return <List.Section {...props} />;
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
						{selectionMode !== "none" && (
							<span className="flex items-center w-4">
								{isSelected && <CheckIcon size={20} />}
							</span>
						)}
						{children}
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
