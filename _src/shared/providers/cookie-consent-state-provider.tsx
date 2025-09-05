"use client";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

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
	const [consentStatus, setConsentStatus] = useState<ConsentStatus>(
		ConsentStatus.UnInitialized,
	);

	useEffect(() => {
		if (typeof localStorage !== "undefined") {
			const consent = localStorage.getItem("cookieConsent");
			if (
				consent === ConsentStatus.Given ||
				consent === ConsentStatus.Rejected
			) {
				setConsentStatus(consent);
			} else {
				setConsentStatus(ConsentStatus.Unknown);
			}
		}
	}, []);

	const giveConsent = () => {
		if (typeof localStorage !== "undefined") {
			localStorage.setItem("cookieConsent", ConsentStatus.Given);
		}
		setConsentStatus(ConsentStatus.Given);
	};

	const rejectConsent = () => {
		if (typeof localStorage !== "undefined") {
			localStorage.setItem("cookieConsent", ConsentStatus.Rejected);
		}
		setConsentStatus(ConsentStatus.Rejected);
	};

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
