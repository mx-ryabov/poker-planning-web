"use client";
import { AnimatedText } from "@/_src/shared/ui/components/animated-text.tsx";
import { Button } from "@/_src/shared/ui/components/button";
import { MailIcon } from "@/_src/shared/ui/components/icon/svg/mail.icon";
import { Input } from "@/_src/shared/ui/components/input";

export function SubscribeSection() {
	return (
		<section
			className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8"
			id="subscribe"
		>
			<div className="mt-12 text-center">
				<div className="mx-auto max-w-2xl border-purple-200 bg-gradient-to-r from-purple-100 to-blue-100 p-6">
					<AnimatedText>
						<h2 className="mb-4 text-4xl font-bold text-neutral-900">
							Want to be the first to know?
						</h2>
						<p className="mx-auto mb-8 max-w-2xl text-xl font-light text-neutral-800">
							Subscribe to get notified when these features launch
							and get early access to beta versions.
						</p>
					</AnimatedText>
					<div className="mx-auto flex max-w-md items-center space-x-3">
						<Input
							label=""
							startIcon={MailIcon}
							placeholder="Enter your email"
						/>
						<Button title="Subscribe" />
					</div>
				</div>
			</div>
		</section>
	);
}
