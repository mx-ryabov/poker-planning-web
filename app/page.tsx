import Link from "next/link";
import { Color } from "@ui/colors";
import { Inter } from "next/font/google";
import { SettingsIcon } from "@ui/icon";

const inter = Inter({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700"],
	variable: "--font-inter",
});

export default function Home() {
	return (
		<main className={`${inter.variable} font-sans`}>
			<SettingsIcon
				thikness={"light"}
				color={Color.Success500}
				size={100}
			/>
			<p className="text-5xl font-light">Desktop</p>
			<p className="text-4xl font-light">Desktop</p>
			<p className="text-3xl font-light">Desktop</p>
			<p className="text-2xl font-light">Desktop</p>
			<p className="text-xl font-light">Desktop</p>
			<p className="text-base font-light">Desktop</p>
			<p className="text-sm font-light">Desktop</p>
			<Link href="/create-game">Start the game</Link>
		</main>
	);
}
