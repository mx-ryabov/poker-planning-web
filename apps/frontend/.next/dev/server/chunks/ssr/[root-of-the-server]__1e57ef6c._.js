;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="fde5d82e-7cea-8647-191f-5a368a237fd5")}catch(e){}}();
module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/apps/frontend/src/shared/ui/styles/button.styles.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "COLOR_SCHEMES",
    ()=>COLOR_SCHEMES,
    "buttonStyles",
    ()=>buttonStyles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$class$2d$variance$2d$authority$40$0$2e$7$2e$0$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/class-variance-authority@0.7.0/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
;
const COLOR_SCHEMES = {
    primary: {
        "--main-color": "var(--color-primary-600)",
        "--main-light-color": "var(--color-primary-100)",
        "--hovered-color": "var(--color-primary-700)",
        "--pressed-color": "var(--color-primary-800)",
        "--shadow-color": "var(--color-primary-900)",
        "--text-color": "var(--color-white)"
    },
    secondary: {
        "--main-color": "var(--color-secondary-600)",
        "--main-light-color": "var(--color-secondary-100)",
        "--hovered-color": "var(--color-secondary-700)",
        "--pressed-color": "var(--color-secondary-800)",
        "--shadow-color": "var(--color-secondary-900)",
        "--text-color": "var(--color-white)"
    },
    danger: {
        "--main-color": "var(--color-error-700)",
        "--main-light-color": "var(--color-error-100)",
        "--hovered-color": "var(--color-error-800)",
        "--pressed-color": "var(--color-error-900)",
        "--shadow-color": "var(--color-error-900)",
        "--text-color": "var(--color-white)"
    },
    warning: {
        "--main-color": "var(--color-warning-600)",
        "--main-light-color": "var(--color-warning-100)",
        "--hovered-color": "var(--color-warning-700)",
        "--pressed-color": "var(--color-warning-800)",
        "--shadow-color": "var(--color-warning-900)",
        "--text-color": "var(--color-black)"
    },
    info: {
        "--main-color": "var(--color-info-600)",
        "--main-light-color": "var(--color-info-100)",
        "--hovered-color": "var(--color-info-700)",
        "--pressed-color": "var(--color-info-800)",
        "--shadow-color": "var(--color-info-900)",
        "--text-color": "var(--color-black)"
    },
    success: {
        "--main-color": "var(--color-success-600)",
        "--main-light-color": "var(--color-success-100)",
        "--hovered-color": "var(--color-success-700)",
        "--pressed-color": "var(--color-success-800)",
        "--shadow-color": "var(--color-success-900)",
        "--text-color": "var(--color-black)"
    },
    neutral: {
        "--main-color": "var(--color-neutral-500)",
        "--main-light-color": "var(--color-neutral-100)",
        "--hovered-color": "var(--color-neutral-600)",
        "--pressed-color": "var(--color-neutral-700)",
        "--shadow-color": "var(--color-neutral-900)",
        "--text-color": "var(--color-black)"
    }
};
const buttonStyles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$class$2d$variance$2d$authority$40$0$2e$7$2e$0$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])([
    "transition-all",
    "duration-150",
    "flex",
    "justify-center",
    "items-center",
    "gap-x-2",
    "w-fit",
    // We need all these colors (css variables) to be initialized for COLOR_SCHEMES
    // They won't be applied anyway because of variants
    "text-primary-500 text-primary-100 text-primary-600 text-primary-700 text-primary-800 text-primary-900",
    "text-secondary-500 text-secondary-100 text-secondary-600 text-secondary-700 text-secondary-800 text-secondary-900",
    "text-error-500 text-error-100 text-error-600 text-error-700 text-error-900",
    "text-warning-500 text-warning-100 text-warning-600 text-warning-700 text-warning-900",
    "text-info-500 text-info-100 text-info-600 text-info-700 text-info-900",
    "text-success-500 text-success-100 text-success-600 text-success-700 text-success-900",
    "text-neutral-900 text-neutral-100 text-neutral-600 text-neutral-700 text-neutral-800"
], {
    variants: {
        size: {
            small: [
                "text-xs",
                "min-h-8",
                "max-h-8",
                "rounded-md",
                "text-xs"
            ],
            medium: [
                "text-sm",
                "h-10",
                "rounded-lg"
            ],
            large: [
                "text-sm md:text-base",
                "h-13 md:h-14",
                "rounded-lg"
            ]
        },
        variant: {
            default: [
                "bg-[var(--main-color)]",
                "text-[var(--text-color)]",
                "font-medium"
            ],
            outline: [
                "bg-white",
                "text-neutral-900",
                "border",
                "border-neutral-900",
                "font-medium"
            ],
            ghost: [
                "bg-transparent",
                "text-neutral-900",
                "font-medium"
            ],
            "grayed-out": [
                "bg-neutral-200",
                "text-neutral-900"
            ]
        },
        form: {
            default: [],
            square: [
                "px-0"
            ]
        },
        isPressed: {
            true: []
        },
        isDisabled: {
            true: [
                "drop-shadow-none"
            ],
            false: [
                "cursor-pointer"
            ]
        },
        isHovered: {
            true: []
        },
        excludeFromFocus: {
            true: [
                "outline-hidden!"
            ],
            false: []
        },
        isFocused: {
            true: [
                "outline-[var(--main-color)]",
                "outline-offset-2"
            ],
            false: [
                "outline-hidden"
            ]
        }
    },
    compoundVariants: [
        // Default
        {
            isHovered: true,
            variant: "default",
            className: [
                "bg-[var(--hovered-color)]"
            ]
        },
        {
            isPressed: true,
            variant: "default",
            className: [
                "bg-[var(--pressed-color)]"
            ]
        },
        {
            isDisabled: true,
            variant: "default",
            className: [
                "bg-neutral-200",
                "text-neutral-600",
                "cursor-not-allowed"
            ]
        },
        // Outline
        {
            isHovered: true,
            variant: "outline",
            className: [
                "bg-neutral-200"
            ]
        },
        {
            isPressed: true,
            variant: "outline",
            className: [
                "bg-neutral-300"
            ]
        },
        {
            isDisabled: true,
            variant: "outline",
            className: [
                "bg-neutral-100",
                "border-neutral-500",
                "text-neutral-600",
                "cursor-not-allowed"
            ]
        },
        // Ghost
        {
            isHovered: true,
            variant: "ghost",
            className: [
                "bg-neutral-800/20"
            ]
        },
        {
            isPressed: true,
            variant: "ghost",
            className: [
                "bg-neutral-900/20"
            ]
        },
        {
            isDisabled: true,
            variant: "ghost",
            className: [
                "text-neutral-500",
                "cursor-not-allowed"
            ]
        },
        // Grayed Out
        {
            isHovered: true,
            variant: "grayed-out",
            className: [
                "bg-neutral-300"
            ]
        },
        {
            isPressed: true,
            variant: "grayed-out",
            className: [
                "bg-neutral-400"
            ]
        },
        {
            isDisabled: true,
            variant: "grayed-out",
            className: [
                "bg-neutral-100",
                "text-neutral-400",
                "cursor-not-allowed"
            ]
        },
        // Square
        {
            size: "small",
            form: "square",
            className: [
                "min-w-8",
                "max-w-8"
            ]
        },
        {
            size: "medium",
            form: "square",
            className: [
                "w-10"
            ]
        },
        {
            size: "large",
            form: "square",
            className: [
                "w-14",
                "rounded-xl"
            ]
        },
        {
            size: "small",
            form: "default",
            className: [
                "px-2"
            ]
        },
        {
            size: "medium",
            form: "default",
            className: [
                "px-4"
            ]
        },
        {
            size: "large",
            form: "default",
            className: [
                "px-8"
            ]
        }
    ]
});
}),
"[project]/apps/frontend/src/shared/ui/components/button/button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f42438f6717e44ec3de5d0c1806f5fb0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$aria$2d$components$40$1$2e$14$2e$_b8b5db726aee419cb31a059ec75e5f5c$2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-aria-components@1.14._b8b5db726aee419cb31a059ec75e5f5c/node_modules/react-aria-components/dist/Button.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$aria$2d$components$40$1$2e$14$2e$_b8b5db726aee419cb31a059ec75e5f5c$2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-aria-components@1.14._b8b5db726aee419cb31a059ec75e5f5c/node_modules/react-aria-components/dist/utils.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$aria$2b$utils$40$3$2e$32$2e$0_re_f6d032213003e04552971b1a31af1517$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$mergeProps$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@react-aria+utils@3.32.0_re_f6d032213003e04552971b1a31af1517/node_modules/@react-aria/utils/dist/mergeProps.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$aria$2b$button$40$3$2e$14$2e$3_r_97fd0c598551e737823ee51a30d800f7$2f$node_modules$2f40$react$2d$aria$2f$button$2f$dist$2f$useButton$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@react-aria+button@3.14.3_r_97fd0c598551e737823ee51a30d800f7/node_modules/@react-aria/button/dist/useButton.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$aria$2b$focus$40$3$2e$21$2e$3_re_578b15553fa470aeba86c903286577bf$2f$node_modules$2f40$react$2d$aria$2f$focus$2f$dist$2f$useFocusRing$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@react-aria+focus@3.21.3_re_578b15553fa470aeba86c903286577bf/node_modules/@react-aria/focus/dist/useFocusRing.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$aria$2b$interactions$40$3$2e$_0ba26ad6a862225314c7a312bac9494a$2f$node_modules$2f40$react$2d$aria$2f$interactions$2f$dist$2f$useHover$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@react-aria+interactions@3._0ba26ad6a862225314c7a312bac9494a/node_modules/@react-aria/interactions/dist/useHover.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$2$2e$5$2e$3$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/tailwind-merge@2.5.3/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$styles$2f$button$2e$styles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/ui/styles/button.styles.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$class$2d$variance$2d$authority$40$0$2e$7$2e$0$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/class-variance-authority@0.7.0/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const spinnerStyles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$class$2d$variance$2d$authority$40$0$2e$7$2e$0$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("flex justify-center items-center", {
    variants: {
        isActive: {
            true: "block animate-fade-in-with-resize *:animate-scale-up",
            false: "hidden"
        }
    }
});
function Button(props) {
    let { ref, ...restProps } = props;
    [restProps, ref] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$aria$2d$components$40$1$2e$14$2e$_b8b5db726aee419cb31a059ec75e5f5c$2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContextProps"])(restProps, ref, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$aria$2d$components$40$1$2e$14$2e$_b8b5db726aee419cb31a059ec75e5f5c$2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Button$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ButtonContext"]);
    const { size = "medium", variant = "default", appearance = "primary", isPending = false, shape = "default", children, role, className } = restProps;
    const { buttonProps, isPressed } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$aria$2b$button$40$3$2e$14$2e$3_r_97fd0c598551e737823ee51a30d800f7$2f$node_modules$2f40$react$2d$aria$2f$button$2f$dist$2f$useButton$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useButton"])({
        ...restProps,
        isDisabled: restProps.isDisabled || isPending
    }, ref);
    const { hoverProps, isHovered } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$aria$2b$interactions$40$3$2e$_0ba26ad6a862225314c7a312bac9494a$2f$node_modules$2f40$react$2d$aria$2f$interactions$2f$dist$2f$useHover$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useHover"])({
        ...restProps,
        isDisabled: restProps.isDisabled || isPending
    });
    const { focusProps, isFocused, isFocusVisible } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$aria$2b$focus$40$3$2e$21$2e$3_re_578b15553fa470aeba86c903286577bf$2f$node_modules$2f40$react$2d$aria$2f$focus$2f$dist$2f$useFocusRing$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFocusRing"])(restProps);
    const isChildrenVisible = !(isPending && shape === "square");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        style: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$styles$2f$button$2e$styles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLOR_SCHEMES"][appearance],
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$2$2e$5$2e$3$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$styles$2f$button$2e$styles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buttonStyles"])({
            size,
            variant,
            form: shape,
            excludeFromFocus: restProps.excludeFromTabOrder,
            // we need to get the ButtonContextValue from the context, but for some reason it's not exposed for public usage
            isPressed: isPressed || restProps.isPressed,
            isFocused: isFocusVisible,
            isHovered,
            isDisabled: restProps.isDisabled || isPending
        }), className),
        ref: ref,
        role: role || "button",
        "data-focused": isFocused || undefined,
        "aria-label": buttonProps["aria-label"] || "icon button",
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$aria$2b$utils$40$3$2e$32$2e$0_re_f6d032213003e04552971b1a31af1517$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$mergeProps$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])(buttonProps, focusProps, hoverProps),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: spinnerStyles({
                    isActive: isPending
                }),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-r-primary-500 animate-rotation-linear aspect-square w-4 rounded-full border-2 border-y-neutral-200 border-l-neutral-200"
                    }, void 0, false, {
                        fileName: "[project]/apps/frontend/src/shared/ui/components/button/button.tsx",
                        lineNumber: 95,
                        columnNumber: 6
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/frontend/src/shared/ui/components/button/button.tsx",
                    lineNumber: 94,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/frontend/src/shared/ui/components/button/button.tsx",
                lineNumber: 93,
                columnNumber: 4
            }, this),
            isChildrenVisible && children
        ]
    }, void 0, true, {
        fileName: "[project]/apps/frontend/src/shared/ui/components/button/button.tsx",
        lineNumber: 65,
        columnNumber: 3
    }, this);
}
}),
"[project]/apps/frontend/src/shared/ui/components/button/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$components$2f$button$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/ui/components/button/button.tsx [app-ssr] (ecmascript)");
"use client";
;
}),
"[project]/apps/frontend/src/shared/ui/components/icon/icon-builder.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "iconBuilder",
    ()=>iconBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f42438f6717e44ec3de5d0c1806f5fb0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const StrokeWidth = {
    bold: 2.5,
    regular: 1.5,
    light: 1
};
function iconBuilder(iconComponent, iconName) {
    return ({ color, size = 24, thikness = "regular", ...restHtmlProps })=>{
        const svgProps = {
            color: color,
            width: size,
            height: size,
            strokeWidth: StrokeWidth[thikness]
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
            style: {
                display: "block",
                width: `${svgProps.width}px`,
                height: `${svgProps.height}px`
            },
            "data-testid": restHtmlProps["data-testid"] || `icon-${iconName}`,
            ...restHtmlProps,
            children: iconComponent(svgProps)
        }, void 0, false, {
            fileName: "[project]/apps/frontend/src/shared/ui/components/icon/icon-builder.tsx",
            lineNumber: 40,
            columnNumber: 4
        }, this);
    };
}
}),
"[project]/apps/frontend/src/shared/ui/components/icon/svg/close.icon.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CloseIcon",
    ()=>CloseIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f42438f6717e44ec3de5d0c1806f5fb0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$components$2f$icon$2f$icon$2d$builder$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/ui/components/icon/icon-builder.tsx [app-ssr] (ecmascript)");
