import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LocalizedStringProvider } from "@/_src/shared/ui/components/localized-string-provider";
import { ConfirmationModalProvider } from "@/_src/shared/ui/components/modals";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: "Poker Planning App",
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
			<body className={`${inter.variable} font-sans p-0`}>
				<LocalizedStringProvider locale="en-US" />
				<ConfirmationModalProvider>
					{children}
				</ConfirmationModalProvider>
			</body>
		</html>
	);
}
