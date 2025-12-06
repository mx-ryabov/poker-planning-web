import { RenderPropsType } from "@/_src/shared/lib/types";
import { cva } from "class-variance-authority";
import { ReactNode, useContext } from "react";
import {
	DialogTrigger as AriaDialogTrigger,
	DialogTriggerProps as AriaDialogTriggerProps,
	ModalOverlay as AriaModalOverlay,
	Modal as AriaModal,
	Dialog as AriaDialog,
	ModalOverlayProps as AriaModalOverlayProps,
	DialogProps as AriaDialogProps,
	Heading,
	OverlayTriggerStateContext,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

type DialogTriggerProps = AriaDialogTriggerProps;

function DialogTrigger({ children, ...props }: DialogTriggerProps) {
	return <AriaDialogTrigger {...props}>{children}</AriaDialogTrigger>;
}

type DialogProps = AriaDialogProps &
	Omit<AriaModalOverlayProps, "children"> & { "data-testid"?: string };

function Dialog(props: DialogProps) {
	const { children, ...restProps } = props;

	return (
		<AriaModalOverlay
			{...restProps}
			className={overlayStyles}
			data-testid="dialog-overlay"
		>
			<AriaModal className={modalStyles} data-testid="modal-container">
				<AriaDialog
					className="flex flex-col gap-4 bg-white px-2 py-1"
					data-testid={restProps?.["data-testid"]}
				>
					{children}
				</AriaDialog>
			</AriaModal>
		</AriaModalOverlay>
	);
}

type HeaderProps = {
	children: RenderPropsType<{ close: () => void }, unknown>;
};
function Header({ children }: HeaderProps) {
	const triggerState = useContext(OverlayTriggerStateContext);
	if (!triggerState) {
		console.error(
			"Modal Header has OverlayTriggerStateContext null value. Probably you don't use this component within Modal.Dialog",
		);
		return null;
	}
	return (
		<div className="flex flex-row items-center justify-between">
			{typeof children === "function"
				? children({ close: triggerState.close })
				: children}
		</div>
	);
}

type TitleProps = {
	children: ReactNode;
	className?: string;
};
function Title({ children, className }: TitleProps) {
	return (
		<Heading
			className={twMerge(
				"text-xl font-semibold text-neutral-900",
				className,
			)}
			slot="title"
		>
			{children}
		</Heading>
	);
}

type BodyProps = {
	children: ReactNode;
	className?: string;
};
function Body({ children, className }: BodyProps) {
	return <div className={className}>{children}</div>;
}

type FooterProps = {
	children: RenderPropsType<{ close: () => void }, unknown>;
	className?: string;
};
function Footer({ children, className }: FooterProps) {
	const triggerState = useContext(OverlayTriggerStateContext);
	if (!triggerState) {
		console.error(
			"Modal Footer has OverlayTriggerStateContext null value. Probably you don't use this component within Modal.Dialog",
		);
		return null;
	}
	return (
		<div className={twMerge("flex flex-row justify-end gap-2", className)}>
			{typeof children === "function"
				? children({ close: triggerState.close })
				: children}
		</div>
	);
}

export const Modal = Object.assign(DialogTrigger, {
	Dialog,
	Header,
	Title,
	Body,
	Footer,
});

const overlayStyles = cva(
	"fixed inset-0 flex items-center justify-center w-full h-full bg-neutral-900/30 backdrop-blur z-10",
	{
		variants: {
			isEntering: {
				true: "animate-fade-in duration-300 ease-out",
				false: "",
			},
			isExiting: {
				true: "animate-fade-out duration-200 ease-in",
				false: "",
			},
		},
	},
);

const modalStyles = cva(
	"w-full max-w-md overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl",
	{
		variants: {
			isEntering: {
				true: "animate-fade-in-scale",
				false: "",
			},
			isExiting: {
				true: "animate-fade-out-scale",
				false: "",
			},
		},
	},
);
