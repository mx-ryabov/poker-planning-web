import { ReactNode } from "react";

export default function GameLayout({ children }: { children: ReactNode }) {
	return (
		<section>
			Game layout
			{children}
		</section>
	);
}
