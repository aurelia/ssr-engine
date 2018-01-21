"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(html, transformerCtx, options) {
    return options.template.replace('<!-- app -->', transformerCtx.app);
}
exports.default = default_1;
;
