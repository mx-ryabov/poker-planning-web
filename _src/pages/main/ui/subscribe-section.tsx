"use client";
import { collectEmail } from "@/_src/shared/api";
import { AnimatedText } from "@/_src/shared/ui/components/animated-text.tsx";
import { Button } from "@/_src/shared/ui/components/button";
import { MailIcon } from "@/_src/shared/ui/components/icon/svg/mail.icon";
import { Input } from "@/_src/shared/ui/components/input";
import { useActionState } from "react";

export function SubscribeSection() {
	const [result, submitAction, isPending] = useActionState<
		{ ok: boolean; error?: string } | undefined,
		FormData
	>(async (res, formData) => {
		try {
			const email = formData.get("email");
			if (!email || typeof email !== "string") {
				return { ok: false, error: "The email field is invalid" };
			}
			const res = await collectEmail(email);
			return res;
		} catch (e) {
			return {
				ok: false,
				error: e instanceof Error ? e.message : String(e),
			};
		}
	}, undefined);

	const error = result && !result.ok ? result.error : undefined;
	const successMsg =
		result && result.ok
			? "Thank you for your interest! 🥳\nWe promise that as soon as there are updates, you will immediately receive an email. And it will be the only one🤫"
			: undefined;

	return (
		<section
			className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8"
			id="subscribe"
		>
			<div className="mt-12 text-center">
				<div className="mx-auto max-w-2xl p-6">
					<AnimatedText animateOnScroll>
						<h2 className="mb-4 text-4xl font-bold text-neutral-900">
							Want to be the first to know?
						</h2>
						<p className="mx-auto mb-8 max-w-2xl text-xl font-light text-neutral-800">
							Subscribe to get notified when these features launch
							and get early access to beta versions.
						</p>
					</AnimatedText>
					{!successMsg && (
						<form
							action={submitAction}
							className="mx-auto flex max-w-md items-center space-x-3"
						>
							<Input
								label=""
								startIcon={MailIcon}
								name="email"
								type="email"
								placeholder="Enter your email"
								isPending={isPending}
								errors={error}
							/>
							<Button
								title="Subscribe"
								type="submit"
								isPending={isPending}
							/>
						</form>
					)}
					{successMsg && (
						<p className="text-neutral-900">{successMsg}</p>
					)}
				</div>
			</div>
		</section>
	);
}
