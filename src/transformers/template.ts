
import {RenderOptions, TransformerContext} from '../interfaces';

export default function(html: string, transformerCtx: TransformerContext, options: RenderOptions) {
  return options.template.replace('<!-- app -->', transformerCtx.app);
};
