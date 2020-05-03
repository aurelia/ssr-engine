import * as preboot from 'preboot';
import { appendToHead, appendToBody } from './utils';
export default function (html, transformerCtx, options) {
    if (options.preboot) {
        if (options.replayDelay === undefined) {
            options.replayDelay = 10;
        }
        if (options.prebootScript === undefined) {
            options.prebootScript = "preboot_browser.js";
        }
        // preboot catches all events that happens before Aurelia gets loaded client-side
        // so that they can be replayed afterwards
        const prebootOptions = Object.assign({
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
        const inlinePrebootCode = preboot.getInlineCode(prebootOptions);
        html = appendToHead(html, `\r\n<script>${inlinePrebootCode}</script>\r\n`);
        // preboot_browser can replay events that were stored by the preboot code
        const script = `\r\n<script src="${options.prebootScript}"></script>
<script>
document.addEventListener('aurelia-started', function () {
  // Aurelia has started client-side
  // but the view/view-model hasn't been loaded yet so we need a small
  // delay until we can playback all events.
  setTimeout(function () { preboot.complete(); }, ${options.replayDelay});
});
</script>`;
        if (html.indexOf("<!-- preboot_script -->") !== -1) {
            html = html.replace("<!-- preboot_script -->", script);
        }
        else {
            html = appendToBody(html, script);
        }
    }
    return html;
}
;
