;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="09b89437-8ebb-5062-1861-932ee0009727")}catch(e){}}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/frontend/instrumentation-client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
__turbopack_context__.s([
    "onRouterTransitionStart",
    ()=>onRouterTransitionStart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f42438f6717e44ec3de5d0c1806f5fb0$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f42438f6717e44ec3de5d0c1806f5fb0/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$30$2e$0_$40$ope_39495a78fa26a3330acfdcc675e44c56$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$client$2f$routing$2f$appRouterRoutingInstrumentation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.30.0_@ope_39495a78fa26a3330acfdcc675e44c56/node_modules/@sentry/nextjs/build/esm/client/routing/appRouterRoutingInstrumentation.js [app-client] (ecmascript)");
globalThis["_sentryRouteManifest"] = "{\"dynamicRoutes\":[{\"path\":\"/game/:id\",\"regex\":\"^/game/([^/]+)$\",\"paramNames\":[\"id\"],\"hasOptionalPrefix\":false},{\"path\":\"/game/:id/join-room\",\"regex\":\"^/game/([^/]+)/join-room$\",\"paramNames\":[\"id\"],\"hasOptionalPrefix\":false}],\"staticRoutes\":[{\"path\":\"/create-game\"},{\"path\":\"/\"},{\"path\":\"/privacy-policy\"}],\"isrRoutes\":[]}";
globalThis["_sentryNextJsVersion"] = "16.1.1";
globalThis["_sentryRewritesTunnelPath"] = "/monitoring";
;
const isProd = ("TURBOPACK compile-time value", "development") === "production";
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const onRouterTransitionStart = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$30$2e$0_$40$ope_39495a78fa26a3330acfdcc675e44c56$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$client$2f$routing$2f$appRouterRoutingInstrumentation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureRouterTransitionStart"];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# debugId=09b89437-8ebb-5062-1861-932ee0009727
//# sourceMappingURL=apps_frontend_instrumentation-client_ts_37297a01._.js.map