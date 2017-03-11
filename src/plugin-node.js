import * as path from 'path';
import * as fs from 'fs';
import {SSREngine} from './ssr-engine';

export let middleware = (configuration) => {
  let ssrEngine = new SSREngine(configuration);

  return (request, response, next) => {
    fs.readFile(configuration.indexPath, (err, data) => {
      if (err) throw err;

      console.log("data", data.toString());

      // Call the SSR engine.
      let view = ssrEngine.render({
        url: request.url,
        htmlPage: data.toString()
      });
      
      console.log("rendered view", view);

      response.body = view;
      next();
    });
  };
};
