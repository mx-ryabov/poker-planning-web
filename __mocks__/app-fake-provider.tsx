import { ApiFakeProvider, FakeApi } from "@/__mocks__/api-fake-provider";
import {
	ConfirmationModalContext,
	ConfirmationModalContextProps,
} from "@/_src/shared/providers";

import { ReactNode } from "react";
import { vi } from "vitest";

export type AppFakeProviderProps = {
	confirmationModalContextProps?: Partial<ConfirmationModalContextProps>;
	apiProps?: FakeApi;
	children: ReactNode;
};

export function AppFakeProvider({
	confirmationModalContextProps,
	apiProps,
	children,
}: AppFakeProviderProps) {
	return (
		<ApiFakeProvider fakeApi={apiProps}>
			<ConfirmationModalContext.Provider
				value={{
					...DEFAULT_CONF_MODAL_CTX_VALUE,
					...confirmationModalContextProps,
				}}
			>
				{children}
			</ConfirmationModalContext.Provider>
		</ApiFakeProvider>
	);
}

const DEFAULT_CONF_MODAL_CTX_VALUE: ConfirmationModalContextProps = {
	open: vi.fn(),
};
