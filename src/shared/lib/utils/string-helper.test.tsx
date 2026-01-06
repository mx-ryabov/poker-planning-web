import { test, describe, expect } from "vitest";
import { StringHelper } from "./string-helper";

describe("StringHelper", () => {
	describe("getFirstLetters", () => {
		test.each([
			{ text: "Abra Cadabra", maxCount: 1, expectedResult: "A" },
			{ text: "Abra Cadabra", maxCount: 2, expectedResult: "AC" },
			{ text: "Dabra Tadabra", maxCount: 2, expectedResult: "DT" },
		])(
			"returns first letters of words in the text based on maxCount parameter",
			async ({ text, maxCount, expectedResult }) => {
				expect(StringHelper.getFirstLetters(text, maxCount)).toBe(
					expectedResult,
				);
			},
		);

		test("returns emtpy string if text is empty", async () => {
			expect(StringHelper.getFirstLetters("")).toBe("");
		});

		test("returned count of letters is no more than 1 if maxCount isn't provided", async () => {
			expect(StringHelper.getFirstLetters("One Two")).toHaveLength(1);
		});

		test("returned count of letters is no more than maxCount", async () => {
			expect(StringHelper.getFirstLetters("One", 1)).toHaveLength(1);
			expect(StringHelper.getFirstLetters("One Two", 2)).toHaveLength(2);
			expect(
				StringHelper.getFirstLetters("One Two Three", 3),
			).toHaveLength(3);
			expect(
				StringHelper.getFirstLetters("One Two Three Four", 2),
			).toHaveLength(2);
			expect(StringHelper.getFirstLetters("One", 2)).toHaveLength(1);
		});
	});
});
