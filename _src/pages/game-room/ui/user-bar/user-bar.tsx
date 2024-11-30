import { Button } from "@/_src/shared/ui/components/button";
import { LogoutIcon, ProfileIcon } from "@/_src/shared/ui/components/icon";
import { Menu } from "@/_src/shared/ui/components/menu";

export function UserBar() {
	return (
		<Menu>
			<Button
				className="w-10 h-10 rounded-full shadow-lg shadow-primary-200 drop-shadow-xl"
				title="M"
			/>
			<Menu.Content placement="bottom end">
				<Menu.Section title="Maxim Ryabov Mock">
					<Menu.Item>
						<ProfileIcon size={20} /> My Account
					</Menu.Item>
					<Menu.Item>
						<LogoutIcon size={20} /> Logout
					</Menu.Item>
				</Menu.Section>
			</Menu.Content>
		</Menu>
	);
}
