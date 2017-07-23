System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function default_1(html, transformerCtx, options) {
        var title = transformerCtx.document.head.querySelector('title');
        return html.replace('<!-- title -->', title.innerHTML);
    }
    exports_1("default", default_1);
    return {
        setters: [],
        execute: function () {
            ;
        }
    };
});
