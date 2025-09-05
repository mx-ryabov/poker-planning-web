"use client";
import { ConsentStatus, useCookieConsentState } from "@/_src/shared/providers";
import { NextLink } from "../../next-components/next-link";
import { NewButton } from "../button";

export function CookieConsent() {
	const { consentStatus, giveConsent, rejectConsent } =
		useCookieConsentState();

	if (consentStatus !== ConsentStatus.Unknown) {
		return null;
	}
	return (
		<div className="fixed right-4 bottom-4 z-50 mx-4 flex flex-col gap-4 rounded-xl border-2 border-[color-mix(in_oklab,var(--color-white)_50%,transparent)] bg-[color-mix(in_oklab,var(--color-neutral-200)_20%,transparent)] p-4 backdrop-blur-xs lg:flex-row">
			<div className="flex flex-row items-center gap-4">
				<span className="text-3xl">🍪</span>
				<p className="text-sm">
					This website uses cookies to enhance the user experience.{" "}
					<br />
					<NextLink href="/privacy-policy" className="underline">
						Learn more
					</NextLink>
				</p>
			</div>

			<div className="flex flex-row justify-end gap-4">
				<NewButton onPress={giveConsent}>Accept All Cookeis</NewButton>
				<NewButton variant="ghost" onPress={rejectConsent}>
					Reject
				</NewButton>
			</div>
		</div>
	);
}
