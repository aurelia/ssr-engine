import {IDom} from 'aurelia-pal-nodejs/dist/dom';
import {Aurelia} from 'aurelia-framework';

export interface RenderOptions {
  /**
   * The path to the bundle
   */
  bundlePath: string;

  /**
   * The requested url
   */
  url?: URL;

  /**
   * The template where <!-- app --> indicates where server side rendered html will be inserted
   */
  template: string;

  /**
   * Whether or not to use preboot. Preboot allows you to record (and playback) events
   * that occur before the client-app is loaded (defaults to false)
   */
  preboot: boolean;

  /**
   * When using preboot, how long is the delay between Aurelia start and before the view has loaded
   */
  replayDelay?: number;

  /**
   * When using preboot, where can the preboot script be found
   */
  prebootScript?: string;

  /**
   * Options that are passed to preboot
   */
  prebootOptions?: any;

  /**
   * The queryselector(s) of the approot(s). Used by preboot
   * e.g. ['body']
   */
  appRoots?: string[];
}

export interface AppInitializationOptions {
  /**
   * an initialize, start and stop function for the engine to call
   * to start and stop the aurelia app
   */
  main: () => {
    initialize: () => { PLATFORM: any },
    start: () => Promise<{ aurelia: Aurelia, pal: AureliaPal, palNodeJS: AureliaPalNodeJS, stop: () => void }>,
    stop: () => Promise<void>
  };

  /**
   * The module id of the server main file (e.g. 'main')
   */
  serverMainId?: string;
}

export interface TransformerContext {
  /**
   * The body of the server side rendered app
   */
  app: string;

  /**
   * The JSDOM document
   */
  document: any;
}

export interface Dom extends IDom {
  global: Window;
}

export interface AureliaPal {
  DOM: Dom;

  global: Window;

  reset(): void;
}

export interface AureliaPalNodeJS {
  configure(): void;

  initialize(): void;

  reset(): void;
}
