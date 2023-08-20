import axiod from "https://deno.land/x/axiod/mod.ts";
import { Block } from "./blockInterfaces.ts";
import { childrenListError } from "./errors/mod.ts";
import { maybeClient } from "./helpers.ts";
import Client from "https://deno.land/x/notion_sdk@v2.2.3/src/Client.ts";

export class Getter {
  key: string;
  constructor(key: string) {
    this.key = key;
  }

  getBlocksByPage = async (
    pageId: string,
    size = 50,
    client?: Client,
  ) => {
    const cl = await maybeClient(client, this.key);
    try {
      const response = await cl.blocks.children.list({
        block_id: pageId,
        page_size: size,
      });
      return response.results as Block[];
    } catch (e) {
      throw new childrenListError();
    }
  };

  getBlockById = async (
    blockId: string,
    client?: Client | undefined,
  ): Promise<Block> => {
    return await (await maybeClient(client, this.key)).blocks.retrieve({
      block_id: blockId,
    }) as unknown as Block;
  };

  getFirstBlock = async (
    pageId: string,
    client?: Client,
  ): Promise<Block> => {
    const blocks = await this.getBlocksByPage(pageId, 1, client);
    return blocks[0];
  };

  getChildren = async (
    blockId: string,
  ) => {
    const res = await axiod.get(
      `https://api.notion.com/v1/blocks/${blockId}/children`,
      {
        headers: {
          "accept": "application/json",
          "Notion-Version": "2022-06-28",
          "content-type": "application/json",
          "Authorization": `Bearer ${this.key}`,
        },
      },
    );
    return res.data.results as Block[];
  };
}