;
;
const CloseIcon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$components$2f$icon$2f$icon$2d$builder$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["iconBuilder"])((props)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "100%",
        height: "100%",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M7 17L17 7",
                stroke: props.color || "currentColor",
                strokeWidth: props.strokeWidth,
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/apps/frontend/src/shared/ui/components/icon/svg/close.icon.tsx",
                lineNumber: 13,
                columnNumber: 4
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M17 17L7 7",
                stroke: props.color || "currentColor",
                strokeWidth: props.strokeWidth,
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/apps/frontend/src/shared/ui/components/icon/svg/close.icon.tsx",
                lineNumber: 20,
                columnNumber: 4
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/apps/frontend/src/shared/ui/components/icon/svg/close.icon.tsx",
        lineNumber: 6,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
}, "CloseIcon");
}),
"[project]/apps/frontend/src/shared/ui/components/modal/modal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Modal",
    ()=>Modal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f42438f6717e44ec3de5d0c1806f5fb0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$class$2d$variance$2d$authority$40$0$2e$7$2e$0$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/class-variance-authority@0.7.0/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f42438f6717e44ec3de5d0c1806f5fb0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$aria$2d$components$40$1$2e$14$2e$_b8b5db726aee419cb31a059ec75e5f5c$2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Dialog$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-aria-components@1.14._b8b5db726aee419cb31a059ec75e5f5c/node_modules/react-aria-components/dist/Dialog.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$aria$2d$components$40$1$2e$14$2e$_b8b5db726aee419cb31a059ec75e5f5c$2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Modal$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-aria-components@1.14._b8b5db726aee419cb31a059ec75e5f5c/node_modules/react-aria-components/dist/Modal.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$aria$2d$components$40$1$2e$14$2e$_b8b5db726aee419cb31a059ec75e5f5c$2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Heading$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-aria-components@1.14._b8b5db726aee419cb31a059ec75e5f5c/node_modules/react-aria-components/dist/Heading.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$2$2e$5$2e$3$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/tailwind-merge@2.5.3/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
