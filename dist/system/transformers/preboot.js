System.register(["preboot", "./utils"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function default_1(html, transformerCtx, options) {
        if (options.preboot) {
            if (options.replayDelay === undefined) {
                options.replayDelay = 10;
            }
            // preboot catches all events that happens before Aurelia gets loaded client-side
            // so that they can be replayed afterwards
            var prebootOptions = Object.assign({
                appRoot: options.appRoots || ['body']
            }, options.prebootOptions);
            var inlinePrebootCode = preboot.getInlineCode(prebootOptions);
            html = utils_1.appendToHead(html, "\r\n<script>" + inlinePrebootCode + "</script>\r\n");
            // preboot_browser can replay events that were stored by the preboot code
            html = utils_1.appendToBody(html, "\r\n<script src=\"preboot_browser.js\"></script>\n      <script>\n      document.addEventListener('aurelia-started', function () {\n        // Aurelia has started client-side\n        // but the view/view-model hasn't been loaded yet so we need a small\n        // delay until we can playback all events.\n        setTimeout(function () { preboot.complete(); }, " + options.replayDelay + ");\n      });\n      </script>");
        }
        return html;
    }
    exports_1("default", default_1);
    var preboot, utils_1;
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
