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
		<section className="page-section" id="subscribe">
			<div className="text-center lg:mt-12">
				<div className="mx-auto max-w-2xl">
					<AnimatedText animateOnScroll>
						<h2 className="mb-4">Want to be the first to know?</h2>
						<p className="sub-title mx-auto mb-8 max-w-2xl">
							Subscribe to get notified when these features launch
							and get early access to beta versions.
						</p>
					</AnimatedText>
					{!successMsg && (
						<form
							action={submitAction}
							className="mx-auto flex max-w-md items-start space-x-3"
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
