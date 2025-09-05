import { setRefs } from "@/_src/shared/lib";
import { forwardRef, useCallback, useRef } from "react";
import {
	PopoverProps,
	DialogTriggerProps,
	DialogTrigger,
	Popover,
	Dialog,
	DialogProps,
	ButtonContext,
} from "react-aria-components";

const PopoverTrigger = (props: DialogTriggerProps) => {
	const { children, ...restProps } = props;

	return <DialogTrigger {...restProps}>{children}</DialogTrigger>;
};

type PopoverContentProps = Omit<
	PopoverProps & DialogProps,
	"style" | "children"
> & {
	children: DialogProps["children"];
	widthType?: "auto" | "equalToTrigger";
};

const PopoverContent = forwardRef<HTMLElement, PopoverContentProps>(
	(props, ref) => {
		const { children, className, widthType, triggerRef, ...restProps } =
			props;

		const popoverRef = useRef<HTMLElement | null>(null);

		const getPopoverWidth = useCallback(() => {
			const trggerElement = triggerRef?.current;

			if (widthType === "equalToTrigger" && !trggerElement) {
				console.warn(
					"Please provide triggerRef if you want to use widthType=equalToTrigger",
				);
			}
			if (widthType === "equalToTrigger" && trggerElement) {
				return `${trggerElement.getBoundingClientRect().width}px`;
			}
			return "auto";
		}, [widthType, triggerRef]);

		return (
			<Popover
				{...restProps}
				triggerRef={triggerRef}
				ref={setRefs(popoverRef, ref)}
				style={() => ({
					width: getPopoverWidth(),
				})}
				className="data-entering:animate-popup data-exiting:animate-popup-reverse"
			>
				<Dialog
					{...restProps}
					className={
						"outline-hidden bg-white border border-neutral-100 rounded-lg drop-shadow-lg max-h-[inherit] overflow-hidden " +
						className
					}
				>
					{(renderProps) => (
						<ButtonContext.Provider
							value={{
								slots: {
									close: { onPress: renderProps.close },
								},
							}}
						>
							{typeof children === "function"
								? children(renderProps)
								: children}
						</ButtonContext.Provider>
					)}
				</Dialog>
			</Popover>
		);
	},
);

const _Popover = Object.assign(PopoverTrigger, {
	Content: PopoverContent,
});

export { _Popover as Popover };
