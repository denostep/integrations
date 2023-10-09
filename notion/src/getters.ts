import { Fetchify, json } from '../../global.ts';
import { Block, NotionError } from './blockInterfaces.ts';

export class Getter {
  key: string;
  net: Fetchify;
  baseURL: string;
  constructor(key: string, net: Fetchify, baseURL: string) {
    this.key = key;
    this.net = net;
    this.baseURL = baseURL;
  }

  getBlocksByPage = async (
    pageId: string,
    size = 50,
    cursor?: string | undefined,
  ): Promise<
    [
      | { blocks: Block[]; next_cursor: string | null | undefined }
      | null,
      NotionError | null,
    ]
  > => {
    try {
      const url = new URL(
        this.baseURL +
          `/blocks/${pageId}/children`,
      );
      url.search = new URLSearchParams({
        page_size: size.toString(),
        //@ts-ignore
        start_cursor: cursor
          ? (await this.transformID(cursor))[0]
          : undefined,
      }).toString();
      const res = await json<any>(this.net.get(url));
      if (res.response.status == 200) {
        return [{
          blocks: res.data.results as Block[],
          next_cursor: res.data.next_cursor as string | null,
        }, null];
      }
      throw res.data;
    } catch (e) {
      return [null, e as NotionError];
    }
  };

  getBlockById = async (
    blockId: string,
  ): Promise<[Block | null, NotionError | null]> => {
    try {
      const res = await json<any>(this.net.get(
        `https://api.notion.com/v1/blocks/${blockId}`,
      ));
      if (res.response.status == 200) {
        return [res.data as Block, null];
      }
      throw res.data;
    } catch (e) {
      return [null, e as NotionError];
    }
  };

  getNextBlock = async (
    blockId: string,
  ): Promise<[string | null | undefined, NotionError | null]> => {
    try {
      const [curBlock, error] = await this.getBlockById(blockId);
      if (error) throw error;
      const [data, error2] = await this.getBlocksByPage(
        curBlock!.parent.page_id!,
        1,
        curBlock!.id,
      );
      if (error2) throw error2;
      return [(data!).next_cursor, null];
    } catch (e) {
      return [null, e as NotionError];
    }
  };

  transformID = async (
    blockId: string,
  ): Promise<[string | null, NotionError | null]> => {
    try {
      const [block, error] = await this.getBlockById(blockId);
      if (error) throw error;
      return [block!.id, null];
    } catch (e) {
      return [null, e as NotionError];
    }
  };

  getChildren = async (
    blockId: string,
  ): Promise<[Block[] | null, NotionError | null]> => {
    try {
      const res = await json<any>(this.net.get(
        `https://api.notion.com/v1/blocks/${blockId}/children`,
      ));
      if (res.response.status != 200) throw res.data;
      return [res.data.results as Block[], null];
    } catch (e) {
      return [null, e as NotionError];
    }
  };
}
