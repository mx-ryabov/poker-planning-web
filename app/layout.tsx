import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/_src/shared/providers";

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
			<body className={`${inter.variable} p-0 font-sans`}>
				<AppProvider>{children}</AppProvider>
			</body>
		</html>
	);
}
