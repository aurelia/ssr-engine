System.register(["./utils"], function (exports_1, context_1) {
    "use strict";
    var utils_1;
    var __moduleName = context_1 && context_1.id;
    function default_1(html, transformerCtx, options) {
        var metaTags = Array.prototype.slice.call(transformerCtx.document.head.querySelectorAll('meta'));
        // copy over any meta tags
        for (var i = 0; i < metaTags.length; i++) {
            html = utils_1.appendToHead(html, metaTags[i].outerHTML);
        }
        return html;
    }
    exports_1("default", default_1);
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
