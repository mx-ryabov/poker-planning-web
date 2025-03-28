import { renderHook, act } from "@/test/utilities";
import { describe, test, expect, vi } from "vitest";
import { useInlineEditState } from "./use-inline-edit-state";

describe("useInlineEditState", () => {
	test("should initialize with the given value", () => {
		const { result } = renderHook(() =>
			useInlineEditState({ value: "initial", onConfirm: vi.fn() }),
		);
		expect(result.current.editorValue).toBe("initial");
	});

	test("should update editorValue when setEditorValue is called", () => {
		const { result } = renderHook(() =>
			useInlineEditState({ value: "initial", onConfirm: vi.fn() }),
		);
		act(() => {
			result.current.setEditorValue("updated");
		});
		expect(result.current.editorValue).toBe("updated");
	});

	test("should call onConfirm with the updated value when confirmChanges is called", () => {
		const onConfirm = vi.fn();
		const { result } = renderHook(() =>
			useInlineEditState({ value: "initial", onConfirm }),
		);
		act(() => {
			result.current.setEditorValue("updated");
		});
		act(() => {
			result.current.confirmChanges();
		});

		expect(onConfirm).toHaveBeenCalledWith("updated");
	});

	test("shouldn't call onConfirm when confirmChanges is called and the value is not changed", () => {
		const onConfirm = vi.fn();
		const { result } = renderHook(() =>
			useInlineEditState({ value: "initial", onConfirm }),
		);
		act(() => {
			result.current.confirmChanges();
		});
		expect(onConfirm).not.toHaveBeenCalled();
	});

	test("should reset editorValue to initial value when cancelChanges is called", () => {
		const { result } = renderHook(() =>
			useInlineEditState({ value: "initial", onConfirm: vi.fn() }),
		);
		act(() => {
			result.current.setEditorValue("updated");
			result.current.cancelChanges();
		});
		expect(result.current.editorValue).toBe("initial");
	});

	test("should call onCancel when cancelChanges is called and onCancel is provided", () => {
		const onCancel = vi.fn();
		const { result } = renderHook(() =>
			useInlineEditState({
				value: "initial",
				onConfirm: vi.fn(),
				onCancel,
			}),
		);
		act(() => {
			result.current.cancelChanges();
		});
		expect(onCancel).toHaveBeenCalled();
	});
});
