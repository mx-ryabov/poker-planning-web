import { buildProvider } from "@/_src/shared/lib";

type PopoverStateType = {
	isOpened: boolean;
	close: () => void;
};

const [usePopover, PublicPopoverProvider] = buildProvider<PopoverStateType>();

export { usePopover, PublicPopoverProvider };
