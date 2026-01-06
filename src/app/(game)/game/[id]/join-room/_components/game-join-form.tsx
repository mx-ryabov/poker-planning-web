"use client";

import { GameSchemaBuildersMap } from "@/src/domain/entities/game";
import { ApiError } from "@/src/shared/lib";
import { useDomainApi } from "@/src/domain/providers";
import { Button } from "@/src/shared/ui/components/button";
import { FullSizeFormTextInput } from "@/src/shared/ui/components/full-size-form-text-field";
import { PlayIcon } from "@/src/shared/ui/components/icon/svg/play.icon";
import { ProfileIcon } from "@/src/shared/ui/components/icon/svg/profile.icon";
import { useGlobalToast } from "@/src/shared/ui/components/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
	gameId: string;
};

const GameJoinFormSchema = z.object({
	displayName: GameSchemaBuildersMap.participant.name(
		"Don't be shy!",
		"Maybe you have a short name?",
	),
});

export function GameJoinForm({ gameId }: Props) {
	const api = useDomainApi();
	const toast = useGlobalToast();
	const { control, formState } = useForm<{ displayName: string }>({
		mode: "onChange",
		defaultValues: {
			displayName: "",
		},
		resolver: zodResolver(GameJoinFormSchema),
	});

	const [serverError, submitAction, isPending] = useActionState<
		string | undefined,
		FormData
	>(async (_, formData) => {
		const displayName = formData.get("displayName");
		if (!displayName || typeof displayName !== "string") {
			return "The displayName field is invalid";
		}

		try {
			await api.game.joinAsGuest(gameId, {
				displayName,
			});
		} catch (e) {
			if (!(e instanceof ApiError)) {
				toast?.add({
					title: "Unhandled Error",
					description: String(e),
					variant: "error",
				});
				return;
			}
			if (e.cause === "validation") return e.message;
			toast?.add({
				title: e.title,
				description: e.message,
				variant: "error",
			});
		}
	}, undefined);

	const error = formState.errors.displayName?.message || serverError;

	return (
		<form action={submitAction} className="flex h-full w-full">
			<div className="flex h-full w-full flex-row px-10">
				<div className="flex h-full w-full shrink-0 basis-full flex-col justify-center px-10">
					<Controller
						control={control}
						name="displayName"
						render={({ field }) => (
							<FullSizeFormTextInput
								label="Let's get acquainted👇"
								placeholder="Type your name"
								maxLength={50}
								{...field}
								error={error}
								autoFocus
							/>
						)}
					/>
				</div>
			</div>

			<div
				className="fixed bottom-0 flex w-full items-center justify-between px-10 pb-10"
				role="footer"
			>
				<section data-testid="auth-section">
					<p className="item-center flex flex-row text-sm text-neutral-600">
						<ProfileIcon className="mr-2" />
						{/* <NextLink
							href="/sign-in"
							className="mr-1 leading-relaxed text-neutral-900"
						>
							Login
						</NextLink>
						<span>or</span>
						<NextLink
							href="/sign-up"
							className="mx-1 leading-relaxed text-neutral-900"
						>
							Sign Up
						</NextLink> */}
						<span>
							You&apos;ll be able to sign up to see more app
							features in the near future
						</span>
					</p>
				</section>
				<section className="flex flex-row gap-4">
					<Button
						type="submit"
						aria-label="Enter the game button"
						data-testid="enter-game-btn"
						isDisabled={
							!!error || !formState.dirtyFields.displayName
						}
						isPending={isPending}
					>
						Enter the Game
						<PlayIcon size={18} />
					</Button>
				</section>
			</div>
		</form>
	);
}
