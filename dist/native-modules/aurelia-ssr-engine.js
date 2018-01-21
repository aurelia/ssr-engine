import './reflect';
import './property-descriptor';
import { transform } from './transformers';
import { cleanup } from './cleanup';
function render(options, initOptions) {
    if (!options.url) {
        throw new Error('url is required when calling render()');
    }
    if (!options.template) {
        throw new Error('template is required when calling render()');
    }
    if (!initOptions.main) {
        throw new Error('main property is required');
    }
    // this allows you to see aurelia logging in cmd/terminal
    // logging a lot of messages isn't good for performance though
    // so we need to set the loglevel in the app to something other than debug
    console.debug = console.log;
    // we'll want new instances of aurelia-pal and aurelia-pal-nodejs
    // because aurelia-pal holds the reference to the DOM
    delete require.cache[require.resolve('aurelia-pal')];
    delete require.cache[require.resolve('aurelia-pal-nodejs')];
    return start(initOptions, options.url.toString())
        .then(function (ctx) {
        var document = ctx.pal.DOM.global.document;
        setInputDefaultValues(document.body);
        var html = transform({ app: ctx.aurelia.host.outerHTML, document: document }, options);
        ctx.stop();
        cleanup(options);
        return html;
    });
}
// <input> .value property does not map to @value attribute, .defaultValue does.
// so we need to copy that value over if we want it to serialize into HTML <input value="">
// without this there isn't a value attribute on any of the input tags
function setInputDefaultValues(body) {
    var inputTags = Array.prototype.slice.call(body.querySelectorAll('input'));
    for (var i = 0; i < inputTags.length; i++) {
        var input = inputTags[i];
        if (input.value != null) {
            input.defaultValue = input.value;
        }
    }
}
function start(options, requestUrl) {
    var _a = options.main(), initialize = _a.initialize, start = _a.start;
    var PLATFORM = initialize().PLATFORM;
    // url of jsdom should be equal to the request url
    // this dictates what page aurelia loads on startup
    PLATFORM.jsdom.reconfigure({ url: requestUrl });
    return start();
}
export { render };
