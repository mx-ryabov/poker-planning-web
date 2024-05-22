// TODO: improve with className, id and other cases
export const mergeProps = (
	...allProps: Record<string, any>[]
): Record<string, any> => {
	const result: Record<string, any> = {};

	for (let elementProps of allProps) {
		for (let key in elementProps) {
			if (result[key] === undefined) {
				result[key] = elementProps[key];
			} else if (
				typeof result[key] === "function" &&
				typeof elementProps[key] === "function"
			) {
				result[key] = function (...args: any[]) {
					result[key](...args);
					elementProps[key](...args);
				};
			}
		}
	}

	return result;
};
