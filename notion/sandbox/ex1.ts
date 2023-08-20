import Tuner from 'https://deno.land/x/tuner@v0.1.4/mod.ts';
import { Config } from './config/configSchema.ts';
import { append } from '../src/appendors.ts';
import { getChildren } from '../src/getters.ts';
import { urlToId } from '../src/helpers.ts';
import { TableRow } from '../src/blockInterfaces.ts';
import { extractFrom, extractFromBlock } from '../src/extractors.ts';

const config = (await Tuner.use.loadConfig()) as Config;

// const blocks = await getBlocksByPage(
//   urlToId.page(
//     'https://artpani.notion.site/d1ecc246b8304e08a780b9a312548064?pvs=4',
//   ),
// );
// console.log(blocks);

// const a = await getBlockById(
//   urlToId.block(
//     'https://www.notion.so/artpani/d1ecc246b8304e08a780b9a312548064?pvs=4#3fa74b7de5f64304a575dbd526e1b2a3',
//   ),
// );
// console.log(a);

// await append.callout(
//   urlToId.page(
//     'https://artpani.notion.site/d1ecc246b8304e08a780b9a312548064?pvs=4',
//   ),
//   'Тестовый колаут',
//   '🦄',
// );

// await append.blItem(config.config.pageId, 'Тестовый BLITEM');
// await append.nlItem(config.config.pageId, 'Тестовый NLITEM');
// await append.toggleText(config.config.pageId, 'Тестовый ToggleText');
// await append.paragraph(config.config.pageId, 'Тестовый Paragraph');
// await append.toDo(config.config.pageId, 'Тестовый ToDo', true);
// await append.code(
//   config.config.pageId,
//   'Тестовый Code',
//   'typescript',
// );
// await append.quote(
//   config.config.pageId,
//   'Тестовый Quote',
//   'Тестовый Quote',
// );
// await append.h1(config.config.pageId, 'Тестовый H1');

const a = await extractFromBlock(
  {
    url:
      'https://www.notion.so/artpani/d1ecc246b8304e08a780b9a312548064?pvs=4#cb4538a2b30545dc99fe89f2fc3b75e9',
  },
);

console.log(a);
