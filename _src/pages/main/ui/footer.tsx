import { NextLink } from "@/_src/shared/ui/next-components/next-link";
import Logo from "@public/full-logo-light.svg";
import Image from "next/image";

export function Footer() {
	return (
		<footer className="mx-auto mb-16 flex w-full max-w-5xl flex-col items-center rounded-3xl bg-neutral-900 py-10 text-white">
			<div className="mb-10 flex flex-col items-center gap-4">
				<Image src={Logo} alt="Logo" />
				<p className="text-lg font-light text-neutral-300">
					🚀 Agile estimation made simple and collaborative 🚀
				</p>
			</div>
			<div className="mb-8 flex flex-row gap-8 text-white">
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
