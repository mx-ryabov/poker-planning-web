import { test, describe, expect, vi, beforeEach, afterEach } from "vitest";
import { act, renderHook } from "@/test/utilities";
import { useLocalStorageState } from "./use-local-storage-state";

describe("useLocalStorageState", () => {
	// Mock localStorage
	let localStorageMock: Record<string, string>;
	let testKeyCounter = 0;

	// Helper to generate unique keys for tests that need isolation
	const getUniqueKey = () => `testKey-${testKeyCounter++}`;

	beforeEach(() => {
		// Reset localStorage mock before each test
		localStorageMock = {};

		global.localStorage = {
			getItem: vi.fn((key: string) => {
				return key in localStorageMock ? localStorageMock[key] : null;
			}),
			setItem: vi.fn((key: string, value: string) => {
				localStorageMock[key] = value;
			}),
			removeItem: vi.fn((key: string) => {
				delete localStorageMock[key];
			}),
			clear: vi.fn(() => {
				localStorageMock = {};
			}),
			key: vi.fn((index: number) => Object.keys(localStorageMock)[index]),
			length: 0,
		};
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("initialization", () => {
		test("renders correctly without throwing errors", () => {
			const key = getUniqueKey();
			const { unmount } = renderHook(() => useLocalStorageState(key));
			expect(() => unmount()).not.toThrow();
		});

		test("returns defaultValue when localStorage is empty and defaultValue is provided", () => {
			const key = getUniqueKey();
			const { result } = renderHook(() =>
				useLocalStorageState(key, { defaultValue: "default" }),
			);
			expect(result.current[0]).toBe("default");
		});

		test("returns undefined when localStorage is empty and no defaultValue is provided", () => {
			const key = getUniqueKey();
			const { result } = renderHook(() => useLocalStorageState(key));
			expect(result.current[0]).toBeUndefined();
		});

		test("returns stored value from localStorage when available", () => {
			const key = getUniqueKey();
			localStorageMock[key] = '"stored-value"';
			const { result } = renderHook(() => useLocalStorageState(key));
			expect(result.current[0]).toBe("stored-value");
		});

		test("returns stored value from localStorage even when defaultValue is provided", () => {
			const key = getUniqueKey();
			localStorageMock[key] = '"stored-value"';
			const { result } = renderHook(() =>
				useLocalStorageState(key, { defaultValue: "default" }),
			);
			expect(result.current[0]).toBe("stored-value");
		});
	});

	describe("setState", () => {
		test("sets string value in localStorage", () => {
			const key = getUniqueKey();
			const { result } = renderHook(() =>
				useLocalStorageState<string>(key),
			);

			act(() => {
				result.current[1]("new-value");
			});

			expect(localStorage.setItem).toHaveBeenCalledWith(
				key,
				'"new-value"',
			);
			expect(localStorageMock[key]).toBe('"new-value"');
			expect(result.current[0]).toBe("new-value");
		});

		test("sets object value in localStorage as JSON string", () => {
			const key = getUniqueKey();
			const { result } = renderHook(() =>
				useLocalStorageState<{ name: string }>(key),
			);

			const testObject = { name: "test" };
			act(() => {
				result.current[1](testObject);
			});

			expect(localStorage.setItem).toHaveBeenCalledWith(
				key,
				JSON.stringify(testObject),
			);
			expect(localStorageMock[key]).toEqual(JSON.stringify(testObject));
			expect(result.current[0]).toEqual(testObject);
		});

		test("sets number value in localStorage as JSON string", () => {
			const key = getUniqueKey();
			const { result } = renderHook(() =>
				useLocalStorageState<number>(key),
			);

			act(() => {
				result.current[1](42);
			});
			expect(localStorageMock[key]).toEqual(JSON.stringify(42));
			expect(localStorage.setItem).toHaveBeenCalledWith(
				key,
				JSON.stringify(42),
			);
		});

		test("sets boolean value in localStorage as JSON string", () => {
			const key = getUniqueKey();
			const { result } = renderHook(() =>
				useLocalStorageState<boolean>(key),
			);

			act(() => {
				result.current[1](true);
			});
			expect(localStorageMock[key]).toEqual(JSON.stringify(true));
			expect(localStorage.setItem).toHaveBeenCalledWith(
				key,
				JSON.stringify(true),
			);
		});

		test("updates value multiple times correctly", () => {
			const key = getUniqueKey();
			const { result } = renderHook(() =>
				useLocalStorageState<string>(key),
			);

			act(() => {
				result.current[1]("value1");
			});
			expect(result.current[0]).toBe("value1");

			act(() => {
				result.current[1]("value2");
			});
			expect(result.current[0]).toBe("value2");

			act(() => {
				result.current[1]("value3");
			});
			expect(result.current[0]).toBe("value3");
		});

		test("supports functional updates based on previous value", () => {
			const key = getUniqueKey();
			const { result } = renderHook(() =>
				useLocalStorageState<number>(key, { defaultValue: 1 }),
			);

			act(() => {
				result.current[1](
					(prevValue: number | undefined) => (prevValue ?? 0) + 2,
				);
			});

			expect(result.current[0]).toBe(3);
			expect(localStorage.setItem).toHaveBeenCalledWith(
				key,
				JSON.stringify(3),
			);
		});

		test("functional update handles undefined previous value", () => {
			const key = getUniqueKey();
			const { result } = renderHook(() =>
				useLocalStorageState<number>(key),
			);

			act(() => {
				result.current[1](
					(prevValue: number | undefined) => (prevValue ?? 0) + 1,
				);
			});

			expect(result.current[0]).toBe(1);
			expect(localStorage.setItem).toHaveBeenCalledWith(
				key,
				JSON.stringify(1),
			);
		});

		test("functional update stores raw string values", () => {
			const key = getUniqueKey();
			const { result } = renderHook(() =>
				useLocalStorageState<string>(key, { defaultValue: "start" }),
			);

			act(() => {
				result.current[1](
					(prevValue: string | undefined) =>
						`${prevValue ?? ""}-next`,
				);
			});

			expect(result.current[0]).toBe("start-next");
			expect(localStorage.setItem).toHaveBeenCalledWith(
				key,
				'"start-next"',
			);
			expect(localStorageMock[key]).toBe('"start-next"');
		});
	});

	describe("resetState", () => {
		test("removes value from localStorage", () => {
			const key = getUniqueKey();
			localStorageMock[key] = "stored-value";
			const { result } = renderHook(() =>
				useLocalStorageState(key, { defaultValue: "default" }),
			);

			act(() => {
				result.current[2]();
			});

			expect(localStorage.removeItem).toHaveBeenCalledWith(key);
		});

		test("returns defaultValue after reset when defaultValue is provided", () => {
			const key = getUniqueKey();
			localStorageMock[key] = '"stored-value"';
			const { result } = renderHook(() =>
				useLocalStorageState(key, { defaultValue: "default" }),
			);

			expect(result.current[0]).toBe("stored-value");

			act(() => {
				result.current[2]();
			});

			expect(result.current[0]).toBe("default");
		});

		test("returns undefined after reset when no defaultValue is provided", () => {
			const key = getUniqueKey();
			localStorageMock[key] = '"stored-value"';
			const { result } = renderHook(() =>
				useLocalStorageState<string>(key),
			);

			expect(result.current[0]).toBe("stored-value");

			act(() => {
				result.current[2]();
			});

			expect(result.current[0]).toBeUndefined();
		});
	});

	describe("parse option", () => {
		test("uses parse function to parse stored value", () => {
			const key = getUniqueKey();
			const storedValue = JSON.stringify({ name: "John" });
			localStorageMock[key] = storedValue;

			// Use a stable reference to avoid infinite loops
			const parsedValue = { name: "John" };
			const parse = vi.fn(() => parsedValue);

			const { result } = renderHook(() =>
				useLocalStorageState<{ name: string }>(key, {
					parse: parse,
				}),
			);

			// parse is called by getSnapshot
			expect(parse).toHaveBeenCalled();
			expect(result.current[0]).toEqual(parsedValue);
		});

		test("calls parse function during render", () => {
			const key = getUniqueKey();
			localStorageMock[key] = JSON.stringify({ count: 5 });

			const cachedValue = { count: 5 };
			const parse = vi.fn(() => cachedValue);

			renderHook(() => useLocalStorageState(key, { parse: parse }));

			// Should be called during initial render
			expect(parse).toHaveBeenCalled();
		});

		test("does not use parse when value is null in localStorage", () => {
			const key = getUniqueKey();
			// Don't set any value - localStorage will return null

			const parse = vi.fn((value: string) => JSON.parse(value));

			const { result } = renderHook(() =>
				useLocalStorageState(key, {
					parse: parse,
					defaultValue: "default",
				}),
			);

			// parse should not be called when value is null
			expect(parse).not.toHaveBeenCalled();
			expect(result.current[0]).toBe("default");
		});
	});

	describe("defaultServerValue option", () => {
		test("can specify defaultServerValue for SSR", () => {
			const key = getUniqueKey();
			const { result } = renderHook(() =>
				useLocalStorageState(key, {
					defaultValue: "client-default",
					defaultServerValue: "server-default",
				}),
			);

			// In jsdom, localStorage is available, so this will return client default
			// The actual SSR behavior would need to be tested in a real SSR environment
			// This test verifies the option can be set without errors
			expect(result.current[0]).toBe("client-default");
		});
	});

	describe("syncWithStorage option", () => {
		test("subscribes to storage events when syncWithStorage is true", () => {
			const key = getUniqueKey();
			const addEventListenerSpy = vi.spyOn(window, "addEventListener");

			renderHook(() =>
				useLocalStorageState(key, { syncWithStorage: true }),
			);

			expect(addEventListenerSpy).toHaveBeenCalledWith(
				"storage",
				expect.any(Function),
			);
		});

		test("does not subscribe to storage events when syncWithStorage is false", () => {
			const key = getUniqueKey();
			const addEventListenerSpy = vi.spyOn(window, "addEventListener");

			renderHook(() =>
				useLocalStorageState(key, { syncWithStorage: false }),
			);

			expect(addEventListenerSpy).not.toHaveBeenCalledWith(
				"storage",
				expect.any(Function),
			);
		});

		test("unsubscribes from storage events on unmount", () => {
			const key = getUniqueKey();
			const removeEventListenerSpy = vi.spyOn(
				window,
				"removeEventListener",
			);

			const { unmount } = renderHook(() =>
				useLocalStorageState(key, { syncWithStorage: true }),
			);

			unmount();

			expect(removeEventListenerSpy).toHaveBeenCalledWith(
				"storage",
				expect.any(Function),
			);
		});

		test("syncs value changes from other tabs/windows", () => {
			const key = getUniqueKey();
			const { result } = renderHook(() =>
				useLocalStorageState(key, {
					syncWithStorage: true,
					defaultValue: "initial",
				}),
			);

			expect(result.current[0]).toBe("initial");

			// Simulate storage event from another tab
			act(() => {
				localStorageMock[key] = '"changed-in-another-tab"';
				const storageEvent = new StorageEvent("storage", {
					key: key,
					newValue: "changed-in-another-tab",
					oldValue: "initial",
				});
				window.dispatchEvent(storageEvent);
			});

			expect(result.current[0]).toBe("changed-in-another-tab");
		});

		test("does not sync when storage event is for a different key", () => {
			const key = getUniqueKey();
			const { result } = renderHook(() =>
				useLocalStorageState(key, {
					syncWithStorage: true,
					defaultValue: "initial",
				}),
			);

			expect(result.current[0]).toBe("initial");

			// Simulate storage event for a different key
			act(() => {
				const storageEvent = new StorageEvent("storage", {
					key: "otherKey",
					newValue: "other-value",
				});
				window.dispatchEvent(storageEvent);
			});

			expect(result.current[0]).toBe("initial");
		});

		test("syncs with custom parse function", () => {
			const key = getUniqueKey();
			const { result } = renderHook(() =>
				useLocalStorageState(key, {
					syncWithStorage: true,
					parse: JSON.parse,
					defaultValue: { count: 0 },
				}),
			);

			expect(result.current[0]).toEqual({ count: 0 });

			// Simulate storage event with JSON data
			act(() => {
				localStorageMock[key] = JSON.stringify({ count: 42 });
				const storageEvent = new StorageEvent("storage", {
					key: key,
					newValue: JSON.stringify({ count: 42 }),
				});
				window.dispatchEvent(storageEvent);
			});

			expect(result.current[0]).toEqual({ count: 42 });
		});

		test("handles storage event when item is removed (null newValue)", () => {
			const key = getUniqueKey();
			localStorageMock[key] = '"initial-value"';

			const { result } = renderHook(() =>
				useLocalStorageState(key, {
					syncWithStorage: true,
					defaultValue: "default",
				}),
			);

			expect(result.current[0]).toBe("initial-value");

			// Simulate storage event for removal
			act(() => {
				delete localStorageMock[key];
				const storageEvent = new StorageEvent("storage", {
					key: key,
					newValue: null,
					oldValue: "initial-value",
				});
				window.dispatchEvent(storageEvent);
			});

			// Should fall back to default value
			expect(result.current[0]).toBe("default");
		});
	});

	describe("edge cases", () => {
		test("handles empty string value", () => {
			const key = getUniqueKey();
			// Set empty string explicitly in localStorage
			localStorageMock[key] = '""';

			const { result } = renderHook(() =>
				useLocalStorageState<string>(key),
			);

			// Empty string is a valid value and should be returned
			expect(result.current[0]).toBe("");

			// Verify setter works with empty strings too
			act(() => {
				result.current[1]("non-empty");
			});
			expect(result.current[0]).toBe("non-empty");

			act(() => {
				result.current[1]("");
			});

			expect(localStorageMock[key]).toBe('""');
			expect(result.current[0]).toBe("");
		});

		test("handles null in localStorage with parse", () => {
			const key = getUniqueKey();
			localStorageMock[key] = "null";
			const { result } = renderHook(() =>
				useLocalStorageState(key, {
					parse: (value) => JSON.parse(value),
				}),
			);

			expect(result.current[0]).toBeNull();
		});

		test("handles complex nested objects", () => {
			const key = getUniqueKey();
			const complexObject = {
				user: { name: "John", age: 30 },
				settings: { theme: "dark", notifications: true },
				array: [1, 2, 3],
			};

			const { result } = renderHook(() =>
				useLocalStorageState<typeof complexObject>(key),
			);

			act(() => {
				result.current[1](complexObject);
			});

			expect(localStorage.setItem).toHaveBeenCalledWith(
				key,
				JSON.stringify(complexObject),
			);
		});

		test("handles arrays", () => {
			const key = getUniqueKey();
			const testArray = [1, 2, 3, 4, 5];
			const { result } = renderHook(() =>
				useLocalStorageState<number[]>(key, {
					parse: JSON.parse,
				}),
			);

			act(() => {
				result.current[1](testArray);
			});

			expect(localStorage.setItem).toHaveBeenCalledWith(
				key,
				JSON.stringify(testArray),
			);
			expect(result.current[0]).toEqual(testArray);
		});

		test("handles localStorage being undefined (SSR scenario)", () => {
			const key = getUniqueKey();
			// Temporarily remove localStorage
			const originalLocalStorage = global.localStorage;
			// @ts-expect-error Testing undefined scenario
			global.localStorage = undefined;

			const { result } = renderHook(() =>
				useLocalStorageState<string>(key, { defaultValue: "default" }),
			);

			expect(result.current[0]).toBe("default");

			// Try to set value - should not throw
			act(() => {
				result.current[1]("new-value");
			});

			// Value should remain default since localStorage is unavailable
			expect(result.current[0]).toBe("default");

			// Restore localStorage
			global.localStorage = originalLocalStorage;
		});

		test("falls back to undefined value when JSON.parse fails without custom parse and the defaultValue is undefined", () => {
			const key = getUniqueKey();
			// Store invalid JSON
			localStorageMock[key] = "not-valid-json{";

			const { result } = renderHook(() =>
				useLocalStorageState<string>(key),
			);

			// Should fallback to raw string value
			expect(result.current[0]).toBeUndefined();
		});

		test("falls back to defaultValue value when JSON.parse fails without custom parse and the defaultValue is provided", () => {
			const key = getUniqueKey();
			// Store invalid JSON
			localStorageMock[key] = "not-valid-json{";

			const { result } = renderHook(() =>
				useLocalStorageState<string>(key, { defaultValue: "default" }),
			);

			// Should fallback to defaultValue value
			expect(result.current[0]).toBe("default");
		});

		test("handles parse function that throws an error", () => {
			const key = getUniqueKey();
			localStorageMock[key] = "invalid-data";

			const parse = vi.fn(() => {
				throw new Error("Parse error");
			});

			// Should throw during initialization
			expect(() => {
				renderHook(() => useLocalStorageState(key, { parse }));
			}).toThrow("Parse error");
		});

		test("handles zero as a value", () => {
			const key = getUniqueKey();
			const { result } = renderHook(() =>
				useLocalStorageState<number>(key, {
					parse: JSON.parse,
				}),
			);

			act(() => {
				result.current[1](0);
			});

			expect(result.current[0]).toBe(0);
			expect(localStorageMock[key]).toBe("0");
		});

		test("handles false as a value", () => {
			const key = getUniqueKey();
			const { result } = renderHook(() =>
				useLocalStorageState<boolean>(key, {
					parse: JSON.parse,
				}),
			);

			act(() => {
				result.current[1](false);
			});

			expect(result.current[0]).toBe(false);
			expect(localStorageMock[key]).toBe("false");
		});

		test("handles very large strings", () => {
			const key = getUniqueKey();
			const largeString = "a".repeat(10000);

			const { result } = renderHook(() =>
				useLocalStorageState<string>(key),
			);

			act(() => {
				result.current[1](largeString);
			});

			expect(result.current[0]).toBe(largeString);
			expect(localStorageMock[key]).toBe(`"${largeString}"`);
		});

		test("handles special characters in values", () => {
			const key = getUniqueKey();
			const specialString = '🚀 "quotes" \\backslash\\ \n\t special';

			const { result } = renderHook(() =>
				useLocalStorageState<string>(key),
			);

			act(() => {
				result.current[1](specialString);
			});

			expect(result.current[0]).toBe(specialString);
		});

		test("handles deeply nested objects", () => {
			const key = getUniqueKey();
			const deepObject = {
				level1: {
					level2: {
						level3: {
							level4: {
								value: "deep",
							},
						},
					},
				},
			};

			const { result } = renderHook(() =>
				useLocalStorageState<typeof deepObject>(key, {
					parse: JSON.parse,
				}),
			);

			act(() => {
				result.current[1](deepObject);
			});

			expect(result.current[0]).toEqual(deepObject);
		});

		test("handles dates (serialized as strings)", () => {
			const key = getUniqueKey();
			const date = new Date("2024-01-01");

			const { result } = renderHook(() =>
				useLocalStorageState<Date>(key),
			);

			act(() => {
				result.current[1](date);
			});

			// Date gets JSON.stringify'd to ISO string
			expect(localStorageMock[key]).toBe(JSON.stringify(date));
		});
	});

	describe("state caching", () => {
		test("reuses same state instance for same fieldName", () => {
			const key = getUniqueKey();
			const { result: result1 } = renderHook(() =>
				useLocalStorageState(key),
			);
			const { result: result2 } = renderHook(() =>
				useLocalStorageState(key),
			);

			act(() => {
				result1.current[1]("shared-value");
			});

			// Both hooks should see the same value due to shared state
			expect(result1.current[0]).toBe("shared-value");
			expect(result2.current[0]).toBe("shared-value");
		});

		test("updates all hooks sharing the same fieldName", () => {
			const key = getUniqueKey();
			const { result: result1 } = renderHook(() =>
				useLocalStorageState<string>(key, { defaultValue: "initial" }),
			);
			const { result: result2 } = renderHook(() =>
				useLocalStorageState<string>(key, { defaultValue: "initial" }),
			);
			const { result: result3 } = renderHook(() =>
				useLocalStorageState<string>(key, { defaultValue: "initial" }),
			);

			expect(result1.current[0]).toBe("initial");
			expect(result2.current[0]).toBe("initial");
			expect(result3.current[0]).toBe("initial");

			act(() => {
				result1.current[1]("updated");
			});

			expect(result1.current[0]).toBe("updated");
			expect(result2.current[0]).toBe("updated");
			expect(result3.current[0]).toBe("updated");
		});

		test("reset affects all hooks sharing the same fieldName", () => {
			const key = getUniqueKey();
			const { result: result1 } = renderHook(() =>
				useLocalStorageState<string>(key, { defaultValue: "default" }),
			);
			const { result: result2 } = renderHook(() =>
				useLocalStorageState<string>(key, { defaultValue: "default" }),
			);

			act(() => {
				result1.current[1]("value");
			});

			expect(result1.current[0]).toBe("value");
			expect(result2.current[0]).toBe("value");

			act(() => {
				result2.current[2](); // Reset from second hook
			});

			expect(result1.current[0]).toBe("default");
			expect(result2.current[0]).toBe("default");
		});

		test("warns about different options for same key (conceptual test)", () => {
			const key = getUniqueKey();
			console.warn = vi.fn();
			// First hook creates the cache with one default value
			const { result: result1 } = renderHook(() =>
				useLocalStorageState(key, { defaultValue: "first-default" }),
			);

			// Second hook tries to use different default - but cache is already set
			// This is a known limitation - the first options win
			const { result: result2 } = renderHook(() =>
				useLocalStorageState(key, { defaultValue: "second-default" }),
			);

			// Both should have the first default (cache reuse)
			expect(result1.current[0]).toBe("first-default");
			expect(result2.current[0]).toBe("first-default");
			expect(console.warn).toHaveBeenCalledOnce();
		});
	});

	describe("type safety", () => {
		test("works with string type", () => {
			const key = getUniqueKey();
			const { result } = renderHook(() =>
				useLocalStorageState<string>(key, {
					defaultValue: "default",
				}),
			);

			// Type should be string, not string | undefined
			const value: string = result.current[0];
			expect(typeof value).toBe("string");
		});

		test("works with number type", () => {
			const key = getUniqueKey();
			const { result } = renderHook(() =>
				useLocalStorageState<number>(key, {
					defaultValue: 0,
				}),
			);

			act(() => {
				result.current[1](42);
			});

			expect(typeof result.current[0]).toBe("number");
		});

		test("works with object type", () => {
			const key = getUniqueKey();
			type User = { name: string; age: number };
			const { result } = renderHook(() =>
				useLocalStorageState<User>(key, {
					defaultValue: { name: "John", age: 30 },
				}),
			);

			const value: User = result.current[0];
			expect(typeof value).toBe("object");
		});

		test("returns undefined type when no defaultValue provided", () => {
			const key = getUniqueKey();
			const { result } = renderHook(() =>
				useLocalStorageState<string>(key),
			);

			// Type should be string | undefined
			const value: string | undefined = result.current[0];
			expect(value).toBeUndefined();
		});
	});
});
