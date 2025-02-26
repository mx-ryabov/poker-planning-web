import { useToastState } from "@react-stately/toast";
import type { AriaToastProps, AriaToastRegionProps } from "@react-aria/toast";
import type { ToastState } from "@react-stately/toast";
import { useToast, useToastRegion } from "@react-aria/toast";
import { createContext, ReactNode, useContext, useRef } from "react";
import { ButtonSquare } from "../button";
import { CloseIcon } from "../icon/svg/close.icon";

type ToastContent = {
	title: string;
	description: string;
};

const ToastContext = createContext<ToastState<ToastContent> | null>(null);

type ToastProviderProps = {
	children: ReactNode;
};
export function ToastProvider({ children }: ToastProviderProps) {
	const state = useToastState<ToastContent>({
		maxVisibleToasts: 3,
	});

	return (
		<ToastContext.Provider value={state}>
			{children}
			<ToastRegion state={state} />
		</ToastContext.Provider>
	);
}

export function useGlobalToast() {
	const context = useContext(ToastContext);
	if (context === undefined) {
		throw new Error("ToastContext must be within ToastProvider");
	}
	return context;
}

type ToastRegionProps = {
	state: ToastState<ToastContent>;
} & AriaToastRegionProps;

function ToastRegion(props: ToastRegionProps) {
	const { state, ...restProps } = props;

	const ref = useRef<HTMLDivElement | null>(null);
	const { regionProps } = useToastRegion(restProps, state, ref);

	if (state.visibleToasts.length === 0) {
		return null;
	}

	return (
		<div
			{...regionProps}
			ref={ref}
			className="fixed left-10 bottom-10 w-80 max-h-[50vh]"
		>
			{state.visibleToasts.map((toast) => (
				<Toast key={toast.key} toast={toast} state={state} />
			))}
		</div>
	);
}

type ToastProps = {
	state: ToastState<ToastContent>;
} & AriaToastProps<ToastContent>;

function Toast(props: ToastProps) {
	const { state, ...restProps } = props;

	const ref = useRef<HTMLDivElement | null>(null);
	const { toastProps, contentProps, titleProps, closeButtonProps } = useToast(
		restProps,
		state,
		ref,
	);

	return (
		<div
			className="relative px-5 py-4 border border-neutral-100 rounded-xl"
			{...toastProps}
			ref={ref}
		>
			<div className="flex flex-col gap-1" {...contentProps}>
				<h3
					className="text-neutral-500 text-base font-semibold"
					{...titleProps}
				>
					{restProps.toast.content.title}
				</h3>
				<p className="text-neutral-500 text-sm">
					{restProps.toast.content.description}
				</p>
			</div>
			<ButtonSquare
				className="absolute right-2 top-2 text-neutral-500"
				variant="ghost"
				size="small"
				icon={CloseIcon}
				{...closeButtonProps}
			/>
		</div>
	);
}
