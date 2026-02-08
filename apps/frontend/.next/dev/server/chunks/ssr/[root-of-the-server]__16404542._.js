;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="3088823f-f914-4bda-3599-84b4536499cc")}catch(e){}}();
module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
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
"[project]/apps/frontend/src/shared/lib/logger/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "logger",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$logger$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["logger"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$logger$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/lib/logger/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$logger$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/lib/logger/logger.ts [app-ssr] (ecmascript)");
}),
"[project]/apps/frontend/src/app/global-error.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GlobalError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f42438f6717e44ec3de5d0c1806f5fb0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/lib/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$logger$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/shared/lib/logger/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f42438f6717e44ec3de5d0c1806f5fb0/node_modules/next/error.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f42438f6717e44ec3de5d0c1806f5fb0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function GlobalError({ error }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$shared$2f$lib$2f$logger$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["logger"].error(error);
    }, [
        error
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                statusCode: 0
            }, void 0, false, {
                fileName: "[project]/apps/frontend/src/app/global-error.tsx",
                lineNumber: 23,
                columnNumber: 5
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/frontend/src/app/global-error.tsx",
            lineNumber: 18,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/frontend/src/app/global-error.tsx",
        lineNumber: 17,
        columnNumber: 3
    }, this);
}
}),
];

//# debugId=3088823f-f914-4bda-3599-84b4536499cc
//# sourceMappingURL=%5Broot-of-the-server%5D__16404542._.js.map