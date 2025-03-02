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
			className={`
                w-full py-1 absolute 
                transition-all duration-300 
                data-[animation=exiting]:animate-right-left-fade-in-reverse 
                data-[animation=queued]:animate-up-bottom-fade-in
				outline-0
            `}
			{...toastProps}
			aria-hidden="false"
			data-animation={props.toast.animation}
			style={{
				zIndex: index * 10,
			}}
			onAnimationEnd={() => {
				if (props.toast.animation === "exiting") {
					state.remove(props.toast.key);
				}
			}}
			ref={ref}
		>
			<div
				className={`
                    w-full px-3 py-4
                    border border-neutral-100 rounded-xl bg-white
                    drop-shadow-xs
                `}
			>
				<div className="flex flex-row gap-2" {...contentProps}>
					<div data-icon className="my-1 w-4 h-4">
						{icons[props.toast.content?.variant || "neutral"]}
					</div>
					<div className="flex flex-col gap-1">
						<h3
							className="items-center text-neutral-500 text-base font-semibold"
							{...titleProps}
						>
							{restProps.toast.content.title}
						</h3>
						<p className="text-neutral-500 text-sm">
							{restProps.toast.content?.description}
						</p>
					</div>
				</div>
				<ButtonSquare
					className="absolute right-2 top-2 text-neutral-500"
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
