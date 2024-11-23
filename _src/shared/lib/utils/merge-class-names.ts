import { twMerge } from "tailwind-merge";

type ClassName<TRenderProps> =
	| string
	| ((
			_values: TRenderProps & {
				defaultClassName: string | undefined;
			},
	  ) => string)
	| undefined;

export function mergeClassNames<TRenderProps>(
	...classNames: ClassName<TRenderProps>[]
) {
	return (
		renderProps: TRenderProps & {
			defaultClassName: string | undefined;
		},
	) => {
		return twMerge(
			...classNames.map((cn) => {
				return typeof cn == "function" ? cn(renderProps) : cn;
			}),
		);
	};
}
