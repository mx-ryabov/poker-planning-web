"use client";

import { StringHelper } from "@/_src/shared/lib/utils/string-helper";
import { Color } from "@/_src/shared/ui/colors";
import { Button } from "@/_src/shared/ui/components/button";
import { FullSizeFormTextInput } from "@/_src/shared/ui/components/full-size-form-text-field";
import { PlayIcon } from "@/_src/shared/ui/components/icon/svg/play.icon";
import { ProfileIcon } from "@/_src/shared/ui/components/icon/svg/profile.icon";
import { NextLink } from "@/_src/shared/ui/next-components/next-link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
	gameId: string;
	onSubmit: (
		gameId: string,
		data: { displayName: string },
	) => Promise<string | undefined>;
};

const GameJoinFormSchema = z.object({
	displayName: z
		.string()
		.min(1, "Don't be shy!")
		.max(50, "Maybe you have a short name?")
		.transform((val) =>
			StringHelper.cleanUpString(val, { onlyWords: true }),
		),
});

export function GameJoinForm({ gameId, onSubmit }: Props) {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const { control, formState } = useForm<{ displayName: string }>({
		mode: "onChange",
		defaultValues: {
			displayName: "",
		},
		resolver: zodResolver(GameJoinFormSchema),
	});

	useEffect(() => {
		const inputEl = inputRef.current;
		if (inputEl) {
			inputEl.focus();
		}
	}, [inputRef]);

	const [serverError, submitAction, isPending] = useActionState<
		string | undefined,
		FormData
	>(async (prevError, formData) => {
		const displayName = formData.get("displayName");
		if (!displayName || typeof displayName !== "string") {
			return "The displayName field is invalid";
		}
		const error = await onSubmit(gameId, {
			displayName,
		});

		return error;
	}, undefined);

	const error = formState.errors.displayName?.message || serverError;

	return (
		<form action={submitAction} className="w-full h-full flex">
			<div className="w-full h-full flex flex-row px-10">
				<div className="w-full h-full flex flex-col shrink-0 basis-full justify-center px-10">
					<Controller
						control={control}
						name="displayName"
						render={({ field, fieldState }) => (
							<FullSizeFormTextInput
								label="Let's get acquainted👇"
								placeholder="Type your name"
								maxLength={50}
								{...field}
								error={error}
								ref={(el) => {
									field.ref(el);
									inputRef.current = el;
								}}
							/>
						)}
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
						isDisabled={
							!!error || !formState.dirtyFields.displayName
						}
						isPending={isPending}
						contentRight={PlayIcon({ size: 18 })}
					/>
				</section>
			</footer>
		</form>
	);
}
