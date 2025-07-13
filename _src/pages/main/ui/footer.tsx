import { NextLink } from "@/_src/shared/ui/next-components/next-link";
import Logo from "@public/full-logo-light.svg";
import Image from "next/image";

export function Footer() {
	return (
		<footer className="mx-auto flex w-auto max-w-5xl flex-col items-center justify-center bg-neutral-900 px-4 py-10 text-white md:mx-6 md:mb-16 md:rounded-3xl xl:mx-auto xl:w-full">
			<div className="mb-10 flex flex-col items-center gap-4">
				<Image src={Logo} alt="Logo" />
				<p className="text-center text-lg font-light text-neutral-300 md:text-start">
					🚀 Agile estimation made simple and collaborative 🚀
				</p>
			</div>
			<div className="mb-8 flex flex-row items-center justify-center gap-8 text-white">
				<NextLink href="/#features">Features</NextLink>
				<NextLink href="/#how-it-works">How it works</NextLink>
				<NextLink href="/#coming-soon">Coming soon</NextLink>
			</div>
			<div className="flex w-full flex-col items-center justify-center border-t border-neutral-600 pt-8 md:flex-row">
				<p className="text-sm text-gray-400">
					© 2025 Poker Planning. All rights reserved.
				</p>
			</div>
		</footer>
	);
}
