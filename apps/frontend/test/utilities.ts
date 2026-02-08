import type { ReactElement } from "react";
import { render as renderComponent } from "@testing-library/react";
import userEvent, { Options } from "@testing-library/user-event";

type RenderOptions = Parameters<typeof renderComponent>[1];

export * from "@testing-library/react";

export const render = (
	ui: ReactElement,
	options?: RenderOptions,
	userOptions?: Options,
) => {
	return {
		...renderComponent(ui, options),
		user: userEvent.setup(userOptions),
	};
};
