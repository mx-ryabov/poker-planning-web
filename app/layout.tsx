import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LocalizedStringProvider } from "@/_src/shared/ui/components/localized-string-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Poker Planning App",
};

export default function RootLayout({
	children,
	params: { lang },
}: Readonly<{
	children: React.ReactNode;
	params: { lang: string };
}>) {
	return (
		<html lang="en-US">
			<body className={inter.className}>
				<LocalizedStringProvider locale="en-US" />
				{children}
			</body>
		</html>
	);
}
