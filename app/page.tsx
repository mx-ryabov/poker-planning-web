import { Inter } from "next/font/google";
import { MainPage } from "@/_src/pages/main";

const inter = Inter({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700"],
	variable: "--font-inter",
});

export default function Home() {
	return (
		<main className={`${inter.variable} font-sans`}>
			<MainPage />
		</main>
	);
}
