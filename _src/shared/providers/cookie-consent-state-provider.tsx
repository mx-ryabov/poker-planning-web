"use client";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

type CookieConsentStateContextProps = {
	isConsentGiven: boolean | undefined;
	setConsentGiven: (value: boolean) => void;
};
const CookieConsentStateContext = createContext<
	CookieConsentStateContextProps | undefined
>(undefined);

export function CookieConsentStateProvider({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	const [isConsentGiven, setConsentGiven] = useState<boolean | undefined>(
		undefined,
	);

	useEffect(() => {
		if (typeof localStorage !== "undefined") {
			const consent = localStorage.getItem("cookieConsent");
			if (consent) {
				setConsentGiven(JSON.parse(consent));
			} else {
				setConsentGiven(false);
			}
		}
	}, []);

	const setConsentGivenHandler = (value: boolean) => {
		if (typeof localStorage !== "undefined") {
			localStorage.setItem("cookieConsent", JSON.stringify(value));
		}
		setConsentGiven(value);
	};
	return (
		<CookieConsentStateContext.Provider
			value={{ isConsentGiven, setConsentGiven: setConsentGivenHandler }}
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
	const { isConsentGiven } = useCookieConsentState();
	if (isConsentGiven) {
		return <>{children}</>;
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
