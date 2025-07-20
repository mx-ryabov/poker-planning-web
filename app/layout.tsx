import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/_src/shared/providers";
import { GoogleTagManager } from "@next/third-parties/google";
import { CookieConsent } from "@/_src/shared/ui/components/cookie-consent";
import {
	CookieConsentStateProvider,
	RenderIfConsentGiven,
} from "@/_src/shared/providers/cookie-consent-state-provider";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: "Poker Planning",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="en-US">
			<head>
				{process.env.NODE_ENV === "development" &&
					process.env.USE_REACT_SCAN === "true" && (
						<script
							src="https://unpkg.com/react-scan/dist/auto.global.js"
							async
						/>
					)}
			</head>
			<CookieConsentStateProvider>
				<RenderIfConsentGiven>
					<GoogleTagManager gtmId="GTM-5287FSHK" />
				</RenderIfConsentGiven>
				<body className={`${inter.variable} p-0 font-sans`}>
					<AppProvider>{children}</AppProvider>
					<CookieConsent />
				</body>
			</CookieConsentStateProvider>
		</html>
	);
}
