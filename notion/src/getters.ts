import axiod from 'https://deno.land/x/axiod/mod.ts';
import { Block } from './blockInterfaces.ts';
import { childrenListError } from './errors/mod.ts';
import { maybeClient } from './helpers.ts';
import { Client, Tuner } from './mod.ts';

export async function getBlocksByPage(
  pageId: string,
  size = 50,
  client?: Client,
) {
  const cl = await maybeClient(client);
  try {
    const response = await cl.blocks.children.list({
      block_id: pageId,
      page_size: size,
    });
    return response.results as Block[];
  } catch (e) {
    throw new childrenListError();
  }
}

export async function getBlockById(
  blockId: string,
  client?: Client | undefined,
): Promise<Block> {
  return await (await maybeClient(client)).blocks.retrieve({
    block_id: blockId,
  }) as unknown as Block;
}

export async function getFirstBlock(
  pageId: string,
  client?: Client,
): Promise<Block> {
  const blocks = await getBlocksByPage(pageId, 1, client);
  return blocks[0];
}

export async function getChildren(
  blockId: string,
) {
  const res = await axiod.get(
    `https://api.notion.com/v1/blocks/${blockId}/children`,
    {
      headers: {
        'accept': 'application/json',
        'Notion-Version': '2022-06-28',
        'content-type': 'application/json',
        'Authorization': `Bearer ${Tuner.getEnv('NOTION_KEY')}`,
      },
    },
  );
  return res.data.results as Block[];
}
