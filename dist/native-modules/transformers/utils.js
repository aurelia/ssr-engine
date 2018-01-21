export function appendToBody(htmlString, toAppend) {
    return htmlString.replace('</body>', toAppend + "</body>");
}
export function appendToHead(htmlString, toAppend) {
    return htmlString.replace('</head>', toAppend + "</head>");
}
