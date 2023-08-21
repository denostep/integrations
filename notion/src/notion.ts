import { Extractor } from "./extractors.ts";
import { Getter } from "./getters.ts";
import { Appendor } from "./appendors.ts";
import Tuner from "https://deno.land/x/tuner@v0.1.4/mod.ts";
import { urlToId } from "./helpers.ts";
import { Behaviors } from "./behaviors.ts";

export class Notion {
  public key: string;
  appendor: Appendor;
  extractor: Extractor;
  getter: Getter;
  behavior: Behaviors;
  constructor(options: { key: string }) {
    this.key = options.key;
    this.appendor = new Appendor(this.key);
    this.extractor = new Extractor(this.key);
    this.getter = new Getter(this.key);
    this.behavior = new Behaviors(this.key);
  }
}
