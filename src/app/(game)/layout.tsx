import { ConfirmationModalProvider } from "@/src/shared/providers/confirmation-modal-provider";
import { DomainProvider } from "@/src/domain/providers/domain-provider";

export default function GameLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	console.log("GameLayout");

	return (
		<DomainProvider>
			<ConfirmationModalProvider>{children}</ConfirmationModalProvider>
		</DomainProvider>
	);
}
