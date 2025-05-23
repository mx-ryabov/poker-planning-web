import { ReactNode } from "react";
import { ConfirmationModalProvider } from "./confirmation-modal-provider";
import { LocalizedStringProvider } from "@/_src/shared/ui/components/localized-string-provider";
import { ApiProvider } from "./api-provider";

type Props = {
	children: ReactNode;
};
export function AppProvider({ children }: Props) {
	return (
		<ApiProvider>
			<ConfirmationModalProvider>
				<LocalizedStringProvider locale="en-US" />
				{children}
			</ConfirmationModalProvider>
		</ApiProvider>
	);
}
