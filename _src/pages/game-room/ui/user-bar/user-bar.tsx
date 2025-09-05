"use client";
import { Button } from "@/_src/shared/ui/components/button";
import { LogoutIcon, ProfileIcon } from "@/_src/shared/ui/components/icon";
import { Menu } from "@/_src/shared/ui/components/menu";
import { selectCurrentParticipant, useGameState } from "../../model";
import { useCallback, useMemo } from "react";
import { StringHelper } from "@/_src/shared/lib/utils/string-helper";
import { useConfirmationModal } from "@/_src/shared/providers";
import { ParticipantRole } from "@/_src/shared/api";
import { FlashWithLinesIcon } from "@/_src/shared/ui/components/icon/svg/flash-with-lines.icon";
import { Popover } from "@/_src/shared/ui/components/popover";
import { useOnboardingOptions } from "../onboardings";

type Props = {
	onLogout: () => void;
};

export function UserBar({ onLogout }: Props) {
	const { open } = useConfirmationModal();
	const onboardingOptions = useOnboardingOptions();
	const currentParticipant = useGameState(selectCurrentParticipant);

	const initials = useMemo(() => {
		return StringHelper.getFirstLetters(
			currentParticipant.displayName,
			2,
		).toUpperCase();
	}, [currentParticipant.displayName]);

	const onExit = useCallback(() => {
		let confirmDescription =
			"Please confirm that you want to exit the game room. After exiting, you won't be able to rejoin the game as the same user.";
		if (currentParticipant.role === ParticipantRole.Master) {
			confirmDescription =
				"As the master, you will need to assign a new master in the settings panel before exiting. Otherwise, the game room won't be manageable.";
		}
		open({
			title: "Are you sure you want to exit?",
			contentMessage: confirmDescription,
			confirmBtnText: "Exit",
			confirmBtnAppearence: "warning",
			onConfirm: onLogout,
		});
	}, [currentParticipant, onLogout, open]);

	return (
		<Menu>
			<Button
				className="w-10 h-10 rounded-full shadow-lg shadow-primary-200 drop-shadow-xl"
				title={initials}
			/>
			<Menu.Content placement="bottom end">
				<Menu.Section title={currentParticipant.displayName}>
					{/* <Menu.Item isDisabled>
						<ProfileIcon size={20} className="shrink-0" />
						<div className="flex flex-col">
							<p>My Account</p>
							<span className="text-xs w-max">
								Sign up to see more...
							</span>
						</div>
					</Menu.Item> */}
					{onboardingOptions.length > 0 && (
						<Menu.SubmenuTrigger>
							<Menu.Item aria-label="Onboardings">
								<FlashWithLinesIcon size={20} /> Onboardings
							</Menu.Item>
							<Popover.Content
								placement="left top"
								aria-label="Onboarding list"
							>
								<Menu.Content
									offset={16}
									data-testid="onboarding-list"
								>
									<Menu.Section
										items={onboardingOptions}
										title="Onboardings"
									>
										{(option) => (
											<Menu.Item
												key={option.type}
												id={option.type}
												onAction={option.start}
											>
												<div className="flex flex-row gap-1 items-center pr-1">
													<span className="text-lg">
														{option.emoji}
													</span>
													<div className="flex flex-col">
														<span className="font-medium">
															{option.title}
														</span>
														<span className="text-xs">
															{option.subTitle}
														</span>
													</div>
												</div>
											</Menu.Item>
										)}
									</Menu.Section>
								</Menu.Content>
							</Popover.Content>
						</Menu.SubmenuTrigger>
					)}
					<Menu.Item onAction={onExit} aria-label="Exit">
						<LogoutIcon size={20} /> Exit
					</Menu.Item>
				</Menu.Section>
			</Menu.Content>
		</Menu>
	);
}
