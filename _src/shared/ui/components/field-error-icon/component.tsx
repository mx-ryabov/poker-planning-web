import { ReactNode, useRef } from "react";
import { WarningIcon } from "../icon/svg/warning.icon";
import { Tooltip } from "../tooltip";
import { useFocusable } from "react-aria";
import { twMerge } from "tailwind-merge";
import { TooltipProps } from "react-aria-components";

type Props = {
	errorMsg?: string;
	icon?: ReactNode;
	isDisabled?: boolean;
	className?: string;
	placement?: TooltipProps["placement"];
};

export function FieldErrorIcon(props: Props) {
	const { errorMsg, placement, ...restProps } = props;

	if (!errorMsg) {
		return null;
	}

	return (
		<Tooltip delay={0}>
			<TriggerElement {...restProps} />
			<Tooltip.Content placement={placement}>{errorMsg}</Tooltip.Content>
		</Tooltip>
	);
}

function TriggerElement(props: Omit<Props, "errorMsg">) {
	const { icon, isDisabled, className } = props;

	const ref = useRef<HTMLDivElement | null>(null);
	const { focusableProps } = useFocusable({ isDisabled }, ref);

	return (
		<div
			{...focusableProps}
			ref={ref}
			data-testid="field-error-icon"
			className={twMerge(
				"p-1 rounded-md transition-colors text-error-600",
				className,
			)}
		>
			{icon || <WarningIcon />}
		</div>
	);
}
