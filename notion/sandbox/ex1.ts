import Tuner from "https://deno.land/x/tuner@v0.1.4/mod.ts";
import { Config } from "./config/configSchema.ts";
import Notion from "../mod.ts";
import { ParagraphBlock, RichText } from "../src/blockInterfaces.ts";
import { parseRichText, urlToId } from "../src/helpers.ts";

const config = await Tuner.use.loadConfig() as Config;
const notion = new Notion({ key: Tuner.getEnv("NOTION_KEY") });

const date = new Date();
const dateString = `${date.getDate()}.${
  date.getMonth() + 1
}.${date.getFullYear()}`;

// const a = await notion.getter.getBlockById(
//   "06560e84-eee5-45a9-a474-6ba1be9ba5dd",
// urlToId.block(
//   "https://www.notion.so/artpani/d1ecc246b8304e08a780b9a312548064?pvs=4#2a897b31a35d425ca83ee9086e83732c",
// ),
// );
// console.log(a);
// try {
//   const b = await notion.appendor.appendColumn(
//     urlToId.page(
//       "https://artpani.notion.site/d1ecc246b8304e08a780b9a312548064?pvs=4",
//     ),
//     [
//       notion.appendor.makeParagraphBlock(`на всякий засейвю здесь:
//       контакт Артура b2b продажи
//       https://t.me/arthur_salesunicorns`),
//       notion.appendor.makeCalloutBlock(
//         `Сохранил и написал:
// _{{COLOR=red: Артем Панов (@artpani)}}_
// _{{COLOR=green: 23.8.2023 в 12:53")}}_`,
//         "🕓",
//       ),
//       notion.appendor.makeQuoteBlock("OLOLO"),
//       notion.appendor.makeQuoteBlock("OLOLO 2"),
//       notion.appendor.makeQuoteBlock("OLOLO 3"),
//       notion.appendor.makeQuoteBlock("OLOLO 4"),
//       notion.appendor.makeQuoteBlock("OLOLO 5 "),
//       notion.appendor.makeQuoteBlock("OLOLO 6"),
//     ],
//   );

//   console.log(b);
// } catch (e) {
//   console.log(e.response.data.message);
// }
await notion.appendor.append.equation(
  config.config.testPageID,
  "\\color{a9d6e5}\\rule{775px}{3px}",
);
