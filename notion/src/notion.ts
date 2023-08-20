import { Extractor } from "./extractors.ts";
import { Getter } from "./getters.ts";
import { Appendor } from "./appendors.ts";

export class Notion {
  public key: string;
  appendor: Appendor;
  extractor: Extractor;
  getter: Getter;
  constructor(options: { key: string }) {
    this.key = options.key;
    this.appendor = new Appendor(this.key);
    this.extractor = new Extractor(this.key);
    this.getter = new Getter(this.key);
  }
}

// const n = new Notion({ key: Tuner.getEnv("NOTION_KEY") });

// const a = await n.appendor.appendParagraph(
//   urlToId.page(
//     "https://artpani.notion.site/d1ecc246b83e08a780b9a312548064?pvs=4",
//   ),
//   "ПРОВЕРКА",
// );
// console.log(a);
