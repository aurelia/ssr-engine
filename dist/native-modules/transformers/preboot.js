import * as preboot from 'preboot';
import { appendToHead, appendToBody } from './utils';
export default function (html, transformerCtx, options) {
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
        html = appendToHead(html, "\r\n<script>" + inlinePrebootCode + "</script>\r\n");
        // preboot_browser can replay events that were stored by the preboot code
        html = appendToBody(html, "\r\n<script src=\"preboot_browser.js\"></script>\n      <script>\n      document.addEventListener('aurelia-started', function () {\n        // Aurelia has started client-side\n        // but the view/view-model hasn't been loaded yet so we need a small\n        // delay until we can playback all events.\n        setTimeout(function () { preboot.complete(); }, " + options.replayDelay + ");\n      });\n      </script>");
    }
    return html;
}
;
