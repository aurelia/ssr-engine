import { appendToHead } from './utils';
export default function (html, transformerCtx, options) {
    var metaTags = Array.prototype.slice.call(transformerCtx.document.head.querySelectorAll('meta'));
    // copy over any meta tags
    for (var i = 0; i < metaTags.length; i++) {
        html = appendToHead(html, metaTags[i].outerHTML);
    }
    return html;
}
;
