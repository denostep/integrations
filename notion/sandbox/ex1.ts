import Tuner from 'https://deno.land/x/tuner@v0.1.4/mod.ts';
import { Config } from './config/configSchema.ts';
import Notion from '../mod.ts';

import { parseRichText, urlToId } from '../src/helpers.ts';

const config = await Tuner.use.loadConfig() as Config;
const notion = new Notion({ key: Tuner.getEnv('NOTION_KEY') });
try {
  const pageId = urlToId.page(
    'https://artpani.notion.site/d1ecc246b8304e08a780b9a312548064?pvs=4',
  );
  const [result, error] = await notion.appendor.appendCode(
    pageId,
    'ololo222455445',
    'typescript',
    urlToId.block(
      'https://www.notion.so/artpani/d1ecc246b8304e08a780b9a312548064?pvs=4#ce7574073eef42bda67fb031eecc4dd',
    ),
  );
  if (error) throw error;
  console.log(result!);
} catch (e) {
  console.log(e.message, e.details);
}

// try {
//   const pageId = urlToId.page(
//     'https://artpani.notion.site/d1ecc246b8304e08a780b9a312548064?pvs=4',
//   );
//   const [result, error] = await notion.getter.getBlockById(
//     urlToId.block(
//       'https://www.notion.so/artpani/d1ecc246b8304e08a780b9a312548064?pvs=4#ad01a345f0a543d6aafcc117ce166a09',
//     ),
//   );
//   if (error) throw error;
//   console.log(result!);
// } catch (e) {
//   console.log(e.message, e.details);
// }
