import { MainPage } from "@/_src/pages/main";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Poker Planning - Agile Estimation Made Easy",
};

export default function Home() {
	return <MainPage />;
}