function DialogTrigger({ children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$aria$2d$components$40$1$2e$14$2e$_b8b5db726aee419cb31a059ec75e5f5c$2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Dialog$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTrigger"], {
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/frontend/src/shared/ui/components/modal/modal.tsx",
        lineNumber: 20,
        columnNumber: 9
    }, this);
}
function Dialog(props) {
    const { children, ...restProps } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$aria$2d$components$40$1$2e$14$2e$_b8b5db726aee419cb31a059ec75e5f5c$2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Modal$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ModalOverlay"], {
        ...restProps,
        className: overlayStyles,
        "data-testid": "dialog-overlay",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$aria$2d$components$40$1$2e$14$2e$_b8b5db726aee419cb31a059ec75e5f5c$2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Modal$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Modal"], {
            className: modalStyles,
            "data-testid": "modal-container",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$aria$2d$components$40$1$2e$14$2e$_b8b5db726aee419cb31a059ec75e5f5c$2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Dialog$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
                className: "flex flex-col gap-4 bg-white px-2 py-1",
                "data-testid": restProps?.["data-testid"],
                children: children
            }, void 0, false, {
                fileName: "[project]/apps/frontend/src/shared/ui/components/modal/modal.tsx",
                lineNumber: 36,
                columnNumber: 5
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/frontend/src/shared/ui/components/modal/modal.tsx",
            lineNumber: 35,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/frontend/src/shared/ui/components/modal/modal.tsx",
        lineNumber: 30,
        columnNumber: 3
    }, this);
}
function Header({ children }) {
    const triggerState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$aria$2d$components$40$1$2e$14$2e$_b8b5db726aee419cb31a059ec75e5f5c$2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Dialog$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OverlayTriggerStateContext"]);
    if (!triggerState) {
        console.error("Modal Header has OverlayTriggerStateContext null value. Probably you don't use this component within Modal.Dialog");
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-row items-center justify-between",
        children: typeof children === "function" ? children({
            close: triggerState.close
        }) : children
    }, void 0, false, {
        fileName: "[project]/apps/frontend/src/shared/ui/components/modal/modal.tsx",
        lineNumber: 59,
        columnNumber: 3
    }, this);
}
function Title({ children, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$aria$2d$components$40$1$2e$14$2e$_b8b5db726aee419cb31a059ec75e5f5c$2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Heading$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Heading"], {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$2$2e$5$2e$3$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])("text-xl font-semibold text-neutral-900", className),
        slot: "title",
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/frontend/src/shared/ui/components/modal/modal.tsx",
        lineNumber: 73,
        columnNumber: 3
    }, this);
}
function Body({ children, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: className,
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/frontend/src/shared/ui/components/modal/modal.tsx",
        lineNumber: 90,
        columnNumber: 9
    }, this);
}
function Footer({ children, className }) {
    const triggerState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$aria$2d$components$40$1$2e$14$2e$_b8b5db726aee419cb31a059ec75e5f5c$2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Dialog$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OverlayTriggerStateContext"]);
    if (!triggerState) {
        console.error("Modal Footer has OverlayTriggerStateContext null value. Probably you don't use this component within Modal.Dialog");
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$2$2e$5$2e$3$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])("flex flex-row justify-end gap-2", className),
        children: typeof children === "function" ? children({
            close: triggerState.close
        }) : children
    }, void 0, false, {
        fileName: "[project]/apps/frontend/src/shared/ui/components/modal/modal.tsx",
        lineNumber: 106,
        columnNumber: 3
    }, this);
}
const Modal = Object.assign(DialogTrigger, {
    Dialog,
    Header,
    Title,
    Body,
    Footer
});
const overlayStyles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$class$2d$variance$2d$authority$40$0$2e$7$2e$0$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("fixed inset-0 flex items-center justify-center w-full h-full bg-neutral-900/30 backdrop-blur z-10", {
    variants: {
        isEntering: {
            true: "animate-fade-in duration-300 ease-out",
            false: ""
        },
        isExiting: {
            true: "animate-fade-out duration-200 ease-in",
            false: ""
        }
    }
});
const modalStyles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$class$2d$variance$2d$authority$40$0$2e$7$2e$0$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("w-full max-w-md overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl", {
    variants: {
        isEntering: {
            true: "animate-fade-in-scale",
            false: ""
        },
        isExiting: {
            true: "animate-fade-out-scale",
            false: ""
        }
    }
});
}),
"[project]/apps/frontend/src/shared/ui/components/modal/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$components$2f$modal$2f$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/ui/components/modal/modal.tsx [app-ssr] (ecmascript)");
;
}),
"[project]/apps/frontend/src/shared/ui/components/modals/confirmation-modal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConfirmationModal",
    ()=>ConfirmationModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f42438f6717e44ec3de5d0c1806f5fb0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$components$2f$button$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/ui/components/button/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$components$2f$button$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/ui/components/button/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$components$2f$icon$2f$svg$2f$close$2e$icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/ui/components/icon/svg/close.icon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$components$2f$modal$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/ui/components/modal/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$components$2f$modal$2f$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/ui/components/modal/modal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f42438f6717e44ec3de5d0c1806f5fb0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
;
;
;
function ConfirmationModal({ isOpen, onOpenChange, state }) {
    const [isPending, startTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransition"])();
    const confirm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        startTransition(async ()=>{
            await state?.onConfirm();
            onOpenChange(false);
        });
    }, [
        state,
        onOpenChange
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$components$2f$modal$2f$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Modal"].Dialog, {
        isDismissable: true,
        isOpen: isOpen,
        onOpenChange: onOpenChange,
        "data-testid": "confirmation-modal",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$components$2f$modal$2f$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Modal"].Header, {
                children: ({ close })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$components$2f$modal$2f$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Modal"].Title, {
                                children: state?.title
                            }, void 0, false, {
                                fileName: "[project]/apps/frontend/src/shared/ui/components/modals/confirmation-modal.tsx",
                                lineNumber: 46,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$components$2f$button$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                shape: "square",
                                "data-testid": "dismiss-button",
                                onPress: close,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$components$2f$icon$2f$svg$2f$close$2e$icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CloseIcon"], {
                                    className: "w-8 h-8"
                                }, void 0, false, {
                                    fileName: "[project]/apps/frontend/src/shared/ui/components/modals/confirmation-modal.tsx",
                                    lineNumber: 53,
                                    columnNumber: 8
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/frontend/src/shared/ui/components/modals/confirmation-modal.tsx",
                                lineNumber: 47,
                                columnNumber: 7
                            }, this)
                        ]
                    }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/apps/frontend/src/shared/ui/components/modals/confirmation-modal.tsx",
                lineNumber: 43,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$components$2f$modal$2f$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Modal"].Body, {
                children: state?.contentMessage
            }, void 0, false, {
                fileName: "[project]/apps/frontend/src/shared/ui/components/modals/confirmation-modal.tsx",
                lineNumber: 58,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$components$2f$modal$2f$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Modal"].Footer, {
                children: ({ close })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$components$2f$button$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                onPress: close,
                                "data-testid": "cancel-button",
                                variant: "ghost",
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/apps/frontend/src/shared/ui/components/modals/confirmation-modal.tsx",
                                lineNumber: 62,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$components$2f$button$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                isPending: isPending,
                                onPress: confirm,
                                "data-testid": "confirm-button",
                                appearance: state?.confirmBtnAppearence,
                                children: state?.confirmBtnText || ""
                            }, void 0, false, {
                                fileName: "[project]/apps/frontend/src/shared/ui/components/modals/confirmation-modal.tsx",
                                lineNumber: 69,
                                columnNumber: 7
                            }, this)
                        ]
                    }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/apps/frontend/src/shared/ui/components/modals/confirmation-modal.tsx",
                lineNumber: 59,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/frontend/src/shared/ui/components/modals/confirmation-modal.tsx",
        lineNumber: 37,
        columnNumber: 3
    }, this);
}
}),
"[project]/apps/frontend/src/shared/ui/components/modals/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$components$2f$modals$2f$confirmation$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/ui/components/modals/confirmation-modal.tsx [app-ssr] (ecmascript)");
;
}),
"[project]/apps/frontend/src/shared/providers/confirmation-modal-provider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConfirmationModalContext",
    ()=>ConfirmationModalContext,
    "ConfirmationModalProvider",
    ()=>ConfirmationModalProvider,
    "useConfirmationModal",
    ()=>useConfirmationModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f42438f6717e44ec3de5d0c1806f5fb0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f42438f6717e44ec3de5d0c1806f5fb0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$components$2f$modals$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/ui/components/modals/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$components$2f$modals$2f$confirmation$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/ui/components/modals/confirmation-modal.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
const ConfirmationModalContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function ConfirmationModalProvider({ children }) {
    const [isOpen, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [modalState, setModalState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])();
    const openModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((modalState)=>{
        setOpen(true);
        setModalState(modalState);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ConfirmationModalContext.Provider, {
        value: {
            open: openModal
        },
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$components$2f$modals$2f$confirmation$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConfirmationModal"], {
                isOpen: isOpen,
                onOpenChange: setOpen,
                state: modalState
            }, void 0, false, {
                fileName: "[project]/apps/frontend/src/shared/providers/confirmation-modal-provider.tsx",
                lineNumber: 39,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/frontend/src/shared/providers/confirmation-modal-provider.tsx",
        lineNumber: 37,
        columnNumber: 3
    }, this);
}
function useConfirmationModal() {
    const modalContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ConfirmationModalContext);
    if (!modalContext) {
        throw new Error("useConfirmationModal must be within ConfirmationModalProvider");
    }
    return modalContext;
}
}),
"[project]/apps/frontend/src/shared/lib/utils/set-refs.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setRefs",
    ()=>setRefs
]);
function setRefs(localRef, forwardRef) {
    return (element)=>{
        localRef.current = element;
        if (typeof forwardRef === "function") {
            forwardRef(element);
        } else if (forwardRef) {
            forwardRef.current = element;
        }
    };
}
}),
"[project]/apps/frontend/src/shared/lib/utils/string-helper.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StringHelper",
    ()=>StringHelper
]);
class StringHelper {
    static getFirstLetters(text, maxCount = 1) {
        return text.split(" ").map((word)=>{
            const letters = word.match(/[a-zA-Z]/g) || [];
            return letters[0];
        }).join("").slice(0, maxCount);
    }
    static cleanUpString(input, options) {
        const result = input.trim().replace(/\s+/g, " ");
        return options?.onlyWords ? result.replace(/[^\w\s]/g, "") : result;
    }
}
}),
"[project]/apps/frontend/src/shared/lib/utils/build-field-validator.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildFieldValidator",
    ()=>buildFieldValidator
]);
function buildFieldValidator(validator) {
    return (value)=>{
        const errRes = validator.safeParse(value);
        if (errRes.success) {
            return null;
        }
        return errRes.error.errors.map((e)=>e.message).join("; ");
    };
}
}),
"[project]/apps/frontend/src/shared/lib/utils/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
// import it directly until this issue is fixed https://github.com/storybookjs/storybook/issues/29421
//export * from "./app-fetch";
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$utils$2f$set$2d$refs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/lib/utils/set-refs.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$utils$2f$string$2d$helper$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/lib/utils/string-helper.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$utils$2f$build$2d$field$2d$validator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/lib/utils/build-field-validator.ts [app-ssr] (ecmascript)");
;
;
;
}),
"[project]/apps/frontend/src/shared/lib/hooks/use-local-storage-state.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__clearStorageCache__TestOnly",
    ()=>__clearStorageCache__TestOnly,
    "useLocalStorageState",
    ()=>useLocalStorageState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f42438f6717e44ec3de5d0c1806f5fb0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
