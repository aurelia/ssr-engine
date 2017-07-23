export default function (html, transformerCtx, options) {
    const title = transformerCtx.document.head.querySelector('title');
    return html.replace('<!-- title -->', title.innerHTML);
}
;
