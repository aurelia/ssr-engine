define(["require", "exports", "./utils"], function (require, exports, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function default_1(html, transformerCtx, options) {
        var metaTags = Array.prototype.slice.call(transformerCtx.document.head.querySelectorAll('meta'));
        // copy over any meta tags
        for (var i = 0; i < metaTags.length; i++) {
            html = utils_1.appendToHead(html, metaTags[i].outerHTML);
        }
        return html;
    }
    exports.default = default_1;
    ;
});
