System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function appendToBody(htmlString, toAppend) {
        return htmlString.replace('</body>', toAppend + "</body>");
    }
    exports_1("appendToBody", appendToBody);
    function appendToHead(htmlString, toAppend) {
        return htmlString.replace('</head>', toAppend + "</head>");
    }
    exports_1("appendToHead", appendToHead);
    return {
        setters: [],
        execute: function () {
        }
    };
});
