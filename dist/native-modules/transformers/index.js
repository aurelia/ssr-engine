// tslint:disable:no-var-requires
var transformers = [
    require('./template').default,
    require('./meta').default,
    require('./title').default,
    require('./styles').default,
    require('./preboot').default
];
// tslint:enable:no-var-requires
export function transform(transformerCtx, options) {
    var html = options.template;
    for (var i = 0; i < transformers.length; i++) {
        html = transformers[i](html, transformerCtx, options);
    }
    return html;
}
