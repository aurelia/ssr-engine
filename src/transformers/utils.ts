export function appendToBody(htmlString: string, toAppend: string) {
  return htmlString.replace('</body>', `${toAppend}</body>`);
}

export function appendToHead(htmlString: string, toAppend: string) {
  return htmlString.replace('</head>', `${toAppend}</head>`);
}
