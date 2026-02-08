import { HTMLAttributes, ReactNode } from "react";


type NewProps = {
	children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export function DrawerBody({ children, ...props }: NewProps) {
	return (
		<section
			className="w-full h-full overflow-hidden relative flex flex-row px-6 pb-6"
			data-testid="game-management-drawer-body"
		>
			<div
				{...props}
				className="w-full h-full shrink-0 transition-transform duration-300"
			>
				{children}
			</div>
		</section>
	);
}
