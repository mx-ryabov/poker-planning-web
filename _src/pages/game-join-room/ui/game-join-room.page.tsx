import { Color } from "@/_src/shared/ui/colors";
import { Button } from "@/_src/shared/ui/components/button";
import { FullSizeFormTextInput } from "@/_src/shared/ui/components/full-size-form-text-field";
import { PlayIcon, ProfileIcon } from "@/_src/shared/ui/components/icon";
import { Logo } from "@/_src/shared/ui/components/logo";
import { NextLink } from "@/_src/shared/ui/next-components/next-link";
import { NextPage } from "next";

interface Props {}

export const GameJoinPage: NextPage<Props> = () => {
	//const {} = useActionState();

	return (
		<div className="w-full h-screen flex flex-col">
			<header
				className="flex flex-row w-full px-9 py-5 justify-between items-center fixed top-0"
				role="header"
			>
				<NextLink href="/">
					<Logo />
				</NextLink>
			</header>
			<form action="" className="w-full h-full flex">
				<div className="w-full h-full flex flex-row px-10">
					<div className="w-full h-full flex flex-col shrink-0 basis-full justify-center px-10">
						<FullSizeFormTextInput
							label="Let's get acquainted👇"
							placeholder="Type your name"
							maxLength={50}
							name="displayName"
							//error={fieldState.error?.message}
							//{...field}
							/*ref={(el) => {
							field.ref(el);
							inputRef.current = el;
						}}*/
						/>
					</div>
				</div>

				<footer
					className="w-full flex justify-between px-10 pb-10 items-center fixed bottom-0"
					role="footer"
				>
					<section data-testid="auth-section">
						<p className="flex flex-row text-neutral-300 item-center text-sm">
							<ProfileIcon
								color={Color.Neutral300}
								className="mr-2"
							/>
							<NextLink
								href="/sign-in"
								className="text-neutral-900 mr-1 leading-relaxed"
							>
								Login
							</NextLink>
							<span>or</span>
							<NextLink
								href="/sign-up"
								className="text-neutral-900 mx-1 leading-relaxed"
							>
								Sign Up
							</NextLink>
							<span>to see more app features</span>
						</p>
					</section>
					<section className="flex flex-row gap-4">
						<Button
							type="submit"
							aria-label="Enter the game button"
							title="Enter the Game"
							data-testid="enter-game-btn"
							iconRight={PlayIcon}
						/>
					</section>
				</footer>
			</form>
		</div>
	);
};
