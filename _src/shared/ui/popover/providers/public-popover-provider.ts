import { buildProvider } from "@/_src/shared/lib";

type PopoverStateType = {
	isOpened: boolean;
};

const [usePopover, PublicPopoverProvider] = buildProvider<PopoverStateType>();

export { usePopover, PublicPopoverProvider };
