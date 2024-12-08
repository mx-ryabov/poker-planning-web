import type { IconType } from "@/_src/shared/ui/components/icon";

export type ParticipantMenuOption = {
	title: string;
	icon: IconType;
	action: () => void;
};
