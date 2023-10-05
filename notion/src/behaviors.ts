import { Fetchify } from 'https://deno.land/x/fetchify@0.2.10/src/fetchify.ts';
import { Block } from './blockInterfaces.ts';
import { Extractor } from './extractors.ts';
import { Getter } from './getters.ts';
import { urlToId } from './helpers.ts';

export class Behaviors {
  net: Fetchify;
  baseURL: string;
  key: string;
  constructor(key: string, net: Fetchify, baseURL: string) {
    this.key = key;
    this.net = net;
    this.baseURL = baseURL;
  }

  searchBlockByCondition = async (
    pageId: string,
    conditionSuccess: (block: Block) => Promise<boolean> | boolean,
    conditionStopSearch?: (
      block: Block,
    ) => Promise<boolean> | boolean,
    start_at?: string | null,
    chunk_size: number = 50,
  ) => {
    const get = new Getter(this.key);
    let next_cursor: string | null | undefined = start_at
      ? start_at
      : undefined;

    do {
      //@ts-ignore
      const { blocks, nextCursor } = await get.getBlocksByPage(
        pageId,
        chunk_size,
        next_cursor,
      );

      for (const block of blocks) {
        if (conditionStopSearch && await conditionStopSearch(block)) {
          return null;
        }
        if (await conditionSuccess(block)) {
          return block;
        }
      }

      next_cursor = nextCursor;
    } while (next_cursor !== null);

    return null;
  };

  searchBlockByTextIncluded = async (
    pageId: string,
    text: string,
    stopCondition?: (block: Block) => Promise<boolean> | boolean,
    start_at?: string | null,
  ) => {
    const ex = new Extractor(this.key);
    return await this.searchBlockByCondition(
      pageId,
      async (block) =>
        (await ex.extractTextFromBlock(block))?.includes(text),
      stopCondition,
      start_at,
    );
  };
}