function useLocalStorageState(fieldName, options = {}) {
    const [stableOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>({
            syncWithStorage: true,
            ...options
        }));
    const { subscribe, getSnapshot, getServerSnapshot, setState, resetState, subscribeOnStorageChange } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>buildState(fieldName, stableOptions), [
        fieldName,
        stableOptions
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (stableOptions.syncWithStorage) {
            return subscribeOnStorageChange();
        }
    }, [
        stableOptions.syncWithStorage,
        subscribeOnStorageChange
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(subscribe, getSnapshot, getServerSnapshot);
    return [
        value,
        setState,
        resetState
    ];
}
class LocalStorageState {
    fieldName;
    value;
    options;
    listeners;
    get storedOptions() {
        return this.options;
    }
    constructor(fieldName, options){
        this.fieldName = fieldName;
        this.options = options ?? {
            defaultValue: undefined
        };
        this.initializeValue();
        this.listeners = new Set();
    }
    setState(newValue, notifyListeners = true) {
        if (isSsr()) {
            return;
        }
        const valueToSet = typeof newValue === "function" ? newValue(this.value) : newValue;
        const valueToStorage = JSON.stringify(valueToSet);
        localStorage.setItem(this.fieldName, valueToStorage);
        this.value = valueToSet;
        if (notifyListeners) {
            this.notifyListeners();
        }
    }
    resetState(notifyListeners = true) {
        if (isSsr()) {
            return;
        }
        localStorage.removeItem(this.fieldName);
        this.value = this.options.defaultValue;
        if (notifyListeners) {
            this.notifyListeners();
        }
    }
    subscribe(callback) {
        this.listeners.add(callback);
        return ()=>this.listeners.delete(callback);
    }
    getSnapshot() {
        return this.value;
    }
    getServerSnapshot() {
        return this.options.defaultServerValue;
    }
    boundOnStorageChange;
    subscribeOnStorageChange() {
        if (isSsr()) {
            return;
        }
        if (!this.boundOnStorageChange) {
            this.boundOnStorageChange = this.onStorageChange.bind(this);
        }
        window.addEventListener("storage", this.boundOnStorageChange);
        return ()=>{
            if (this.boundOnStorageChange) {
                window.removeEventListener("storage", this.boundOnStorageChange);
            }
        };
    }
    initializeValue() {
        if (isSsr()) {
            this.value = this.options.defaultServerValue || this.options.defaultValue;
            return;
        }
        this.updateValueFromStorage();
    }
    updateValueFromStorage() {
        const value = localStorage.getItem(this.fieldName);
        if (value === null) {
            this.value = this.options.defaultValue;
            return;
        }
        let parseResult = {
            ok: true
        };
        let parsedValue = this.options.defaultValue;
        if (this.options.parse) {
            parsedValue = this.options.parse(value);
        } else {
            try {
                parsedValue = JSON.parse(value);
            } catch (e) {
                parseResult = {
                    ok: false,
                    error: String(e)
                };
            }
        }
        // if (this.options.schema) {
        // 	const result = this.options.schema.safeParse(parsedValue);
        // 	if (!result.success) {
        // 		parseResult = { ok: false, error: result.error.message };
        // 	}
        // }
        if (!parseResult.ok) {
            console.warn(`useLocalStorageState: Failed to parse value "${value}" for key "${this.fieldName}": ${parseResult.error}`);
            parsedValue = this.options.defaultValue;
            if (parsedValue !== undefined) {
                this.setState(parsedValue, false);
            } else {
                this.resetState(false);
            }
        }
        this.value = parsedValue;
    }
    onStorageChange(event) {
        if (event.key === this.fieldName) {
            this.updateValueFromStorage();
            this.notifyListeners();
        }
    }
    notifyListeners() {
        for (const listener of this.listeners){
            listener();
        }
    }
}
class LocalStorageStateCacheManager {
    statesCache = new Map();
    getState(fieldName) {
        return this.statesCache.get(fieldName);
    }
    setState(fieldName, state) {
        this.statesCache.set(fieldName, state);
    }
    clearCache() {
        this.statesCache.clear();
    }
}
const cacheManager = new LocalStorageStateCacheManager();
const __clearStorageCache__TestOnly = cacheManager.clearCache.bind(cacheManager);
function buildState(fieldName, options) {
    let state = cacheManager.getState(fieldName);
    if (state === undefined) {
        state = new LocalStorageState(fieldName, options);
        cacheManager.setState(fieldName, state);
    } else {
        if (JSON.stringify(state.storedOptions) !== JSON.stringify(options)) {
            console.warn(`useLocalStorageState: Key "${fieldName}" is already cached with different options. First options will be used.\n`, `First options: ${JSON.stringify(state.storedOptions)}\n`, `Second options: ${JSON.stringify(options)}\n`, "If it's expected to get the same value from different places, consider using this hook inside your custom hook where you can provide the options once.\n", "Otherwise, it's possible that the key is already taken and you need consider using another one.");
        }
    }
    return {
        subscribe: state.subscribe.bind(state),
        getSnapshot: state.getSnapshot.bind(state),
        getServerSnapshot: state.getServerSnapshot.bind(state),
        setState: state.setState.bind(state),
        resetState: state.resetState.bind(state),
        subscribeOnStorageChange: state.subscribeOnStorageChange.bind(state)
    };
}
function isSsr() {
    return typeof localStorage === "undefined";
}
}),
"[project]/apps/frontend/src/shared/lib/hooks/provider-builder.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildProvider",
    ()=>buildProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f42438f6717e44ec3de5d0c1806f5fb0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f42438f6717e44ec3de5d0c1806f5fb0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function buildProvider() {
    const Context = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
    const Provider = (props)=>{
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Context.Provider, {
            value: props.value,
            children: props.children
        }, void 0, false, {
            fileName: "[project]/apps/frontend/src/shared/lib/hooks/provider-builder.tsx",
            lineNumber: 15,
            columnNumber: 4
        }, this);
    };
    const useProviderData = ()=>{
        const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(Context);
        if (context === undefined) {
            throw new Error("this context must be within provider");
        }
        return context;
    };
    return [
        useProviderData,
        Provider
    ];
}
}),
"[project]/apps/frontend/src/shared/lib/hooks/use-click-outside.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useClickOutside",
    ()=>useClickOutside
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f42438f6717e44ec3de5d0c1806f5fb0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
function useClickOutside(refs, cb, options = DEFAULT_OPTIONS) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const elements = refs.map((ref)=>ref.current);
        if (!document || !elements.length) {
            return;
        }
        if (elements.includes(null) || !options?.areAllElementsObservable) {
            return;
        }
        const abortController = new AbortController();
        document.addEventListener("mouseup", (e)=>{
            const isClickInsideElements = elements.find((element)=>{
                return element?.contains(e.target);
            });
            if (!isClickInsideElements) {
                cb();
            }
        }, {
            capture: true,
            signal: abortController.signal
        });
        return ()=>{
            abortController.abort();
        };
    }, [
        refs,
        cb,
        options?.areAllElementsObservable
    ]);
}
const DEFAULT_OPTIONS = {
    areAllElementsObservable: true
};
}),
"[project]/apps/frontend/src/shared/lib/hooks/use-resize-observable.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useResizeObserver",
    ()=>useResizeObserver
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f42438f6717e44ec3de5d0c1806f5fb0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
function hasResizeObserver() {
    return typeof window.ResizeObserver !== "undefined";
}
function useResizeObserver(options) {
    const { ref, onResize } = options;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const element = ref?.current;
        if (!element) {
            return;
        }
        if (!hasResizeObserver()) {
            window.addEventListener("resize", onResize, false);
            return ()=>{
                window.removeEventListener("resize", onResize, false);
            };
        } else {
            const resizeObserverInstance = new window.ResizeObserver((entries)=>{
                if (!entries.length) {
                    return;
                }
                onResize();
            });
            resizeObserverInstance.observe(element);
            return ()=>{
                if (element) {
                    resizeObserverInstance.unobserve(element);
                }
            };
        }
    }, [
        onResize,
        ref
    ]);
}
}),
"[project]/apps/frontend/src/shared/lib/hooks/use-animation.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useEnterAnimation",
    ()=>useEnterAnimation,
    "useExitAnimation",
    ()=>useExitAnimation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f42438f6717e44ec3de5d0c1806f5fb0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f42438f6717e44ec3de5d0c1806f5fb0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
"use client";
;
;
function useEnterAnimation(ref, isReady = true) {
    const [isStarting, setStarting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    useAnimation(ref, isStarting && isReady, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setStarting(false);
    }, []));
    return isStarting && isReady;
}
function useExitAnimation(ref, isOpen) {
    // The reason of suppression -These hooks are taken from react-aria/utils since they're not exposed to public api.
    // eslint-disable-next-line prefer-const
    let [isFinishing, setIsFinishing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [exitState, setExitState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("not-started");
    if (!isOpen && ref.current && exitState === "not-started") {
        isFinishing = true;
        setIsFinishing(true);
        setExitState("exiting");
    }
    if (!ref.current && exitState === "exited") {
        setExitState("not-started");
    }
    useAnimation(ref, isFinishing, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setExitState("exited");
        setIsFinishing(false);
    }, []));
    return isFinishing;
}
function useAnimation(ref, isActive, onEnd) {
    const prevAnimation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    if (isActive && ref.current) {
        prevAnimation.current = window.getComputedStyle(ref.current).animation;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayoutEffect"])(()=>{
        if (isActive && ref.current) {
            const computedStyle = window.getComputedStyle(ref.current);
            if (computedStyle.animationName && computedStyle.animationName !== "none" && computedStyle.animation !== prevAnimation.current) {
                const onAnimationEnd = (e)=>{
                    if (e.target === ref.current) {
                        element.removeEventListener("animationend", onAnimationEnd);
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].flushSync(()=>{
                            onEnd();
                        });
                    }
                };
                const element = ref.current;
                element.addEventListener("animationend", onAnimationEnd);
                return ()=>{
                    element.removeEventListener("animationend", onAnimationEnd);
                };
            } else {
                onEnd();
            }
        }
    }, [
        ref,
        isActive,
        onEnd
    ]);
}
}),
"[project]/apps/frontend/src/shared/lib/hooks/use-mutation.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMutation",
    ()=>useMutation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f42438f6717e44ec3de5d0c1806f5fb0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
