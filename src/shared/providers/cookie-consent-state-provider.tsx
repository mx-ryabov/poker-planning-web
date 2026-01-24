"use client";
import { createContext, ReactNode, useContext, useCallback } from "react";
import { useLocalStorageState } from "../lib";

export enum ConsentStatus {
	Unknown = "unknown",
	UnInitialized = "uninitialized",
	Given = "given",
	Rejected = "rejected",
}
type CookieConsentStateContextProps = {
	consentStatus: ConsentStatus;
	giveConsent: () => void;
	rejectConsent: () => void;
};
export const CookieConsentStateContext = createContext<
	CookieConsentStateContextProps | undefined
>(undefined);

export function CookieConsentStateProvider({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	const [consentStatus, setConsentStatus] =
		useLocalStorageState<ConsentStatus>("cookieConsent", {
			defaultValue: ConsentStatus.Unknown,
			defaultServerValue: ConsentStatus.UnInitialized,
		});

	const giveConsent = useCallback(() => {
		setConsentStatus(ConsentStatus.Given);
	}, [setConsentStatus]);

	const rejectConsent = useCallback(() => {
		setConsentStatus(ConsentStatus.Rejected);
	}, [setConsentStatus]);

	return (
		<CookieConsentStateContext.Provider
			value={{ consentStatus, giveConsent, rejectConsent }}
		>
			{children}
		</CookieConsentStateContext.Provider>
	);
}

export function RenderIfConsentGiven({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	const { consentStatus } = useCookieConsentState();

	if (consentStatus === ConsentStatus.Given) {
		return children;
	}
	return null;
}

export function useCookieConsentState() {
	const context = useContext(CookieConsentStateContext);
	if (!context) {
		throw new Error(
			"useCookieConsentState must be used within a CookieConsentStateProvider",
		);
	}
	return context;
}
