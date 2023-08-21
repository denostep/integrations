import Tuner from "https://deno.land/x/tuner@v0.1.4/mod.ts";
import { Config } from "./config/configSchema.ts";
import Notion from "../mod.ts";
import { ParagraphBlock } from "../src/blockInterfaces.ts";
import { urlToId } from "../src/helpers.ts";

const config = await Tuner.use.loadConfig() as Config;
const n = new Notion({ key: Tuner.getEnv("NOTION_KEY") });

const date = new Date();
const dateString = `${date.getDate()}.${
  date.getMonth() + 1
}.${date.getFullYear()}`;

const blockWithToday = await n.behavior.searchBlockByTextIncluded(
  config.config.testPageID,
  dateString,
);

const blockArtem = await n.behavior.searchBlockByTextIncluded(
  config.config.testPageID,
  "artpani",
  (block) => block.type === "heading_2",
  await n.getter.getNextBlock(blockWithToday!.id!),
);

if (blockArtem) {
  await n.appendor.appendBLItem(
    config.config.testPageID,
    "OLOLO",
    blockArtem.id,
  );
} else {
  const artpani = await n.appendor.appendParagraph(
    config.config.testPageID,
    "Артем (artpani)",
    blockWithToday?.id,
  );
  await n.appendor.appendBLItem(config.config.testPageID, "OLOLO", artpani.id);
}
// 756cfd3f-28dd-402b-947e-953daef29cf2