function useMutation(props) {
    const { validationSchema, mutateFn, onMutate, onError, onSuccess, onSettled } = props;
    const [isPending, startTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransition"])();
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const abortControllerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Cleanup on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            abortControllerRef.current?.abort();
        };
    }, []);
    const cancel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        abortControllerRef.current?.abort();
        abortControllerRef.current = null;
    }, []);
    const reset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setError(null);
    }, []);
    const mutate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (variables)=>{
        setError(null);
        // Abort any in-flight mutation
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;
        let isVarsValid = true;
        let parsedData = variables;
        let parsedError = new Error("Unparsed error");
        if (validationSchema) {
            const parsed = validationSchema.safeParse(variables);
            isVarsValid = parsed.success;
            if (parsed.success) parsedData = parsed.data;
            if (!parsed.success) {
                parsedError = new Error(parsed.error.errors[0].message);
            }
        }
        if (isVarsValid) {
            startTransition(async ()=>{
                try {
                    onMutate?.(parsedData);
                    const mutatedData = await mutateFn(parsedData, signal);
                    // Don't call callbacks if aborted
                    if (signal.aborted) return;
                    onSuccess?.(mutatedData, variables);
                    onSettled?.(mutatedData, null, variables);
                } catch (e) {
                    // Don't handle abort errors
                    if (e instanceof Error && e.name === "AbortError") {
                        return;
                    }
                    const error = e instanceof Error ? e : new Error(String(e));
                    setError(error);
                    onError?.(error, variables);
                    onSettled?.(undefined, error, variables);
                }
            });
        } else {
            setError(parsedError);
            onError?.(parsedError, variables);
            onSettled?.(undefined, parsedError, variables);
        }
    }, [
        validationSchema,
        mutateFn,
        onError,
        onSuccess,
        onMutate,
        onSettled
    ]);
    return {
        isPending,
        error,
        mutate,
        reset,
        cancel
    };
}
}),
"[project]/apps/frontend/src/shared/lib/hooks/use-streamable.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useStreamable",
    ()=>useStreamable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f42438f6717e44ec3de5d0c1806f5fb0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function useStreamable(streamable) {
    return streamable instanceof Promise ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use"])(streamable) : streamable;
}
}),
"[project]/apps/frontend/src/shared/lib/hooks/use-prev-value-state.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePrevValueState",
    ()=>usePrevValueState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f42438f6717e44ec3de5d0c1806f5fb0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
function usePrevValueState(value, defaultValue = value) {
    const [prevValue, setPrevValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(defaultValue);
    if (prevValue !== value) {
        setPrevValue(value);
    }
    return {
        isChanged: prevValue !== value,
        value: prevValue
    };
}
}),
"[project]/apps/frontend/src/shared/lib/hooks/use-prevent-scrollbar-gutter-stable.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePreventScrollbarGutterStable",
    ()=>usePreventScrollbarGutterStable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f42438f6717e44ec3de5d0c1806f5fb0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
function usePreventScrollbarGutterStable() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const observer = new MutationObserver(()=>{
            document.documentElement.style.scrollbarGutter = "auto";
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: [
                "style"
            ]
        });
        return ()=>observer.disconnect();
    }, []);
}
}),
"[project]/apps/frontend/src/shared/lib/hooks/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$hooks$2f$use$2d$local$2d$storage$2d$state$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/lib/hooks/use-local-storage-state.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$hooks$2f$provider$2d$builder$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/lib/hooks/provider-builder.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$hooks$2f$use$2d$click$2d$outside$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/lib/hooks/use-click-outside.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$hooks$2f$use$2d$resize$2d$observable$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/lib/hooks/use-resize-observable.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$hooks$2f$use$2d$animation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/lib/hooks/use-animation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$hooks$2f$use$2d$mutation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/lib/hooks/use-mutation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$hooks$2f$use$2d$streamable$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/lib/hooks/use-streamable.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$hooks$2f$use$2d$prev$2d$value$2d$state$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/lib/hooks/use-prev-value-state.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$hooks$2f$use$2d$prevent$2d$scrollbar$2d$gutter$2d$stable$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/lib/hooks/use-prevent-scrollbar-gutter-stable.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
}),
"[project]/apps/frontend/src/shared/lib/types/local-state-types.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/apps/frontend/src/shared/lib/types/render-fn-type.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/apps/frontend/src/shared/lib/types/deep-partial.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/apps/frontend/src/shared/lib/types/required-field.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/apps/frontend/src/shared/lib/types/streamable.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/apps/frontend/src/shared/lib/utils/build-error-msg-from.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildErrorMsgFrom",
    ()=>buildErrorMsgFrom
]);
function buildErrorMsgFrom(errorTitle, errors) {
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
}),
"[project]/apps/frontend/src/shared/lib/types/api-error.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApiError",
    ()=>ApiError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$utils$2f$build$2d$error$2d$msg$2d$from$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/lib/utils/build-error-msg-from.ts [app-ssr] (ecmascript)");
;
class ApiError extends Error {
    type;
    title;
    status;
    errors;
    traceId;
    cause;
    constructor(error){
        super((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$utils$2f$build$2d$error$2d$msg$2d$from$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildErrorMsgFrom"])(error.title, error.errors));
        this.cause = error.status === 400 ? "validation" : "server";
        this.type = error.type;
        this.title = error.title;
        this.status = error.status;
        this.errors = error.errors;
        this.traceId = error.traceId;
    }
    static generateServerApiError() {
        return new ApiError({
            status: 500,
            title: "Unhandled Server Error",
            traceId: "None",
            type: "unhandled"
        });
    }
    toPlainObject() {
        return {
            ...this,
            message: this.message,
            name: this.name
        };
    }
}
}),
"[project]/apps/frontend/src/shared/lib/types/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$types$2f$local$2d$state$2d$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/lib/types/local-state-types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$types$2f$render$2d$fn$2d$type$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/lib/types/render-fn-type.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$types$2f$deep$2d$partial$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/lib/types/deep-partial.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$types$2f$required$2d$field$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/lib/types/required-field.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$types$2f$streamable$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/lib/types/streamable.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$types$2f$api$2d$error$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/lib/types/api-error.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
}),
"[externals]/perf_hooks [external] (perf_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("perf_hooks", () => require("perf_hooks"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/node:util [external] (node:util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:util", () => require("node:util"));

module.exports = mod;
}),
"[externals]/node:diagnostics_channel [external] (node:diagnostics_channel, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:diagnostics_channel", () => require("node:diagnostics_channel"));

module.exports = mod;
}),
"[externals]/node:events [external] (node:events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:events", () => require("node:events"));

module.exports = mod;
}),
"[externals]/diagnostics_channel [external] (diagnostics_channel, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("diagnostics_channel", () => require("diagnostics_channel"));

module.exports = mod;
}),
"[externals]/node:child_process [external] (node:child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:child_process", () => require("node:child_process"));

module.exports = mod;
}),
"[externals]/node:fs [external] (node:fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs", () => require("node:fs"));

module.exports = mod;
}),
"[externals]/node:os [external] (node:os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:os", () => require("node:os"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[externals]/node:readline [external] (node:readline, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:readline", () => require("node:readline"));

module.exports = mod;
}),
"[externals]/node:worker_threads [external] (node:worker_threads, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:worker_threads", () => require("node:worker_threads"));

module.exports = mod;
}),
"[externals]/node:http [external] (node:http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:http", () => require("node:http"));

module.exports = mod;
}),
"[externals]/node:module [external] (node:module, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:module", () => require("node:module"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/module [external] (module, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("module", () => require("module"));

module.exports = mod;
}),
"[externals]/async_hooks [external] (async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("async_hooks", () => require("async_hooks"));

module.exports = mod;
}),
"[externals]/node:https [external] (node:https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:https", () => require("node:https"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/node:zlib [external] (node:zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:zlib", () => require("node:zlib"));

module.exports = mod;
}),
"[externals]/node:net [external] (node:net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:net", () => require("node:net"));

module.exports = mod;
}),
"[externals]/node:tls [external] (node:tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:tls", () => require("node:tls"));

module.exports = mod;
}),
"[externals]/worker_threads [external] (worker_threads, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("worker_threads", () => require("worker_threads"));

module.exports = mod;
}),
"[externals]/process [external] (process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("process", () => require("process"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[project]/apps/frontend/src/shared/lib/logger/sentry-logger.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SentryLogger",
    ()=>SentryLogger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$30$2e$0_$40$ope_39495a78fa26a3330acfdcc675e44c56$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$cjs$2f$index$2e$server$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.30.0_@ope_39495a78fa26a3330acfdcc675e44c56/node_modules/@sentry/nextjs/build/cjs/index.server.js [app-ssr] (ecmascript)");
;
class SentryLogger {
    info() {
        throw new Error("Method not implemented.");
    }
    error(error, extra = {}) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$30$2e$0_$40$ope_39495a78fa26a3330acfdcc675e44c56$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$cjs$2f$index$2e$server$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["captureException"](error, {
            level: "error",
            extra: {
                ...extra,
                platform: "frontend"
            }
        });
    }
}
}),
"[project]/apps/frontend/src/shared/lib/logger/logger.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "logger",
    ()=>loggerImpl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$logger$2f$sentry$2d$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/lib/logger/sentry-logger.ts [app-ssr] (ecmascript)");
