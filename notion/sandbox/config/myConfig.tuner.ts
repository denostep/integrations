import { urlToId } from "../../src/helpers.ts";
import Tuner from "https://deno.land/x/tuner@v0.1.4/mod.ts";

export default Tuner.tune({
  config: {
    "testPageID": urlToId.page(
      "https://artpani.notion.site/d1ecc246b8304e08a780b9a312548064?pvs=4",
    ),
  },
  env: {
    NOTION_KEY: Tuner.Env.getString.orExit("Нет ключа - нет ноушена 🦄"),
  },
});
