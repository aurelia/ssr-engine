"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
function default_1(html, transformerCtx, options) {
    var headStyleTags = Array.prototype.slice.call(transformerCtx.document.head.querySelectorAll('style'));
    // copy over any style tags
    for (var i = 0; i < headStyleTags.length; i++) {
        html = utils_1.appendToHead(html, headStyleTags[i].outerHTML);
    }
    return html;
}
exports.default = default_1;
;