;
const isProd = ("TURBOPACK compile-time value", "development") === "production";
const loggerImpl = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : console;
;
}),
"[project]/apps/frontend/src/shared/lib/logger/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$logger$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/lib/logger/logger.ts [app-ssr] (ecmascript)");
;
}),
"[project]/apps/frontend/src/shared/lib/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/lib/utils/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$hooks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/lib/hooks/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/lib/types/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$logger$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/lib/logger/index.ts [app-ssr] (ecmascript) <locals>");
;
;
;
;
}),
"[project]/apps/frontend/src/shared/providers/cookie-consent-state-provider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConsentStatus",
    ()=>ConsentStatus,
    "CookieConsentStateContext",
    ()=>CookieConsentStateContext,
    "CookieConsentStateProvider",
    ()=>CookieConsentStateProvider,
    "RenderIfConsentGiven",
    ()=>RenderIfConsentGiven,
    "useCookieConsentState",
    ()=>useCookieConsentState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f42438f6717e44ec3de5d0c1806f5fb0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f42438f6717e44ec3de5d0c1806f5fb0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/lib/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$hooks$2f$use$2d$local$2d$storage$2d$state$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/lib/hooks/use-local-storage-state.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
var ConsentStatus = /*#__PURE__*/ function(ConsentStatus) {
    ConsentStatus["Unknown"] = "unknown";
    ConsentStatus["UnInitialized"] = "uninitialized";
    ConsentStatus["Given"] = "given";
    ConsentStatus["Rejected"] = "rejected";
    return ConsentStatus;
}({});
const CookieConsentStateContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function CookieConsentStateProvider({ children }) {
    const [consentStatus, setConsentStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$hooks$2f$use$2d$local$2d$storage$2d$state$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLocalStorageState"])("cookieConsent", {
        defaultValue: "unknown",
        defaultServerValue: "uninitialized"
    });
    const giveConsent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setConsentStatus("given");
    }, [
        setConsentStatus
    ]);
    const rejectConsent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setConsentStatus("rejected");
    }, [
        setConsentStatus
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CookieConsentStateContext.Provider, {
        value: {
            consentStatus,
            giveConsent,
            rejectConsent
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/frontend/src/shared/providers/cookie-consent-state-provider.tsx",
        lineNumber: 40,
        columnNumber: 3
    }, this);
}
function RenderIfConsentGiven({ children }) {
    const { consentStatus } = useCookieConsentState();
    if (consentStatus === "given") {
        return children;
    }
    return null;
}
function useCookieConsentState() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(CookieConsentStateContext);
    if (!context) {
        throw new Error("useCookieConsentState must be used within a CookieConsentStateProvider");
    }
    return context;
}
}),
"[project]/apps/frontend/src/shared/providers/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$providers$2f$confirmation$2d$modal$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/providers/confirmation-modal-provider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$providers$2f$cookie$2d$consent$2d$state$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/providers/cookie-consent-state-provider.tsx [app-ssr] (ecmascript)");
;
;
}),
"[project]/apps/frontend/src/shared/lib/hooks/use-render-props.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRenderProps",
    ()=>useRenderProps
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f42438f6717e44ec3de5d0c1806f5fb0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function useRenderProps(props) {
    const { className, style, children, defaultClassName = undefined, defaultChildren = undefined, defaultStyle, values } = props;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        let computedClassName;
        let computedStyle;
        let computedChildren;
        if (typeof className === "function") {
            computedClassName = className({
                ...values,
                defaultClassName
            });
        } else {
            computedClassName = className;
        }
        if (typeof style === "function") {
            computedStyle = style({
                ...values,
                defaultStyle: defaultStyle || {}
            });
        } else {
            computedStyle = style;
        }
        if (typeof children === "function") {
            computedChildren = children({
                ...values,
                defaultChildren
            });
        } else if (children == null) {
            computedChildren = defaultChildren;
        } else {
            computedChildren = children;
        }
        return {
            className: computedClassName ?? defaultClassName,
            style: computedStyle || defaultStyle ? {
                ...defaultStyle,
                ...computedStyle
            } : undefined,
            children: computedChildren ?? defaultChildren,
            "data-rac": ""
        };
    }, [
        className,
        style,
        children,
        defaultClassName,
        defaultChildren,
        defaultStyle,
        values
    ]);
}
}),
"[project]/apps/frontend/src/shared/ui/next-components/next-link/next-link.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NextLink",
    ()=>NextLink_,
    "NextLinkButton",
    ()=>NextLinkButton,
    "NextLink_",
    ()=>NextLink_
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f42438f6717e44ec3de5d0c1806f5fb0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f42438f6717e44ec3de5d0c1806f5fb0/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$hooks$2f$use$2d$render$2d$props$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/lib/hooks/use-render-props.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$aria$2d$components$40$1$2e$14$2e$_b8b5db726aee419cb31a059ec75e5f5c$2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-aria-components@1.14._b8b5db726aee419cb31a059ec75e5f5c/node_modules/react-aria-components/dist/utils.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$aria$2d$components$40$1$2e$14$2e$_b8b5db726aee419cb31a059ec75e5f5c$2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Link$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-aria-components@1.14._b8b5db726aee419cb31a059ec75e5f5c/node_modules/react-aria-components/dist/Link.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$aria$2b$utils$40$3$2e$32$2e$0_re_f6d032213003e04552971b1a31af1517$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$mergeProps$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@react-aria+utils@3.32.0_re_f6d032213003e04552971b1a31af1517/node_modules/@react-aria/utils/dist/mergeProps.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$aria$2b$focus$40$3$2e$21$2e$3_re_578b15553fa470aeba86c903286577bf$2f$node_modules$2f40$react$2d$aria$2f$focus$2f$dist$2f$useFocusRing$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@react-aria+focus@3.21.3_re_578b15553fa470aeba86c903286577bf/node_modules/@react-aria/focus/dist/useFocusRing.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$aria$2b$interactions$40$3$2e$_0ba26ad6a862225314c7a312bac9494a$2f$node_modules$2f40$react$2d$aria$2f$interactions$2f$dist$2f$useHover$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@react-aria+interactions@3._0ba26ad6a862225314c7a312bac9494a/node_modules/@react-aria/interactions/dist/useHover.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$aria$2b$link$40$3$2e$8$2e$7_reac_c63a16b9f740ffa7fd5ffbff32e88bc0$2f$node_modules$2f40$react$2d$aria$2f$link$2f$dist$2f$useLink$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@react-aria+link@3.8.7_reac_c63a16b9f740ffa7fd5ffbff32e88bc0/node_modules/@react-aria/link/dist/useLink.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$styles$2f$button$2e$styles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/ui/styles/button.styles.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$2$2e$5$2e$3$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/tailwind-merge@2.5.3/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
function NextLinkButton(props) {
    let { ref, ...restProps } = props;
    [restProps, ref] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$aria$2d$components$40$1$2e$14$2e$_b8b5db726aee419cb31a059ec75e5f5c$2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContextProps"])(restProps, ref, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$aria$2d$components$40$1$2e$14$2e$_b8b5db726aee419cb31a059ec75e5f5c$2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Link$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LinkContext"]);
    const { size = "medium", variant = "default", appearance = "primary" } = restProps;
    const isDisabled = restProps.isDisabled || false;
    const slotValue = restProps.slot || undefined;
    const { linkProps, isPressed } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$aria$2b$link$40$3$2e$8$2e$7_reac_c63a16b9f740ffa7fd5ffbff32e88bc0$2f$node_modules$2f40$react$2d$aria$2f$link$2f$dist$2f$useLink$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLink"])({
        ...restProps,
        elementType: "a"
    }, ref);
    const { hoverProps, isHovered } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$aria$2b$interactions$40$3$2e$_0ba26ad6a862225314c7a312bac9494a$2f$node_modules$2f40$react$2d$aria$2f$interactions$2f$dist$2f$useHover$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useHover"])(restProps);
    const { focusProps, isFocused, isFocusVisible } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$aria$2b$focus$40$3$2e$21$2e$3_re_578b15553fa470aeba86c903286577bf$2f$node_modules$2f40$react$2d$aria$2f$focus$2f$dist$2f$useFocusRing$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFocusRing"])();
    const dataFocused = isFocused || undefined;
    const dataHovered = isHovered || undefined;
    const dataPressed = isPressed || undefined;
    const dataFocusVisible = isFocusVisible || undefined;
    const dataDisabled = isDisabled || undefined;
    const renderProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$hooks$2f$use$2d$render$2d$props$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderProps"])({
        ...restProps,
        defaultClassName: "",
        values: {
            isCurrent: false,
            isDisabled,
            isPressed,
            isHovered,
            isFocused,
            isFocusVisible
        }
    });
    const btnStyles = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$2$2e$5$2e$3$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$styles$2f$button$2e$styles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buttonStyles"])({
            size,
            variant,
            form: "default",
            isPressed: isPressed,
            isFocused: isFocusVisible,
            isHovered: isHovered
        }), renderProps.className);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        ref: ref,
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$aria$2b$utils$40$3$2e$32$2e$0_re_f6d032213003e04552971b1a31af1517$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$mergeProps$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])(renderProps, linkProps, hoverProps, focusProps),
        style: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$styles$2f$button$2e$styles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLOR_SCHEMES"][appearance],
        className: btnStyles(),
        href: restProps.href,
        slot: slotValue,
        "data-focused": dataFocused,
        "data-hovered": dataHovered,
        "data-pressed": dataPressed,
        "data-focus-visible": dataFocusVisible,
        "data-disabled": dataDisabled,
        children: renderProps.children
    }, void 0, false, {
        fileName: "[project]/apps/frontend/src/shared/ui/next-components/next-link/next-link.tsx",
        lineNumber: 99,
        columnNumber: 3
    }, this);
}
function NextLink_(props) {
    let { ref, ...restProps } = props;
    [restProps, ref] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$aria$2d$components$40$1$2e$14$2e$_b8b5db726aee419cb31a059ec75e5f5c$2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContextProps"])(restProps, ref, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$aria$2d$components$40$1$2e$14$2e$_b8b5db726aee419cb31a059ec75e5f5c$2f$node_modules$2f$react$2d$aria$2d$components$2f$dist$2f$Link$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LinkContext"]);
    const { linkProps, isPressed } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$aria$2b$link$40$3$2e$8$2e$7_reac_c63a16b9f740ffa7fd5ffbff32e88bc0$2f$node_modules$2f40$react$2d$aria$2f$link$2f$dist$2f$useLink$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLink"])({
        ...restProps,
        elementType: "a"
    }, ref);
    const { hoverProps, isHovered } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$aria$2b$interactions$40$3$2e$_0ba26ad6a862225314c7a312bac9494a$2f$node_modules$2f40$react$2d$aria$2f$interactions$2f$dist$2f$useHover$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useHover"])(restProps);
    const { focusProps, isFocused, isFocusVisible } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$aria$2b$focus$40$3$2e$21$2e$3_re_578b15553fa470aeba86c903286577bf$2f$node_modules$2f40$react$2d$aria$2f$focus$2f$dist$2f$useFocusRing$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFocusRing"])();
    const renderProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$hooks$2f$use$2d$render$2d$props$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderProps"])({
        ...restProps,
        defaultClassName: "",
        values: {
            isCurrent: false,
            isDisabled: restProps.isDisabled || false,
            isPressed,
            isHovered,
            isFocused,
            isFocusVisible
        }
    });
    const linkStyles = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$2$2e$5$2e$3$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])("underline underline-offset-2 decoration-from-font hover:text-primary-500 transition-colors cursor-pointer outline-hidden", renderProps.className);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        ref: ref,
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$aria$2b$utils$40$3$2e$32$2e$0_re_f6d032213003e04552971b1a31af1517$2f$node_modules$2f40$react$2d$aria$2f$utils$2f$dist$2f$mergeProps$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])(renderProps, linkProps, hoverProps, focusProps),
        className: linkStyles(),
        href: restProps.href,
        slot: restProps.slot || undefined,
        "data-focused": isFocused || undefined,
        "data-hovered": isHovered || undefined,
        "data-pressed": isPressed || undefined,
        "data-focus-visible": isFocusVisible || undefined,
        "data-disabled": restProps.isDisabled || undefined,
        children: renderProps.children
    }, void 0, false, {
        fileName: "[project]/apps/frontend/src/shared/ui/next-components/next-link/next-link.tsx",
        lineNumber: 158,
        columnNumber: 3
    }, this);
}
;
}),
"[project]/apps/frontend/src/shared/ui/next-components/next-link/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$next$2d$components$2f$next$2d$link$2f$next$2d$link$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/ui/next-components/next-link/next-link.tsx [app-ssr] (ecmascript)");
"use client";
;
}),
"[project]/apps/frontend/src/shared/ui/components/cookie-consent/cookie-consent.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CookieConsent",
    ()=>CookieConsent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f42438f6717e44ec3de5d0c1806f5fb0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$providers$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/providers/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$providers$2f$cookie$2d$consent$2d$state$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/providers/cookie-consent-state-provider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$next$2d$components$2f$next$2d$link$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/ui/next-components/next-link/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$next$2d$components$2f$next$2d$link$2f$next$2d$link$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/ui/next-components/next-link/next-link.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$components$2f$button$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/ui/components/button/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$components$2f$button$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/ui/components/button/button.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function CookieConsent() {
    const { consentStatus, giveConsent, rejectConsent } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$providers$2f$cookie$2d$consent$2d$state$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCookieConsentState"])();
    if (consentStatus !== __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$providers$2f$cookie$2d$consent$2d$state$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConsentStatus"].Unknown) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed right-4 bottom-4 z-50 mx-4 flex flex-col gap-4 rounded-xl border-2 border-[color-mix(in_oklab,var(--color-white)_50%,transparent)] bg-[color-mix(in_oklab,var(--color-neutral-200)_20%,transparent)] p-4 backdrop-blur-xs lg:flex-row",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-row items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-3xl",
                        children: "🍪"
                    }, void 0, false, {
                        fileName: "[project]/apps/frontend/src/shared/ui/components/cookie-consent/cookie-consent.tsx",
                        lineNumber: 16,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm",
                        children: [
                            "This website uses cookies to enhance the user experience.",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/apps/frontend/src/shared/ui/components/cookie-consent/cookie-consent.tsx",
                                lineNumber: 19,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$next$2d$components$2f$next$2d$link$2f$next$2d$link$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NextLink"], {
                                href: "/privacy-policy",
                                className: "underline",
                                children: "Learn more"
                            }, void 0, false, {
                                fileName: "[project]/apps/frontend/src/shared/ui/components/cookie-consent/cookie-consent.tsx",
                                lineNumber: 20,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/frontend/src/shared/ui/components/cookie-consent/cookie-consent.tsx",
                        lineNumber: 17,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/frontend/src/shared/ui/components/cookie-consent/cookie-consent.tsx",
                lineNumber: 15,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-row justify-end gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$components$2f$button$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        onPress: giveConsent,
                        children: "Accept All Cookeis"
                    }, void 0, false, {
                        fileName: "[project]/apps/frontend/src/shared/ui/components/cookie-consent/cookie-consent.tsx",
                        lineNumber: 27,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$ui$2f$components$2f$button$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "ghost",
                        onPress: rejectConsent,
                        children: "Reject"
                    }, void 0, false, {
                        fileName: "[project]/apps/frontend/src/shared/ui/components/cookie-consent/cookie-consent.tsx",
                        lineNumber: 28,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/frontend/src/shared/ui/components/cookie-consent/cookie-consent.tsx",
                lineNumber: 26,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/frontend/src/shared/ui/components/cookie-consent/cookie-consent.tsx",
        lineNumber: 14,
        columnNumber: 3
    }, this);
}
}),
];

//# debugId=fde5d82e-7cea-8647-191f-5a368a237fd5
//# sourceMappingURL=%5Broot-of-the-server%5D__1e57ef6c._.js.map