import { maybeClient, urlToId } from './helpers.ts';
import { Client, Tuner } from './mod.ts';
import axiod from 'https://deno.land/x/axiod/mod.ts';

async function appendBlock(
  blockId: string,
  data: any,
) {
  const res = await axiod.patch(
    `https://api.notion.com/v1/blocks/${blockId}/children`,
    data,
    {
      headers: {
        'accept': 'application/json',
        'Notion-Version': '2022-06-28',
        'content-type': 'application/json',
        'Authorization': `Bearer ${Tuner.getEnv('NOTION_KEY')}`,
      },
    },
  );
  console.log(res);
}

export async function appendParagraph(
  blockId: string,
  text: string,
  after?: string,
) {
  const data = {
    children: [
      {
        'paragraph': {
          'rich_text': [
            {
              'text': {
                'content': text,
              },
            },
          ],
        },
      },
    ],
    after,
  };
  await appendBlock(blockId, data);
}

export async function appendToDo(
  blockId: string,
  text: string,
  checked: boolean,
  after?: string,
) {
  const data = {
    children: [
      {
        'to_do': {
          'rich_text': [
            {
              'text': {
                'content': text,
              },
            },
          ],
          'checked': checked,
        },
      },
    ],
    after,
  };
  await appendBlock(blockId, data);
}

export async function appendCode(
  blockId: string,
  text: string,
  language: string,
  after?: string,
) {
  const data = {
    children: [
      {
        'code': {
          'rich_text': [
            {
              'text': {
                'content': text,
              },
            },
          ],
          'language': language,
        },
      },
    ],
    after,
  };
  await appendBlock(blockId, data);
}

export async function appendQuote(
  blockId: string,
  text: string,
  after?: string,
) {
  const data = {
    children: [
      {
        'quote': {
          'rich_text': [
            {
              'text': {
                'content': text,
              },
            },
          ],
        },
      },
    ],
    after,
  };
  await appendBlock(blockId, data);
}

export async function appendCallout(
  blockId: string,
  text: string,
  icon: string,
  after?: string,
) {
  const data = {
    children: [
      {
        'callout': {
          'rich_text': [
            {
              'text': {
                'content': text,
              },
            },
          ],
          'icon': {
            type: 'emoji',
            emoji: icon,
          },
        },
      },
    ],
    after,
  };
  await appendBlock(blockId, data);
}

export async function appendH1(
  blockId: string,
  text: string,
  after?: string,
) {
  const data = {
    children: [
      {
        'heading_1': {
          'rich_text': [
            {
              'text': {
                'content': text,
              },
            },
          ],
          'is_toggleable': false,
        },
      },
    ],
    after,
  };
  await appendBlock(blockId, data);
}

export async function appendH2(
  blockId: string,
  text: string,
  after?: string,
) {
  const data = {
    children: [
      {
        'heading_2': {
          'rich_text': [
            {
              'text': {
                'content': text,
              },
            },
          ],
          'is_toggleable': false,
        },
      },
    ],
    after,
  };
  await appendBlock(blockId, data);
}

export async function appendH3(
  pageId: string,
  text: string,
  after?: string,
) {
  const data = {
    children: [
      {
        'heading_3': {
          'rich_text': [
            {
              'text': {
                'content': text,
              },
            },
          ],
          'is_toggleable': false,
        },
      },
    ],
    after,
  };
  await appendBlock(pageId, data);
}

export async function appendBLItem(
  pageId: string,
  text: string,
  after?: string,
) {
  const data = {
    children: [
      {
        'bulleted_list_item': {
          'rich_text': [
            {
              'text': {
                'content': text,
              },
            },
          ],
        },
      },
    ],
    after,
  };
  await appendBlock(pageId, data);
}

export async function appendNLItem(
  pageId: string,
  text: string,
  after?: string,
) {
  const data = {
    children: [
      {
        'numbered_list_item': {
          'rich_text': [
            {
              'text': {
                'content': text,
              },
            },
          ],
        },
      },
    ],
    after,
  };
  await appendBlock(pageId, data);
}

export async function appendToggleText(
  pageId: string,
  text: string,
  after?: string,
) {
  const data = {
    children: [
      {
        'toggle': {
          'rich_text': [
            {
              'text': {
                'content': text,
              },
            },
          ],
        },
      },
    ],
    after,
  };
  await appendBlock(pageId, data);
}

export const append = {
  paragraph: appendParagraph,
  toDo: appendToDo,
  code: appendCode,
  quote: appendQuote,

  callout: appendCallout,

  h1: appendH1,

  h2: appendH2,

  h3: appendH3,

  blItem: appendBLItem,

  nlItem: appendNLItem,

  toggleText: appendToggleText,
};
