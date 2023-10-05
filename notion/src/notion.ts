import { Extractor } from './extractors.ts';
import { Getter } from './getters.ts';
import { Appendor } from './appendors.ts';
import Tuner from 'https://deno.land/x/tuner@v0.1.4/mod.ts';
import { urlToId } from './helpers.ts';
import { Behaviors } from './behaviors.ts';
import {
  Fetchify,
  fetchify,
} from 'https://deno.land/x/fetchify@0.2.10/src/fetchify.ts';

export class Notion {
  public key: string;
  appendor: Appendor;
  extractor: Extractor;
  getter: Getter;
  behavior: Behaviors;

  net: Fetchify;
  baseURL = 'https://api.notion.com/v1';
  constructor(options: { key: string }) {
    this.key = options.key;
    this.net = fetchify.create({
      limiter: {
        rps: 3,
        '429': () => 1000,
      },
      headers: {
        'accept': 'application/json',
        'Notion-Version': '2022-06-28',
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.key}`,
      },
    });
    this.appendor = new Appendor(this.key, this.net, this.baseURL);
    this.extractor = new Extractor(this.key, this.net, this.baseURL);
    this.getter = new Getter(this.key, this.net, this.baseURL);
    this.behavior = new Behaviors(this.key, this.net, this.baseURL);
  }
}
