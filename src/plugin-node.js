import {SSREngine} from './ssr-engine';

export let middleware = () => {
  let ssrEngine = new SSREngine();

  return (request, response, next) => {
    // Call the SSR engine.
    response.body = ssrEngine.render();

    next();
  };
};
