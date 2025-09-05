"use client";

import { ReactNode, useEffect, useState } from "react";
import { NextLinkButton } from "../../next-components/next-link";
import { HomeIcon } from "../icon/svg/home.icon";
import throttle from "lodash.throttle";

export function MobileBlockerScreen({ children }: { children: ReactNode }) {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		if (window && window.innerWidth < 1280) {
			setIsMobile(true);
		}
		const handleResize = throttle((e: UIEvent) => {
			setIsMobile((e.currentTarget as Window).innerWidth < 1280);
		}, 300);

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

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
