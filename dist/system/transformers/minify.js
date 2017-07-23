System.register(["html-minifier"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function default_1(html, transformerCtx, options) {
        if (options.minifyHtml) {
            return html_minifier_1.minify(html, Object.assign({
                collapseWhitespace: true,
                minifyJS: true,
                minifyCSS: true
            }, options.minifyOptions));
        }
        return html;
    }
    exports_1("default", default_1);
    var html_minifier_1;
    return {
        setters: [
            function (html_minifier_1_1) {
                html_minifier_1 = html_minifier_1_1;
            }
        ],
        execute: function () {
            ;
        }
    };
});
