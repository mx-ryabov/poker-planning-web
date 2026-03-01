import { DrawerModal } from "./components/drawer-content";
import { DrawerModalWithSeparator } from "./components/drawer-content-with-separator";
import { DrawerHeading } from "./components/drawer-heading";
import { DrawerTrigger } from "./components/drawer-trigger";

export const Drawer = Object.assign(
	{},
	{
		Modal: DrawerModal,
		ModalWithSeparator: DrawerModalWithSeparator,
		Trigger: DrawerTrigger,
		Heading: DrawerHeading,
	},
);
