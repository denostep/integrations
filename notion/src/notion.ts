import { Extractor } from './extractors.ts';
import { Getter } from './getters.ts';
import { Appendor } from './appendors.ts';
import { Behaviors } from './behaviors.ts';

import { ILimiterOptions } from 'https://deno.land/x/fetchify@0.3.12/src/types.ts';
import { Fetchify, fetchify } from '../../global.ts';
export class Notion {
  public key: string;
  appendor: Appendor;
  extractor: Extractor;
  getter: Getter;
  behavior: Behaviors;

  net: Fetchify;
  baseURL = 'https://api.notion.com/v1';
  constructor(options: { key: string; limitOpts?: ILimiterOptions }) {
    this.key = options.key;
    this.net = fetchify.create({
      limiter: options.limitOpts ?? { rps: 3, rt: () => 1000 },
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
