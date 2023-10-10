import Tuner from 'https://deno.land/x/tuner@v0.1.4/mod.ts';
import { Config } from './config/configSchema.ts';
import Notion from '../mod.ts';

import { parseRichText, urlToId } from '../src/helpers.ts';

const config = await Tuner.use.loadConfig() as Config;

// console.log(
//   urlToId.page(
//     'https://artpani.notion.site/DailyLog-Artem-dailyLog-a519a147f57e46f7888b075a68f83102?pvs=4',
//   ),
// );

const notion = new Notion({ key: Tuner.getEnv('NOTION_KEY') });
try {
  // const pageId = urlToId.page(
  //   'https://artpani.notion.site/d1ecc246b8304e08a780b9a312548064?pvs=4',
  // );
  const t = await notion.appendor.appendPage(
    urlToId.page(
      'https://artpani.notion.site/d1ecc246b8304e08a780b9a312548064?pvs=4',
    ),
    'СУПЕР ТЕСТ СТРАНИЦА',
    '📅',
    'https://file.notion.so/f/f/5909bc5f-583d-4590-9f13-84000d8cfbbc/a7154015-e47f-40cd-ad4e-a7076007ccc4/cover.png?id=84a8913d-5f6d-479a-8c55-7f55321f43ab&table=block&spaceId=5909bc5f-583d-4590-9f13-84000d8cfbbc&expirationTimestamp=1696953600000&signature=WXf631vPwXMzhvlOOlaCa36CLLIBoEOMTb-BTUAdmwM&downloadName=cover.png',
  );
  console.log(t);
  // if (error) throw error;
  // console.log(result!);
} catch (e) {
  console.log(e);
}

// console.log(
//   urlToId.block(
//     'https://www.notion.so/artpani/DailyLog-Artem-dailyLog-d9d9e351544a4894b6546c3cea001858?pvs=4#93a62a0f3ec84f35b48ba4393f28f24c',
//   ),
// );

// console.log(
//   urlToId.block(
//     'https://www.notion.so/artpani/DailyLog-Artem-dailyLog-d9d9e351544a4894b6546c3cea001858?pvs=4#2a924ae8e93a4a3493cbc9455cddddbe',
//   ),
// );

// console.log(
//   await notion.getter.getNextBlock(urlToId.block(
//     'https://www.notion.so/artpani/DailyLog-Artem-dailyLog-d9d9e351544a4894b6546c3cea001858?pvs=4#93a62a0f3ec84f35b48ba4393f28f24c',
//   )),
// );

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
