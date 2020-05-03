System.register([], function (exports_1, context_1) {
    "use strict";
    var transformers;
    var __moduleName = context_1 && context_1.id;
    // tslint:enable:no-var-requires
    function transform(transformerCtx, options) {
        var html = options.template;
        for (var i = 0; i < transformers.length; i++) {
            html = transformers[i](html, transformerCtx, options);
        }
        return html;
    }
    exports_1("transform", transform);
    return {
        setters: [],
        execute: function () {
            // tslint:disable:no-var-requires
            transformers = [
                require('./template').default,
                require('./meta').default,
                require('./title').default,
                require('./styles').default,
                require('./preboot').default
            ];
        }
    };
});
