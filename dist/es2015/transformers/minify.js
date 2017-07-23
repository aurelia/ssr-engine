import { minify } from 'html-minifier';
export default function (html, transformerCtx, options) {
    if (options.minifyHtml) {
        return minify(html, Object.assign({
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS: true
        }, options.minifyOptions));
    }
    return html;
}
;
