import { Fetchify } from 'https://deno.land/x/fetchify@0.2.10/src/fetchify.ts';
import { Block, NotionError } from './blockInterfaces.ts';
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
  ): Promise<[Block | null, NotionError | null]> => {
    try {
      const get = new Getter(this.key, this.net, this.baseURL);
      let next_cursor: string | null | undefined = start_at
        ? start_at
        : undefined;

      do {
        const [info, error] = await get
          .getBlocksByPage(
            pageId,
            chunk_size,
            next_cursor,
          );
        if (error) throw error;
        const { next_cursor: nextCursor, blocks } = info!;

        for (const block of blocks) {
          if (
            conditionStopSearch && await conditionStopSearch(block)
          ) {
            return [null, null];
          }
          if (await conditionSuccess(block)) {
            return [block, null];
          }
        }

        next_cursor = nextCursor;
      } while (next_cursor !== null);

      return [null, null];
    } catch (e) {
      return [null, e as NotionError];
    }
  };

  searchBlockByTextIncluded = async (
    pageId: string,
    text: string,
    stopCondition?: (block: Block) => Promise<boolean> | boolean,
    start_at?: string | null,
  ) => {
    const ex = new Extractor(this.key, this.net, this.baseURL);
    return await this.searchBlockByCondition(
      pageId,
      async (block) =>
        (await ex.extractTextFromBlock(block))?.includes(text),
      stopCondition,
      start_at,
    );
  };
}
