"use client";
import { Button } from "@/_src/shared/ui/components/button";
import { LogoutIcon, ProfileIcon } from "@/_src/shared/ui/components/icon";
import { Menu } from "@/_src/shared/ui/components/menu";
import { selectCurrentParticipant, useGameState } from "../../model";
import { useMemo } from "react";
import { StringHelper } from "@/_src/shared/lib/utils/string-helper";

type Props = {
	onLogout: () => void;
};

export function UserBar({ onLogout }: Props) {
	const currentParticipant = useGameState(selectCurrentParticipant);

	const initials = useMemo(() => {
		return StringHelper.getFirstLetters(
			currentParticipant.displayName,
			2,
		).toUpperCase();
	}, [currentParticipant.displayName]);

	return (
		<Menu>
			<Button
				className="w-10 h-10 rounded-full shadow-lg shadow-primary-200 drop-shadow-xl"
				title={initials}
			/>
			<Menu.Content placement="bottom end">
				<Menu.Section title={currentParticipant.displayName}>
					<Menu.Item isDisabled>
						<ProfileIcon size={20} className="shrink-0" />
						<div className="flex flex-col">
							<p>My Account</p>
							<span className="text-xs w-max">
								Sign up to see more...
							</span>
						</div>
					</Menu.Item>
					<Menu.Item onAction={onLogout}>
						<LogoutIcon size={20} /> Logout
					</Menu.Item>
				</Menu.Section>
			</Menu.Content>
		</Menu>
	);
}
