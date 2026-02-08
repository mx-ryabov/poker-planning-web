export function buildErrorMsgFrom(
	errorTitle: string,
	errors?: Partial<Record<string, string[]>>,
): string {
	let errorMsg = errorTitle;
	if (errors) {
		const firstKey = Object.keys(errors)[0];
		if (firstKey) {
			const firstError = errors[firstKey]?.[0];
			if (firstError) {
				errorMsg = firstError;
			}
		}
	}
	return errorMsg;
}
