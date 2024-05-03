import { FC, HTMLAttributeAnchorTarget, useCallback } from "react";
import { IconType } from "../../icon/icon-builder";
import { usePopover } from "../../popover";
import { useDropdownMenuAction } from "../providers/dropdown-provider";

type DropdownMenuItemProps = {
	icon?: IconType;
	id: string | number;
	key: React.Key;
	textValue: string;
	href?: string;
	target?: HTMLAttributeAnchorTarget;
	disabled?: boolean;
};

export const DropdownMenuItem: FC<DropdownMenuItemProps> = ({
	icon,
	textValue,
	disabled,
	id,
	...itemElementProps
}) => {
	const { close } = usePopover();
	const { onSelected } = useDropdownMenuAction();

	const ElementType: React.ElementType = itemElementProps.href ? "a" : "div";

	const onSelect = useCallback(() => {
		if (disabled) return;

		onSelected && onSelected(id);
		close();
	}, [close, id, disabled]);

	return (
		<ElementType
			className="flex flex-row pl-3 pr-5 py-2 items-center cursor-pointer transition-colors gap-2
						text-neutral-500 text-sm font-normal
						hover:bg-neutral-100
						active:bg-neutral-200
						aria-disabled:text-neutral-200 aria-disabled:hover:bg-white aria-disabled:cursor-default"
			onClick={onSelect}
			aria-disabled={disabled}
			{...itemElementProps}
		>
			{icon && icon({ size: 20 })}
			<span className="scale-100">{textValue}</span>
		</ElementType>
	);
};
