;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="db84d354-420d-ceb9-ddea-ae6fe0ef4fef")}catch(e){}}();
module.exports = [
"[project]/node_modules/.pnpm/@apm-js-collab+code-transformer@0.8.2/node_modules/@apm-js-collab/code-transformer/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.create = create;
// ./pkg/orchestrion_js.js has a side effect of loading the wasm binary. 
// We only want that if the library is actually used!
var cachedCreate;
/**
 * Create a new instrumentation matcher from an array of instrumentation configs.
 */ function create(configs, dc_module) {
    if (!cachedCreate) {
        cachedCreate = __turbopack_context__.r("[project]/node_modules/.pnpm/@apm-js-collab+code-transformer@0.8.2/node_modules/@apm-js-collab/code-transformer/pkg/orchestrion_js.js [app-rsc] (ecmascript)").create;
    }
    if (cachedCreate === undefined) {
        throw new Error("Failed to load '@apm-js-collab/code-transformer'");
    }
    return cachedCreate(configs, dc_module);
}
}),
];

//# debugId=db84d354-420d-ceb9-ddea-ae6fe0ef4fef
//# sourceMappingURL=5bcbe_%40apm-js-collab_code-transformer_index_d0d2e9e8.js.map