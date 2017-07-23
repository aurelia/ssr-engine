define(["require", "exports", "html-minifier"], function (require, exports, html_minifier_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.default = default_1;
    ;
});
