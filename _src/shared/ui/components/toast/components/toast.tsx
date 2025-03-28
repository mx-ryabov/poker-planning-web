import { useRef } from "react";
import { ToastState } from "@react-stately/toast";
import { AriaToastProps, useToast } from "@react-aria/toast";

import { ToastContent } from "../models/toast-content";
import { ButtonSquare } from "../../button";
import { InfoIcon } from "../../icon/svg/info.icon";
import { ErrorIcon } from "../../icon/svg/error.icon";
import { CloseIcon } from "../../icon/svg/close.icon";
import { WarningIcon } from "../../icon/svg/warning.icon";
import { SuccessCircleIcon } from "../../icon/svg/success-circle.icon";

type ToastProps = {
	state: ToastState<ToastContent>;
	index: number;
} & AriaToastProps<ToastContent>;

export function Toast(props: ToastProps) {
	const { state, index, ...restProps } = props;

	const ref = useRef<HTMLDivElement | null>(null);
	const { toastProps, contentProps, titleProps, closeButtonProps } = useToast(
		restProps,
		state,
		ref,
	);

	return (
		<div
			className={`absolute w-full py-1 outline-0 transition-all duration-300`}
			{...toastProps}
			data-testid={`toast-${restProps.toast.key}`}
			aria-hidden="false"
			style={{
				zIndex: index * 10,
			}}
			ref={ref}
		>
			<div className="w-full rounded-xl border border-neutral-100 bg-white px-3 py-4 drop-shadow-xs">
				<div className="flex flex-row gap-2" {...contentProps}>
					<div data-icon className="my-1 h-4 w-4">
						{icons[props.toast.content?.variant || "neutral"]}
					</div>
					<div className="flex flex-col gap-1">
						<h3
							className="items-center text-base font-semibold text-neutral-500"
							{...titleProps}
						>
							{restProps.toast.content.title}
						</h3>
						<p className="text-sm text-neutral-500">
							{restProps.toast.content?.description}
						</p>
					</div>
				</div>
				<ButtonSquare
					className="absolute top-2 right-2 text-neutral-500"
					variant="ghost"
					size="small"
					icon={CloseIcon}
					{...closeButtonProps}
				/>
			</div>
		</div>
	);
}

const icons = {
	neutral: null,
	info: <InfoIcon size={16} thikness="bold" className="text-info-500" />,
	warning: (
		<WarningIcon size={16} thikness="bold" className="text-warning-500" />
	),
	error: <ErrorIcon size={16} thikness="bold" className="text-error-500" />,
	success: (
		<SuccessCircleIcon
			size={16}
			thikness="bold"
			className="text-success-500"
		/>
	),
};
