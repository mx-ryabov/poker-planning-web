import { buildProvider } from "@/_src/shared/lib";
import { cva } from "class-variance-authority";
import { forwardRef, useCallback } from "react";
import {
	RadioGroup as RadioGroupAria,
	RadioGroupProps as RadioGroupAriaProps,
	RadioGroupRenderProps,
	Radio as RadioAria,
	RadioRenderProps,
	RadioProps as RadioAriaProps,
	Label as LabelAria,
	LabelProps,
	Text,
	TextProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

type RadioGrouProps = {
	variant?: "default" | "content-inside";
	size?: "default" | "large";
} & RadioGroupAriaProps;

const _RadioGroup = forwardRef<HTMLDivElement, RadioGrouProps>((props, ref) => {
	const {
		children,
		variant = "default",
		size = "default",
		className,
		...restProps
	} = props;

	const classNameWithProps = useCallback(
		(
			renderProps: RadioGroupRenderProps & {
				defaultClassName: string | undefined;
			},
		) => {
			const cn =
				typeof className == "function"
					? className(renderProps)
					: className;
			return twMerge("flex flex-col", cn);
		},
		[className],
	);

	return (
		<RadioGroupProvider value={{ variant, size }}>
			<RadioGroupAria
				{...restProps}
				ref={ref}
				className={classNameWithProps}
			>
				{children}
			</RadioGroupAria>
		</RadioGroupProvider>
	);
});

const radioStyles = cva(["text-neutral-500", "transition-colors"], {
	variants: {
		variant: {
			default: [],
			"content-inside": [
				"flex items-center",
				"border rounded-full border-neutral-200",
				"h-14 px-8 max-w-fit",
				"cursor-pointer text-xl",
			],
		},
		isSelected: {
			true: [],
			false: [],
		},
		isFocused: {
			true: [],
			false: [],
		},
		isHovered: {
			true: [],
			false: [],
		},
		size: {
			default: [],
			large: ["mb-3 font-regular"],
		},
	},
	compoundVariants: [
		{
			variant: "content-inside",
			isSelected: true,
			class: ["bg-primary-500 text-white border-primary-500"],
		},
		{
			variant: "content-inside",
			isHovered: true,
			isSelected: false,
			class: ["bg-neutral-100"],
		},
		{
			variant: "content-inside",
			isFocused: true,
			class: ["outline outline-primary-500 outline-offset-2"],
		},
	],
});

const Radio = (props: RadioAriaProps) => {
	const { children, className, ...restProps } = props;
	const { variant, size } = useRadioGroupContext();

	const classNameWithProps = useCallback(
		(
			renderProps: RadioRenderProps & {
				defaultClassName: string | undefined;
			},
		) => {
			return twMerge(
				radioStyles({
					variant,
					size,
					isSelected: renderProps.isSelected,
					isFocused: renderProps.isFocusVisible,
					isHovered: renderProps.isHovered,
				}),
				typeof className == "function"
					? className(renderProps)
					: className,
			);
		},
		[className, variant, size],
	);

	return (
		<RadioAria {...restProps} className={classNameWithProps}>
			{children}
		</RadioAria>
	);
};
const labelStyles = cva(["text-neutral-900"], {
	variants: {
		size: {
			default: [],
			large: ["text-lg mb-4"],
		},
	},
});

const Label = ({ children, className, ...restProps }: LabelProps) => {
	const { size } = useRadioGroupContext();

	return (
		<LabelAria
			{...restProps}
			className={twMerge(labelStyles({ size }), className)}
		>
			{children}
		</LabelAria>
	);
};

const Description = (props: TextProps) => {
	const { children, ...restProps } = props;
	return (
		<Text
			slot="description"
			{...restProps}
			className="flex flex-row items-center gap-1 text-sm text-neutral-300 mt-1"
		>
			{children}
		</Text>
	);
};

export const RadioGroup = Object.assign(_RadioGroup, {
	Radio,
	Label,
	Description,
});

type RadioGroupContext = {
	variant: "default" | "content-inside";
	size?: "default" | "large";
};
const [useRadioGroupContext, RadioGroupProvider] =
	buildProvider<RadioGroupContext>();
