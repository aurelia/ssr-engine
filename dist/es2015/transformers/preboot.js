import * as preboot from 'preboot';
import { appendToHead, appendToBody } from './utils';
export default function (html, transformerCtx, options) {
    if (options.preboot) {
        if (options.replayDelay === undefined) {
            options.replayDelay = 10;
        }
        // preboot catches all events that happens before Aurelia gets loaded client-side
        // so that they can be replayed afterwards
        const prebootOptions = Object.assign({
            appRoot: options.appRoots || ['body']
        }, options.prebootOptions);
        const inlinePrebootCode = preboot.getInlineCode(prebootOptions);
        html = appendToHead(html, `\r\n<script>${inlinePrebootCode}</script>\r\n`);
        // preboot_browser can replay events that were stored by the preboot code
        html = appendToBody(html, `\r\n<script src="preboot_browser.js"></script>
      <script>
      document.addEventListener('aurelia-started', function () {
        // Aurelia has started client-side
        // but the view/view-model hasn't been loaded yet so we need a small
        // delay until we can playback all events.
        setTimeout(function () { preboot.complete(); }, ${options.replayDelay});
      });
      </script>`);
    }
    return html;
}
;
