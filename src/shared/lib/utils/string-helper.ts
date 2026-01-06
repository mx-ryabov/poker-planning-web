export class StringHelper {
	static getFirstLetters(text: string, maxCount: number = 1) {
		return text
			.split(" ")
			.map((word) => {
				const letters = word.match(/[a-zA-Z]/g) || [];
				return letters[0];
			})
			.join("")
			.slice(0, maxCount);
	}

	static cleanUpString(
		input: string,
		options?: { onlyWords?: boolean },
	): string {
		const result = input.trim().replace(/\s+/g, " ");
		return options?.onlyWords ? result.replace(/[^\w\s]/g, "") : result;
	}
}
