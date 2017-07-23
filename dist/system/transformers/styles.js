System.register(["./utils"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function default_1(html, transformerCtx, options) {
        var headStyleTags = Array.prototype.slice.call(transformerCtx.document.head.querySelectorAll('style'));
        // copy over any style tags
        for (var i = 0; i < headStyleTags.length; i++) {
            html = utils_1.appendToHead(html, headStyleTags[i].outerHTML);
        }
        return html;
    }
    exports_1("default", default_1);
    var utils_1;
    return {
        setters: [
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            ;
        }
    };
});
