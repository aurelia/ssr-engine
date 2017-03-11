import * as path from 'path';
import 'aurelia-polyfills';
import {Options, WebpackLoader as NodeJsLoader} from 'aurelia-loader-nodejs';
import {PLATFORM, DOM} from 'aurelia-pal';
import {globalize} from 'aurelia-pal-nodejs';
import {Aurelia} from 'aurelia-framework';

// initialize PAL and set globals (window, document, etc.)
globalize();

// aurelia expects console.debug
// TODO: Can we do better than this? A console feature in the plugin-node perhaps.
// Maybe we need a loader abstraction for this. Why would Aurelia expect console.debug?
console.debug = console.log;

export class SSREngine {
  constructor (configuration) {
    this.aurelia = new Aurelia(new NodeJsLoader());

    // set the root directory where the aurelia loader will resolve to
    // this is the 'src' dir in case of skeleton

    // TODO: This needs to be a paremeter.
    Options.relativeToDir = configuration.relativeToDir;
  }

  /**
   * This maybe should take a module or module path as an argument,
   * which would make sense.
   */
  render (renderConfig) {
    document.location.hash = renderConfig.url;
    document.write(renderConfig.htmlPage);

    // TODO: this must be configurable. Host may not always be document.body.
    this.aurelia.host = document.querySelector('[aurelia-app]');

    // TODO: This must be configurable. This may not always be 'main'. This should in fact be
    //       the value of the `aurelia-app attribute.
    this.aurelia.configModuleId = this.aurelia.host.getAttribute('aurelia-app') || 'main';

    // note: this assumes your configure method awaits or returns the value of aurelia.setRoot(...)
    // skeletons currently don't do that so you need to adjust

    console.log(require.main);

    let module = require.main.require('../src/' + this.aurelia.configModuleId + '.ts');

    module.configure(this.aurelia)
      .then(() => {
        // const attribute = document.createAttribute('aurelia-app');
        // attribute.value = 'main';
        // document.body.attributes.setNamedItem(attribute);
        const renderedHtml = 
          `<!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>Aurelia Navigation Server Skeleton</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <base href="">
            <link href="/1.css" rel="stylesheet">
            <script type="text/javascript" async src="/app.bundle.js"></script>
          </head>
          ${document.body.outerHTML}
          </html>`;
    
        return renderedHtml;
      });
  }
}
