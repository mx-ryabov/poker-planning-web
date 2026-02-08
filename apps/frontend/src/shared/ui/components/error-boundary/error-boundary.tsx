"use client";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { Button } from "../button";
import { RefreshBorderlessIcon } from "../icon/svg/refresh-borderless.icon";
import { ReactNode } from "react";
import { logger } from "@/src/shared/lib";

// Raw implementation. Will be extended on demand
type InternalErrorBoundaryProps = { children: ReactNode };

export function InternalErrorBoundary(props: InternalErrorBoundaryProps) {
	const { children } = props;
	return (
		<ErrorBoundary
			fallbackRender={(props: FallbackProps) => {
				return (
					<div
						role="alert"
						data-testid="error-fallback"
						className="flex flex-col gap-3 items-center text-neutral-900 py-2 px-4 border border-neutral-200 rounded-lg bg-white"
					>
						<div className="flex flex-col items-center">
							<h1 className="font-medium text-lg">Oops!</h1>
							<p className="text-sm">Something went wrong...</p>
						</div>

						<Button
							onPress={props.resetErrorBoundary}
							size="small"
							variant="grayed-out"
						>
							<RefreshBorderlessIcon size={14} />
							Try again
						</Button>
					</div>
				);
			}}
			onError={(error, info) => {
				logger.error(error, { info });
			}}
		>
			{children}
		</ErrorBoundary>
	);
}
