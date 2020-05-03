System.register(["preboot", "./utils"], function (exports_1, context_1) {
    "use strict";
    var preboot, utils_1;
    var __moduleName = context_1 && context_1.id;
    function default_1(html, transformerCtx, options) {
        if (options.preboot) {
            if (options.replayDelay === undefined) {
                options.replayDelay = 10;
            }
            if (options.prebootScript === undefined) {
                options.prebootScript = "preboot_browser.js";
            }
            // preboot catches all events that happens before Aurelia gets loaded client-side
            // so that they can be replayed afterwards
            var prebootOptions = Object.assign({
                appRoot: options.appRoots || ['body'],
                eventSelectors: [
                    // for recording changes in form elements
                    { selector: 'input,textarea', events: ['keypress', 'keyup', 'keydown', 'input', 'change'] },
                    { selector: 'select,option', events: ['change'] },
                    // when user hits return button in an input box
                    { selector: 'input', events: ['keyup'], preventDefault: true, keyCodes: [13], freeze: true },
                    // for tracking focus (no need to replay)
                    { selector: 'input,textarea', events: ['focusin', 'focusout', 'mousedown', 'mouseup'], noReplay: true },
                    { selector: 'button[type="submit"]', events: ['submit'], preventDefault: false, freeze: true },
                    { selector: 'form', events: ['submit'], preventDefault: true, freeze: true },
                    // user clicks on a button
                    { selector: 'button:not([type="submit"])', events: ['click'], preventDefault: true, freeze: true }
                ]
            }, options.prebootOptions);
            var inlinePrebootCode = preboot.getInlineCode(prebootOptions);
            html = utils_1.appendToHead(html, "\r\n<script>" + inlinePrebootCode + "</script>\r\n");
            // preboot_browser can replay events that were stored by the preboot code
            var script = "\r\n<script src=\"" + options.prebootScript + "\"></script>\n<script>\ndocument.addEventListener('aurelia-started', function () {\n  // Aurelia has started client-side\n  // but the view/view-model hasn't been loaded yet so we need a small\n  // delay until we can playback all events.\n  setTimeout(function () { preboot.complete(); }, " + options.replayDelay + ");\n});\n</script>";
            if (html.indexOf("<!-- preboot_script -->") !== -1) {
                html = html.replace("<!-- preboot_script -->", script);
            }
            else {
                html = utils_1.appendToBody(html, script);
            }
        }
        return html;
    }
    exports_1("default", default_1);
    return {
        setters: [
            function (preboot_1) {
                preboot = preboot_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            ;
        }
    };
});
