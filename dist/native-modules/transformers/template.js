export default function (html, transformerCtx, options) {
    return options.template.replace('<!-- app -->', transformerCtx.app);
}
;
