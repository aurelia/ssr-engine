import { appendToHead } from './utils';
export default function (html, transformerCtx, options) {
    var headStyleTags = Array.prototype.slice.call(transformerCtx.document.head.querySelectorAll('style'));
    // copy over any style tags
    for (var i = 0; i < headStyleTags.length; i++) {
        html = appendToHead(html, headStyleTags[i].outerHTML);
    }
    return html;
}
;
