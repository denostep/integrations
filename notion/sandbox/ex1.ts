import Tuner from 'https://deno.land/x/tuner@v0.1.4/mod.ts';
import { Config } from './config/configSchema.ts';
import Notion from '../mod.ts';
import { ParagraphBlock, RichText } from '../src/blockInterfaces.ts';
import { parseRichText, urlToId } from '../src/helpers.ts';

const config = await Tuner.use.loadConfig() as Config;
const notion = new Notion({ key: Tuner.getEnv('NOTION_KEY') });
try {
  const [data, error] = await notion.getter.getChildren(
    urlToId.block(
      'https://www.notion.so/artpani/d1ecc246b8304e08a780b9a312548064?pvs=4#dd73306362ef4d898e552930836a441b',
    ),
  );
  if (error) throw error;
  console.log(data!);
} catch (e) {
  console.log(e.message);
}

// const page = await notion.appendor.append.page(
//   urlToId.page(
//     'https://salty-oxygen-60d.notion.site/Getting-Started-8374d068e390468f9462a846cfc921d7?pvs=4',
//   ),
//   'Привет',
// );

// for (let i = 689; i < 3000; i++) {
//   try {
//     await notion.appendor.append.page(
//       urlToId.page(
//         'https://salty-oxygen-60d.notion.site/Getting-Started-8374d068e390468f9462a846cfc921d7?pvs=4',
//       ),
//       `Привет ${i}`,
//     );
//   } catch (e) {
//     console.log(`${i} НЕ СМОГ ОТПРАВИТЬ`);
//     console.log(e);
//   }
// }

// console.log(page);
// const date = new Date();
// const dateString = `${date.getDate()}.${
//   date.getMonth() + 1
// }.${date.getFullYear()}`;

// const a = await notion.getter.getBlockById(
//   "06560e84-eee5-45a9-a474-6ba1be9ba5dd",
// urlToId.block(
//   "https://www.notion.so/artpani/d1ecc246b8304e08a780b9a312548064?pvs=4#2a897b31a35d425ca83ee9086e83732c",
// ),
// );
// console.log(a);
// try {
//   const firstBlock = (await notion.getter.getBlocksByPage(
//     urlToId.page(
//       "https://artpani.notion.site/d1ecc246b8304e08a780b9a312548064?pvs=4",
//     ),
//     1,
//   )).blocks[0];
//   const b = await notion.appendor.appendColumn(
//     urlToId.page(
//       "https://artpani.notion.site/d1ecc246b8304e08a780b9a312548064?pvs=4",
//     ),
//     [
//       notion.appendor.makeCalloutBlock("OLOLO", "🚾"),
//       notion.appendor.makeH1Block("TROLOLO"),
//     ],
//     firstBlock.id,
//   );

//   console.log(b);
// } catch (e) {
//   console.log(e.response.data.message);
// }
// await notion.appendor.append.equation(
//   config.config.testPageID,
//   "\\color{a9d6e5}\\rule{775px}{3px}",
// );

// await notion.appendor.append.paragraph(
//   config.config.testPageID,
//   `_{{BOLD COLOR=red:: Время 12:45 http://yandex.ru}}_-ололо http://yandex.ru  _{{COLOR=blue:: А тут вообще :::}}_`,
// );
