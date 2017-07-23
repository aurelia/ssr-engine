export default function (html, transformerCtx, options) {
    var title = transformerCtx.document.head.querySelector('title');
    return html.replace('<!-- title -->', title.innerHTML);
}
;
