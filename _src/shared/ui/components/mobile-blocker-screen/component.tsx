"use client";

import { ReactNode, useSyncExternalStore } from "react";
import { NextLinkButton } from "../../next-components/next-link";
import { HomeIcon } from "../icon/svg/home.icon";

export function MobileBlockerScreen({ children }: { children: ReactNode }) {
	const isMobile = useSyncExternalStore(
		subscribeToIsMobile,
		getIsMobile,
		() => false,
	);

	if (!isMobile) {
		return children;
	}

	return (
		<div className="flex h-lvh w-lvw flex-col items-center justify-center bg-neutral-100 px-4">
			<h1 className="mb-6 text-4xl font-bold text-neutral-950">
				Oops...😔👉👈
			</h1>
			<p className="mb-8 text-center leading-normal text-neutral-900">
				We are working on a great mobile experience!
				<br />
				Please use a <u>desktop</u> for now. <br />
				See you soon on mobile!
			</p>
			<NextLinkButton
				href="/"
				className="fixed bottom-[40px] left-1/2 -translate-x-1/2"
			>
				<HomeIcon size={20} />
				Go Home
			</NextLinkButton>
		</div>
	);
}

const subscribeToIsMobile = (callback: () => void) => {
	const mediaQuery = window.matchMedia("(max-width: 1280px)");
	mediaQuery.addEventListener("change", callback);
	return () => {
		mediaQuery.removeEventListener("change", callback);
	};
};

const getIsMobile = () => {
	return window.innerWidth < 1280;
};
